export function angelCard(card, cardWidth, cardHeight){

    const img = document.createElement('img');
    img.className="wing left n1 img";
    img.src="https://i.ibb.co/1f53SP6/Lwing.png";
    img.alt="Left Wing";
    img.style.left = `-${cardWidth/1.5}px`
    img.style.width = `${cardHeight}px`
    card.append(img);

    const img2 = document.createElement('img');
    img2.className="wing right n1 img";
    img2.src="https://i.ibb.co/RYZZDzK/Rwing.png";
    img2.alt="Right Wing";
    img2.style.right = `-${cardWidth/1.5}px`
    img2.style.width = `${cardHeight}px`
    card.append(img2);
}

export function haloCard(card, cardWidth, cardHeight){

    const img = document.createElement('img');
    img.className="halo n2 img";
    img.src="https://i.ibb.co/L1fG2tz/halo.png";
    img.alt="halo";
    img.style.width = `${cardHeight}px`;
    card.append(img);
}

export function clockCard(card, cardWidth, cardHeight){

    const img = document.createElement('img');
    img.className="clock n3 img";
    img.src="https://i.ibb.co/4Vsks1W/clock.png";
    img.alt="clock";
    img.style.width = `${cardWidth*0.5}px`;
    card.append(img);
}

export function musicCard(card, cardWidth, cardHeight){

    const img = document.createElement('img');
    img.className="musicNotes n4 img";
    img.src="https://i.ibb.co/PNwvv3V/music-Notes.png";
    img.alt="notes";
    img.style.width = `${cardWidth}px`;
    card.append(img);
}

export function lightCard(card, cardWidth, cardHeight){

    const img = document.createElement('img');
    img.className="TopLight n5 img";
    img.src="https://i.ibb.co/TY0SH8F/TopLight.png";
    img.alt="Tlight";
    img.style.width = `${cardWidth*1.3}px`;
    img.style.height = `${cardHeight*1.3}px`;
    card.append(img);
}

export function sunCard(card, cardWidth, cardHeight){
    // leftCard(card);
    const img2 = document.createElement('img');
    img2.className="leftLight n6 img";
    img2.src="https://i.ibb.co/fr7VLGz/left-Light.png";
    img2.alt="Llight";
    img2.style.width = `${cardWidth*1.3}px`;
    card.append(img2);
    const img = document.createElement('img');
    img.className="sun n6";
    img.src="https://i.ibb.co/b2ZT3FK/sun.png";
    img.alt="sun";
    img.style.width = `${cardWidth*0.5}px`;
    card.append(img);
}

export function multiHearts(card, cardWidth, cardHeight){

    const img = document.createElement('img');
    img.className="multiHearts n7 img";
    img.src="https://i.ibb.co/ySt75HH/Multi-Hearts.png";
    img.alt="multiHearts";
    img.style.width = `${cardWidth}px`;
    card.append(img);
}

export function pumpingHeart(card, cardWidth, cardHeight){

    const img = document.createElement('img');
    img.className="pumpHeart n8 img";
    img.src="https://i.ibb.co/7v9JHkZ/Pump-Heart.png";
    img.alt="PumpHeart";
    img.style.width = `${cardWidth*0.3}px`;
    card.append(img);
}

export function giveEffect(code, card, cardWidth, cardHeight){
    card.style.width = `${cardWidth}px`;
    card.style.height = `${cardHeight}px`;
    switch (code){
        case 1:
            angelCard(card, cardWidth, cardHeight);
            break;
        case 2:
            haloCard(card, cardWidth, cardHeight);
            break;
        case 3:
            clockCard(card, cardWidth, cardHeight);
            break;
        case 4:
            musicCard(card, cardWidth, cardHeight);
            break;
        case 5:
            lightCard(card, cardWidth, cardHeight);
            break;
        case 6:
            sunCard(card, cardWidth, cardHeight);
            break;
        case 7:
            multiHearts(card, cardWidth, cardHeight);
            break;
        case 8:
            pumpingHeart(card, cardWidth, cardHeight);
            break;
        default:            
            // console.log("Invalid code", code);            
            break;
    }
}

export function removeEffect(card, code){
    const imgs = card.querySelectorAll(`.n${code}`);
    for(let img of imgs){
        card.removeChild(img);
    }
}