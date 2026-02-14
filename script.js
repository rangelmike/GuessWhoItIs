import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
	getDatabase,
	ref,
	get,
	child,
    push,
    remove
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	signOut,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {giveEffect, haloCard} from "./cards.js";

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
const refreshBtn = document.getElementById("refreshBtn");
const occupied = Array.from({ length: window.innerHeight }, () => Array(window.innerWidth).fill(false));

const settingsBtn = document.getElementById("settingsBtn");
const loader = document.getElementById("loader");

const songs = ["https://archive.org/download/ProjectTQM-NewMusic/girl%20in%20red%20-%20we%20fell%20in%20love%20in%20october.mp3", "https://archive.org/download/te-amo-y-mas/Te%20Amo%20y%20M%C3%A1s.mp3", "https://archive.org/download/ProjectTQM-NewMusic/Nasa%20Histoires%20-%20Bugambilia%20%28lyric%20video%20oficial%29.mp3 Bugambilia", "https://archive.org/download/ProjectTQM-NewMusic/Tomando%20t%C3%A9%20%28cover%29%20%20Kumangy.mp3", "https://archive.org/download/ProjectTQM-NewMusic/JVKE%20-%20her%20%28official%20lyric%20video%29.mp3", "https://archive.org/download/ProjectTQM-NewMusic/Cody%20Fry%20-%20I%20Hear%20a%20Symphony%20%5BSub%20Espa%C3%B1olEnglish%5D.mp3", "https://archive.org/download/ProjectTQM-NewMusic/Elefante%20-%20%C3%81ngel%20%28LetraLyrics%29.mp3", "https://archive.org/download/ProjectTQM-NewMusic/Jake%20Daniels%20-%20Novia%20%28Lyrics%29.mp3", "https://archive.org/download/ProjectTQM-NewMusic/Bruno%20Major%20-%20Nothing%20%28Lyric%20%26%20Chord%20Video%29.mp3", "https://archive.org/download/ProjectTQM-NewMusic/Hoy%20Me%20Levante.mp3", "https://archive.org/download/te-amo-y-mas/Te%20Amo%20y%20M%C3%A1s.mp3", "https://archive.org/download/samanez-tus-ojitos-video-oficial-1/Samanez%20-%20Tus%20Ojitos%20%28Video%20Oficial%29%20%281%29.mp3"];

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

refreshBtn.addEventListener("click", function(){
    loadWallpaper();
})

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

function clearAvailable(){
    for (let i = 0; i < occupied.length; i++) {
        for (let j = 0; j < occupied[i].length; j++) {
            occupied[i][j] = false;
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

function createCard(styles, mensaje, first) {
    const card = document.createElement('div');
    card.classList.add('card');
    if(first) card.classList.add('glow');
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

function formatTimestamp(epochTimestamp) {
    // Convert the epoch timestamp to a Date object
    const date = new Date(epochTimestamp);

    // Format the date as a string (e.g., "YYYY-MM-DD HH:mm:ss")
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} `;
}

async function manageVisits(){  
    const timestamp = Date.now();
    await push(ref(database, "visits"),{
        [timestamp]:formatTimestamp(timestamp)
    })
    const lastVisits = Object.keys(await getFromDB('visits'));
    const extras = lastVisits.length-10;
    if(extras <= 0) return;
    for(let c=0; c < extras; c++)
        remove(ref(database, `/visits/${lastVisits[c]}`));
}

async function loadWallpaper() {
    const notCards = Array.from(container.children).filter(
        child => !child.classList.contains("card")
    );
    container.replaceChildren(...notCards);
    clearAvailable();

    if(onPhone) {
        document.getElementById("backgroundMusic").style.width="100px";
        document.getElementById("toggleHover").style.right="-30px";
        document.getElementById("headerText").style.width="70%";
        document.getElementById("headerText").style.position="absolute";
        document.getElementById("headerText").style.left="22%";
    }
    placeRectangle({x: audio.getBoundingClientRect().top-audio.getBoundingClientRect().top%10,y: audio.getBoundingClientRect().left-audio.getBoundingClientRect().left%10}, audio.offsetHeight, audio.offsetWidth);
    loader.style.display="block";    
    const allInfo = await getFromDB('/');
    manageVisits();
    const wallpaper = Object.values(allInfo.wallpaper);
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
    createCard(Object.values(wallpaper.at(maxIdx).effects), wallpaper.at(maxIdx).message, true);
    for (let i = 0; i < numCards; i++) {
        const efectos = Object.values(wallpaper.at(elegidos[i]).effects);
        const mensaje = wallpaper.at(elegidos[i]).message;
        createCard(efectos, mensaje);
    }
    loader.style.display="none";
}

window.onload = async function () {
    loadWallpaper();
    const actSong = songs[getRandomInt(0, songs.length-1)];
    audio.src=actSong;
}
