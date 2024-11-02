(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))c(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const u of l.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&c(u)}).observe(document,{childList:!0,subtree:!0});function s(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerPolicy&&(l.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?l.credentials="include":i.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function c(i){if(i.ep)return;i.ep=!0;const l=s(i);fetch(i.href,l)}})();const d=document.getElementById("container"),y=8,n=window.innerWidth>600?200:100,o=n==200?150:75,f=[];function g(e){e.style.width=`${n}px`,e.style.height=`${o}px`;const t=document.createElement("img");t.className="wing left",t.src="https://i.ibb.co/1f53SP6/Lwing.png",t.alt="Left Wing",t.style.left=`-${n/1.5}px`,t.style.width=`${o}px`,e.append(t);const s=document.createElement("img");s.className="wing right",s.src="https://i.ibb.co/RYZZDzK/Rwing.png",s.alt="Right Wing",s.style.right=`-${n/1.5}px`,s.style.width=`${o}px`,e.append(s)}function x(e){e.style.width=`${n}px`,e.style.height=`${o}px`;const t=document.createElement("img");t.className="halo",t.src="https://i.ibb.co/L1fG2tz/halo.png",t.alt="halo",t.style.width=`${o}px`,e.append(t)}function b(e){e.style.width=`${n}px`,e.style.height=`${o}px`;const t=document.createElement("img");t.className="musicNotes",t.src="https://i.ibb.co/PNwvv3V/music-Notes.png",t.alt="notes",t.style.width=`${n}px`,e.append(t)}function w(e){e.style.width=`${n}px`,e.style.height=`${o}px`;const t=document.createElement("img");t.className="TopLight",t.src="https://i.ibb.co/TY0SH8F/TopLight.png",t.alt="Tlight",t.style.width=`${n*1.3}px`,t.style.height=`${o*1.3}px`,e.append(t)}function $(e){e.style.width=`${n}px`,e.style.height=`${o}px`;const t=document.createElement("img");t.className="leftLight",t.src="https://i.ibb.co/fr7VLGz/left-Light.png",t.alt="Llight",t.style.width=`${n*1.3}px`,e.append(t)}function C(e){e.style.width=`${n}px`,e.style.height=`${o}px`,$(e);const t=document.createElement("img");t.className="sun",t.src="https://i.ibb.co/b2ZT3FK/sun.png",t.alt="sun",t.style.width=`${n*.5}px`,e.append(t)}function N(e){e.style.width=`${n}px`,e.style.height=`${o}px`;const t=document.createElement("img");t.className="multiHearts",t.src="https://i.ibb.co/ySt75HH/Multi-Hearts.png",t.alt="multiHearts",t.style.width=`${n}px`,e.append(t)}function L(e){e.style.width=`${n}px`,e.style.height=`${o}px`;const t=document.createElement("img");t.className="pumpHeart",t.src="https://i.ibb.co/7v9JHkZ/Pump-Heart.png",t.alt="PumpHeart",t.style.width=`${n*.3}px`,e.append(t)}function E(e){e.style.width=`${n}px`,e.style.height=`${o}px`;const t=document.createElement("img");t.className="clock",t.src="https://i.ibb.co/4Vsks1W/clock.png",t.alt="clock",t.style.width=`${n*.5}px`,e.append(t)}function k(e,t){switch(e){case 1:t.textContent="angel",g(t);break;case 2:t.textContent="halo",x(t);break;case 3:t.textContent="clock",E(t);break;case 4:t.textContent="music",b(t);break;case 5:t.textContent="spotlight",w(t);break;case 6:t.textContent="sun",C(t);break;case 7:t.textContent="heartS",N(t);break;case 8:t.textContent="Pumping Heart",L(t);break;default:g(t);break}}function H(e,t){return Math.floor(Math.random()*(t-e+1))+e}function P(e,t,s,c,i){const l=Array.from({length:i},()=>Array(c).fill(!1));for(const h of e){const{x:p,y:m}=h;for(let r=m;r<m+s;r+=10)for(let a=p;a<p+t;a+=10)r<i&&a<c&&(l[r][a]=!0)}const u=[];for(let h=30;h<=i-s;h+=10)for(let p=30;p<=c-t;p+=10){let m=!0;for(let r=h;r<h+s;r+=10){for(let a=p;a<p+t;a+=10)if(l[r][a]){m=!1;break}if(!m)break}m&&u.push({x:p,y:h})}return u}function v(e){const t=document.createElement("div");t.classList.add("card"),k(e+1,t);const s=P(f,n,o,window.innerWidth,window.innerHeight),c=s[H(0,s.length)];c!=null&&(f.push(c),t.style.left=`${c.x}px`,t.style.top=`${c.y}px`,d.appendChild(t))}for(let e=0;e<y;e++)v(e);console.log(window.innerWidth,o);