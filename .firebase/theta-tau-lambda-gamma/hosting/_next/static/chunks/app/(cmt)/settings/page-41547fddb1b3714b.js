(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[294],{1076:function(e,t,a){Promise.resolve().then(a.bind(a,2048)),Promise.resolve().then(a.bind(a,4434))},4434:function(e,t,a){"use strict";a.r(t),a.d(t,{ProfileForm:function(){return Z}});var s=a(7437),r=a(2265),n=a(4033),o=a(7982),i=a(3085),l=a(4086),d=a(8110),c=a(1865),u=a(4578),m=a(3378),f=a(7256),p=a(2703),x=a(8020);let g=c.RV,h=r.createContext({}),b=e=>{let{...t}=e;return(0,s.jsx)(h.Provider,{value:{name:t.name},children:(0,s.jsx)(c.Qr,{...t})})},y=()=>{let e=r.useContext(h),t=r.useContext(j),{getFieldState:a,formState:s}=(0,c.Gc)(),n=a(e.name,s);if(!e)throw Error("useFormField should be used within <FormField>");let{id:o}=t;return{id:o,name:e.name,formItemId:"".concat(o,"-form-item"),formDescriptionId:"".concat(o,"-form-item-description"),formMessageId:"".concat(o,"-form-item-message"),...n}},j=r.createContext({}),N=r.forwardRef((e,t)=>{let{className:a,...n}=e,o=r.useId();return(0,s.jsx)(j.Provider,{value:{id:o},children:(0,s.jsx)("div",{ref:t,className:(0,p.cn)("space-y-2",a),...n})})});N.displayName="FormItem";let v=r.forwardRef((e,t)=>{let{className:a,...r}=e,{error:n,formItemId:o}=y();return(0,s.jsx)(x._,{ref:t,className:(0,p.cn)(n&&"text-destructive",a),htmlFor:o,...r})});v.displayName="FormLabel";let w=r.forwardRef((e,t)=>{let{...a}=e,{error:r,formItemId:n,formDescriptionId:o,formMessageId:i}=y();return(0,s.jsx)(f.g7,{ref:t,id:n,"aria-describedby":r?"".concat(o," ").concat(i):"".concat(o),"aria-invalid":!!r,...a})});w.displayName="FormControl";let I=r.forwardRef((e,t)=>{let{className:a,...r}=e,{formDescriptionId:n}=y();return(0,s.jsx)("p",{ref:t,id:n,className:(0,p.cn)("text-sm text-muted-foreground",a),...r})});I.displayName="FormDescription";let S=r.forwardRef((e,t)=>{let{className:a,children:r,...n}=e,{error:o,formMessageId:i}=y(),l=o?String(null==o?void 0:o.message):r;return l?(0,s.jsx)("p",{ref:t,id:i,className:(0,p.cn)("text-sm font-medium text-destructive",a),...n,children:l}):null});S.displayName="FormMessage";var T=a(1958),D=a(4606);let _=T.fC,A=T.xz,E=T.h_;T.x8;let k=r.forwardRef((e,t)=>{let{className:a,...r}=e;return(0,s.jsx)(T.aV,{ref:t,className:(0,p.cn)("fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",a),...r})});k.displayName=T.aV.displayName;let R=r.forwardRef((e,t)=>{let{className:a,children:r,...n}=e;return(0,s.jsxs)(E,{children:[(0,s.jsx)(k,{}),(0,s.jsxs)(T.VY,{ref:t,className:(0,p.cn)("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full",a),...n,children:[r,(0,s.jsxs)(T.x8,{className:"absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",children:[(0,s.jsx)(D.C7Q,{className:"h-4 w-4"}),(0,s.jsx)("span",{className:"sr-only",children:"Close"})]})]})]})});R.displayName=T.VY.displayName;let F=e=>{let{className:t,...a}=e;return(0,s.jsx)("div",{className:(0,p.cn)("flex flex-col space-y-1.5 text-center sm:text-left",t),...a})};F.displayName="DialogHeader";let O=e=>{let{className:t,...a}=e;return(0,s.jsx)("div",{className:(0,p.cn)("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",t),...a})};O.displayName="DialogFooter";let C=r.forwardRef((e,t)=>{let{className:a,...r}=e;return(0,s.jsx)(T.Dx,{ref:t,className:(0,p.cn)("text-lg font-semibold leading-none tracking-tight",a),...r})});C.displayName=T.Dx.displayName;let z=r.forwardRef((e,t)=>{let{className:a,...r}=e;return(0,s.jsx)(T.dk,{ref:t,className:(0,p.cn)("text-sm text-muted-foreground",a),...r})});z.displayName=T.dk.displayName;var M=a(3695),U=a(6606);let V=u.Ry({firstName:u.Z_().min(2,{message:"Display Name must be at least 2 characters."}).max(30,{message:"Display Name must not be longer than 30 characters."}),lastName:u.Z_().min(2,{message:"Display Name must be at least 2 characters."}).max(30,{message:"Display Name must not be longer than 30 characters."}),displayEmail:u.Z_({required_error:"Please select an email to display."}).email()}),P={firstName:"",lastName:"",displayEmail:""};function Z(){let{push:e}=(0,n.useRouter)(),t=(0,c.cI)({resolver:(0,d.F)(V),defaultValues:P,mode:"onChange"});return(0,r.useEffect)(()=>{(0,i.Aj)(o.I8,async a=>{if(a){let e=a.uid,s=await (0,l.QT)((0,l.JU)(o.db,"users",e));if(console.log("RUNNING USERDATA STUFF"),console.log("UID: ",e),s.exists()){console.log("Document data:",s.data());let e=s.data();t.reset(e)}}else e("/login")})},[]),(0,s.jsxs)(g,{...t,children:[(0,s.jsxs)(_,{children:[(0,s.jsx)(A,{asChild:!0,children:(0,s.jsx)(m.z,{variant:"outline",children:"Edit Profile"})}),(0,s.jsxs)(R,{className:"sm:max-w-[425px]",children:[(0,s.jsxs)(F,{children:[(0,s.jsx)(C,{children:"Edit profile"}),(0,s.jsx)(z,{children:"Make changes to your profile here. Click save when you're done."})]}),(0,s.jsxs)("div",{className:"grid gap-4 py-4",children:[(0,s.jsxs)("div",{className:"grid grid-cols-4 items-center gap-4",children:[(0,s.jsx)(x._,{htmlFor:"name",className:"text-right",children:"Name"}),(0,s.jsx)(M.I,{id:"name",defaultValue:"Pedro Duarte",className:"col-span-3"})]}),(0,s.jsxs)("div",{className:"grid grid-cols-4 items-center gap-4",children:[(0,s.jsx)(x._,{htmlFor:"username",className:"text-right",children:"Username"}),(0,s.jsx)(M.I,{id:"username",defaultValue:"@peduarte",className:"col-span-3"})]})]}),(0,s.jsx)(O,{children:(0,s.jsx)(m.z,{type:"submit",children:"Save changes"})})]})]}),(0,s.jsxs)("form",{onSubmit:t.handleSubmit(function(e){(0,U.Am)({title:"You submitted the following values:",description:(0,s.jsx)("pre",{className:"mt-2 w-[340px] rounded-md bg-slate-950 p-4",children:(0,s.jsx)("code",{className:"text-white",children:JSON.stringify(e,null,2)})})})}),className:"space-y-8",children:[(0,s.jsx)(v,{children:"Display Name"}),(0,s.jsxs)("div",{className:"grid grid-cols-1 gap-x-4 gap-y-2 w-full md:grid-cols-2",style:{marginTop:"8px"},children:[(0,s.jsx)(b,{control:t.control,name:"firstName",render:e=>{let{field:t}=e;return(0,s.jsxs)(N,{children:[(0,s.jsx)(w,{children:(0,s.jsx)(M.I,{autocomplete:"given-name",placeholder:"First",...t})}),(0,s.jsx)(S,{})]})}}),(0,s.jsx)(b,{control:t.control,name:"lastName",render:e=>{let{field:t}=e;return(0,s.jsxs)(N,{children:[(0,s.jsx)(w,{children:(0,s.jsx)(M.I,{autocomplete:"family-name",placeholder:"Last",...t})}),(0,s.jsx)(S,{})]})}})]}),(0,s.jsx)(I,{style:{marginTop:"8px"},children:"This is your public name. It can be your real name or a pseudonym."}),(0,s.jsx)(b,{control:t.control,name:"displayEmail",render:e=>{let{field:t}=e;return(0,s.jsxs)(N,{children:[(0,s.jsx)(v,{children:"Display Email"}),(0,s.jsx)(w,{children:(0,s.jsx)(M.I,{placeholder:"johndoe@clemson.edu",...t})}),(0,s.jsx)(I,{children:'This email will be displayed on the "brothers" portion of the website.'}),(0,s.jsx)(S,{})]})}}),(0,s.jsx)(m.z,{type:"submit",children:"Update profile"})]})]})}},3378:function(e,t,a){"use strict";a.d(t,{d:function(){return l},z:function(){return d}});var s=a(7437),r=a(2265),n=a(7256),o=a(6061),i=a(2703);let l=(0,o.j)("inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),d=r.forwardRef((e,t)=>{let{className:a,variant:r,size:o,asChild:d=!1,...c}=e,u=d?n.g7:"button";return(0,s.jsx)(u,{className:(0,i.cn)(l({variant:r,size:o,className:a})),ref:t,...c})});d.displayName="Button"},3695:function(e,t,a){"use strict";a.d(t,{I:function(){return o}});var s=a(7437),r=a(2265),n=a(2703);let o=r.forwardRef((e,t)=>{let{className:a,type:r,...o}=e;return(0,s.jsx)("input",{type:r,className:(0,n.cn)("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",a),ref:t,...o})});o.displayName="Input"},8020:function(e,t,a){"use strict";a.d(t,{_:function(){return d}});var s=a(7437),r=a(2265),n=a(6743),o=a(6061),i=a(2703);let l=(0,o.j)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),d=r.forwardRef((e,t)=>{let{className:a,...r}=e;return(0,s.jsx)(n.f,{ref:t,className:(0,i.cn)(l(),a),...r})});d.displayName=n.f.displayName},2048:function(e,t,a){"use strict";a.r(t),a.d(t,{Separator:function(){return i}});var s=a(7437),r=a(2265),n=a(6823),o=a(2703);let i=r.forwardRef((e,t)=>{let{className:a,orientation:r="horizontal",decorative:i=!0,...l}=e;return(0,s.jsx)(n.f,{ref:t,decorative:i,orientation:r,className:(0,o.cn)("shrink-0 bg-border","horizontal"===r?"h-[1px] w-full":"h-full w-[1px]",a),...l})});i.displayName=n.f.displayName},6606:function(e,t,a){"use strict";a.d(t,{Am:function(){return u},pm:function(){return m}});var s=a(2265);let r=0,n=new Map,o=e=>{if(n.has(e))return;let t=setTimeout(()=>{n.delete(e),c({type:"REMOVE_TOAST",toastId:e})},1e6);n.set(e,t)},i=(e,t)=>{switch(t.type){case"ADD_TOAST":return{...e,toasts:[t.toast,...e.toasts].slice(0,1)};case"UPDATE_TOAST":return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case"DISMISS_TOAST":{let{toastId:a}=t;return a?o(a):e.toasts.forEach(e=>{o(e.id)}),{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,open:!1}:e)}}case"REMOVE_TOAST":if(void 0===t.toastId)return{...e,toasts:[]};return{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)}}},l=[],d={toasts:[]};function c(e){d=i(d,e),l.forEach(e=>{e(d)})}function u(e){let{...t}=e,a=(r=(r+1)%Number.MAX_VALUE).toString(),s=()=>c({type:"DISMISS_TOAST",toastId:a});return c({type:"ADD_TOAST",toast:{...t,id:a,open:!0,onOpenChange:e=>{e||s()}}}),{id:a,dismiss:s,update:e=>c({type:"UPDATE_TOAST",toast:{...e,id:a}})}}function m(){let[e,t]=s.useState(d);return s.useEffect(()=>(l.push(t),()=>{let e=l.indexOf(t);e>-1&&l.splice(e,1)}),[e]),{...e,toast:u,dismiss:e=>c({type:"DISMISS_TOAST",toastId:e})}}},7982:function(e,t,a){"use strict";a.d(t,{I8:function(){return l},db:function(){return d}});var s=a(994),r=a(3085),n=a(4086),o=a(9584);let i=0===(0,s.C6)().length?(0,s.ZF)({apiKey:"AIzaSyAXWZ2GUKOBaRi10YQWzMqw1-s5krK2ZSQ",authDomain:"theta-tau-lambda-gamma.firebaseapp.com",projectId:"theta-tau-lambda-gamma",storageBucket:"theta-tau-lambda-gamma.appspot.com",messagingSenderId:"786566986467",appId:"1:786566986467:web:e3501dfdb368e5d45e23d6",measurementId:"G-87T7K6GX57"}):(0,s.C6)()[0],l=(0,r.v0)(i),d=(0,n.ad)(i);(0,o.cF)(i)},2703:function(e,t,a){"use strict";a.d(t,{cn:function(){return n}});var s=a(7042),r=a(3986);function n(){for(var e=arguments.length,t=Array(e),a=0;a<e;a++)t[a]=arguments[a];return(0,r.m)((0,s.W)(t))}}},function(e){e.O(0,[447,358,214,526,266,348,783,971,596,744],function(){return e(e.s=1076)}),_N_E=e.O()}]);