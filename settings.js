import {
	getDatabase,
	ref,
	update,
	push,
	get,
	child,
	remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	signOut,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {giveEffect, removeEffect} from "./cards.js";

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
const addCardBtn = document.getElementById("addCard");
const container = document.getElementById("container");
const cardWidth = (window.innerWidth > 600?200:150);
const cardHeight = (cardWidth == 200 ? 150 : 100);
const effectsList = ["Angel Wings", "Halo", "Clock", "Music Notes", "Spotlight", "Sun", "MultiHearts", "Pumping Heart"];
const demoEffect = '<p class="effectText">Pumping Heart</p><svg class="w-6 h-6 text-gray-800 dark:text-white svg" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm5.757-1a1 1 0 1 0 0 2h8.486a1 1 0 1 0 0-2H7.757Z" clip-rule="evenodd"></path> </svg>'
const addEfInner = '  <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 20 20" height="20" fill="none" class="svg-icon"><g stroke-width="1.5" stroke-linecap="round" stroke="#de8a2a"><circle r="7.5" cy="10" cx="10"></circle><path d="m9.99998 7.5v5"></path><path d="m7.5 9.99998h5"></path></g></svg><span class="lable">Add</span>'
const trashInner = ' <svg xmlns="http://www.w3.org/2000/svg"fill="none"viewBox="0 0 39 7"class="bin-top"><line stroke-width="4" stroke="white" y2="5" x2="39" y1="5"></line><line stroke-width="3"stroke="white"y2="1.5"x2="26.0357"y1="1.5"x1="12"></line></svg><svg xmlns="http://www.w3.org/2000/svg"fill="none"viewBox="0 0 33 39"class="bin-bottom"><mask fill="white" id="path-1-inside-1_8_19"><path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path></mask><path mask="url(#path-1-inside-1_8_19)"fill="white"d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"></path><path stroke-width="4" stroke="white" d="M12 6L12 29"></path><path stroke-width="4" stroke="white" d="M21 6V29"></path></svg><svg xmlns="http://www.w3.org/2000/svg"fill="none"viewBox="0 0 89 80" class="garbage"><path fill="white" d="M20.5 10.5L37.5 15.5L42.5 11.5L51.5 12.5L68.75 0L72 11.5L79.5 12.5H88.5L87 22L68.75 31.5L75.5066 25L86 26L87 35.5L77.5 48L70.5 49.5L80 50L77.5 71.5L63.5 58.5L53.5 68.5L65.5 70.5L45.5 73L35.5 79.5L28 67L16 63L12 51.5L0 48L16 25L22.5 17L20.5 10.5Z"></path></svg>'

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

function updateDB(where, effects, message){		
	update(ref(database, where), {
		effects,
		message
	});
}

function pushToDB(effects, message){
	return push(ref(database, '/'), {
		effects, 
		message
	}).key;
}

function removeFromDB(where){
	remove(ref(database, where));
}

function createCard(styles, mensaje, id) {
	const selectEffect = document.createElement("select");

	const actDiv = document.createElement("div");
	const msj = document.createElement("h4");
	const card = document.createElement('div');
	actDiv.classList.add('cardDiv');
	actDiv.classList.add('hiding');
	card.classList.add('card');
	// card.textContent = mensaje;
	const texto = document.createElement("P");
	texto.textContent = mensaje;
	card.appendChild(texto);
	for(let efecto of styles){
		giveEffect(efecto, card, cardWidth, cardHeight);
	}
	if(!styles.length) giveEffect(0, card, cardWidth, cardHeight);
	msj.textContent=mensaje;
	msj.addEventListener("click", ()=>{
		// console.log(msj.textContent);
		if (actDiv.classList.contains('showing')) {
			actDiv.classList.remove('showing');
			actDiv.classList.add('hiding');
		} else if (actDiv.classList.contains('hiding')) {
			actDiv.classList.remove('hiding');
			actDiv.classList.add('showing');
		} else {
			actDiv.classList.add('showing');
		}
	});

	const msjDiv = document.createElement("div");
	const editMsg = document.createElement("p");
	const msgInput = document.createElement("input");
	editMsg.textContent="Mensaje:";
	msgInput.value = mensaje;
	msgInput.addEventListener("change", function(){
		texto.textContent=msgInput.value;
	});
	msjDiv.appendChild(editMsg);
	msjDiv.appendChild(msgInput);

	const effectsDiv = document.createElement("div");
	const effectsText = document.createElement("p");
	effectsDiv.classList="effectsDiv";
	effectsText.textContent="Efectos: ";
	effectsDiv.appendChild(effectsText);

	function addEffectBanner(efecto){
		const actEffect = document.createElement("button");
		actEffect.classList="Btn";
		actEffect.innerHTML=demoEffect;
		const actEffectText = actEffect.querySelector(".effectText");
		actEffectText.textContent=effectsList[efecto-1];
		actEffect.addEventListener("click", function(){
			const itemNum = effectsList.indexOf(actEffectText.textContent)+1;
			styles = styles.filter(item => item !== itemNum);
			removeEffect(card, itemNum);
			const opt = document.createElement("option");
			opt.value=itemNum;
			opt.textContent=effectsList[itemNum-1];
			selectEffect.appendChild(opt);
			effectsDiv.removeChild(actEffect);
		});
		effectsDiv.appendChild(actEffect);
	}

	for(let efecto of styles){
		addEffectBanner(efecto);
	}

	const newEffectDiv = document.createElement("div");
	const newEffectText = document.createElement("p");	
	const addEffBtn = document.createElement("button");
	addEffBtn.classList="button";
	addEffBtn.innerHTML=addEfInner;
	newEffectDiv.classList="effectsDiv";
	newEffectText.textContent="Nuevo efecto: ";
	newEffectDiv.appendChild(newEffectText);
	for(let i=0; i<effectsList.length; i++){
		if(styles.includes(i+1)) continue;
		const actOpt = document.createElement("option");
		actOpt.id=`n${i}`;
		actOpt.value=i+1;
		actOpt.textContent=effectsList[i];
		selectEffect.appendChild(actOpt);
	}
	addEffBtn.addEventListener("click", function(){
		if(selectEffect.options.length){			
		styles.push(parseInt(selectEffect.value));		
		// console.log(selectEffect.value);
		giveEffect(parseInt(selectEffect.value), card, cardWidth, cardHeight);
		addEffectBanner(parseInt(selectEffect.value));
		const selectedOption = selectEffect.options[selectEffect.selectedIndex];
		if (selectedOption) {
			// console.log("Opción eliminada:", selectedOption.value);
			selectedOption.remove(); // Eliminar la opción seleccionada
		}
		// console.log(selectEffect.value);
		}
	});
	newEffectDiv.appendChild(selectEffect);
	newEffectDiv.appendChild(addEffBtn);

	const actionBtns = document.createElement("div");
	actionBtns.classList="effectsDiv";
	const confirmBtn = document.createElement("button");
	confirmBtn.textContent="Confirmar";
	actionBtns.appendChild(confirmBtn);
	confirmBtn.addEventListener("click", function (){	
		if (actDiv.classList.contains('showing')) {
			actDiv.classList.remove('showing');
			actDiv.classList.add('hiding');
		} else if (actDiv.classList.contains('hiding')) {
			actDiv.classList.remove('hiding');
			actDiv.classList.add('showing');
		} else {
			actDiv.classList.add('showing');
		}
		msj.textContent = texto.textContent;	
		if(id == -1){
			id = pushToDB(styles, texto.textContent);
		}
		else{
			updateDB('/'+id, styles, texto.textContent);		
		}
	});

	const trashBtn = document.createElement("button");
	trashBtn.classList = "bin-button";
	trashBtn.innerHTML = trashInner;
	actionBtns.appendChild(trashBtn);
	trashBtn.addEventListener("click", function (){
		container.removeChild(msj);
		container.removeChild(actDiv);
		if(id != -1){
			removeFromDB(id);
		}
	});

	actDiv.appendChild(msjDiv);
	actDiv.appendChild(effectsDiv);
	actDiv.appendChild(newEffectDiv);
    actDiv.appendChild(card);
	actDiv.appendChild(actionBtns);
	container.insertBefore(msj, addCardBtn);
	container.insertBefore(actDiv, addCardBtn);	
}

async function main(user){
	if(user.uid !== "lpxjXmLNAibp7UGgRs2Pk4bN0kd2"){
		signOut(auth);
		window.location.href = "index.html";
	}
	addCardBtn.style.display="block";
	const allInfo = await getFromDB(`/`);
	const wallpaper = Object.values(allInfo);
	const keys = Object.keys(allInfo);
    const numCards=wallpaper.length;
    for (let i = 0; i < numCards; i++) {
        const efectos = Object.values(wallpaper.at(i).effects);
        const mensaje = wallpaper.at(i).message;
		createCard(efectos, mensaje, keys.at(i));
    }
}

logoutBtn.addEventListener("click", () => {
	signOut(auth);
	window.location.href = "index.html";
});

addCardBtn.addEventListener("click", function(){
	createCard([], "New Card", -1);
});

document.getElementById("signInBtn").addEventListener("click", async () => {
	await signInWithPopup(auth, provider)
	.then(async (result) => {
		// This gives you a Google Access Token. You can use it to access the Google API.
		const credential = GoogleAuthProvider.credentialFromResult(result);
		const token = credential.accessToken;
		// The signed-in user info.
		const user = result.user;
		main(user);
		document.getElementById("signInBtn").style.display="none";
		// IdP data available using getAdditionalUserInfo(result)
		// ...
	})
	.catch((error) => {
		// Handle Errors here.
		const errorCode = error.code;
		const errorMessage = error.message;
		alert(errorMessage);
	});

});

document.getElementById("backBtn").addEventListener("click", () => {
	window.location.href = "index.html";
});


// window.onload = function()	{
// 	document.getElementById("signInBtn").style.display="none";
// 	main(1);
// }