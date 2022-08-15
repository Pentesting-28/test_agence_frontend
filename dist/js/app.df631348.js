(function(){"use strict";var t={4112:function(t,n,e){var r=e(144),o=e(998),a=e(2928),i=function(){var t=this,n=t._self._c;return n(o.Z,[n(a.Z,[n("router-view")],1)],1)},s=[],c={name:"App",data:()=>({})},u=c,l=e(1001),f=(0,l.Z)(u,i,s,!1,null,null,null),d=f.exports,p=e(8345);r.ZP.use(p.Z);const h=[{path:"/",name:"consultantsComponent",component:()=>e.e(554).then(e.bind(e,7858))}],m=new p.Z({mode:"history",base:"/test_agence_frontend/",routes:h});var T=m,_=e(629),g=(e(1703),e(9669)),v=e.n(g);const S=v().create({baseURL:"https://consultanttestagence.000webhostapp.com/test_agence_backend/public",headers:{Accept:"application/json","Content-Type":"application/json"}});var N=S;const b={namespaced:!0,state:{consultants:[],showConsultants:[],netEarningsConsultants:[],netEarningsFixedCostConsultants:[]},getters:{GET_CONSULTANTS(t){return t.consultants}},mutations:{SET_CONSULTANTS(t,n){t.consultants=n.data},SET_CONSULTANTS_SHOW(t,n){t.showConsultants=n.data},SET_CONSULTANTS_NET_EARNINGS(t,n){t.netEarningsConsultants=n.data},SET_CONSULTANTS_NET_EARNINGS_FIXED_COST(t,n){t.netEarningsFixedCostConsultants=n.data}},actions:{async INDEX_CONSULTANTS({commit:t}){try{const n=await fetch("https://consultanttestagence.000webhostapp.com/test_agence_backend/public/api/v1/consultant",{method:"GET"});if(!n.ok)throw new Error(`HTTP error! status: ${n.status}`);const e=await n.json();return console.log("update",e),t("SET_CONSULTANTS",e),e}catch(n){return Promise.reject(n)}},async CONSULTANT_SHOW({commit:t},n){try{const e=await fetch("https://consultanttestagence.000webhostapp.com/test_agence_backend/public/api/v1/consultant/performance",{method:"POST",body:JSON.stringify(n),headers:{Accept:"application/json","Content-Type":"application/json","Access-Control-Allow-Origin":"*"}});if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);const r=await e.json();return t("SET_CONSULTANTS_SHOW",r),r}catch(e){return Promise.reject(e)}},async CONSULTANT_NET_EARNINGS({commit:t},n){try{const e=await N.post("/api/v1/consultant/total_net_earnings",n);return t("SET_CONSULTANTS_NET_EARNINGS",e.data.data),e.data}catch(e){return Promise.reject(e)}},async CONSULTANT_NET_EARNINGS_FIXED_COST({commit:t},n){try{const e=await N.post("/api/v1/consultant/total_net_earnings_fixed_cost",n);return t("SET_CONSULTANTS_NET_EARNINGS_FIXED_COST",e.data.data),e.data}catch(e){return Promise.reject(e)}}}};r.ZP.use(_.ZP);var y=new _.ZP.Store({state:{},getters:{},mutations:{},actions:{},modules:{consultant:b}}),C=e(8864);r.ZP.use(C.Z);var E=new C.Z({});e(3734);r.ZP.config.productionTip=!1,new r.ZP({router:T,store:y,vuetify:E,render:t=>t(d)}).$mount("#app")}},n={};function e(r){var o=n[r];if(void 0!==o)return o.exports;var a=n[r]={id:r,loaded:!1,exports:{}};return t[r].call(a.exports,a,a.exports,e),a.loaded=!0,a.exports}e.m=t,function(){var t=[];e.O=function(n,r,o,a){if(!r){var i=1/0;for(l=0;l<t.length;l++){r=t[l][0],o=t[l][1],a=t[l][2];for(var s=!0,c=0;c<r.length;c++)(!1&a||i>=a)&&Object.keys(e.O).every((function(t){return e.O[t](r[c])}))?r.splice(c--,1):(s=!1,a<i&&(i=a));if(s){t.splice(l--,1);var u=o();void 0!==u&&(n=u)}}return n}a=a||0;for(var l=t.length;l>0&&t[l-1][2]>a;l--)t[l]=t[l-1];t[l]=[r,o,a]}}(),function(){e.n=function(t){var n=t&&t.__esModule?function(){return t["default"]}:function(){return t};return e.d(n,{a:n}),n}}(),function(){e.d=function(t,n){for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})}}(),function(){e.f={},e.e=function(t){return Promise.all(Object.keys(e.f).reduce((function(n,r){return e.f[r](t,n),n}),[]))}}(),function(){e.u=function(t){return"js/consultantsComponent.53043ac7.js"}}(),function(){e.miniCssF=function(t){return"css/consultantsComponent.e6382998.css"}}(),function(){e.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)}}(),function(){var t={},n="test_agence_frontend:";e.l=function(r,o,a,i){if(t[r])t[r].push(o);else{var s,c;if(void 0!==a)for(var u=document.getElementsByTagName("script"),l=0;l<u.length;l++){var f=u[l];if(f.getAttribute("src")==r||f.getAttribute("data-webpack")==n+a){s=f;break}}s||(c=!0,s=document.createElement("script"),s.charset="utf-8",s.timeout=120,e.nc&&s.setAttribute("nonce",e.nc),s.setAttribute("data-webpack",n+a),s.src=r),t[r]=[o];var d=function(n,e){s.onerror=s.onload=null,clearTimeout(p);var o=t[r];if(delete t[r],s.parentNode&&s.parentNode.removeChild(s),o&&o.forEach((function(t){return t(e)})),n)return n(e)},p=setTimeout(d.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=d.bind(null,s.onerror),s.onload=d.bind(null,s.onload),c&&document.head.appendChild(s)}}}(),function(){e.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){e.nmd=function(t){return t.paths=[],t.children||(t.children=[]),t}}(),function(){e.p="/test_agence_frontend/"}(),function(){var t=function(t,n,e,r){var o=document.createElement("link");o.rel="stylesheet",o.type="text/css";var a=function(a){if(o.onerror=o.onload=null,"load"===a.type)e();else{var i=a&&("load"===a.type?"missing":a.type),s=a&&a.target&&a.target.href||n,c=new Error("Loading CSS chunk "+t+" failed.\n("+s+")");c.code="CSS_CHUNK_LOAD_FAILED",c.type=i,c.request=s,o.parentNode.removeChild(o),r(c)}};return o.onerror=o.onload=a,o.href=n,document.head.appendChild(o),o},n=function(t,n){for(var e=document.getElementsByTagName("link"),r=0;r<e.length;r++){var o=e[r],a=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(a===t||a===n))return o}var i=document.getElementsByTagName("style");for(r=0;r<i.length;r++){o=i[r],a=o.getAttribute("data-href");if(a===t||a===n)return o}},r=function(r){return new Promise((function(o,a){var i=e.miniCssF(r),s=e.p+i;if(n(i,s))return o();t(r,s,o,a)}))},o={143:0};e.f.miniCss=function(t,n){var e={554:1};o[t]?n.push(o[t]):0!==o[t]&&e[t]&&n.push(o[t]=r(t).then((function(){o[t]=0}),(function(n){throw delete o[t],n})))}}(),function(){var t={143:0};e.f.j=function(n,r){var o=e.o(t,n)?t[n]:void 0;if(0!==o)if(o)r.push(o[2]);else{var a=new Promise((function(e,r){o=t[n]=[e,r]}));r.push(o[2]=a);var i=e.p+e.u(n),s=new Error,c=function(r){if(e.o(t,n)&&(o=t[n],0!==o&&(t[n]=void 0),o)){var a=r&&("load"===r.type?"missing":r.type),i=r&&r.target&&r.target.src;s.message="Loading chunk "+n+" failed.\n("+a+": "+i+")",s.name="ChunkLoadError",s.type=a,s.request=i,o[1](s)}};e.l(i,c,"chunk-"+n,n)}},e.O.j=function(n){return 0===t[n]};var n=function(n,r){var o,a,i=r[0],s=r[1],c=r[2],u=0;if(i.some((function(n){return 0!==t[n]}))){for(o in s)e.o(s,o)&&(e.m[o]=s[o]);if(c)var l=c(e)}for(n&&n(r);u<i.length;u++)a=i[u],e.o(t,a)&&t[a]&&t[a][0](),t[a]=0;return e.O(l)},r=self["webpackChunktest_agence_frontend"]=self["webpackChunktest_agence_frontend"]||[];r.forEach(n.bind(null,0)),r.push=n.bind(null,r.push.bind(r))}();var r=e.O(void 0,[998],(function(){return e(4112)}));r=e.O(r)})();
//# sourceMappingURL=app.df631348.js.map