import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";

const config = {
  apiKey: "AIzaSyB98pj6AGMKJdLlz1cFgUcG-MjsyT0uiHU",
  authDomain: "learnova-ae5c4.firebaseapp.com",
  projectId: "learnova-ae5c4",
  storageBucket: "learnova-ae5c4.appspot.com",
  messagingSenderId: "373250468394",
  appId: "1:373250468394:web:de6fe7d94d688b49b33153",
  measurementId: "G-NY4BV2KEET",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(config);
} else {
  app = firebase.app();
}
export const auth = getAuth(firebaseApp);

// import firebase from "@react-native-firebase/app";
// import "@react-native-firebase/auth";
// import "@react-native-firebase/firestore";

// const RNfirebaseConfig = {
//   apiKey: "AIzaSyB98pj6AGMKJdLlz1cFgUcG-MjsyT0uiHU",
//     authDomain: "learnova-ae5c4.firebaseapp.com",
//     projectId: "learnova-ae5c4",
//     storageBucket: "learnova-ae5c4.appspot.com",
//     messagingSenderId: "373250468394",
//     appId: "1:373250468394:web:de6fe7d94d688b49b33153",
//     measurementId: "G-NY4BV2KEET",
// };

// let app;
// if (firebase.apps.length === 0) {
//   app = firebase.initializeApp(RNfirebaseConfig);
// } else {
//   app = firebase.app();
// }

// const db = firebase.firestore();
// const auth = firebase.auth();