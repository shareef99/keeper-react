import { MdDelete } from "react-icons/md";
import Zoom from "@material-ui/core/Zoom";
import { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import UpdateNote from "./UpdateNote";
import { OptionalNote } from "../../lib/interface";
import { useCallback } from "react";
import { useNote } from "../../context/NoteContext";

interface Props {
    id: string;
    index: number;
    title: string;
    content: string;
    labels: Array<string>;
}

const Note = (props: Props) => {
    const { id, index, title, content, labels } = props;

    // Context
    const { deleteNote, updateNote } = useNote();

    // States
    const [selectedNote, setSelectedNote] = useState<string>("none");
    const [note, setNote] = useState<OptionalNote | null>(null);

    // Handlers
    const handleClose = async () => {
        setSelectedNote("none");
        if (note) {
            await updateNote(note, id);
        }
    };

    // Using callback because vs-code suggested in comments of useEffect, and useEffect was rending
    // too many times
    const handleSetNote = useCallback((note: OptionalNote) => {
        setNote(note);
    }, []);

    return (
        <>
            <Zoom in={true} style={{ transitionDelay: `${300 * index}ms` }}>
                <li
                    className={`p-3 w-60 m-4 rounded-lg bg-gray-300 shadow-lg 
                `}
                    aria-label={id}
                    onClick={() => setSelectedNote(id)}
                >
                    <h1 className="mb-4 text-xl font-medium">{title}</h1>
                    <p
                        className="mb-3 whitespace-pre-wrap text-lg"
                        style={{ wordWrap: "break-word" }}
                    >
                        {content}
                    </p>
                    <button
                        onClick={() => deleteNote(id)}
                        className="relative float-right cursor-pointer hover:text-red-400"
                        title="Delete note"
                    >
                        <MdDelete size="1.75rem" color="#555" />
                    </button>
                </li>
            </Zoom>
            <Dialog
                onClose={handleClose}
                open={id === selectedNote}
                className=""
            >
                <UpdateNote
                    id={id}
                    title={title}
                    content={content}
                    onSetNote={handleSetNote}
                    onClose={handleClose}
                    labels={labels}
                />
            </Dialog>
        </>
    );
};

export default Note;
