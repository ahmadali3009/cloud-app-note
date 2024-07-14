import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notecontext";
import Noteitem from "./Noteitem";
import { useNavigate } from "react-router-dom";

const Addnotes = () => {
    let context = useContext(noteContext);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false); // State to control modal visibility

    let { notes, setnotes, addnotes, allnotes, editnotes } = context;

    useEffect(() => {
        if (localStorage.getItem("token")) {
            allnotes();
        } else {
            navigate("/login", { state: { key: "value" } });
        }
    }, []);

    const [note, setnote] = useState({ title: "", description: "", tag: "default" });
    const [enote, setenote] = useState({ id: "", etitle: "", edescription: "", etag: "default" });

    const addnotehandler = async (e) => {
        e.preventDefault();
        await addnotes(note.title, note.description, note.tag);
        await allnotes();
    };

    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value });
    };

    const uonChange = (e) => {
        setenote({ ...enote, [e.target.name]: e.target.value });
    };

    const updatenote = (currentnote) => {
        console.log("currentnoteeeeee", currentnote)
        if(currentnote){
        setShowModal(true)
        console.log("ref" , ref.current.click())
        ref.current.click();

        setenote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag });
        }
        else{
            setShowModal(false)
        }
    };
    const closeModal = ()=>
        {
            setShowModal(false)
        }
    const ref = useRef(null);

    const updatenotehandler = (e) => {
        e.preventDefault();
        editnotes(enote.id, enote.etitle, enote.edescription, enote.etag);
        setShowModal(false)
    };

    return (
        <div className="container mx-auto p-6">
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
            {/* Modal Trigger Button */}
            <button
                type="button"
                className="hidden"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => setShowModal(true)}
            >
                Launch demo modal
            </button>

            {/* Modal Component */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-md">
                        <div className="px-4 py-3 border-b border-gray-200">
                            <h5 className="text-lg font-medium text-gray-800" id="exampleModalLabel">Edit Note</h5>
                            <button
                                type="button"
                                className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                                onClick={closeModal}
                            >
                                <span className="sr-only">Close</span>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="px-4 py-5">
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="etitle" className="block text-sm font-medium text-gray-700">Title</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        id="etitle"
                                        value={enote.etitle}
                                        name="etitle"
                                        onChange={uonChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="edescription" className="block text-sm font-medium text-gray-700">Description</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={enote.edescription}
                                        id="edescription"
                                        onChange={uonChange}
                                        name="edescription"
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="px-4 py-3 border-t border-gray-200 flex justify-end">
                            <button
                                type="button"
                                className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md"
                                onClick={updatenotehandler}
                            >
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>

            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg rounded-lg p-6 mb-6">
                <h2 className="text-3xl font-bold text-white mb-4">Add a Note</h2>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-white">Title</label>
                        <input
                            ref={ref}
                            type="text"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            id="title"
                            name="title"
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-white">Description</label>
                        <input
                            ref={ref}
                            type="text"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            id="description"
                            name="description"
                            onChange={onChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-white text-indigo-500 px-4 py-2 rounded-md font-semibold shadow-md hover:bg-gray-200"
                        onClick={addnotehandler}
                    >
                        Submit
                    </button>
                </form>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-3xl font-bold mb-4">Your Notes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {notes.length > 0 ? (
                        notes.map((note) => (
                            <Noteitem key={note._id} updatenote={updatenote} note={note} />
                        ))
                    ) : (
                        <p className="text-gray-500">No notes found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Addnotes;
