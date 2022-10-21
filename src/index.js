import  React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";




const firebaseConfig = {
  apiKey: "AIzaSyBsEgsh-YrVMsZp0w7ZsKyAKkjzfz1PGb0",
  authDomain: "react-u-prop.firebaseapp.com",
  projectId: "react-u-prop",
  storageBucket: "react-u-prop.appspot.com",
  messagingSenderId: "852702847029",
  appId: "1:852702847029:web:ed70a99f5fb6a13e4d917c",
  measurementId: "G-QSZSLDKT6K"
};
initializeApp(firebaseConfig); 



const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(

 
       <App />
    
      
 
 
    

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
