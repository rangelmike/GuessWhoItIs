import{g as I}from"./cards-CvD_PQCs.js";import{initializeApp as A}from"https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";import{getDatabase as w,ref as E,get as L,child as x}from"https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";import{GoogleAuthProvider as C,getAuth as j}from"https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";const R={apiKey:"AIzaSyAc1-FWefRK9gNkaprncldWqK2jztLV43A",authDomain:"guesswhoitis-905ed.firebaseapp.com",databaseURL:"https://guesswhoitis-905ed-default-rtdb.firebaseio.com",projectId:"guesswhoitis-905ed",storageBucket:"guesswhoitis-905ed.firebasestorage.app",messagingSenderId:"72462712048",appId:"1:72462712048:web:a1ed1f84eb16b686b95635"},u=A(R);w(u);new C(u);j(u);const q=document.getElementById("container"),l=window.innerWidth>600?200:150,g=l==200?150:125,i=document.getElementById("backgroundMusic"),m=document.getElementById("toggleHover"),v=Array.from({length:window.innerHeight},()=>Array(window.innerWidth).fill(!1)),S=document.getElementById("settingsBtn"),h=document.getElementById("loader"),p=["https://shorturl.at/j0LqN","https://shorturl.at/VBilJ","https://shorturl.at/qIdRM","https://shorturl.at/y9yVX"];S.addEventListener("click",async n=>{window.location.href="/settings.html"});m.addEventListener("mousedown",function(){const n=document.querySelectorAll(".card"),t=document.querySelectorAll(".img");for(let e of n)e.classList.add("force-hover");for(let e of t)e.classList.add("force-hover")});m.addEventListener("mouseup",function(){const n=document.querySelectorAll(".card"),t=document.querySelectorAll(".img");for(let e of n)e.classList.remove("force-hover");for(let e of t)e.classList.remove("force-hover")});m.addEventListener("mouseleave",function(){const n=document.querySelectorAll(".card"),t=document.querySelectorAll(".img");for(let e of n)e.classList.remove("force-hover");for(let e of t)e.classList.remove("force-hover")});function b(n,t){return Math.floor(Math.random()*(t-n+1))+n}function B({x:n,y:t},e,r){for(let s=t-10;s<t+r+11;s+=10)for(let o=n-10;o<n+e+11;o+=10)s<window.innerHeight&&o<window.innerWidth&&s>=0&&o>=0&&(v[s][o]=!0)}function k(n,t,e,r){const s=[];for(let o=60;o<=r-t-30;o+=10)for(let c=30;c<=e-n-30;c+=10){let a=!0;for(let d=o;d<o+t;d+=10){for(let f=c;f<c+n;f+=10)if(v[d][f]){a=!1;break}if(!a)break}a&&s.push({x:c,y:o})}return s}function y(n,t){const e=document.createElement("div");e.classList.add("card"),e.textContent=t;for(let o of n)I(o,e,l,g);const r=k(l,g,window.innerWidth,window.innerHeight),s=r[b(0,r.length)];s!=null&&(B(s,l,g),e.style.left=`${s.x}px`,e.style.top=`${s.y}px`,q.appendChild(e))}function H(n,t,e){if(n>t)throw new Error("No se pueden generar n números únicos entre 0 y m-1 si n > m");const r=Array.from({length:t},(c,a)=>a);for(let c=r.length-1;c>0;c--){const a=Math.floor(Math.random()*(c+1));[r[c],r[a]]=[r[a],r[c]]}console.log(r,e);const s=[];let o=0;for(;s.length<n;)r[o]!=e&&s.push(r[o]),o++;return s}function M(n){const t=E(w());return L(x(t,n)).then(e=>e.exists()?e.val():(console.log("No data available"),0)).catch(e=>(console.error(e),0))}window.onload=async function(){l==150&&(document.getElementById("backgroundMusic").style.width="100px",document.getElementById("toggleHover").style.right="-30px",document.getElementById("headerText").style.width="70%",document.getElementById("headerText").style.position="absolute",document.getElementById("headerText").style.left="22%"),B({x:i.getBoundingClientRect().top-i.getBoundingClientRect().top%10,y:i.getBoundingClientRect().left-i.getBoundingClientRect().left%10},i.offsetHeight,i.offsetWidth),h.style.display="block";const n=p[b(0,p.length-1)];i.src=n;const t=Object.values(await M("/"));let e=0;for(let o=1;o<t.length;o++)t.at(o).timestamp>t.at(e).timestamp&&(e=o);const r=Math.min(6,t.length);console.log("died at elegidos fs");const s=H(r,t.length,e);console.log(Object.values(t.at(e).effects),t.at(e).message),y(Object.values(t.at(e).effects),t.at(e).message);for(let o=0;o<r;o++){const c=Object.values(t.at(s[o]).effects),a=t.at(s[o]).message;y(c,a)}h.style.display="none"};
