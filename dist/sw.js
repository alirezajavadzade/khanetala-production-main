if(!self.define){let s,e={};const i=(i,n)=>(i=new URL(i+".js",n).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(n,l)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let u={};const o=s=>i(s,r),t={module:{uri:r},exports:u,require:o};e[r]=Promise.all(n.map((s=>t[s]||o(s)))).then((s=>(l(...s),u)))}}define(["./workbox-5ffe50d4"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/404-CnUJjSx6.js",revision:null},{url:"assets/404-F7mcE6YF.css",revision:null},{url:"assets/BankinfoView-B39NXulS.js",revision:null},{url:"assets/BankinfoView-DxfS5_AX.css",revision:null},{url:"assets/DashboardView-CloXcanS.css",revision:null},{url:"assets/DashboardView-DaHwlFWI.js",revision:null},{url:"assets/failed-D3KQBhs6.js",revision:null},{url:"assets/failed-iDEO9xyS.css",revision:null},{url:"assets/GoldboxView-C22hc-Cr.css",revision:null},{url:"assets/GoldboxView-CaPsPycz.js",revision:null},{url:"assets/identityInfoView-BB0RVlCQ.js",revision:null},{url:"assets/identityInfoView-BvNHteQy.css",revision:null},{url:"assets/IdentityView-BsAurrCc.css",revision:null},{url:"assets/IdentityView-Cmn7mWbh.js",revision:null},{url:"assets/index-DB3uy5Fr.js",revision:null},{url:"assets/index-DvdHCgtQ.css",revision:null},{url:"assets/LoginView-CWroV31R.js",revision:null},{url:"assets/LoginView-DZode81p.css",revision:null},{url:"assets/OTPView-CSy-ltTP.css",revision:null},{url:"assets/OTPView-DX_yHAEZ.js",revision:null},{url:"assets/PersonalInfoView-BL4-b-6E.css",revision:null},{url:"assets/PersonalInfoView-DA-i_kVy.js",revision:null},{url:"assets/success-60ziGH9f.js",revision:null},{url:"assets/success-DYcgnwci.css",revision:null},{url:"assets/trade-h-dwFhuV.js",revision:null},{url:"assets/TransactionView-CdHQvE0L.js",revision:null},{url:"index.html",revision:"8d41275df6283cf75f4b5dcb3b78ec4b"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"icons/web-app-manifest-192x192.png",revision:"3983aa2448bbc2f0040124c016a756f9"},{url:"icons/web-app-manifest-512x512.png",revision:"5c9c4f47993991e8552cf7a1e6503423"},{url:"manifest.webmanifest",revision:"0e75442e95514fefccf7969bb4034465"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
