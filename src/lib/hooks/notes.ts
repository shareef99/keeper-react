import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { getNotesRef, getUserRef } from "../helpers/notes";
import { NoteType } from "../interface";

export const useFetchNotes = () => {
    const [notes, setNotes] = useState<Array<NoteType>>([]);
    const { user } = useAuth();

    useEffect(() => {
        getNotesRef(user?.uid!).onSnapshot((snap) =>
            setNotes(
                snap.docs.map((doc) => ({
                    id: doc.data().id,
                    title: doc.data().title,
                    content: doc.data().content,
                    createdAt: doc.data().createdAt,
                    lastEditedAt: doc.data().lastEditedAt || "Original",
                    labels: doc.data().labels,
                }))
            )
        );
    }, [user?.uid]);

    return notes;
};

export const useFetchLabels = () => {
    const [labels, setLabels] = useState<Array<string>>([]);
    const { user } = useAuth();

    useEffect(() => {
        getUserRef(user?.uid!).onSnapshot((snap) =>
            setLabels(snap.data()?.labels || [])
        );
    }, [user?.uid]);

    return labels;
};
