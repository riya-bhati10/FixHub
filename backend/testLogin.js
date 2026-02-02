const mongoose = require('mongoose');
const User = require('./models/User.Model');
const { comparePassword } = require('./utils/auth.utils');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/fixhub');

async function testLogin() {
  try {
    const email = 'zoediaz@gmail.com';
    const password = 'zoediaz@gmail.com';

    console.log('Testing login for:', email);
    
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    
    if (!user) {
      console.log('❌ User not found');
      process.exit(1);
    }

    console.log('✅ User found');
    console.log('User ID:', user._id);
    console.log('User Role:', user.role);
    console.log('User Blocked:', user.isBlocked);
    console.log('Password Hash:', user.password.substring(0, 20) + '...');

    const isMatch = await comparePassword(password, user.password);
    console.log('Password Match:', isMatch ? '✅ YES' : '❌ NO');

    if (!isMatch) {
      console.log('\n⚠️  Password does not match!');
      console.log('Try resetting the password or check if the password was changed.');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

testLogin();
