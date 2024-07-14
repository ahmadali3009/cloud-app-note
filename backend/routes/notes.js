const express = require('express');
const mongoose = require('mongoose')
let note = require('../models/notes')
let fetchuser = require("../middleware/auth")

const notesrouter = express.Router();

notesrouter.post('/create', fetchuser, async (req , res) =>
{
    result = req.body
    if(!result || !result.title || !result.description)
    {
      return res.status(500).send("Title and description must be filled")
    }
    let notes = await note.create({
        userID: req.user.id,
        title : result.title,
        tag : result.tag,
        description: result.description
    })
    res.status(200).send(notes)
})

notesrouter.get('/getnotes',fetchuser, async (req , res) =>
{
    let getnotes = await note.find({userID: req.user.id});
    if(!getnotes)
    {
        res.status(500).send("notes did not found")
    }
    console.log(getnotes)
    res.send(getnotes);
})

notesrouter.patch('/updatenote/:id', fetchuser , async (req , res)=>
{
    result = req.body
    let notesID = await note.findById(req.params.id)
    if (!notesID) {
        return res.status(404).send("Note not found");
    }
    if(notesID.userID.toString() !== req.user.id)
    {
        return res.status(401).send("not Allowed")
    }
    let updatenote = await note.findByIdAndUpdate(notesID , {title: result.title , description: result.description , tag: result.tag} , {new:true})
    if(!updatenote)
    {
        res.status(500).send("notes did not found")
    }
    console.log(updatenote)
    res.send(updatenote);


})

notesrouter.delete('/deletenote/:id', fetchuser , async (req , res)=>
{
    result = req.body
    let notesID = await note.findById(req.params.id)
    let cheak = notesID.userID.toString()
    console.log(cheak)
    if(notesID.userID.toString() !== req.user.id)
    {
        return res.status(401).send("not Allowed")
    }
    let dnote = await note.findByIdAndDelete(notesID)
    if(!dnote)
    {
        res.status(500).send("notes did not found")
    }
    console.log(dnote)
    res.send({ message: "deleted successfully", deletedNote: dnote });


})
module.exports = notesrouter