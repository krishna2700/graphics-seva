const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        req.session.userId = user._id;
        res.cookie('token', generateToken(user._id), { httpOnly: true });
        res.json({
            _id: user._id,
            email: user.email,
            role: user.role,
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.status(500).json({ message: 'Logout failed' });
        } else {
            res.clearCookie('token');
            res.status(200).json({ message: 'Logged out successfully' });
        }
    });
});

module.exports = { authUser, logoutUser };
