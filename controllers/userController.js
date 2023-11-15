const { User, Thought } = require('../models');

const getUser = async (req, res) => {
    try {
        const userData = await User.find()
        res.json(userData);
    }
    catch (err) {
        res.status(500).json(err);
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
}

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(201).json(user);
    }
    catch (err) {
        res.status(400).json(err);
    }
}

const updateUserById = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
}


const deleteUserById = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });

        if (!user) {
            return res.status(404).json({ message: 'No user found with this ID' });
        }

        if (user.thoughts.length === 0) {
            await Thought.deleteMany({ _id: { $in: user.thoughts } });
        }

        return res.json({ message: "User was deleted" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'An error occurred while trying to delete the user' });
    }
}


const createFriend = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        );
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
}

const deleteFriend = async (req, res) => {
    try {
        console.log(req.params.userId);
        console.log(req.params.friendId);
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );


        if (!user) {
            return res.status(404).json({ message: 'no user with this id' })
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
}

module.exports = { getUser, getUserById, createUser, updateUserById, deleteUserById, createFriend, deleteFriend }