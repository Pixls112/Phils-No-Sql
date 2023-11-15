const { User, Thought } = require('../models');

//This function is used to retrieve all thoughts
const getThought = async (req, res) => {
    try {
        //This grabs all thoughts in the database
        const thoughtData = await Thought.find()
        //Then sends it as a json response
        res.json(thoughtData)
    }
    //used to catch any errors which will respond with a status of 500 
    catch (err) {
        res.status(500).json(err)
    }
}

// This function is used to create new thoughts
const createThought = async (req, res) => {
    try {
        //This creates a new thought using data given
        const thought = await Thought.create(req.body)
        //This finds the user with the userID and connects it to the userID
        const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            {  $addToSet: { thoughts: thought._id } },
            {  new: true }
        );
        //Then sends it as a json response
        res.json(user);
    }
    //This is used to catch any errors and if caught will display console.log message
    catch (err) {
        console.log("There was an error creating thought")
        res.status(500).json(err)
    }

}

//This fucntion is used to update an existing thought
const updateThought = async (req, res) => {
    try {
        //Finds the thought based on its ID and then sets in the new data provided
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        //Then sends it as a json response
        res.json(thought)
    }
    //This is used to catch any errors and if caught will display console.log message
    catch (err) {
        console.log("There was an error")
        res.status(500).json(err)
    }
}

//This function is used to delete any existing thoughts
const deleteThought = async (req, res) => {
    try {
        //Finds the thought based on the thoughtID and deletes it
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId })
        //If there is no thought then this will return a status and a message 
        if (!thought) {
            return res.status(404).json({ message: "Thought does not exist" })
        }
        //This finds the user associated with the thought based on the thoughtID and removes it from them
        const user = await User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { runValidators: true, new: true })
        //Then will send a json response
        res.json({ message: 'Thought deleted', user });
    }
    //used to catch any errors which will respond with a status of 500 
    catch (err) {
        res.status(500).json(err);
    }
}

//This function is used to create a new reaction
const createReaction = async (req, res) => {
    try {
        //This finds the thought based on the thoughtID and adds a reaction to it.
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        );
        //If is no thought then this will return a status and a message
        if (!thought) {
            return res.status(404).json({ message: 'Reaction failed to be created' });
        }
        //The function will respond if successful with a json response
        res.json(thought);
    }
    //used to catch any errors which will respond with a status of 500 
    catch (err) {
        res.status(500).json(err);
    }
}

//This function is used to delete any existing reactions
const deleteReaction = async (req, res) => {
    try {
        //finds the thought with the thoughtID and removes the reaction associated with it
        const reaction = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
        //If there are no reactions then this will return a response and a message
        if (!reaction) {
            return res.status(404).json({ message: 'Reaction does not exist' });
        }
        //If successful then the function will send a response json
        res.json({ message: "Reaction deleted!" });
    }
    
    catch (err) {
        //used to catch any errors which will respond with a status of 500 
        res.status(500).json(err);
    }
}

module.exports = { getThought, createThought, updateThought, deleteThought, createReaction, deleteReaction }