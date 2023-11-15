const router = require('express').Router();

const { 
    getThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require ('../../controllers/thoughtController')

router.route('/').get(getThought).post(createThought);

router
    .route('/:thoughtId')
    .get(getThought)
    .put(updateThought)
    .delete(deleteThought)

    router.route("/:thoughtId/reactions").post(createReaction);
    router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;