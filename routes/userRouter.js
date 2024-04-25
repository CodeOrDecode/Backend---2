const { Router } = require("express");
const bcrypt = require("bcrypt");
const Usermodel = require("../model/userModel");
const jwt = require("jsonwebtoken");


const userRouter = Router();

userRouter.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.status(500).json({ message: "error while hashing the password" });
            }

            const user = new Usermodel({ username, email, password: hash });
            await user.save();
            res.status(201).json({ message: "user registered successfully" })

        });
    } catch (error) {
        res.status(500).json({ message: "error while registering", error: error });
    }
})


userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Usermodel.findOne({ email: email });
        if (user) {
            bcrypt.compare(password, user.password, function (err, result) {
                if (result) {
                    let token = jwt.sign({ userid:user._id,username:user.username }, 'masai');
                    res.status(200).json({ message: "user login successfully", token: token });
                }
                else {
                    res.status(404).json({ message: "wrong password" });
                }
            });
        }
        else {
            res.status(404).json({ message: "user not found" });
        }
    } catch (error) {
        res.status(404).json({ message: "error while login", error: error });
    }
})


module.exports = userRouter