import './App.css';
import TodoList from './components/TodosList'
import { TodoListEntryDialog } from "./components/TodoListEntryDialog";
import { useState } from "react";
import Button from '@material-ui/core/Button';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import firebase from "firebase/app";
import "firebase/auth";

function App() {

  const appName = "Todos"

  //Your web app's Firebase configuration
  //For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDcVq5VWm5ZDwsrMzS9Fd0H1M-wEkM7JDY",
    authDomain: "todos-adedb.firebaseapp.com",
    projectId: "todos-adedb",
    storageBucket: "todos-adedb.appspot.com",
    messagingSenderId: "654397219398",
    appId: "1:654397219398:web:7ec39fbe5022e09f39a047",
    measurementId: "G-LHBJRL0LBE"
  };
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const provider = new firebase.auth.GoogleAuthProvider();

  function googleSignInPopup(provider) {
    // [START auth_google_signin_popup]
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        // var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        setLoggedInUserInfo(user);
        setIsAuthenticated(true);
        // ...
      }).catch((error) => {
        // Handle Errors here.
        // var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        // var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        // ...
        alert(errorMessage);
      });
    // [END auth_google_signin_popup]
  }

  const signOut = () => {
    firebase.auth().signOut()
      .then((result) => {
        setIsAuthenticated(false);
        alert("Logged out successfully");
      }).catch((error) => {
        alert(error.message);
      })
  }

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const loginPageStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
  }

  const loginPageContentStyle = {
    display: "flex",
    flexDirection: "row",
  }

  const loginPageContentStyleSm = {
    display: "flex",
    flexDirection: "column"
  }

  const loginPageTitleStyle = {
    display: "flex",
    flexDirection: "column",
    flex: "2",
    borderRight: "1px Solid black",
    padding: "20px"
  }

  const loginPageTitleStyleSm = {
    display: "flex",
    flexDirection: "column",
    flex: "2",
    borderRight: "1px Solid black",
    padding: "20px",
    textAlign: "center"
  }

  const loginPageOptionsStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flex: "1",
    margin: "20px"
  }

  const loginPageOptionsStyleSm = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flex: "1",
    margin: "20px"
  }

  const titleStyle = {
    fontSize: "10vw"
  }

  const loginButtonStyle = {
    width: "fit-content"
  }

  const [entryDialogStatus, setEntryDialogStatus] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInUserInfo, setLoggedInUserInfo] = useState(null);

  const openCloseEntryDialog = (status) => {
    setEntryDialogStatus(status);
  }

  return (
    <div>

      {!isAuthenticated ?

        matches ?
          <div style={loginPageStyle}>
            <div style={loginPageContentStyle}>
              <div style={loginPageTitleStyle}>
                <span style={titleStyle}>{appName}</span>
                <span>Todos is note taking application. All the notes will be saved in google server. In order to save notes in your google account space, you need to login to the system</span>
              </div>
              <div style={loginPageOptionsStyle}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<VpnKeyIcon />}
                  style={loginButtonStyle}
                  onClick={() => googleSignInPopup(provider)}
                >
                  Login with Google
              </Button>
              </div>
            </div>
          </div>
          :
          <div style={loginPageStyle}>
            <div style={loginPageContentStyleSm}>
              <div style={loginPageTitleStyleSm}>
                <span style={titleStyle}>{appName}</span>
                <span>Todos is note taking application. All the notes will be saved in google server. In order to save notes in your google account space, you need to login to the system</span>
              </div>
              <div style={loginPageOptionsStyleSm}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<VpnKeyIcon />}
                  style={loginButtonStyle}
                  onClick={() => googleSignInPopup(provider)}
                >
                  Login with Google
              </Button>
              </div>
            </div>
          </div>
        :


        <>
          <TodoList appName={appName}
            loggedInUserInfo={loggedInUserInfo}
            signOutFunction={signOut}
            openCloseEntryDialogFunction={openCloseEntryDialog} />

          <TodoListEntryDialog
            loggedInUserInfo={loggedInUserInfo}
            entryDialogVisibility={entryDialogStatus}
            openCloseEntryDialogFunction={openCloseEntryDialog} />

        </>

      }

    </div >
  );
}

export default App;
