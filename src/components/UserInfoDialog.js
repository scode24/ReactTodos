import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

export function UserInfoDialog(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const dialogCustomContainerStyle = {
        display: "flex",
        flexDirection: "row"
    }

    const userPhotoStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        padding: "10px"
    }

    const userInfoContainerStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%"
    }

    const userPhotoDimension = {
        height: "50px",
        width: "50px"
    }

    return (
        <Dialog
            fullScreen={fullScreen}
            open={props.openCloseUserInfoDialogStatus}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">{"User information"}</DialogTitle>
            <DialogContent>
                <div style={dialogCustomContainerStyle}>
                    <div style={userPhotoStyle}>
                        <Avatar alt={props.loggedInUserInfo.displayName} src={props.loggedInUserInfo.photoURL}
                            style={userPhotoDimension} />

                    </div>
                    <div style={userInfoContainerStyle}>
                        <ul>
                            <li>{props.loggedInUserInfo.displayName}</li>
                            <li>{props.loggedInUserInfo.email}</li>
                        </ul>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button autoFocus color="primary" onClick={props.signOutFunction}>
                    Sign Out
          </Button>
                <Button color="primary" autoFocus onClick={() => props.openUserInfoDialogFunction(false)}>
                    Close
          </Button>
            </DialogActions>
        </Dialog>

    );
}
