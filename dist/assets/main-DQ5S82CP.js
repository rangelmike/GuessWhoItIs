import"./modulepreload-polyfill-B5Qt9EMX.js";import{getDatabase as s}from"https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";import{initializeApp as n}from"https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";import{GoogleAuthProvider as i,getAuth as r,signInWithPopup as c}from"https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";const d={apiKey:"AIzaSyAc1-FWefRK9gNkaprncldWqK2jztLV43A",authDomain:"guesswhoitis-905ed.firebaseapp.com",databaseURL:"https://guesswhoitis-905ed-default-rtdb.firebaseio.com",projectId:"guesswhoitis-905ed",storageBucket:"guesswhoitis-905ed.firebasestorage.app",messagingSenderId:"72462712048",appId:"1:72462712048:web:a1ed1f84eb16b686b95635"},t=n(d),p=new i(t),o=r(t);s(t);const l=document.getElementById("signinBtn");l.addEventListener("click",async g=>{await c(o,p).then(async e=>{i.credentialFromResult(e).accessToken,e.user}).catch(e=>{e.code;const a=e.message;alert(a)}),window.location.href="/wallpaper.html"});window.onload=function(){o!=null&&(window.location.href="wallpaper.html")};