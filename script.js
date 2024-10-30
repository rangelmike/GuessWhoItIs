const container = document.getElementById('container');
const numCards = 7; 
const cardWidth = (window.innerWidth > 600?200:100);
const cardHeight = (cardWidth == 200 ? 150 : 75);
const positions = [];
const types = 3;

function angelCard(card){    
    card.style.width = `${cardWidth}px`;
    card.style.height = `${cardHeight}px`;

    const img = document.createElement('img');
    img.className="wing left";
    img.src="Lwing.png";
    img.alt="Left Wing";
    img.style.left = `-${cardWidth/1.5}px`
    img.style.width = `${cardHeight}px`
    card.append(img);

    const img2 = document.createElement('img');
    img2.className="wing right";
    img2.src="Rwing.png";
    img2.alt="Right Wing";
    img2.style.right = `-${cardWidth/1.5}px`
    img2.style.width = `${cardHeight}px`
    card.append(img2);
}

function haloCard(card){
    card.style.width = `${cardWidth}px`;
    card.style.height = `${cardHeight}px`;
    // card.textContent = text;

    const img = document.createElement('img');
    img.className="halo";
    img.src="halo.png";
    img.alt="halo";
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
            card.textContent = "both";
            angelCard(card);
            haloCard(card);
            break;
    }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function findAllAvailablePositions(rectangles, n, m, gridWidth, gridHeight) {    
    const occupied = Array.from({ length: gridHeight }, () => Array(gridWidth).fill(false));

    for (const rect of rectangles) {
        const { x, y } = rect; 
        for (let i = y; i < y + m; i+=10) {
            for (let j = x; j < x + n; j+=10) {
                if (i < gridHeight && j < gridWidth) {
                    occupied[i][j] = true;
                }
            }
        }
    }    
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

function createCard() {
    const card = document.createElement('div');
    card.classList.add('card');
    giveEffect(getRandomInt(1,types), card);
    let cont = 0;
    const act=[] = findAllAvailablePositions(positions, cardWidth, cardHeight, window.innerWidth, window.innerHeight);
    const pos = act[getRandomInt(0, act.length)];
    if(pos == null) return;
    // Save position to check against future cards
    positions.push(pos);
    // Position and add card to container
    card.style.left = `${pos.x}px`;
    card.style.top = `${pos.y}px`;  
    container.appendChild(card);      
  }

// Generate the specified number of cards
for (let i = 0; i < numCards; i++) {
    createCard()    
}

console.log(window.innerWidth, cardWidth);