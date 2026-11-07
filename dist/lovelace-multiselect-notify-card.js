"use strict";(()=>{var Ht=Object.defineProperty;var Ut=Object.getOwnPropertyDescriptor;var f=(r,t,e,s)=>{for(var i=s>1?void 0:s?Ut(t,e):t,o=r.length-1,n;o>=0;o--)(n=r[o])&&(i=(s?n(t,e,i):n(i))||i);return s&&i&&Ht(t,e,i),i};var K="lovelace-multiselect-notify-card",V="lovelace-multiselect-notify-card-editor",k="Send Notification",P="Home Assistant Notification",R="Enter your message",J="send_message";var Z=globalThis,Q=Z.ShadowRoot&&(Z.ShadyCSS===void 0||Z.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,nt=Symbol(),mt=new WeakMap,U=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==nt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(Q&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=mt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&mt.set(e,t))}return t}toString(){return this.cssText}},gt=r=>new U(typeof r=="string"?r:r+"",void 0,nt),D=(r,...t)=>{let e=r.length===1?r[0]:t.reduce((s,i,o)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[o+1],r[0]);return new U(e,r,nt)},_t=(r,t)=>{if(Q)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=Z.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},ot=Q?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return gt(e)})(r):r;var{is:Dt,defineProperty:Mt,getOwnPropertyDescriptor:It,getOwnPropertyNames:Nt,getOwnPropertySymbols:jt,getPrototypeOf:zt}=Object,b=globalThis,vt=b.trustedTypes,Ft=vt?vt.emptyScript:"",qt=b.reactiveElementPolyfillSupport,M=(r,t)=>r,I={toAttribute(r,t){switch(t){case Boolean:r=r?Ft:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},X=(r,t)=>!Dt(r,t),yt={attribute:!0,type:String,converter:I,reflect:!1,useDefault:!1,hasChanged:X};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),b.litPropertyMetadata??(b.litPropertyMetadata=new WeakMap);var $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=yt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Mt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:o}=It(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:i,set(n){let a=i?.call(this);o?.call(this,n),this.requestUpdate(t,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??yt}static _$Ei(){if(this.hasOwnProperty(M("elementProperties")))return;let t=zt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(M("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(M("properties"))){let e=this.properties,s=[...Nt(e),...jt(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(ot(i))}else t!==void 0&&e.push(ot(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return _t(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let o=(s.converter?.toAttribute!==void 0?s.converter:I).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let o=s.getPropertyOptions(i),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:I;this._$Em=i;let a=n.fromAttribute(e,o.type);this[i]=a??this._$Ej?.get(i)??a,this._$Em=null}}requestUpdate(t,e,s,i=!1,o){if(t!==void 0){let n=this.constructor;if(i===!1&&(o=this[t]),s??(s=n.getPropertyOptions(t)),!((s.hasChanged??X)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},n){s&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,n??e??this[t]),o!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[i,o]of this._$Ep)this[i]=o;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,o]of s){let{wrapped:n}=o,a=this[i];n!==!0||this._$AL.has(i)||a===void 0||this.C(i,void 0,o,a)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[M("elementProperties")]=new Map,$[M("finalized")]=new Map,qt?.({ReactiveElement:$}),(b.reactiveElementVersions??(b.reactiveElementVersions=[])).push("2.1.2");var j=globalThis,$t=r=>r,Y=j.trustedTypes,At=Y?Y.createPolicy("lit-html",{createHTML:r=>r}):void 0,wt="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,Ct="?"+E,Gt=`<${Ct}>`,T=document,z=()=>T.createComment(""),F=r=>r===null||typeof r!="object"&&typeof r!="function",ut=Array.isArray,Bt=r=>ut(r)||typeof r?.[Symbol.iterator]=="function",at=`[ 	
\f\r]`,N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,bt=/-->/g,Et=/>/g,x=RegExp(`>|${at}(?:([^\\s"'>=/]+)(${at}*=${at}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),xt=/'/g,St=/"/g,kt=/^(?:script|style|textarea|title)$/i,ft=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),m=ft(1),ie=ft(2),re=ft(3),w=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),Tt=new WeakMap,S=T.createTreeWalker(T,129);function Pt(r,t){if(!ut(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return At!==void 0?At.createHTML(t):t}var Wt=(r,t)=>{let e=r.length-1,s=[],i,o=t===2?"<svg>":t===3?"<math>":"",n=N;for(let a=0;a<e;a++){let l=r[a],c,p,h=-1,u=0;for(;u<l.length&&(n.lastIndex=u,p=n.exec(l),p!==null);)u=n.lastIndex,n===N?p[1]==="!--"?n=bt:p[1]!==void 0?n=Et:p[2]!==void 0?(kt.test(p[2])&&(i=RegExp("</"+p[2],"g")),n=x):p[3]!==void 0&&(n=x):n===x?p[0]===">"?(n=i??N,h=-1):p[1]===void 0?h=-2:(h=n.lastIndex-p[2].length,c=p[1],n=p[3]===void 0?x:p[3]==='"'?St:xt):n===St||n===xt?n=x:n===bt||n===Et?n=N:(n=x,i=void 0);let g=n===x&&r[a+1].startsWith("/>")?" ":"";o+=n===N?l+Gt:h>=0?(s.push(c),l.slice(0,h)+wt+l.slice(h)+E+g):l+E+(h===-2?a:g)}return[Pt(r,o+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},q=class r{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,n=0,a=t.length-1,l=this.parts,[c,p]=Wt(t,e);if(this.el=r.createElement(c,s),S.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(i=S.nextNode())!==null&&l.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(let h of i.getAttributeNames())if(h.endsWith(wt)){let u=p[n++],g=i.getAttribute(h).split(E),C=/([.?@])?(.*)/.exec(u);l.push({type:1,index:o,name:C[2],strings:g,ctor:C[1]==="."?ct:C[1]==="?"?ht:C[1]==="@"?dt:L}),i.removeAttribute(h)}else h.startsWith(E)&&(l.push({type:6,index:o}),i.removeAttribute(h));if(kt.test(i.tagName)){let h=i.textContent.split(E),u=h.length-1;if(u>0){i.textContent=Y?Y.emptyScript:"";for(let g=0;g<u;g++)i.append(h[g],z()),S.nextNode(),l.push({type:2,index:++o});i.append(h[u],z())}}}else if(i.nodeType===8)if(i.data===Ct)l.push({type:2,index:o});else{let h=-1;for(;(h=i.data.indexOf(E,h+1))!==-1;)l.push({type:7,index:o}),h+=E.length-1}o++}}static createElement(t,e){let s=T.createElement("template");return s.innerHTML=t,s}};function O(r,t,e=r,s){if(t===w)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,o=F(t)?void 0:t._$litDirective$;return i?.constructor!==o&&(i?._$AO?.(!1),o===void 0?i=void 0:(i=new o(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=i:e._$Cl=i),i!==void 0&&(t=O(r,i._$AS(r,t.values),i,s)),t}var lt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??T).importNode(e,!0);S.currentNode=i;let o=S.nextNode(),n=0,a=0,l=s[0];for(;l!==void 0;){if(n===l.index){let c;l.type===2?c=new G(o,o.nextSibling,this,t):l.type===1?c=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(c=new pt(o,this,t)),this._$AV.push(c),l=s[++a]}n!==l?.index&&(o=S.nextNode(),n++)}return S.currentNode=T,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},G=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=O(this,t,e),F(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==w&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Bt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==d&&F(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=q.createElement(Pt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let o=new lt(i,this),n=o.u(this.options);o.p(e),this.T(n),this._$AH=o}}_$AC(t){let e=Tt.get(t.strings);return e===void 0&&Tt.set(t.strings,e=new q(t)),e}k(t){ut(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let o of t)i===e.length?e.push(s=new r(this.O(z()),this.O(z()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=$t(t).nextSibling;$t(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},L=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=d}_$AI(t,e=this,s,i){let o=this.strings,n=!1;if(o===void 0)t=O(this,t,e,0),n=!F(t)||t!==this._$AH&&t!==w,n&&(this._$AH=t);else{let a=t,l,c;for(t=o[0],l=0;l<o.length-1;l++)c=O(this,a[s+l],e,l),c===w&&(c=this._$AH[l]),n||(n=!F(c)||c!==this._$AH[l]),c===d?t=d:t!==d&&(t+=(c??"")+o[l+1]),this._$AH[l]=c}n&&!i&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ct=class extends L{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}},ht=class extends L{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}},dt=class extends L{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=O(this,t,e,0)??d)===w)return;let s=this._$AH,i=t===d&&s!==d||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==d&&(s===d||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},pt=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){O(this,t)}};var Kt=j.litHtmlPolyfillSupport;Kt?.(q,G),(j.litHtmlVersions??(j.litHtmlVersions=[])).push("3.3.3");var Rt=(r,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let o=e?.renderBefore??null;s._$litPart$=i=new G(t.insertBefore(z(),o),o,void 0,e??{})}return i._$AI(r),i};var B=globalThis,v=class extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Rt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return w}};v._$litElement$=!0,v.finalized=!0,B.litElementHydrateSupport?.({LitElement:v});var Vt=B.litElementPolyfillSupport;Vt?.({LitElement:v});(B.litElementVersions??(B.litElementVersions=[])).push("4.2.2");var tt=r=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(r,t)}):customElements.define(r,t)};var Jt={attribute:!0,type:String,converter:I,reflect:!1,hasChanged:X},Zt=(r=Jt,t,e)=>{let{kind:s,metadata:i}=e,o=globalThis.litPropertyMetadata.get(i);if(o===void 0&&globalThis.litPropertyMetadata.set(i,o=new Map),s==="setter"&&((r=Object.create(r)).wrapped=!0),o.set(e.name,r),s==="accessor"){let{name:n}=e;return{set(a){let l=t.get.call(this);t.set.call(this,a),this.requestUpdate(n,l,r,!0,a)},init(a){return a!==void 0&&this.C(n,void 0,r,a),a}}}if(s==="setter"){let{name:n}=e;return function(a){let l=this[n];t.call(this,a),this.requestUpdate(n,l,r,!0,a)}}throw Error("Unsupported decorator location: "+s)};function H(r){return(t,e)=>typeof e=="object"?Zt(r,t,e):((s,i,o)=>{let n=i.hasOwnProperty(o);return i.constructor.createProperty(o,s),n?Object.getOwnPropertyDescriptor(i,o):void 0})(r,t,e)}function y(r){return H({...r,state:!0,attribute:!1})}function it(r){if(!r)return[];let t=e=>{let s=e.service??e.entity;if(typeof s!="string"||!s.trim())return null;let i=typeof e.label=="string"?e.label:"";return{service:s.trim(),label:i}};if(typeof r=="string")return r.trim()?[{service:r.trim(),label:""}]:[];if(Array.isArray(r))return r.flatMap(e=>{if(typeof e=="string")return e.trim()?[{service:e.trim(),label:""}]:[];if(e&&typeof e=="object"){let s=t(e);return s?[s]:[]}return[]});if(typeof r=="object"){let e=t(r);return e?[e]:[]}return[]}function rt(r){let t=(r??"").trim();if(!t)return null;if(t.includes(".")){let[e,s]=t.split(".",2);return!e||!s?null:{domain:e,service:s}}return{domain:"notify",service:t}}function st(r){if(!r)return"";let t=r;return t.startsWith("mobile_app_")&&(t=t.slice(11)),t.replace(/[._]/g," ").split(" ").filter(Boolean).map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" ")}function W(r,t){if(t.label&&t.label.trim())return t.label.trim();let e=rt(t.service);if(!e)return t.service;if(e.domain==="notify"){let i=r?.states?.[`notify.${e.service}`]?.attributes?.friendly_name;return typeof i=="string"&&i.trim()?i.trim():st(e.service)||t.service}return st(t.service)||t.service}function Ot(r,t,e){let s=rt(t);if(!s)return{error:`Invalid target service: ${t}`};let i={message:e.message};if(e.title&&(i.title=e.title),e.data&&Object.keys(e.data).length>0&&(i.data=e.data),s.domain!=="notify")return e.entity&&(i.entity_id=e.entity),{promise:r.callService(s.domain,s.service,i)};let o=`notify.${s.service}`;return r.states?.[o]?{promise:r.callService("notify",J,i,{entity_id:o})}:r.services?.notify?.[s.service]?{promise:r.callService("notify",s.service,i)}:{error:`Unknown notification target: ${o}`}}function Lt(r,t,e){r.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}var A=class extends v{constructor(){super(...arguments);this._filter="";this._custom=""}setConfig(e){this._config={...e,targets:it(e?.targets)},this._filter="",this._custom=""}_emit(e){this._config=e,Lt(this,"config-changed",{config:e})}_setField(e,s){let i={...this._config,[e]:s};e==="message_placeholder"&&(i.label=s),this._emit(i)}_setLabel(e,s){let i=[...this._config?.targets??[]],o=i.findIndex(n=>n.service===e);o<0||(i[o]={...i[o],label:s},this._emit({...this._config,targets:i}))}_toggleTarget(e){let s=[...this._config?.targets??[]],i=s.findIndex(o=>o.service===e);i>=0?s.splice(i,1):s.push({service:e,label:""}),this._emit({...this._config,targets:s})}_availableTargets(){let e=this.hass,s=new Map,i=e?.states??{},o=e?.services?.notify??{};for(let n of Object.keys(o)){if(n===J)continue;let a=`notify.${n}`;s.set(n,{key:n,entity:i[a]?a:null,legacyOnly:!i[a]})}for(let n of Object.keys(i)){if(!n.startsWith("notify."))continue;let a=n.slice(7);s.has(a)||s.set(a,{key:a,entity:n,legacyOnly:!1})}return[...s.values()].sort((n,a)=>n.legacyOnly!==a.legacyOnly?n.legacyOnly?1:-1:n.key.localeCompare(a.key))}_optionName(e){let s=e.entity?this.hass?.states?.[e.entity]?.attributes?.friendly_name:void 0;return typeof s=="string"&&s.trim()?s.trim():st(e.key)||e.key}_addCustom(){let e=this._custom.trim();if(!e)return;let s=e;e.startsWith("notify.")&&(s=e.slice(7));let i=rt(s);if(!i)return;let o=i.domain==="notify"?i.service:`${i.domain}.${i.service}`,n=[...this._config?.targets??[]];n.some(a=>a.service===o)||(n.push({service:o,label:""}),this._emit({...this._config,targets:n})),this._custom=""}render(){let e=this._config;if(!e)return m``;let s=new Set((e.targets??[]).map(n=>n.service)),i=this._filter.trim().toLowerCase(),o=this._availableTargets().filter(n=>!i||n.key.toLowerCase().includes(i)||this._optionName(n).toLowerCase().includes(i));return m`
      <div class="wrap">
        <ha-input
          label="Card title"
          .value=${e.card_title??k}
          @input=${n=>this._setField("card_title",n.target.value)}
        ></ha-input>

        <ha-input
          label="Message placeholder"
          .value=${e.message_placeholder??e.label??R}
          @input=${n=>this._setField("message_placeholder",n.target.value)}
        ></ha-input>

        <ha-input
          label="Default notification title"
          .value=${e.notification_title??P}
          @input=${n=>this._setField("notification_title",n.target.value)}
        ></ha-input>

        <div class="hint">
          Pick the notification targets offered on the card. Entity-backed targets use the
          notify.send_message action; legacy targets fall back to their notify service.
          Labels are inferred automatically and can be overridden below.
        </div>

        <ha-input
          label="Filter targets"
          .value=${this._filter}
          @input=${n=>this._filter=n.target.value}
        ></ha-input>

        <div class="target-list">
          ${o.length===0?m`<div class="hint">
                No notification targets found${i?" for this filter":""}.
              </div>`:d}
          ${o.map(n=>{let a=s.has(n.key),l=(e.targets??[]).find(c=>c.service===n.key)?.label??"";return m`
              <div class="target-row">
                <ha-checkbox
                  .checked=${a}
                  @change=${()=>this._toggleTarget(n.key)}
                  aria-label=${this._optionName(n)}
                ></ha-checkbox>
                <div class="target-name">
                  <div class="name">${this._optionName(n)}</div>
                  <div class="key">${n.key}${n.legacyOnly?" (legacy)":""}</div>
                </div>
                ${a?m`<ha-input
                      class="label-input"
                      label="Label override"
                      .value=${l}
                      @input=${c=>this._setLabel(n.key,c.target.value)}
                    ></ha-input>`:d}
              </div>
            `})}
        </div>

        <div class="custom-row">
          <ha-input
            label="Add custom target"
            placeholder="notify.mobile_app_phone or script.notify_tv"
            .value=${this._custom}
            @input=${n=>this._custom=n.target.value}
            @keydown=${n=>{n.code==="Enter"&&(n.preventDefault(),this._addCustom())}}
          ></ha-input>
          <ha-button appearance="outlined" variant="brand" @click=${()=>this._addCustom()}>
            Add
          </ha-button>
        </div>
      </div>
    `}};A.styles=D`
    :host {
      display: block;
    }
    .wrap {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    ha-input {
      width: 100%;
    }
    .hint {
      color: var(--secondary-text-color);
      font-size: 0.9em;
      line-height: 1.4;
    }
    .target-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      padding: 12px;
      max-height: 280px;
      overflow: auto;
    }
    .target-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .target-name {
      flex: 1;
      min-width: 0;
    }
    .target-name .name {
      font-size: 1em;
    }
    .target-name .key {
      font-family: var(--ha-font-family-code, monospace);
      font-size: 0.85em;
      color: var(--secondary-text-color);
      word-break: break-all;
    }
    .legacy-badge {
      color: var(--warning-color, var(--secondary-text-color));
      font-size: 0.8em;
    }
    .label-input {
      width: 200px;
      flex-shrink: 0;
    }
    .custom-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .custom-row ha-input {
      flex: 1;
    }
  `,f([H({attribute:!1})],A.prototype,"hass",2),f([y()],A.prototype,"_config",2),f([y()],A.prototype,"_filter",2),f([y()],A.prototype,"_custom",2),A=f([tt(V)],A);var _=class extends v{constructor(){super(...arguments);this._message="";this._title="";this._selected=new Set;this._error=""}static getConfigElement(){return document.createElement(V)}static getStubConfig(e=[]){let s=e.find(i=>i.startsWith("notify."));return{card_title:k,notification_title:P,message_placeholder:R,targets:s?[{service:s.slice(7),label:""}]:[]}}setConfig(e){let s=it(e?.targets),i=e?.message_placeholder??e?.label??R;this._config={...e,card_title:e?.card_title??k,notification_title:e?.notification_title??P,message_placeholder:String(i),label:String(i),targets:s},this._title=this._config.notification_title??P,this._message="",this._selected=new Set,this._error=""}getCardSize(){let e=this._config?.targets?.length??0;return Math.max(3,2+e)}_onToggle(e){let s=new Set(this._selected);s.has(e)?s.delete(e):s.add(e),this._selected=s}_onTitle(e){this._title=e.target.value??""}_onMessage(e){this._message=e.target.value??""}_onKeydown(e){e.code==="Enter"&&e.ctrlKey&&(e.preventDefault(),this._send())}async _send(){let e=this.hass,s=this._config;if(!e||!s)return;let i=this._message.trim();if(!i)return;let o=(s.targets??[]).filter(u=>this._selected.has(u.service));if(o.length===0)return;let n=this._title.trim(),a=s.data,l=typeof s.entity=="string"?s.entity:void 0,c=[],p=[];for(let u of o){let g=Ot(e,u.service,{message:i,title:n,data:a,entity:l});if(g.error){c.push(W(e,u));continue}let C=W(e,u);p.push(g.promise.then(()=>null).catch(()=>({service:C})))}let h=await Promise.all(p);for(let u of h)u&&c.push(u.service);c.length>0?this._error=`Failed to send to: ${c.join(", ")}`:(this._error="",this._message="")}render(){let e=this._config;if(!e)return m``;let s=e.targets??[];return m`
      <ha-card .header=${e.card_title??k}>
        <div class="wrap">
          ${s.length===0?m`<div class="hint">
                No targets configured yet. Edit the card to pick notification targets.
              </div>`:m`
                <div class="targets">
                  ${s.map(i=>m`
                      <ha-checkbox
                        .checked=${this._selected.has(i.service)}
                        @change=${()=>this._onToggle(i.service)}
                        aria-label=${W(this.hass,i)}
                      >
                        ${W(this.hass,i)}
                      </ha-checkbox>
                    `)}
                </div>
              `}

          <ha-input
            label="Notification title"
            .value=${this._title}
            @input=${this._onTitle}
          ></ha-input>

          <!-- Native textarea: ha-textarea is not defined on dashboards (HA
               lazy-loads it only for config dialogs), so a custom card cannot
               rely on it. Styled below to match the HA form look. -->
          <textarea
            class="message"
            placeholder=${e.message_placeholder??R}
            .value=${this._message}
            @input=${this._onMessage}
            @keydown=${this._onKeydown}
            rows="4"
          ></textarea>

          ${this._error?m`<div class="error">
                <span>${this._error}</span>
                <button class="dismiss" @click=${()=>this._error=""}>
                  Dismiss
                </button>
              </div>`:d}

          <div class="actions">
            <ha-button appearance="filled" variant="brand" @click=${()=>{this._send()}}>
              Send
            </ha-button>
          </div>
        </div>
      </ha-card>
    `}};_.styles=D`
    :host {
      display: block;
    }
    .wrap {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 12px 16px 16px;
    }
    .targets {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .hint {
      color: var(--secondary-text-color);
      padding: 4px 0;
    }
    ha-input {
      width: 100%;
    }
    .message {
      width: 100%;
      box-sizing: border-box;
      min-height: 96px;
      padding: 12px 12px 10px;
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-border-radius-md, 10px);
      background: var(
        --ha-color-form-background,
        var(--secondary-background-color, transparent)
      );
      color: var(--primary-text-color);
      font: inherit;
      line-height: 1.4;
      resize: vertical;
      outline: none;
    }
    .message::placeholder {
      color: var(--secondary-text-color);
    }
    .message:focus {
      border-color: var(--primary-color);
    }
    .error {
      color: var(--error-color);
      font-size: 0.9em;
      background: color-mix(in srgb, var(--error-color) 10%, transparent);
      border-radius: 8px;
      padding: 8px 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
    }
    .dismiss {
      background: none;
      border: none;
      color: var(--error-color);
      cursor: pointer;
      text-decoration: underline;
      font-size: inherit;
      padding: 0;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
    }
  `,f([H({attribute:!1})],_.prototype,"hass",2),f([y()],_.prototype,"_config",2),f([y()],_.prototype,"_message",2),f([y()],_.prototype,"_title",2),f([y()],_.prototype,"_selected",2),f([y()],_.prototype,"_error",2),_=f([tt(K)],_);window.customCards=window.customCards??[];window.customCards.push({type:K,name:"Multi-Notify Card",description:"Send a notification to one or more notify targets, with a visual editor.",preview:!0});})();
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
