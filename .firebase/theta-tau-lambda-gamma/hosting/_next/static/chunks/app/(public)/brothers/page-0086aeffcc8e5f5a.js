(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[866],{3355:function(e,t,a){Promise.resolve().then(a.t.bind(a,3222,23)),Promise.resolve().then(a.bind(a,6258))},6258:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return o}});var r=a(7437),s=a(2265);let n=e=>{let{brother:t}=e;return(0,r.jsxs)("div",{className:"w-48",children:[(0,r.jsx)("img",{src:t.image,alt:t.name,className:"w-full h-auto"}),(0,r.jsxs)("div",{children:[(0,r.jsx)("h2",{className:"text-lg",children:t.name}),(0,r.jsx)("p",{className:"text-sm",children:t.email}),(0,r.jsx)("p",{className:"text-sm",children:t.major})]})]},t.email)};var i=a(6514),l=a(4086);function o(){let[e,t]=(0,s.useState)([]);return(0,s.useEffect)(()=>{let e=async()=>{let e=(0,l.JU)(i.db,"public","brothers"),a=await (0,l.QT)(e),r=a.data(),s=r.displayOrder.map(e=>{let t=r.brotherList[e],a={name:"".concat(t.firstName," ").concat(t.lastName),email:t.displayEmail,image:t.profilePicture,major:t.major};return a});t(s),console.log(r)};e()},[]),(0,r.jsxs)("section",{className:"p-16",children:[(0,r.jsx)("h1",{className:"text-4xl font-bold text-center my-8",children:"Meet the Brothers of the Lambda Gamma Chapter!"}),(0,r.jsx)("div",{className:"grid grid-cols-1 gap-4 md:grid-cols-3 justify-items-center items-center",children:e.map((e,t)=>(0,r.jsx)(n,{brother:e},t))})]})}},6514:function(e,t,a){"use strict";a.d(t,{db:function(){return i},l:function(){return n}});var r=a(994),s=a(4086);let n=(0,r.ZF)({apiKey:"AIzaSyAXWZ2GUKOBaRi10YQWzMqw1-s5krK2ZSQ",authDomain:"theta-tau-lambda-gamma.firebaseapp.com",projectId:"theta-tau-lambda-gamma",storageBucket:"theta-tau-lambda-gamma.appspot.com",messagingSenderId:"786566986467",appId:"1:786566986467:web:e3501dfdb368e5d45e23d6",measurementId:"G-87T7K6GX57"}),i=(0,s.ad)(n)},622:function(e,t,a){"use strict";/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var r=a(2265),s=Symbol.for("react.element"),n=(Symbol.for("react.fragment"),Object.prototype.hasOwnProperty),i=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function o(e,t,a){var r,o={},c=null,m=null;for(r in void 0!==a&&(c=""+a),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(m=t.ref),t)n.call(t,r)&&!l.hasOwnProperty(r)&&(o[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps)void 0===o[r]&&(o[r]=t[r]);return{$$typeof:s,type:e,key:c,ref:m,props:o,_owner:i.current}}t.jsx=o,t.jsxs=o},7437:function(e,t,a){"use strict";e.exports=a(622)}},function(e){e.O(0,[358,222,99,971,596,744],function(){return e(e.s=3355)}),_N_E=e.O()}]);