import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import firebase from 'firebase/app';
import 'firebase/firestore';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function TodoListEntryDialog(props) {
    const classes = useStyles();

    const saveNote = () => {
        var noteTitle = document.getElementById("note-title");
        var noteContent = document.getElementById("note-content");

        if (noteContent.value === "") {
            alert("Note content should not be empty");
        } else {
            firebase.firestore().collection("todos-list").add({
                title: noteTitle.value === "" ? "Untitled" : noteTitle.value,
                content: noteContent.value,
                email: props.loggedInUserInfo.email
            }).then(data => {
                alert("Note has been saved successfully");
                noteTitle.value = "";
                noteContent.value = "";
            }).catch(error => {
                console.log(error);
            })
        }
    }

    const noteTitleStyle = {
        margin: "20px",
        width: "90vw"
    }

    const noteContentStyle = {
        margin: "20px",
        width: "90vw",
        height: "70vh"
    }

    return (
        <div>
            <Button variant="outlined" color="primary">
                Open full-screen dialog
      </Button>

            <Dialog fullScreen open={props.entryDialogVisibility} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={() => props.openCloseEntryDialogFunction(false)} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Add notes
            </Typography>
                        <Button autoFocus color="inherit" onClick={saveNote}>
                            save
            </Button>
                    </Toolbar>
                </AppBar>
                <List>
                    <TextField
                        label="Notes title"
                        id="note-title"
                        variant="outlined"

                        style={noteTitleStyle}
                    />
                    <Divider />
                    <TextareaAutosize
                        id="note-content"
                        aria-label="maximum height"
                        placeholder="Write your note here"
                        style={noteContentStyle}
                    />
                </List>
            </Dialog>
        </div>
    );
}
