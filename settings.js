import {
	getDatabase,
	ref,
	onValue,
	get,
	child,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	signOut,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAc1-FWefRK9gNkaprncldWqK2jztLV43A",
    authDomain: "guesswhoitis-905ed.firebaseapp.com",
    databaseURL: "https://guesswhoitis-905ed-default-rtdb.firebaseio.com",
    projectId: "guesswhoitis-905ed",
    storageBucket: "guesswhoitis-905ed.firebasestorage.app",
    messagingSenderId: "72462712048",
    appId: "1:72462712048:web:a1ed1f84eb16b686b95635"
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider(app);
const auth = getAuth(app);
const database = getDatabase(app);
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {
	signOut(auth);
	window.location.href = "index.html";
});

document.getElementById("backBtn").addEventListener("click", () => {	
	window.location.href = "wallpaper.html";
});