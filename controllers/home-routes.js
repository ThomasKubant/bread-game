const router = require("express").Router();
const { User } = require("../models");
const path = require("path")

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
}) 

router.get("/leaderboard", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/leaderboard.html"))
})
// router.get("/api/users", (req, res) => {
//     User.findAll({
//         attributes: [
//             'id',
//             'username',
//             'score',
//         ]
//     })
//     .then(dbUserData => {
//         res.json(dbUserData)
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     })
// });

module.exports = router;