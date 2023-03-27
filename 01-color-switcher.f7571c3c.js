const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),r=document.querySelector("body");let a=null;t.addEventListener("click",(()=>{a=setInterval((()=>{r.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3)})),e.addEventListener("click",(()=>{clearInterval(a)}));
//# sourceMappingURL=01-color-switcher.f7571c3c.js.map
