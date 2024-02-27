import { initializeApp } from "firebase/app";

import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBsEgsh-YrVMsZp0w7ZsKyAKkjzfz1PGb0",
    authDomain: "react-u-prop.firebaseapp.com",
    projectId: "react-u-prop",
    storageBucket: "react-u-prop.appspot.com",
    messagingSenderId: "852702847029",
    appId: "1:852702847029:web:ed70a99f5fb6a13e4d917c",
    measurementId: "G-QSZSLDKT6K"
  };
  
const initializeFirebase =()=>{
  const app = initializeApp(firebaseConfig)
  return app
}

  
  export default initializeFirebase