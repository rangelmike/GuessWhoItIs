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
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY.replace(/"/g, ''),
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN.replace(/"/g, ''),
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID.replace(/"/g, ''),
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET.replace(/"/g, ''),
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID.replace(/"/g, ''),
    appId: import.meta.env.VITE_FIREBASE_APP_ID.replace(/"/g, ''),
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL.replace(/"/g, '')
  };

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider(app);
const auth = getAuth(app);
const database = getDatabase(app);

const signinBtn = document.getElementById("signinBtn");

function getFromDB(where) {
	const dbRef = ref(getDatabase());
	return get(child(dbRef, where))
		.then((snapshot) => {
			if (snapshot.exists()) {
				const regresa = snapshot.val();
				return regresa;
			} else {
				console.log("No data available");
				return 0;
			}
		})
		.catch((error) => {
			console.error(error);
			return 0;
		});
}

signinBtn.addEventListener("click", async (e) => {
	await signInWithPopup(auth, provider)
		.then(async (result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;
			// The signed-in user info.
			const user = result.user;
			// IdP data available using getAdditionalUserInfo(result)
			// ...            			
		})
		.catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			alert(errorMessage);
		});
	window.location.href = "/main.html";
});
/*
npm run build

 git add . && git commit -m "." && git push
*/