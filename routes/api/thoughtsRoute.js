const router = require('express').Router();

const { 
    getThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require ('../../controllers/thoughtControllers.js')

router.route('/').get(getThought).post(createThought);

router
    .route('/:thoughtId')
    .get(getThought)
    .put(updateThought)
    .delete(deleteThought)

    router.route("/:thoughtId/reactions").post(createReactionReaction);
    router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);
