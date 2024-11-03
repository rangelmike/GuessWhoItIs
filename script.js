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
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const provider = new GoogleAuthProvider(app);
const auth = getAuth(app);

const container = document.getElementById('container');
const numCards = 8; 
const cardWidth = (window.innerWidth > 600?200:100);
const cardHeight = (cardWidth == 200 ? 150 : 75);
const audio = document.getElementById("backgroundMusic");
const types = 8;
const occupied = Array.from({ length: window.innerHeight }, () => Array(window.innerWidth).fill(false));

function angelCard(card){    
    card.style.width = `${cardWidth}px`;
    card.style.height = `${cardHeight}px`;

    const img = document.createElement('img');
    img.className="wing left";
    img.src="https://i.ibb.co/1f53SP6/Lwing.png";
    img.alt="Left Wing";
    img.style.left = `-${cardWidth/1.5}px`
    img.style.width = `${cardHeight}px`
    card.append(img);

    const img2 = document.createElement('img');
    img2.className="wing right";
    img2.src="https://i.ibb.co/RYZZDzK/Rwing.png";
    img2.alt="Right Wing";
    img2.style.right = `-${cardWidth/1.5}px`
    img2.style.width = `${cardHeight}px`
    card.append(img2);
}

function haloCard(card){
    card.style.width = `${cardWidth}px`;
    card.style.height = `${cardHeight}px`;    
    
    const img = document.createElement('img');
    img.className="halo";
    img.src="https://i.ibb.co/L1fG2tz/halo.png";
    img.alt="halo";
    img.style.width = `${cardHeight}px`;
    card.append(img);
}

function musicCard(card){
    card.style.width = `${cardWidth}px`;
    card.style.height = `${cardHeight}px`;

    const img = document.createElement('img');
    img.className="musicNotes";
    img.src="https://i.ibb.co/PNwvv3V/music-Notes.png";
    img.alt="notes";
    img.style.width = `${cardWidth}px`;
    card.append(img);
}

function lightCard(card){
    card.style.width = `${cardWidth}px`;
    card.style.height = `${cardHeight}px`;

    const img = document.createElement('img');
    img.className="TopLight";
    img.src="https://i.ibb.co/TY0SH8F/TopLight.png";
    img.alt="Tlight";
    img.style.width = `${cardWidth*1.3}px`;
    img.style.height = `${cardHeight*1.3}px`;
    card.append(img);
}

function leftCard(card){
    card.style.width = `${cardWidth}px`;
    card.style.height = `${cardHeight}px`;

    const img = document.createElement('img');
    img.className="leftLight";
    img.src="https://i.ibb.co/fr7VLGz/left-Light.png";
    img.alt="Llight";
    img.style.width = `${cardWidth*1.3}px`;
    card.append(img);
}

function sunCard(card){
    card.style.width = `${cardWidth}px`;
    card.style.height = `${cardHeight}px`;
    leftCard(card);

    const img = document.createElement('img');
    img.className="sun";
    img.src="https://i.ibb.co/b2ZT3FK/sun.png";
    img.alt="sun";
    img.style.width = `${cardWidth*0.5}px`;    
    card.append(img);
}

function multiHearts(card){
    card.style.width = `${cardWidth}px`;
    card.style.height = `${cardHeight}px`;

    const img = document.createElement('img');
    img.className="multiHearts";
    img.src="https://i.ibb.co/ySt75HH/Multi-Hearts.png";
    img.alt="multiHearts";
    img.style.width = `${cardWidth}px`;
    card.append(img);
}

function pumpingHeart(card){
    card.style.width = `${cardWidth}px`;
    card.style.height = `${cardHeight}px`;

    const img = document.createElement('img');
    img.className="pumpHeart";
    img.src="https://i.ibb.co/7v9JHkZ/Pump-Heart.png";
    img.alt="PumpHeart";
    img.style.width = `${cardWidth*0.3}px`;
    card.append(img);
}

function clockCard(card){
    card.style.width = `${cardWidth}px`;
    card.style.height = `${cardHeight}px`;

    const img = document.createElement('img');
    img.className="clock";
    img.src="https://i.ibb.co/4Vsks1W/clock.png";
    img.alt="clock";
    img.style.width = `${cardWidth*0.5}px`;
    card.append(img);
}

function giveEffect(code, card){
    switch (code){
        case 1:
            card.textContent = "angel";
            angelCard(card);
            break;
        case 2:
            card.textContent = "halo";
            haloCard(card);
            break;
        case 3:
            card.textContent = "clock";            
            clockCard(card);
            break;
        case 4:
            card.textContent = "music";
            musicCard(card);
            break;
        case 5:
            card.textContent = "spotlight";
            lightCard(card);
            break;
        case 6:
            card.textContent = "sun";
            sunCard(card);
            break;
        case 7:
            card.textContent = "heartS";
            multiHearts(card);
            break;
        case 8:
            card.textContent = "Pumping Heart";
            pumpingHeart(card);
            break;
        default:
            angelCard(card);
            break;
    }
}

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

    for (let i = 30; i <= gridHeight - m; i+=10) {
        for (let j = 30; j <= gridWidth - n; j+=10) {
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

function createCard(index) {
    const card = document.createElement('div');
    card.classList.add('card');
    // giveEffect(getRandomInt(1,types), card);
    giveEffect(index+1, card);
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
    console.log(await getFromDB("hola"));
    placeRectangle({x: 0,y: 0}, audio.offsetHeight, audio.offsetWidth);
    // console.log(occupied[250][30]);
    for (let i = 0; i < numCards; i++) {
        createCard(i)    
    }        
    const user=auth.currentUser;
    if(!user) window.location.href="index.html";
    console.log(user.email);
    console.log(user.uid);
}
