const container = document.getElementById('container');
const numCards = 5; // Change to the desired number of cards
const cardWidth = 200;
const cardHeight = 150;
const positions = [];
const occupied = [];
const tolerancia = 100000;

function angelCard(card){
    card.textContent="Hola";
    const img = document.createElement('img');
    img.className="wing left";
    img.src="Lwing.png";
    img.alt="Left Wing";
    card.append(img);
    const img2 = document.createElement('img');
    img2.className="wing right";
    img2.src="Rwing.png";
    img2.alt="Right Wing";
    card.append(img2);
}
// Generate random integer between min and max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function findAllAvailablePositions(rectangles, n, m, gridWidth, gridHeight) {
    // Crea una matriz para marcar las posiciones ocupadas
    const occupied = Array.from({ length: gridHeight }, () => Array(gridWidth).fill(false));

    // Marca las posiciones ocupadas por los rectángulos existentes
    for (const rect of rectangles) {
        const { x, y } = rect; // Esquina superior izquierda de cada rectángulo
        for (let i = y; i < y + m; i+=10) {
            for (let j = x; j < x + n; j+=10) {
                if (i < gridHeight && j < gridWidth) {
                    occupied[i][j] = true;
                }
            }
        }
    }    
    // Array para almacenar las posiciones válidas
    const validPositions = [];

    // Busca todas las posiciones libres para el nuevo rectángulo
    for (let i = 30; i <= gridHeight - m; i+=10) {
        for (let j = 30; j <= gridWidth - n; j+=10) {
            let canPlace = true;
            for (let x = i; x < i + m; x+=10) {
                for (let y = j; y < j + n; y+=10) {
                    if (occupied[x][y]) {
                        canPlace = false; // Hay solapamiento
                        break;
                    }
                }
                if (!canPlace) break;
            }
            if (canPlace) {
                validPositions.push({ x: j, y: i }); // Añade la esquina superior izquierda a la lista
            }
        }
    }

    return validPositions; // Devuelve todas las posiciones válidas
}

function createCard() {
    const card = document.createElement('div');
    card.classList.add('card');
    angelCard(card);
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

