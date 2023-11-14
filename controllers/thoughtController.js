const { User, Thought } = require('../models');

const getThought = async (res, req) => {
    try {
        const thoughtData = await Thought.find()
        res.json(thoughtData)
    }
    catch(err) {
        res.status(500).json(err)
    }
}