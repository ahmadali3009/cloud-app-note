import React , {useContext} from 'react'
import noteContext from "../context/notecontext"

const Noteitem = (props) => {
    const { note , updatenote } = props
    let context = useContext(noteContext)
    let {deleteNotes , editnotes , allnotes} = context

    return (

        <div className="container col-span-3">
            <div className="bg-white shadow-md rounded-lg my-3">
                <div className="p-4">
                    <h5 className="text-xl font-semibold mb-2">{note.title}</h5>
                    <p className="text-gray-600 mb-4">{note.description}</p>
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md mr-2"
                        onClick={async () => {
                            await deleteNotes(note._id);
                            await allnotes();
                        }}
                    >
                        Delete
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                        onClick={() => updatenote(note)}
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>

    )
}

export default Noteitem
