const mongoose = require('mongoose');
const User = require('./models/User.Model');
const { hashPassword } = require('./utils/auth.utils');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/fixhub');

async function resetPassword() {
  try {
    const email = 'zoediaz@gmail.com';
    const newPassword = 'zoediaz@gmail.com';

    console.log('Resetting password for:', email);
    
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      console.log('❌ User not found');
      process.exit(1);
    }

    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    await user.save();

    console.log('✅ Password reset successfully!');
    console.log('Email:', email);
    console.log('New Password:', newPassword);
    console.log('\nYou can now login with these credentials.');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

resetPassword();
