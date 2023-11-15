const { User, Thought } = require('../models');

//This functions is used to get all users
const getUser = async (req, res) => {
    try {
        //This grabs all data from the database
        const userData = await User.find()
        //Then send a response json if successful
        res.json(userData);
    }
    //used to catch any errors which will respond with a status of 500 
    catch (err) {
        res.status(500).json(err);
    }
}

//This function is similar to the above function but will grab a specific user based on the ID provided when made
const getUserById = async (req, res) => {
    try {
        //Grabs a specific users data from the database based on the ID
        const user = await User.findById(req.params.userId);
        //If no userID is found then will return a response and a message
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        //if successful this will send a respons json with the data
        res.json(user);
    }
    //used to catch any errors which will respond with a status of 500 
    catch (err) {
        res.status(500).json(err);
    }
}

//This function is used to create a new user
const createUser = async (req, res) => {
    try {
        //This creates a new user based on the data provided
        const user = await User.create(req.body)
        //Then will respond with the json reponse and a status if successful
        res.status(201).json(user);
    }
    //used to catch any errors which will respond with a status of 500 
    catch (err) {
        res.status(400).json(err);
    }
}

//This is used to update a user information based on the ID
const updateUserById = async (req, res) => {
    try {
        //This finds the user based on the ID in the data base and sets the new data in
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true });
        //If no user is found then this will return a response status and message
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        //If successful will return a res.json with the new data
        res.json(user);
    }
    //used to catch any errors which will respond with a status of 500 
    catch (err) {
        res.status(500).json(err);
    }
}

//This is used to delete a user based on the ID
const deleteUserById = async (req, res) => {
    try {
        //This is used to find a user based on the userId and delete the user
        const user = await User.findOneAndDelete({ _id: req.params.userId });
        //If no user is found then this will respond with a status and message
        if (!user) {
            return res.status(404).json({ message: 'No user found with this ID' });
        }
        //This is used to see the user has any thoughts and will then delete them,
        if (user.thoughts.length === 0) {
            await Thought.deleteMany({ _id: { $in: user.thoughts } });
        }
        //If successful will send a res json message 
        return res.json({ message: "User was deleted" });
    }
    //used to catch any errors which will respond with a status of 500 
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'An error occurred while trying to delete the user' });
    }
}

//Used to create a new friend
const createFriend = async (req, res) => {
    try {
        //Finds a user based on the userID and will then add the new data to there array
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        );
        //If successful will respond with a response json
        res.json(user);
    }
    //used to catch any errors which will respond with a status of 500 
    catch (err) {
        res.status(500).json(err);
    }
}

//Used to delete a friend from an existing array
const deleteFriend = async (req, res) => {
    try {
        //Finds the user based on id and deletes any data in there array
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );

        //If no user is found, then will respond with a response status and a message
        if (!user) {
            return res.status(404).json({ message: 'no user with this id' })
        }
        res.json(user);
    }
    //used to catch any errors which will respond with a status of 500 
    catch (err) {
        res.status(500).json(err);
    }
}

module.exports = { getUser, getUserById, createUser, updateUserById, deleteUserById, createFriend, deleteFriend }