import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  appId: process.env.REACT_APP_appId,
};

firebase.initializeApp(firebaseConfig);

const listenRedirect = async () => {
  try {
    return await firebase.auth().getRedirectResult();
  } catch (err) {
    console.error(err);
  }
};

const googleLogin = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
};

export default {
  googleLogin,
  listenRedirect,
};
