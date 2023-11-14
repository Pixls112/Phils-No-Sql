const { User, Thought } = require('../models');

const getUser = async (req, res) => {
    try {
        const userData = await User.find()
        res.json(userData);
    }
    catch(err) {
        res.status(500).json(err);
    }
}