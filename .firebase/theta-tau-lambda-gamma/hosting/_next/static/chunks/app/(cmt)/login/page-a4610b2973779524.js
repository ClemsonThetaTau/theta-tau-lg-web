(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[994],{806:function(e,t,r){Promise.resolve().then(r.t.bind(r,6685,23)),Promise.resolve().then(r.bind(r,1669))},1669:function(e,t,r){"use strict";r.r(t),r.d(t,{UserAuthForm:function(){return v}});var n=r(7437),a=r(2265),s=r(4033),o=r(7982),i=r(3085);async function l(e,t){let r=null,n=null;try{r=await (0,i.e5)(o.I8,e,t)}catch(e){n=e}return{result:r,error:n}}var u=r(2703),c=r(1678),d=r(3378),f=r(3695),m=r(8020),p=r(6606);function v(e){let{className:t,...r}=e,[o,i]=a.useState(!1),{toast:v}=(0,p.pm)(),{push:g}=(0,s.useRouter)();async function b(e){e.preventDefault(),i(!0);let t=e.target,r=t.elements.namedItem("email").value,n=t.elements.namedItem("password").value,{result:a,error:s}=await l(r,n);null!=s?(i(!1),v({title:"Error Logging In: ",description:s.message})):g("/settings")}return(0,n.jsx)("div",{className:(0,u.cn)("grid gap-6",t),...r,children:(0,n.jsx)("form",{onSubmit:b,children:(0,n.jsxs)("div",{className:"grid gap-2",children:[(0,n.jsxs)("div",{className:"grid gap-1 mb-4",children:[(0,n.jsx)("div",{className:"relative flex text-xs uppercase",children:(0,n.jsx)("span",{className:"bg-background px-2 text-muted-foreground",children:"Email"})}),(0,n.jsx)(m._,{className:"sr-only",htmlFor:"email",children:"Email"}),(0,n.jsx)(f.I,{id:"email",placeholder:"name@example.com",type:"email",autoCapitalize:"none",autoComplete:"email",autoCorrect:"off",disabled:o}),(0,n.jsx)("div",{className:"relative flex text-xs uppercase mt-2",children:(0,n.jsx)("span",{className:"bg-background px-2 text-muted-foreground",children:"Password"})}),(0,n.jsx)(m._,{className:"sr-only",htmlFor:"password",children:"Password"}),(0,n.jsx)(f.I,{id:"password",placeholder:"",type:"password",autoCapitalize:"none",autoComplete:"current-password",autoCorrect:"off",disabled:o})]}),(0,n.jsxs)(d.z,{disabled:o,children:[o&&(0,n.jsx)(c.Nbw,{className:"mr-2 h-4 w-4 animate-spin"}),"Sign In with Email"]})]})})})}},3378:function(e,t,r){"use strict";r.d(t,{d:function(){return l},z:function(){return u}});var n=r(7437),a=r(2265),s=r(7256),o=r(6061),i=r(2703);let l=(0,o.j)("inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),u=a.forwardRef((e,t)=>{let{className:r,variant:a,size:o,asChild:u=!1,...c}=e,d=u?s.g7:"button";return(0,n.jsx)(d,{className:(0,i.cn)(l({variant:a,size:o,className:r})),ref:t,...c})});u.displayName="Button"},3695:function(e,t,r){"use strict";r.d(t,{I:function(){return o}});var n=r(7437),a=r(2265),s=r(2703);let o=a.forwardRef((e,t)=>{let{className:r,type:a,...o}=e;return(0,n.jsx)("input",{type:a,className:(0,s.cn)("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",r),ref:t,...o})});o.displayName="Input"},8020:function(e,t,r){"use strict";r.d(t,{_:function(){return u}});var n=r(7437),a=r(2265),s=r(6743),o=r(6061),i=r(2703);let l=(0,o.j)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),u=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,n.jsx)(s.f,{ref:t,className:(0,i.cn)(l(),r),...a})});u.displayName=s.f.displayName},6606:function(e,t,r){"use strict";r.d(t,{Am:function(){return d},pm:function(){return f}});var n=r(2265);let a=0,s=new Map,o=e=>{if(s.has(e))return;let t=setTimeout(()=>{s.delete(e),c({type:"REMOVE_TOAST",toastId:e})},1e6);s.set(e,t)},i=(e,t)=>{switch(t.type){case"ADD_TOAST":return{...e,toasts:[t.toast,...e.toasts].slice(0,1)};case"UPDATE_TOAST":return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case"DISMISS_TOAST":{let{toastId:r}=t;return r?o(r):e.toasts.forEach(e=>{o(e.id)}),{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,open:!1}:e)}}case"REMOVE_TOAST":if(void 0===t.toastId)return{...e,toasts:[]};return{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)}}},l=[],u={toasts:[]};function c(e){u=i(u,e),l.forEach(e=>{e(u)})}function d(e){let{...t}=e,r=(a=(a+1)%Number.MAX_VALUE).toString(),n=()=>c({type:"DISMISS_TOAST",toastId:r});return c({type:"ADD_TOAST",toast:{...t,id:r,open:!0,onOpenChange:e=>{e||n()}}}),{id:r,dismiss:n,update:e=>c({type:"UPDATE_TOAST",toast:{...e,id:r}})}}function f(){let[e,t]=n.useState(u);return n.useEffect(()=>(l.push(t),()=>{let e=l.indexOf(t);e>-1&&l.splice(e,1)}),[e]),{...e,toast:d,dismiss:e=>c({type:"DISMISS_TOAST",toastId:e})}}},7982:function(e,t,r){"use strict";r.d(t,{I8:function(){return l},db:function(){return u},tO:function(){return c}});var n=r(994),a=r(3085),s=r(4086),o=r(9584);let i=0===(0,n.C6)().length?(0,n.ZF)({apiKey:"AIzaSyAXWZ2GUKOBaRi10YQWzMqw1-s5krK2ZSQ",authDomain:"theta-tau-lambda-gamma.firebaseapp.com",projectId:"theta-tau-lambda-gamma",storageBucket:"theta-tau-lambda-gamma.appspot.com",messagingSenderId:"786566986467",appId:"1:786566986467:web:e3501dfdb368e5d45e23d6",measurementId:"G-87T7K6GX57"}):(0,n.C6)()[0],l=(0,a.v0)(i),u=(0,s.ad)(i),c=(0,o.cF)(i)},2703:function(e,t,r){"use strict";r.d(t,{cn:function(){return s}});var n=r(7042),a=r(3986);function s(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,a.m)((0,n.W)(t))}},4033:function(e,t,r){e.exports=r(8165)},1172:function(e,t,r){"use strict";r.d(t,{w_:function(){return l}});var n=r(2265),a={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},s=n.createContext&&n.createContext(a),o=function(){return(o=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var a in t=arguments[r])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},i=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&0>t.indexOf(n)&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var a=0,n=Object.getOwnPropertySymbols(e);a<n.length;a++)0>t.indexOf(n[a])&&Object.prototype.propertyIsEnumerable.call(e,n[a])&&(r[n[a]]=e[n[a]]);return r};function l(e){return function(t){return n.createElement(u,o({attr:o({},e.attr)},t),function e(t){return t&&t.map(function(t,r){return n.createElement(t.tag,o({key:r},t.attr),e(t.child))})}(e.child))}}function u(e){var t=function(t){var r,a=e.attr,s=e.size,l=e.title,u=i(e,["attr","size","title"]),c=s||t.size||"1em";return t.className&&(r=t.className),e.className&&(r=(r?r+" ":"")+e.className),n.createElement("svg",o({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,a,u,{className:r,style:o(o({color:e.color||t.color},t.style),e.style),height:c,width:c,xmlns:"http://www.w3.org/2000/svg"}),l&&n.createElement("title",null,l),e.children)};return void 0!==s?n.createElement(s.Consumer,null,function(e){return t(e)}):t(a)}},6743:function(e,t,r){"use strict";r.d(t,{f:function(){return i}});var n=r(3428),a=r(2265),s=r(9381);let o=(0,a.forwardRef)((e,t)=>(0,a.createElement)(s.WV.label,(0,n.Z)({},e,{ref:t,onMouseDown:t=>{var r;null===(r=e.onMouseDown)||void 0===r||r.call(e,t),!t.defaultPrevented&&t.detail>1&&t.preventDefault()}}))),i=o},6061:function(e,t,r){"use strict";r.d(t,{j:function(){return o}});var n=r(7042);let a=e=>"boolean"==typeof e?"".concat(e):0===e?"0":e,s=n.W,o=(e,t)=>r=>{var n;if((null==t?void 0:t.variants)==null)return s(e,null==r?void 0:r.class,null==r?void 0:r.className);let{variants:o,defaultVariants:i}=t,l=Object.keys(o).map(e=>{let t=null==r?void 0:r[e],n=null==i?void 0:i[e];if(null===t)return null;let s=a(t)||a(n);return o[e][s]}),u=r&&Object.entries(r).reduce((e,t)=>{let[r,n]=t;return void 0===n||(e[r]=n),e},{}),c=null==t?void 0:null===(n=t.compoundVariants)||void 0===n?void 0:n.reduce((e,t)=>{let{class:r,className:n,...a}=t;return Object.entries(a).every(e=>{let[t,r]=e;return Array.isArray(r)?r.includes({...i,...u}[t]):({...i,...u})[t]===r})?[...e,r,n]:e},[]);return s(e,l,c,null==r?void 0:r.class,null==r?void 0:r.className)}}},function(e){e.O(0,[358,214,724,526,266,685,971,596,744],function(){return e(e.s=806)}),_N_E=e.O()}]);