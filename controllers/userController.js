const User = require('../models/User');
const path = require('path');

exports.getUserProfile = async (req, res) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(404).sendFile(path.join(__dirname, '../views/404.html'));
        }

        res.render('userProfile', { user, customizations: user.customizations });
    } catch (error) {
        console.error(error);
        res.status(500).sendFile(path.join(__dirname, '../views/500.html'));
    }
};

exports.updateCustomizations = async (req, res) => {
    try {
        const username = req.params.username;
        const customizations = req.body.customizations;

        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.customizations = customizations;
        await user.save();

        res.json({ message: 'Customizations updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while updating customizations' });
    }
};
