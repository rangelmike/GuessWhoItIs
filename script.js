import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
	getDatabase,
	ref,
	get,
	child,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	signOut,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {giveEffect} from "./cards.js";

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
const database = getDatabase(app);
const provider = new GoogleAuthProvider(app);
const auth = getAuth(app);

const container = document.getElementById('container');
const cardWidth = (window.innerWidth > 600?200:150);
const onPhone = (cardWidth == 150);
const cardHeight = (!onPhone ? 150 : 125);
const audio = document.getElementById("backgroundMusic");
const toggleHoverBtn = document.getElementById("toggleHover");
const occupied = Array.from({ length: window.innerHeight }, () => Array(window.innerWidth).fill(false));

const settingsBtn = document.getElementById("settingsBtn");
const loader = document.getElementById("loader");

const songs = ["https://shorturl.at/j0LqN", "https://shorturl.at/VBilJ", "https://shorturl.at/qIdRM", "https://shorturl.at/y9yVX"];

settingsBtn.addEventListener("click", async (e) => {
	window.location.href = "/settings.html";
});

toggleHoverBtn.addEventListener("mousedown", function (){
    if(onPhone) return;
    const cards = document.querySelectorAll(".card");
    const img = document.querySelectorAll(".img");
    for(let actCard of cards){
        actCard.classList.add("force-hover");
    }
    for(let actImg of img){
        actImg.classList.add("force-hover");
    }

});

toggleHoverBtn.addEventListener("mouseup", function (){
    if(onPhone) return;
    const cards = document.querySelectorAll(".card");
    const img = document.querySelectorAll(".img");
    for(let actCard of cards){
        actCard.classList.remove("force-hover");
    }
    for(let actImg of img){
        actImg.classList.remove("force-hover");
    }
});
toggleHoverBtn.addEventListener("mouseleave", function (){
    if(onPhone) return;
    const cards = document.querySelectorAll(".card");
    const img = document.querySelectorAll(".img");
    for(let actCard of cards){
        actCard.classList.remove("force-hover");
    }
    for(let actImg of img){
        actImg.classList.remove("force-hover");
    }
});

let phoneToggleHover = false;
toggleHoverBtn.addEventListener("click", function(){
    if(!onPhone) return;
    if(!phoneToggleHover){
        const cards = document.querySelectorAll(".card");
        const img = document.querySelectorAll(".img");
        for(let actCard of cards){
            actCard.classList.add("force-hover");
        }
        for(let actImg of img){
            actImg.classList.add("force-hover");
        }
    } 
    else{
        const cards = document.querySelectorAll(".card");
        const img = document.querySelectorAll(".img");
        for(let actCard of cards){
            actCard.classList.remove("force-hover");
        }
        for(let actImg of img){
            actImg.classList.remove("force-hover");
        }
    }
    phoneToggleHover=!phoneToggleHover;
});

// logoutBtn.addEventListener("click", () => {
// 	signOut(auth);
// 	window.location.href = "index.html";
// });

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function placeRectangle({x, y}, n, m){
    for (let i = y-10; i < y + m+11; i+=10) {
        for (let j = x-10; j < x + n+11; j+=10) {
            if (i < window.innerHeight && j < window.innerWidth && i>=0 && j>=0) {
                occupied[i][j] = true;
                // console.log(i,j);
            }
        }
    }
}

function findAllAvailablePositions(n, m, gridWidth, gridHeight) {
    const validPositions = [];

    for (let i = 60; i <= gridHeight - m-30; i+=10) {
        for (let j = 30; j <= gridWidth - n-30; j+=10) {
            let canPlace = true;
            for (let x = i; x < i + m; x+=10) {
                for (let y = j; y < j + n; y+=10) {
                    if (occupied[x][y]) {
                        canPlace = false;
                        break;
                    }
                }
                if (!canPlace) break;
            }
            if (canPlace) {
                validPositions.push({ x: j, y: i });
            }
        }
    }

    return validPositions;
}

function createCard(styles, mensaje) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = mensaje;
    for(let efecto of styles){
        giveEffect(efecto, card, cardWidth, cardHeight);
    }
    let cont = 0;
    const act=[] = findAllAvailablePositions(cardWidth, cardHeight, window.innerWidth, window.innerHeight);
    const pos = act[getRandomInt(0, act.length)];
    if(pos == null) return;
    // Save position to check against future cards
    placeRectangle(pos, cardWidth, cardHeight);
    // Position and add card to container
    card.style.left = `${pos.x}px`;
    card.style.top = `${pos.y}px`;
    container.appendChild(card);
}

function selectCards(n, m, exclude) {
    if (n > m) {
        throw new Error("No se pueden generar n números únicos entre 0 y m-1 si n > m");
    }
    const numeros = Array.from({ length: m }, (_, i) => i);

    for (let i = numeros.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numeros[i], numeros[j]] = [numeros[j], numeros[i]];
    }    
    const nums = [];
    let pos=0;
    while (nums.length < n) {
        if(numeros[pos] != exclude){
            nums.push(numeros[pos]);
        }
        pos++;
    }

    return nums;
}

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

window.onload = async function () {
    if(onPhone) {
        document.getElementById("backgroundMusic").style.width="100px";
        document.getElementById("toggleHover").style.right="-30px";
        document.getElementById("headerText").style.width="70%";
        document.getElementById("headerText").style.position="absolute";
        document.getElementById("headerText").style.left="22%";
    }
    placeRectangle({x: audio.getBoundingClientRect().top-audio.getBoundingClientRect().top%10,y: audio.getBoundingClientRect().left-audio.getBoundingClientRect().left%10}, audio.offsetHeight, audio.offsetWidth);
    loader.style.display="block";
    const actSong = songs[getRandomInt(0, songs.length-1)];
    audio.src=actSong;
    const wallpaper = Object.values(await getFromDB(`/`));
    let maxIdx=0;
    for(let c=1; c < wallpaper.length; c++){
        if(wallpaper.at(c).timestamp > wallpaper.at(maxIdx).timestamp){
            maxIdx=c;
        }
    }
    const numCards=Math.min(6,wallpaper.length);
    // console.log("died at elegidos fs");
    const elegidos = selectCards(numCards, wallpaper.length, maxIdx);
    // console.log(Object.values(wallpaper.at(maxIdx).effects), wallpaper.at(maxIdx).message);
    createCard(Object.values(wallpaper.at(maxIdx).effects), wallpaper.at(maxIdx).message);
    for (let i = 0; i < numCards; i++) {
        const efectos = Object.values(wallpaper.at(elegidos[i]).effects);
        const mensaje = wallpaper.at(elegidos[i]).message;
        createCard(efectos, mensaje);
    }
    loader.style.display="none";
}
