import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Note as NoteModel } from '../models/note';
import * as NotesApi from '../network/notes_api';
import styleUtils from '../styles/utils.module.css';
import btnStyle from '../styles/btnStyle.module.css'
import AddEditNoteDialog from "./AddEditNoteDialog";
import styles from '../styles/notesPage.module.css';
import api from '../api/api';
import Note from "./Note";
import stylesText from '../styles/logoutview.module.css'



const NotesPageLoggedInView = () => {
    const [notes, setNotes] = useState<NoteModel[]>([]);

    const [showAddNoteDialog, setShowAddNoteDialog] = useState(false)
    const [notesLoading, setNoteLoading] = useState(false)
    const [showNotesLoadingError, setShowNotesLoadingError] = useState(false)
    const [noteTOEdit, setNoteToEdit] = useState<NoteModel | null>(null)

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                setShowNotesLoadingError(false)
                setNoteLoading(true)
                const response = await api.get('api/notes');
                setNotes(response.data)
              
            } catch (error) {
                console.error(error)
                setShowNotesLoadingError(true)
            } finally {
                setNoteLoading(false)
            }

        }
        fetchNotes()
    }, [])

    async function deleteNote(note: NoteModel) {
        try {
            await NotesApi.deleteNote(note._id)
            setNotes(notes.filter(existingNote => existingNote._id !== note._id))
        } catch (error) {
            console.error(error)
        }
    }

    const notesGrid =
        <Row xs={1} md={2} xl={3} className={`g-4 ${styles.notesGrid}`}>
            {notes.map(note => (
                <Col key={note._id}>
                    <Note note={note}
                        className={styles.note}
                        onNoteClicked={setNoteToEdit}
                        onDeleteNoteClicked={deleteNote}
                    >
                    </Note>
                </Col>
            ))}
        </Row>
    return (
        <>
            <Button className={`mb-4 ${styleUtils.blockCenter} ${btnStyle.btnStyle} ${styleUtils.flexCenter}`} onClick={() => setShowAddNoteDialog(true)}>
                <FaPlus />
                add new note
            </Button>
            {notesLoading && <Spinner animation='border' variant='primary' />}
            {showNotesLoadingError && <p>something went wrong. please reload the page</p>}
            {!notesLoading && !showNotesLoadingError && (
                <>
                    {notes.length > 0
                        ? notesGrid
                        : <p className={stylesText.style}>you dont have any <span className={stylesText.fancy}>NOTES</span></p>
                    }
                </>
            )}

            {showAddNoteDialog &&
                <AddEditNoteDialog
                    onDismiss={() => setShowAddNoteDialog(false)}
                    onNotesSaved={(newNote) => {
                        setNotes([...notes, newNote])
                        setShowAddNoteDialog(false)
                    }}
                />
            }
            {noteTOEdit &&
                <AddEditNoteDialog
                    noteTOEdit={noteTOEdit}
                    onDismiss={() => setNoteToEdit(null)}
                    onNotesSaved={(updatedNote) => {
                        setNotes(notes.map(existingNote => existingNote._id === updatedNote._id ? updatedNote : existingNote))
                        setNoteToEdit(null)
                    }} />
            }
        </>
    )
}

export default NotesPageLoggedInView
