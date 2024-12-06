const passport = require('passport');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../database/models');
const { JWT_SECRET } = require('../config');
const { default: mongoose } = require('mongoose');

const router = require('express').Router()

// Initiate Google Login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback after Google Login
router.get('/google/callback', 
    passport.authenticate('google', { 
		successRedirect: '/auth/success', 
		failureRedirect: '/failure'
}));

router.get('/success', async(req, res) => {
    const user = req.user;
    console.log(user)
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1y' });
    return res.json({ token });
})

// Verify JWT Token
router.get('/verify', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        console.log(decoded)
        const user = await UserModel.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        res.json({ user });
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
});

module.exports = router;
