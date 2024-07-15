import React, { useState } from "react";
import NoteContext from "./notecontext";
import { json } from "react-router-dom";
let NoteState = (props)=>
{const host = "https://cloud-notes-glns.onrender.com";
const initialnotes = [];
let [notes , setnotes] = useState(initialnotes)

const allnotes = async (url = `${host}/getnotes`) => {
    try {
        // Default options are marked with *
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            },
        });
        const json = await response.json();
        setnotes(json)
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
   const addnotes =async ( title , description , tag)=>{
        const response = await fetch(`${host}/create`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({title , description , tag}), // body data type must match "Content-Type" header
        });
        const json = await response.json();    
   
   }
   const editnotes = async (id , title , description , tag) => {
    try {
        const response = await fetch(`${host}/updatenote/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({title , description , tag}), // body data type must match "Content-Type" header

        });
        const updatedNote = await response.json();

        // Update the corresponding note in the client-side state (e.g., notes array)
        const updatedNotes = notes.map((note) => {
            if (note._id === id) {
                // Update the properties of the edited note
                return { ...note, title: updatedNote.title, description: updatedNote.description, tag: updatedNote.tag };
            }
            return note; // Return other notes unchanged
        });

        // Update the state with the updated notes
        setnotes(updatedNotes);

    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

    const deleteNotes =async (id)=>{
        try {
            const response = await fetch(`${host}/deletenote/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
            });
            const json = await response.json();
            // Update UI or perform other actions as needed
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    return(
        <NoteContext.Provider value={{notes , setnotes , addnotes , deleteNotes , allnotes , editnotes}}>
            {props.children }
        </NoteContext.Provider>
    )
}

export default NoteState;