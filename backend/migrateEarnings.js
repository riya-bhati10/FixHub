const mongoose = require('mongoose');
const User = require('./models/User.Model');
const Booking = require('./models/Booking.model');

mongoose.connect('mongodb://localhost:27017/fixhub');

async function migrateEarnings() {
  try {
    console.log('Starting earnings migration...');

    // Get all technicians
    const technicians = await User.find({ role: 'technician' });
    console.log(`Found ${technicians.length} technicians`);

    for (const technician of technicians) {
      console.log(`\nProcessing technician: ${technician.fullname.firstname} ${technician.fullname.lastname}`);
      
      // Get all completed bookings for this technician
      const completedBookings = await Booking.find({
        technician: technician._id,
        status: 'completed'
      });

      console.log(`  Found ${completedBookings.length} completed bookings`);

      // Calculate total earnings (90% of each booking)
      let totalEarnings = 0;
      completedBookings.forEach(booking => {
        const technicianShare = booking.estimatedPrice * 0.9;
        totalEarnings += technicianShare;
        console.log(`  Booking: $${booking.estimatedPrice} -> Technician gets: $${technicianShare.toFixed(2)}`);
      });

      // Update technician's totalEarnings
      technician.totalEarnings = totalEarnings;
      await technician.save();

      console.log(`  ✅ Updated total earnings: $${totalEarnings.toFixed(2)}`);
    }

    console.log('\n✅ Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrateEarnings();
