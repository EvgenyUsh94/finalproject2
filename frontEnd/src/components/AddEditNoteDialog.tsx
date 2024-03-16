import { Modal, Form, Button } from "react-bootstrap"
import { useForm } from "react-hook-form";
import { NoteInput } from "../network/notes_api";
import * as NotesApi from "../network/notes_api"
import { Note } from "../models/note";
import TextInputField from "./form/TextInputField";
import style from "../styles/editNote.module.css"
interface AddEditNoteDialogProps {
    noteTOEdit?: Note
    onDismiss: () => void,
    onNotesSaved: (note: Note) => void,

}
const AddEditNoteDialog = ({ noteTOEdit, onDismiss, onNotesSaved }: AddEditNoteDialogProps) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NoteInput>({
        defaultValues: {
            title: noteTOEdit?.title || "",
            text: noteTOEdit?.text || "",
        }
    })

    async function onSubmit(input: NoteInput) {
        try {
            let noteResponse: Note;
            if (noteTOEdit) {
                noteResponse = await NotesApi.updateNote(noteTOEdit._id, input)
            } else {
                noteResponse = await NotesApi.createNote(input)
            }
            onNotesSaved(noteResponse);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Modal show onHide={onDismiss}  >
            <Modal.Header closeButton className={style.Bground}>
                <Modal.Title >
                    {noteTOEdit ? "edit note" : "add note"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className={style.Bground}>
                <Form id="addEditNoteForm"  onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        name="title"
                        label="Title"
                        type="text"
                        placeholder="Title"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.title}
                    />

                    <TextInputField
                        name="text"
                        label="Text"
                        as="textarea"
                        rows={5}
                        placeholder="Text"
                        register={register}
                    />

                </Form>
            </Modal.Body>
            <Modal.Footer className={style.Bground}>
                <Button type="submit" form="addEditNoteForm" disabled={isSubmitting}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddEditNoteDialog;