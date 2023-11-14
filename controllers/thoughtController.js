const { User, Thought } = require('../models');

const getThought = async (res, req) => {
    try {
        const thoughtData = await Thought.find()
        res.json(thoughtData)
    }
    catch (err) {
        res.status(500).json(err)
    }
}

const createThought = async (res, req) => {
    try {
        const thought = await Thought.create(req.body)
        const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thought: thought._id } },
            { new: true }
        )
        res.json(user);
    }
    catch (err) {
        console.log("There was an error")
        res.status(500).json(err)
    }

}

const updateThought = async (res, req) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        res.json(thought)
    }
    catch (err) {
        console.log("There was an error")
        res.status(500).json(err)
    }
}

const deleteThought = async (res, req) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId })

        if (!thought) {
            return res.status(404).json({ message: "Thought does not exist" })
        }

        const user = await User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { runValidators: true, new: true })

        res.json({ message: 'Thought deleted' });
    }
    catch (err) {
        res.status(500).json(err);
    }
}

const createReaction = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        );

        if (!thought) {
            return res.status(404).json({ message: 'Thought does not exist' });
        }

        res.json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
}

const deleteReaction = async (req, res) => {
    try {
        const reaction = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )

        if (!reaction) {
            return res.status(404).json({ message: 'Thought does not exist' });
        }

        res.json({ message: "reaction deleted!" });
    }
    catch (err) {
        res.status(500).json(err);
    }
}

module.exports = { getThought, createThought, updateThought, deleteThought, createReaction, deleteReaction }