const router = require('express').Router();

const {
    getUser,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    createFriend,
    deleteFriend,
} = require ("../../controllers/userController")

router.route("/").get(getUser).post(createUser);

router
    .route("/:userId")
    .get(getUserById)
    .put(updateUserById)
    .delete(deleteUserById)

router
    .route("/:userId/friends/:friendId")
    .post(createFriend)
    .delete(deleteFriend)

module.exports = router; 