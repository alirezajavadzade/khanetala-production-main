if(!self.define){let s,e={};const i=(i,n)=>(i=new URL(i+".js",n).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(n,l)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let o={};const u=s=>i(s,r),t={module:{uri:r},exports:o,require:u};e[r]=Promise.all(n.map((s=>t[s]||u(s)))).then((s=>(l(...s),o)))}}define(["./workbox-5ffe50d4"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/404-CZ99YMa8.js",revision:null},{url:"assets/404-Dk-os4k8.css",revision:null},{url:"assets/BankinfoView-D9JD7pQt.css",revision:null},{url:"assets/BankinfoView-dnuhrxeh.js",revision:null},{url:"assets/DashboardView-Be-uak6H.css",revision:null},{url:"assets/DashboardView-BSD7JgTP.js",revision:null},{url:"assets/failed-C-mJAss7.css",revision:null},{url:"assets/failed-CXEj7k6H.js",revision:null},{url:"assets/GoldboxNewView-_vmWff1m.js",revision:null},{url:"assets/GoldboxNewView-ChFkI0AY.css",revision:null},{url:"assets/GoldBoxView-DhP5lT3U.js",revision:null},{url:"assets/GoldBoxView-hffTu7Qx.css",revision:null},{url:"assets/index-CBh9d72Z.js",revision:null},{url:"assets/index-JAa5EB-c.css",revision:null},{url:"assets/persian-tools.esm-CBI2Czng.js",revision:null},{url:"assets/PersonalInfoView-BL4-b-6E.css",revision:null},{url:"assets/PersonalInfoView-D0S1q4vV.js",revision:null},{url:"assets/success-D7x4ifrH.js",revision:null},{url:"assets/success-DLvSWsD-.css",revision:null},{url:"assets/TimerIcon-sln0Jsdw.js",revision:null},{url:"assets/trade-DADWmI-k.js",revision:null},{url:"assets/TransactionView-DMJy_6jQ.js",revision:null},{url:"index.html",revision:"447e2a7e3e80bc95f60afb2386dddb8b"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"icons/web-app-manifest-192x192.png",revision:"3983aa2448bbc2f0040124c016a756f9"},{url:"icons/web-app-manifest-512x512.png",revision:"5c9c4f47993991e8552cf7a1e6503423"},{url:"manifest.webmanifest",revision:"0e75442e95514fefccf7969bb4034465"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
