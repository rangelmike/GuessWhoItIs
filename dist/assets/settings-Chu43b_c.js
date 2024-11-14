import{g as B,r as W}from"./cards-CzI-W0Rb.js";import{getDatabase as N,ref as E,get as R,child as F,update as _,push as z,remove as K}from"https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";import{initializeApp as q}from"https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";import{GoogleAuthProvider as Z,getAuth as G,signOut as O,signInWithPopup as U}from"https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";const X={apiKey:"AIzaSyAc1-FWefRK9gNkaprncldWqK2jztLV43A",authDomain:"guesswhoitis-905ed.firebaseapp.com",databaseURL:"https://guesswhoitis-905ed-default-rtdb.firebaseio.com",projectId:"guesswhoitis-905ed",storageBucket:"guesswhoitis-905ed.firebasestorage.app",messagingSenderId:"72462712048",appId:"1:72462712048:web:a1ed1f84eb16b686b95635"},H=q(X),$=new Z(H),y=G(H),M=N(H),J=document.getElementById("logoutBtn"),C=document.getElementById("addCard"),w=document.getElementById("container"),L=window.innerWidth>600?200:150,I=L==200?150:100,p=["Angel Wings","Halo","Clock","Music Notes","Spotlight","Sun","MultiHearts","Pumping Heart"],Q='<p class="effectText">Pumping Heart</p><svg class="w-6 h-6 text-gray-800 dark:text-white svg" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm5.757-1a1 1 0 1 0 0 2h8.486a1 1 0 1 0 0-2H7.757Z" clip-rule="evenodd"></path> </svg>',Y='  <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 20 20" height="20" fill="none" class="svg-icon"><g stroke-width="1.5" stroke-linecap="round" stroke="#de8a2a"><circle r="7.5" cy="10" cx="10"></circle><path d="m9.99998 7.5v5"></path><path d="m7.5 9.99998h5"></path></g></svg><span class="lable">Add</span>',ee=' <svg xmlns="http://www.w3.org/2000/svg"fill="none"viewBox="0 0 39 7"class="bin-top"><line stroke-width="4" stroke="white" y2="5" x2="39" y1="5"></line><line stroke-width="3"stroke="white"y2="1.5"x2="26.0357"y1="1.5"x1="12"></line></svg><svg xmlns="http://www.w3.org/2000/svg"fill="none"viewBox="0 0 33 39"class="bin-bottom"><mask fill="white" id="path-1-inside-1_8_19"><path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path></mask><path mask="url(#path-1-inside-1_8_19)"fill="white"d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"></path><path stroke-width="4" stroke="white" d="M12 6L12 29"></path><path stroke-width="4" stroke="white" d="M21 6V29"></path></svg><svg xmlns="http://www.w3.org/2000/svg"fill="none"viewBox="0 0 89 80" class="garbage"><path fill="white" d="M20.5 10.5L37.5 15.5L42.5 11.5L51.5 12.5L68.75 0L72 11.5L79.5 12.5H88.5L87 22L68.75 31.5L75.5066 25L86 26L87 35.5L77.5 48L70.5 49.5L80 50L77.5 71.5L63.5 58.5L53.5 68.5L65.5 70.5L45.5 73L35.5 79.5L28 67L16 63L12 51.5L0 48L16 25L22.5 17L20.5 10.5Z"></path></svg>';function te(e){const s=E(N());return R(F(s,e)).then(n=>n.exists()?n.val():(console.log("No data available"),0)).catch(n=>(console.error(n),0))}function ne(e,s,n){_(E(M,e),{effects:s,message:n})}function se(e,s){return z(E(M,"/"),{effects:e,message:s}).key}function ie(e){K(E(M,e))}function P(e,s,n){const o=document.createElement("select"),t=document.createElement("div"),c=document.createElement("h4"),d=document.createElement("div");t.classList.add("cardDiv"),t.classList.add("hiding"),d.classList.add("card");const l=document.createElement("P");l.textContent=s,d.appendChild(l);for(let i of e)B(i,d,L,I);e.length||B(0,d,L,I),c.textContent=s,c.addEventListener("click",()=>{t.classList.contains("showing")?(t.classList.remove("showing"),t.classList.add("hiding")):(t.classList.contains("hiding")&&t.classList.remove("hiding"),t.classList.add("showing"))});const x=document.createElement("div"),D=document.createElement("p"),f=document.createElement("input");D.textContent="Mensaje:",f.value=s,f.addEventListener("change",function(){l.textContent=f.value}),x.appendChild(D),x.appendChild(f);const r=document.createElement("div"),T=document.createElement("p");r.classList="effectsDiv",T.textContent="Efectos: ",r.appendChild(T);function V(i){const a=document.createElement("button");a.classList="Btn",a.innerHTML=Q;const j=a.querySelector(".effectText");j.textContent=p[i-1],a.addEventListener("click",function(){const v=p.indexOf(j.textContent)+1;e=e.filter(S=>S!==v),W(d,v);const b=document.createElement("option");b.value=v,b.textContent=p[v-1],o.appendChild(b),r.removeChild(a)}),r.appendChild(a)}for(let i of e)V(i);const h=document.createElement("div"),A=document.createElement("p"),m=document.createElement("button");m.classList="button",m.innerHTML=Y,h.classList="effectsDiv",A.textContent="Nuevo efecto: ",h.appendChild(A);for(let i=0;i<p.length;i++){if(e.includes(i+1))continue;const a=document.createElement("option");a.id=`n${i}`,a.value=i+1,a.textContent=p[i],o.appendChild(a)}m.addEventListener("click",function(){if(o.options.length){e.push(parseInt(o.value)),B(parseInt(o.value),d,L,I),V(parseInt(o.value));const i=o.options[o.selectedIndex];i&&i.remove()}}),h.appendChild(o),h.appendChild(m);const u=document.createElement("div");u.classList="effectsDiv";const k=document.createElement("button");k.textContent="Confirmar",u.appendChild(k),k.addEventListener("click",function(){t.classList.contains("showing")?(t.classList.remove("showing"),t.classList.add("hiding")):(t.classList.contains("hiding")&&t.classList.remove("hiding"),t.classList.add("showing")),c.textContent=l.textContent,n==-1?n=se(e,l.textContent):ne("/"+n,e,l.textContent)});const g=document.createElement("button");g.classList="bin-button",g.innerHTML=ee,u.appendChild(g),g.addEventListener("click",function(){w.removeChild(c),w.removeChild(t),n!=-1&&ie(n)}),t.appendChild(x),t.appendChild(r),t.appendChild(h),t.appendChild(d),t.appendChild(u),w.insertBefore(c,C),w.insertBefore(t,C)}async function oe(e){e.uid!=="lpxjXmLNAibp7UGgRs2Pk4bN0kd2"&&(O(y),window.location.href="index.html"),C.style.display="block";const s=await te("/"),n=Object.values(s),o=Object.keys(s),t=n.length;for(let c=0;c<t;c++){const d=Object.values(n.at(c).effects),l=n.at(c).message;P(d,l,o.at(c))}}J.addEventListener("click",()=>{O(y),window.location.href="index.html"});C.addEventListener("click",function(){P([],"New Card",-1)});document.getElementById("signInBtn").addEventListener("click",async()=>{await U(y,$).then(async e=>{Z.credentialFromResult(e).accessToken;const n=e.user;oe(n),document.getElementById("signInBtn").style.display="none"}).catch(e=>{e.code;const s=e.message;alert(s)})});document.getElementById("backBtn").addEventListener("click",()=>{window.location.href="wallpaper.html"});
