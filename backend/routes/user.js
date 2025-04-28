const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.get("/get-users", async (req, res) => {
    const users = await User.find();
    res.status(200).json({ users: users });
});

router.get("/get-user/:email", async (req, res) => {
    const user = await User.findOne({ email: req.params.email });
    res.status(200).json({ user: user });
});

router.post("/add-user", async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ user: user });
});

router.patch("/post-points", async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    user.totalPoints = req.body.totalPoints;
    await user.save();
    res.status(201).json({ user: user });
})

module.exports = router;