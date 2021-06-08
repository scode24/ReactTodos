import React from 'react';
import { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';


import { UserInfoDialog } from "../components/UserInfoDialog";

import firebase from 'firebase/app';
import 'firebase/firestore';


const useStyles = makeStyles((theme) => ({
    text: {
        padding: theme.spacing(2, 2, 0),
    },
    paper: {
        paddingBottom: 50,
    },
    list: {
        marginBottom: theme.spacing(2),
    },
    subheader: {
        backgroundColor: theme.palette.background.paper,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
    },
    grow: {
        flexGrow: 1,
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
}));

export default function TodoList(props) {

    const [notes, setNotes] = useState([]);

    const [deleteList, setDeleteList] = useState([])

    useEffect(() => {
        fetchData();
    })

    const fetchData = () => {
        firebase.firestore().collection("todos-list").where("email", "==", props.loggedInUserInfo.email).get().then(snap => {

            let list = [];
            snap.forEach(doc => {
                list.push({
                    id: doc.id,
                    title: doc.data().title,
                    content: doc.data().content
                })
            })

            setNotes(list);
        })
    }

    const addToDeleteList = (id) => {
        if (deleteList.indexOf(id) >= 0) {
            deleteList.splice(deleteList.indexOf(id), 1);
        } else {
            deleteList.push(id);
        }
        console.log(deleteList);
    }

    const deleteData = () => {
        let batch = firebase.firestore().batch();
        console.log(deleteList);
        firebase.firestore().collection("todos-list").where("email", "==", props.loggedInUserInfo.email).get().then(snap => {
            snap.forEach(doc => {
                if (deleteList.indexOf(doc.id) >= 0) {
                    batch.delete(doc.ref);
                }
            })

            batch.commit();
            setDeleteList([]);
        })

    }

    const classes = useStyles();

    const [openCloseUserInfoDialogStatus, setOpenCloseUserInfoDialogStatus] = useState(false);

    const topHeaderStyle = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    }

    const rowStyle = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    }

    const openUserInfoDialog = (status) => {
        setOpenCloseUserInfoDialogStatus(status);
    }

    return (
        <React.Fragment>
            <CssBaseline />

            <UserInfoDialog openCloseUserInfoDialogStatus={openCloseUserInfoDialogStatus} loggedInUserInfo={props.loggedInUserInfo}
                openUserInfoDialogFunction={openUserInfoDialog} signOutFunction={props.signOutFunction} />

            <Paper square className={classes.paper}>
                <Typography className={classes.text} variant="h5" gutterBottom>
                    <div style={topHeaderStyle}>
                        {props.appName}
                        <Avatar alt={props.loggedInUserInfo.displayName} src={props.loggedInUserInfo.photoURL}
                            onClick={() => openUserInfoDialog(true)} />
                    </div>
                </Typography>
                <List className={classes.list}>
                    {notes.map(data => {
                        return (
                            <React.Fragment key={data.id}>
                                <div style={rowStyle}>
                                    <ListItem button>
                                        <ListItemAvatar>
                                            <Avatar alt={data.title} src={data.title} />
                                        </ListItemAvatar>
                                        <ListItemText primary={data.title} secondary={data.content} />
                                    </ListItem>
                                    <Checkbox onClick={() => addToDeleteList(data.id)}></Checkbox>
                                </div>
                            </React.Fragment>
                        )
                    })}
                </List>
            </Paper>
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <Toolbar>
                    <Fab color="secondary" aria-label="add" className={classes.fabButton} onClick={() => props.openCloseEntryDialogFunction(true)}>
                        <AddIcon />
                    </Fab>
                    <div className={classes.grow} />
                    <IconButton edge="end" color="inherit">
                        <DeleteIcon onClick={deleteData} />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}
