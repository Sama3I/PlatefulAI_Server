const passport = require('passport');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../database/models');
const { CLIENTID, JWT_SECRET } = require('../config');
const { default: mongoose } = require('mongoose');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENTID);

const router = require('express').Router()

router.post('/google/callback', async (req, res) => {
    const { idToken } = req.body;

    try {
        // Verify the ID token
        const ticket = await client.verifyIdToken({
            idToken: idToken,
            audience: CLIENTID,
        });

        const payload = ticket.getPayload();
        const googleId = payload.sub;
        const email = payload.email;

        // Check if user exists in the database
        let user = await UserModel.findOne({ email: email });
        if (!user) {
            // Create new user if doesn't exist
            user = new UserModel({ username: payload.name, email: email, myRecipes: [], likedRecipes: [], savedRecipes: [] });
            await user.save();
        }

        // Generate JWT for the user
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '365d' });

        return res.status(200).json({ token });
    } catch (err) {
        console.error("Error verifying ID token:", err);
        res.status(400).json({ error: 'Invalid ID token' });
    }
});

// Verify JWT Token
router.get('/verify', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
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
