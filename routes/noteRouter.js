const { Router } = require("express");
const Notemodel = require("../model/noteModel");
const authmiddleware = require("../middlewares/authmiddleware")

const noteRouter = Router();

noteRouter.post("/create", authmiddleware, async (req, res) => {
    const { title, description, userid, username } = req.body;
    try {
        const note = new Notemodel({ title, description, userid, username });
        await note.save();
        res.status(200).json({ message: "note created successfully" });
    } catch (error) {
        res.status(500).json({ message: "error create note", error });
    }
})

noteRouter.get("/allnote", authmiddleware, async (req, res) => {
    let userid = req.body.userid
    try {
        const notes = await Notemodel.find({ userid: userid });
        res.status(200).json({ message: "all notes", notes: notes })

    } catch (error) {
        res.status(400).json({ message: "error while getting all notes", error })
    }
})


noteRouter.patch("/update/:id", authmiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        await Notemodel.findByIdAndUpdate({ _id: id }, req.body);
        res.status(200).json({ message: "note is updated successfully" })
    } catch (error) {
        res.status(400).json({ message: "error while updating note" })
    }
})



noteRouter.delete("/delete/:id", authmiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        await Notemodel.findByIdAndDelete({ _id: id });
        res.status(200).json({ message: "note is deleted successfully" })
    } catch (error) {
        res.status(400).json({ message: "error while deleting note" })
    }
})




module.exports = noteRouter;