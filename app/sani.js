var Animator=function(){"use strict";var h=Math.sqrt;var k=Math.min;var X=Math.max;function a(c,a){const b=X(c,a);const d=k(c,a);let e=b;for(;0!=e%d;)e+=b;return e}function b(b){if(2===b.degree)return b.throws;const c=[];const d=a(b.throws.length,2);for(let a=0;a<d;a++){const d=[[],[]];const e=b.throws[a%b.throws.length][0].map(b=>({value:b.value,from:a%2,to:(a+b.value)%2}));d[a%2]=e,c.push(d)}return c}function c(a,b,c){return X(b,k(c,a))}function d(d,e){var f=Math.abs;const g=Array(e.props).fill().map(()=>new aa(d.ballColor));const i=d.beatDuration*e.degree;let l=0;let m=0;const o=250;const p=350-200*f(.5-d.dwell)+15*(e.greatestValue-3);const q=500+p;const r=3-e.degree;const s=.1*r;const t=X(s,k(.9*r,d.dwell*r));const u=b(e);const v=a(u.length,e.strictStates.length);for(let a=0;a<v;a++){const b=u[a%u.length];const n=e.strictStates[a%e.strictStates.length];const p=b.map(a=>a.reduce((a,b)=>{const c=`${b.value}-${b.to}`;return a[c]=(a[c]||0)+1,a},{}));const r=X(...p.map(a=>X(...Object.keys(a).map(b=>a[b]))));let v=t;if(1<=t){const a=p.reduce((a,b)=>X(a,b["1-0"]||0,b["1-1"]||0),0);0<a&&(v=1-s)}for(let a=0;2>a;a++){const h=b[a];const t=k(...h.map(({value:a})=>a));const u=ca.s(0,-da.y,.5*(t-v)*i);for(let b=0;b<h.length;b++){const j=h[b];if(0===j.value)continue;const w=g[n[a%e.degree][0][b]-1];const x=1===r?0:k(s,(v-s)/(r-1));const y=--p[a][`${j.value}-${j.to}`];let z=v-(r-1)*x;let A=x*y;let B=j.value-(A+z);z*=i,A*=i,B*=i;let C;let D;const E=c(o-100*f(.5-d.dwell),150,o)-(2===t?50:0);const F=.5*d.ballRadius;const G=k(1e3,500+30*e.greatestValue);const H=c(.5*z+20*e.greatestValue,F,G);let I=.3*H+.7*H*t/e.greatestValue;I=k(3*z,I),I=k(2===t?100:.5*u,I),C=0===j.from?0:q,D=0===j.from?E:q-E,d.reversed&&([C,D]=[D,C]),w.animations.push({type:"catch",duration:z,width:D-C,yModifier:I/ea.maximum().y,position:{x:C,y:0},getPosition:fa.catch});const J=ca.s(0,-da.y,B/2);C=0===j.from?E:q-E,D=0===j.to?0:q,d.reversed&&(j.from===j.to?[C,D]=[D,C]:(C+=0===j.from?-E:E,D+=0===j.from?-E:E)),w.animations.push({type:"throw",duration:B,position:{x:C,y:0},velocity:{x:(D-C)/B,y:ca.v(0,-da.y,J)},acceleration:da,getPosition:fa.throw}),0<A&&w.animations.push({type:"wait",duration:A,position:{x:D,y:0},getPosition:fa.wait}),J>l&&(l=J),I>m&&(m=I)}}}const[h]=e.strictStates;for(const a of h)for(let b=0;b<a.length;b++)for(const c of a[b])g[c-1].animations[-1]={type:"wait",duration:b*i,position:{x:null,y:null},getPosition:fa.wait};const j=l+m;return[g,{innerWidth:q,innerHeight:j,catchHeight:m}]}function e(a){const{context:b}=a;const{canvas:c}=b;const d=a[ga];d.multiplier=X(0,k(c.width/(d.innerWidth+2*d.ballRadius),c.height/(d.innerHeight+2*d.ballRadius)));const e={x:X(0,c.width-(d.innerWidth+2*d.ballRadius)*d.multiplier),y:X(0,c.height-(d.innerHeight+2*d.ballRadius)*d.multiplier)};const f={x:.5*e.x+d.ballRadius*d.multiplier,y:.5*e.y+d.ballRadius*d.multiplier};b.translate(f.x,c.height-f.y-d.catchHeight*d.multiplier),b.scale(1,-1)}function f(a){a.save(),a.setTransform(1,0,0,1,0,0),a.clearRect(0,0,a.canvas.width,a.canvas.height),a.restore()}function g(a,b){const{context:c}=a;const{canvas:d}=c;const g=a[ha];const h=a[ia];if((d.width!==d.clientWidth||d.height!==d.clientHeight)&&(d.width=d.clientWidth,d.height=d.clientHeight,e(a),a.paused))for(const a of h)a.draw(c,g);if(!a.paused){f(c);for(const a of h)a.update(b/g.slowdown),a.draw(c,g)}}var Y="undefined"==typeof window?"undefined"==typeof global?"undefined"==typeof self?{}:self:global:window;var Z=function(a,b){return b={exports:{}},a(b,b.exports),b.exports}(function(c){(function(d,a){c.exports=a()})(Y,function(){var G=Math.floor;var H=String.fromCharCode;function Y(f){if(!Z(f))throw new L("Invalid throws structure.");const a=f.map(b=>b.map(()=>0));for(let c=0;c<f.length;c++){const b=f[c];for(const g of b)for(const b of g)a[c][b.from]++,a[(c+b.value)%f.length][b.to]--}if(a.some(b=>b.some(b=>0!==b)))throw new L("Invalid siteswap.")}function Z(c){if(!Array.isArray(c)||!c.length)return!1;for(const e of c){if(!Array.isArray(e)||e.length!==c[0].length)return!1;if(e.some(b=>!Array.isArray(b)||!b.every(({value:b,from:a,to:c})=>void 0!==b&&void 0!==a&&void 0!==c&&a<e.length&&c<e.length)))return!1}return!0}function $(f,a){if(f.length!==a.length)return!1;for(let b=0;b<f.length;b++){const g=f[b],d=a[b];if(g.length!==d.length)return!1;for(let e=0;e<g.length;e++){const f=g[e],b=d[e];if(f.length!==b.length)return!1;for(let c=0;c<f.length;c++){const a=f[c],d=b[c];if(a.value!==d.value||a.from!==d.from||a.to!==d.to)return!1}}}return!0}function a(c){for(let a=1,b=K(c.length/2);a<=b;a++)if(0==c.length%a){const b=c.slice(0,a);for(let d=a;d<c.length;d+=a){const e=c.slice(d,d+a);if(!$(b,e))break;if(a+d===c.length)return c.length=a,c}}return c}function _(g){const a=[];for(let b=0;b<g.degree;b++)a.push(Array(g.greatestValue).fill(0));if(0===g.greatestValue)return new M(a);const{throws:b}=g;let h=0;for(let d=-1;;d--){const e=b[(d%b.length+b.length)%b.length];for(const b of e)for(const e of b){const b=d+e.value;if(!(0>b)&&(a[e.to][b]++,h++,h===g.props)){let b=g.greatestValue;for(;a.every(c=>0===c[b-1]);)b--;for(let c=0;c<g.degree;c++)a[c].length=b;return new M(a)}}}}function d(e){const a=[],b=_(e);let f=b;do for(const b of e.throws)a.push(f.schedule),f=f.advance(b);while(b!==f);return a}function f(f){const a=[],b=e(f.states[0]);let i=b;do for(const b of f.throws)a.push(i),i=g(i,b);while(!h(b,i));return a}function e(c){let a=0;return c.map(b=>b.map(b=>Array(b).fill().map(()=>++a)))}function g(g,a){const h=g.map(b=>b.slice(1).map(b=>[...b]));for(let f=0;f<a.length;f++){const c=a[f];if(c.length||!c.every(({value:d,to:a,from:b})=>0===d&&a===f&&b===f))for(let a=0;a<c.length;a++){const i=c[a];if(0>=i.value)continue;const b=g[i.from][0][a];for(let a=0;a<h.length;a++)for(let b=g[0].length-1;b<i.value;b++)h[a][b]||(h[a][b]=[]);h[i.to][i.value-1].push(b)}}return h}function h(f,a){if(f.length!==a.length)return!1;for(let b=0;b<f.length;b++){const g=f[b],d=a[b];if(g.length!==d.length)return!1;for(let e=0;e<g.length;e++){const f=g[e],b=d[e];if(f.length!==b.length)return!1;for(let c=0;c<f.length;c++)if(f[c]!==b[c])return!1}}return!0}function i(h,a,b,c,d){const e=b[c][d];for(const f of e){if(0===f.value)continue;const d=(c+f.value)%b.length;a[d][f.to]===h||(a[d][f.to]=h,i(h,a,b,d,f.to))}}function j(f){if(0===f.greatestValue)return[f];const{throws:g,notation:b}=f,h=[],j=g.map(b=>b.map(()=>null));for(let b=0;b<g.length;b++){const c=g[b];for(let d=0;d<c.length;d++){const a=c[d];if(null===j[b][d]&&(1!==a.length||0!==a[0].value)){const c=[];i(c,j,g,b,d),h.push(c)}}}if(1===h.length)return[f];for(let e=0;e<g.length;e++){const c=g[e];for(const f of h)f.push(c.map((b,a)=>j[e][a]===f?b:[{value:0,from:a,to:a}]))}return h.map(c=>new Siteswap(c,b))}function l(i){const a=[],b=[...i.throws],c=[...i.states],{notation:d}=i;let e=0;for(let f=1;f<=c.length;f++)for(let g=f-1;g>=e;g--)if(c[f%c.length]===c[g]){if(0==g&&f===c.length)return a.length?(m(a,new Siteswap(b.slice(g,f),d)),a):[i];e==g?(m(a,new Siteswap(b.slice(g,f),d)),e=f):(m(a,new Siteswap(b.splice(g,f-g),d)),c.splice(g,f-g),f=e);break}return a}function m(c,d){c.every(b=>!b.equals(d))&&c.push(d)}function b(c){if("string"!=typeof c)throw new Error("Expected string.");const a=c.charCodeAt(0);if(65<=a&&90>=a)return 36+a-N.A;if(97<=a&&122>=a)return 10+a-N.a;throw new Error("Expected alphabetic letter in [a-Z] range.")}function n(b){if("number"!=typeof b)throw new Error("Expected number.");if(10<=b&&35>=b)return J(b+N.a-10);if(36<=b&&61>=b)return J(b+N.A-36);throw new Error("Expected number in [10-61] range.")}function o(b){if("string"!=typeof b)throw new Error("Expected string.");if(!/^[a-zA-Z]+$/.test(b))throw new Error("Expected alphabetic string.");return[...b].reduce((e,a,b,{length:c})=>e+(a.charCodeAt(0)-N.A+1)*26**(c-b-1),0)-1}function c(c){if("number"!=typeof c)throw new Error("Expected number.");if(0>c)throw new Error("Expected number in [0, \u221E) range.");c++;const d=[];for(;0<c;)d.push(J(N.A+(c-1)%26)),c=K((c-1)/26);return d.reverse().join("")}function p(b){return+b}function q(f,c){const a=I(f,c),b=k(f,c);let d=a;for(;0!=d%b;)d+=a;return d}function r(b){return b.concat(b.map(b=>b.map(b=>[...b]).reverse()))}function s(c){for(const d of c)for(const c of d)for(let a=0;a<c.length;a++)c[a]={value:c[a],from:0,to:0};return c}function t(c){for(const d of c)for(let f=0;f<d.length;f++){const a=d[f];for(let c=0;c<a.length;c++){const{value:b,cross:d}=a[c];a[c]={value:b/2,from:f,to:d?1-f:f}}}return c}function u(e){const a=e.map(({length:b})=>b).reduce(q),f=[];for(let b=0;b<a;b++){const a=e.map(c=>c[b%c.length]).map((c,f)=>c.map(({value:b,hand:a,offset:c})=>{const d=void 0===c?a:f+c;return{value:b,from:f,to:d}}));f.push(a)}return f}function v(e){const a=e.map(({length:b})=>b).reduce(q),f=[];for(let b=0;b<a;b++){const a=e.map(c=>c[b%c.length][0]).map((c,e)=>c.map(({value:b,pass:a})=>{!0===a&&(a=2-e);const f=null===a?e:a-1;return{value:b,from:e,to:f}}));f.push(a)}return f}function w(e){const a=e.map(({length:b})=>b).reduce(q),f=[];for(let b=0;b<a;b++){const a=Array.prototype.concat(...e.map(c=>c[b%c.length])).map((c,f)=>c.map(({value:b,pass:a,cross:g})=>{!0===a&&(a=2-K(f/2));const d=(null===a?f:2*(a-1)+f%2)+(g?f%2?-1:1:0);return{value:b/2,from:f,to:d}}));f.push(a)}return f}function x(c,d=null){if(null===d){const a={};return a.immutables=[],a.terminals=new Set,c=x(c,a),c.immutables=a.immutables,c.terminals=[...a.terminals],c}if(null===c)return c;if("string"==typeof c){if(!R[c])throw new Error("Parsing error.");return x(R[c],d)}if(Array.isArray(c))return{symbols:c.map(b=>x(b,d))};if(c.fixed&&!c.value&&d.immutables.push(c),c.tokenType)return d.terminals.add(c),c;if("object"!=typeof c)throw new Error("Parsing error.");if(c.symbol)c.symbol=x(c.symbol,d);else if(c.symbols)c.symbols=c.symbols.map(b=>x(b,d));else if(c.repeat)c.repeat=c.repeat.map(b=>x(b,d));else if(c.either)c.either=c.either.map(b=>x(b,d));else if(c.allow)c.either=[x(c.allow,d),null],delete c.allow;else throw new Error("Parsing error.");return c}function y(g,a){const b=new RegExp(g.sort((b,c)=>b.index-c.index).map(({regex:b})=>`(${b})`).join("|"),"y"),c=[];for(;b.lastIndex<a.length;){const d=b.exec(a);if(null===d)return null;const e=d.findIndex((c,a)=>a&&c);c.push({type:g[e-1].tokenType,value:d[e]})}return c}function z(f){let e;if(null===f)return null;if(f.tokenType){const a=T[ca];if(!a||a.type!==f.tokenType)return S;if(f.fixed)if(!f.value)f.value=a.value;else if(a.value!==f.value)return S;e=a.value,ca++}else if(f.symbol){if(e=z(f.symbol),e===S)return S;}else if(f.symbols){e=[];for(const b of f.symbols){const c=z(b);if(c===S)return S;e.push(c)}}else if(f.repeat){for(e=[];e.length<f.max;){const a=ca,b=z({symbols:f.repeat});if(b===S){ca=a;break}e.push(b)}if(e.length<f.min||e.length>f.max)return S}else if(f.either){for(const a of f.either){const b=ca,c=z(a);if(c===S){ca=b;continue}const{processor:d}=f;if(f.fixed)if(void 0===f.value)f.value=a;else if(a!==f.value)return S;return d?d(c):c}return S}return f.processor?f.processor(e):e}function A(e,a){if(!e||!R[e])throw new Error("Parsing error.");"function"==typeof R[e]&&(R[e]=x(R[e]()));const b=R[e];for(const c of b.immutables)delete c.value;if(ca=0,T=y(b.terminals,a),!T||!T.length)return null;const c=z(b);return c===S||ca!==T.length?null:c}function B(c){const a=c.map(({value:f,from:a,to:b})=>{const c=a%2==b%2?"":"x",d=b===a||b===a+(a%2?-1:1)?"":`p${K(b/2)+1}`;return`${2*f}${c}${d}`}).join(",");return 1<c.length?`[${a}]`:a}function C(d,a){if(a=a.reduce((c,a)=>c.concat(Array.isArray(da[a])?da[a]:a),[]),"object"==typeof d){const[b]=a;if(("string"!=typeof b||!da[b])&&null!==b)throw new L("Unsupported notation.");return{notation:b,throws:d}}if(a.some(b=>"string"!=typeof b||!da[b]))throw new L("Unsupported notation.");for(const e of a){const a=da[e].parse(d);if(a)return{notation:e,throws:a}}throw new L("Invalid syntax.")}function D(b){return b.every(b=>b.every((d,a,{length:b})=>1===d||0===d&&a===b-1))}function E(i,a,b){for(let j=0;j<i.length;j++){const d=(j+b)%i.length;if(i[d].length!==a[j].length)return!1;for(let b=0;b<i[d].length;b++){if(i[d][b].length!==a[j][b].length)return!1;for(let c=0;c<i[d][b].length;c++){const e=i[d][b][c],f=a[j][b][c];if(e.value!==f.value||e.from!==f.from||e.to!==f.to)return!1}}}return!0}function F(c,d){return"string"!=typeof c&&(c=c.toString()),d++,c.length>=d?c:`${Array(d-c.length).join(" ")}${c}`}var I=X,J=H,K=G;class L extends Error{}L.prototype.name="SiteswapError";const aa={schedules:new Map,strings:new Map};class M{constructor(d){if(!Array.isArray(d)||!d.every(Array.isArray))throw new Error("Invalid schedule.");let a=aa.schedules.get(d);if(a)return a;const e=d.map(b=>b.join(",")).join("-");return a=aa.strings.get(e),a?a:void(aa.schedules.set(d,this),aa.strings.set(e,this),this.schedule=d)}advance(e){const f=this.schedule.map(b=>b.slice(1));for(let a=0;a<e.length;a++){const b=e[a];if(b.filter(({value:b})=>b).length!==(this.schedule[a][0]||0))throw new Error("Invalid action.");if(b.length)for(const{value:e,to:a}of b)if(!(0>=e)){f[a][e-1]=(f[a][e-1]||0)+1;for(let a=0;a<f.length;a++)for(let b=this.schedule[0].length-1;b<e;b++)f[a][b]||(f[a][b]=0)}}return new M(f)}}const N={a:97,A:65};let O=!0;const ba={ws(){return{allow:" "}},trim(c){const a=ba.ws();return{symbols:[a,c,a],processor:([,b])=>b}},separator(){if(O){const b=ba.ws();return{either:[{symbols:[b,",",b]}," "],fixed:!0}}return{either:[","," "],fixed:!0}},separated(d,a,b){return{symbols:[b,{repeat:[d,b],min:a-1,max:1/0}],processor:([c,[...a]])=>[c,...a.map(([,b])=>b)]}},release(d,a){const b=ba.separated(a,2,d);return{either:[{symbols:[d]},{symbols:["[",O?ba.trim(b):b,"]"],processor:([,b])=>b}]}},asyncSiteswap(c,a){return{symbol:ba.separated(a,1,ba.release(c,a)),processor:b=>b.map(b=>[b])}},syncSiteswap(f,a,b){const c=ba.ws(),d=ba.release(f,a);return O?{symbols:[ba.separated(c,1,{symbols:["(",c,d,b,d,c,")"],processor:([,,c,,a])=>[c,a]}),c,{allow:"*"}],processor:([c,,a])=>a?r(c):c}:{symbols:[ba.separated(null,1,{symbols:["(",d,b,d,")"],processor:([,c,,a])=>[c,a]}),{allow:"*"}],processor:([c,a])=>a?r(c):c}}},Q=[{tokenType:"[",regex:"\\["},{tokenType:"]",regex:"\\]"},{tokenType:"(",regex:"\\("},{tokenType:")",regex:"\\)"},{tokenType:"<",regex:"<"},{tokenType:">",regex:">"},{tokenType:"\n",regex:"\n"},{tokenType:"|",regex:"\\|"},{tokenType:"-",regex:"-"},{tokenType:",",regex:","},{tokenType:" ",regex:" +"},{tokenType:"*",regex:"\\*"},{tokenType:"x",regex:"x",processor:()=>!0},{tokenType:"pN",regex:"p(?:[1-9][0-9]*|0)",processor:b=>p(b.slice(1))},{tokenType:"p",regex:"p",processor:()=>!0},{tokenType:"digit",regex:"[0-9]",processor:p},{tokenType:"digit_even",regex:"[02468]",processor:p},{tokenType:"letter",regex:"[a-zA-Z]",processor:b},{tokenType:"letter_even",regex:"[acegikmoqsuwyACEGIKMOQSUWY]",processor:b},{tokenType:"letter_capital",regex:"[A-Z]"},{tokenType:"integer",regex:"[1-9][0-9]*|[0-9]",processor:p},{tokenType:"integer_even",regex:"[1-9][0-9]*[02468]|[02468]",processor:p}],R={standard_async:()=>(O=!0,{symbol:ba.trim(ba.asyncSiteswap("integer",ba.separator())),processor:s}),compressed_async:()=>(O=!1,{symbol:ba.trim(ba.asyncSiteswap({either:["digit","letter"]},null)),processor:s}),standard_sync:()=>{O=!0;const b=ba.separator();return{symbol:ba.trim(ba.syncSiteswap({symbols:["integer_even",{allow:"x"}],processor:([c,a])=>({value:c,cross:!!a})},b,b)),processor:t}},compressed_sync:()=>{O=!1;const b={allow:ba.separator(),fixed:!0};return{symbol:ba.trim(ba.syncSiteswap({symbols:[{either:["digit_even","letter_even"]},{allow:"x"}],processor:([c,a])=>({value:c,cross:!!a})},null,b)),processor:t}},multihand:()=>{O=!0;const d=ba.ws(),a=ba.trim(","),b=ba.trim("\n");return{symbol:ba.trim({either:[ba.separated(b,1,ba.separated(a,1,ba.release({symbols:[{either:[{symbols:[{repeat:[{symbol:"letter_capital",fixed:!0,value:"A"}],min:1,max:1/0},{allow:["letter_capital"]}],processor:([c,a])=>a?[...c,a].join(""):c.join("")},"letter_capital"],processor:o},"integer"],processor:([c,a])=>({value:a,hand:c})},a))),ba.separated(b,1,ba.separated(d,1,ba.release({symbols:["(",d,{allow:"-"},"integer",d,",",d,"integer",d,")"],processor:([,,d,a,,,,b])=>({value:b,offset:d?-a:a})},d)))]}),processor:u}},passing_async:()=>{O=!0;const c=ba.trim(ba.asyncSiteswap({symbols:["integer",{allow:"p"}],processor:([c,a])=>({value:c,pass:a})},ba.separator())),a=ba.trim(ba.asyncSiteswap({symbols:["integer",{allow:"pN"}],processor:([c,a])=>({value:c,pass:a})},ba.separator()));return{symbol:ba.trim({either:[{symbols:["<",c,"|",c,">"],processor:([,c,,a])=>[c,a]},{symbols:["<",ba.separated("|",2,a),">"],processor:([,b])=>b}]}),processor:v}},passing_sync:()=>{O=!0;const g=ba.separator(),a=ba.separator(),b=ba.separator(),c=ba.separator(),d=ba.trim({either:[ba.syncSiteswap({symbols:["integer_even",{allow:"x"},{allow:"p"}],processor:([d,a,b])=>({value:d,pass:b,cross:a})},g,g),ba.syncSiteswap({symbols:["integer_even",{allow:"p"},{allow:"x"}],processor:([d,a,b])=>({value:d,pass:a,cross:b})},a,a)]}),e=ba.trim({either:[ba.syncSiteswap({symbols:["integer_even",{allow:"x"},{allow:"pN"}],processor:([d,a,b])=>({value:d,pass:b,cross:a})},b,b),ba.syncSiteswap({symbols:["integer_even",{allow:"pN"},{allow:"x"}],processor:([d,a,b])=>({value:d,pass:a,cross:b})},c,c)]});return{symbol:ba.trim({either:[{symbols:["<",d,"|",d,">"],processor:([,c,,a])=>[c,a]},{symbols:["<",ba.separated("|",2,e),">"],processor:([,b])=>b}]}),processor:w}}};for(let c=0;c<Q.length;c++){const a=Q[c];a.index=c,R[a.tokenType]=a}const S={ERROR:!0};let T,ca=0;const da={"standard:async":{limits:{degree:{min:1,max:1}},hands:()=>["Hand"],parse:b=>A("standard_async",b),unparse:function(b){return b.map(([c])=>{const a=c.map(({value:b})=>b).join(",");return 1<c.length?`[${a}]`:a}).join(",")}},"standard:sync":{limits:{degree:{min:2,max:2}},hands:()=>["Left","Right"],parse:b=>A("standard_sync",b),unparse:function(b){return b.map(c=>{const a=c.map(c=>{const a=c.map(({value:d,from:a,to:b})=>`${2*d}${a===b?"":"x"}`).join(",");return 1<c.length?`[${a}]`:a});return`(${a})`}).join("")}},standard:["standard:async","standard:sync"],"compressed:async":{limits:{degree:{min:1,max:1},greatestValue:{max:61}},hands:()=>["Hand"],parse:b=>A("compressed_async",b),unparse:function(b){return b.map(([c])=>{const a=c.map(({value:b})=>9<b?n(b):b).join("");return 1<c.length?`[${a}]`:a}).join("")}},"compressed:sync":{limits:{degree:{min:2,max:2},greatestValue:{max:30}},hands:()=>["Left","Right"],parse:b=>A("compressed_sync",b),unparse:function(b){return b.map(c=>{const a=c.map(c=>{const a=c.map(({value:d,from:a,to:b})=>(d*=2,`${9<d?n(d):d}${a===b?"":"x"}`)).join("");return 1<c.length?`[${a}]`:a});return`(${a})`}).join("")}},compressed:["compressed:async","compressed:sync"],"passing:async":{limits:{degree:{min:2}},hands:b=>Array(b).fill().map((c,a)=>`juggler ${a+1}`),parse:b=>A("passing_async",b),unparse:function(d){const a=d[0].map((a,e)=>d.map(c=>{const a=c[e],b=a.map(({value:d,from:a,to:b})=>`${d}${a===b?"":`p${b+1}`}`).join(",");return 1<a.length?`[${b}]`:b}).join(",")).join("|");return`<${a}>`}},"passing:sync":{limits:{degree:{min:4,step:2}},hands:b=>Array(b).fill().map((c,a)=>`juggler ${K(a/2)+1}, hand ${a%2+1}`),parse:b=>A("passing_sync",b),unparse:function(e){const a=[];for(let b=0,[{length:c}]=e;b<c;b+=2)a.push(e.map(c=>`(${B(c[b])},${B(c[b+1])})`).join(""));return`<${a.join("|")}>`}},passing:["passing:async","passing:sync"],multihand:{hands:b=>Array(b).fill().map((d,a)=>c(a)),parse:b=>A("multihand",b),unparse:function(d){return d[0].map((a,e)=>d.map(f=>{const a=f[e],b=a.map(({value:d,to:a})=>`${c(a)}${d}`).join(",");return 1===a.length?b:`[${b}]`}).join(",")).join("\n")}}};class Siteswap{constructor(g,b="compressed"){try{const{throws:c,notation:d}=C(g,[].concat(b));Y(c),this.valid=!0,this.notation=d,this.throws=a(c)}catch(c){if(!(c instanceof L))throw c;return this.valid=!1,this.input=[g,b],this.error=c.message,this}const{throws:c}=this,e=c.reduce((c,a)=>c.concat(...a.map(b=>b.map(({value:b})=>b))),[]);this.degree=c[0].length,this.props=e.reduce((c,a)=>c+a)/c.length,this.multiplex=c.reduce((c,a)=>I(c,...a.map(({length:b})=>b)),0),this.greatestValue=I(...e),this.states=d(this),this.strictStates=f(this),this.orbits=j(this),this.composition=l(this),this.period=this.states.length,this.fullPeriod=this.strictStates.length,this.prime=1===this.composition.length,this.groundState=this.states.some(D)}}return Siteswap.prototype.equals=function(d){if(!this.valid)throw new L("Invalid siteswap.");if(!(d instanceof Siteswap)||!d.valid)return!1;const a=this.throws,b=d.throws;if(a.length!==b.length)return!1;for(let c=0;c<a.length;c++)if(E(a,b,c))return!0;return!1},Siteswap.prototype.rotate=function(e=1){if(!this.valid)throw new L("Invalid siteswap.");const{throws:f}=this;return 0>e&&(e=f.length+e%f.length),new Siteswap(f.map((a,b)=>f[(b+e)%f.length]),this.notation)},Siteswap.prototype.toString=function(e=this.notation){if(!this.valid)throw new L("Invalid siteswap.");if(null===e)return JSON.stringify(this.throws);if(!da[e]||Array.isArray(da[e]))throw new L("Unsupported notation.");if(this.notation!==e){const f=da[this.notation].limits||{},b=da[e].limits||{},a=Object.keys(b);if(a.some(c=>void 0!==b[c]&&void 0!==f[c]&&(void 0!==b[c].min&&void 0!==f[c].max&&b[c].min>f[c].max||void 0!==b[c].max&&void 0!==f[c].min&&b[c].max<f[c].min)))throw new L("Incompatible notations.");if(a.some(c=>b[c].max&&this[c]>b[c].max||b[c].min&&this[c]<b[c].min||0!=this[c]%(b[c].step||1)))throw new L("This siteswap can't be converted to the target notation.")}return da[e].unparse(this.throws)},Siteswap.prototype.log=function(){if(!this.valid)return void console.log("Invalid siteswap.");const i=[];let j;if(i.push(`siteswap\n ${this.toString().replace(/\n/g,"\n ")}`),i.push(`notation\n ${this.notation}`),i.push(`degree\n ${this.degree}`),i.push(`props\n ${this.props}`),i.push(`period\n ${this.period}`),i.push(`full period\n ${this.fullPeriod}`),i.push(`multiplex\n ${this.multiplex}`),i.push(`prime\n ${this.prime}`),i.push(`ground state\n ${this.groundState}`),2<this.degree){j=Array(this.degree).fill().map((d,a)=>c(a)),i.push("hand labels");const a=da[this.notation].hands(this.degree),b=[];b.push(this.degree.toString().length+1),b.push(I(...a.map(({length:b})=>b))),b.push(I(...j.map(({length:b})=>b)));for(let c=0;c<this.degree;c++){const d=F(c+1,b[0]),e=F(j[c],b[2]),f=F(a[c],b[1]);i.push(`${d}| ${e}${"multihand"===this.notation?"":` (${f})`}`)}}{i.push("throw sequence");const b=[];for(const[c,a]of this.throws.entries()){const d=a.map(b=>{let a;return a=2>=this.degree?b.map(({value:d,from:a,to:b})=>`${d}${a===b?"":"x"}`).join(","):b.map(({value:b,to:a})=>`${b}${j[a]}`).join(","),1===b.length?a:`[${a}]`});b.push([`${c+1}|`,...d])}const c=[];for(let d=0;d<b[0].length;d++)c.push(I(...b.map(a=>a[d].length+1)));i.push(...b.map(b=>b.map((d,a)=>F(d,c[a])).join("")))}{i.push("states");const a=this.period.toString().length+1;for(const[b,c]of this.states.entries())for(const[d,e]of c.entries())i.push(`${F(d?" ":b+1,a)}| [${e.join(",")}]`)}{i.push("strict states");const a=this.fullPeriod.toString().length+1;for(const[b,c]of this.strictStates.entries())for(const[d,e]of c.entries())i.push(`${F(d?"":b+1,a)}| [${e.map(b=>`[${b.length?b.join(","):"-"}]`).join(",")}]`)}{i.push("orbits");const e=this.orbits.length.toString().length+1;for(const[b,a]of this.orbits.entries())i.push(...a.toString().split("\n").map((c,a)=>`${F(a?"":b+1,e)}| ${c}`))}{i.push("composition");const e=this.composition.length.toString().length+1;for(const[b,a]of this.composition.entries())i.push(...a.toString().split("\n").map((c,a)=>`${F(a?"":b+1,e)}| ${c}`))}i.push(" "),console.log(i.join("\n"))},Siteswap})});const $=Symbol.for("settings");class _{constructor(a){this.callback=a,this.update=this.update.bind(this),this.request=window.requestAnimationFrame(this.update),this.timestamp=null}update(a){const b=this.timestamp?a-this.timestamp:0;this.timestamp=a,this.request=window.requestAnimationFrame(this.update),this.callback(b)}kill(){window.cancelAnimationFrame(this.request)}}class aa{constructor(a){this.position={x:NaN,y:NaN},this.color=a,this.animationAt=-1,this.animations=[],this.elapsed=0}update(a,b=!1){const{animations:c}=this;b&&(this.animationAt=-1,this.elapsed=0),this.elapsed+=a;let d=c[this.animationAt];for(;this.elapsed>=d.duration;)this.animationAt=(this.animationAt+1)%c.length,this.elapsed-=d.duration,d=c[this.animationAt];this.position=d.getPosition(this.elapsed)}draw(a,b){var c=Math.PI;const d=b.ballRadius*b.multiplier;const e=this.position.x*b.multiplier;const f=this.position.y*b.multiplier;a.beginPath(),a.arc(e,f,d,0,2*c),a.fillStyle=this.color,a.globalAlpha=0<this.position.y?.9:.55,a.fill(),a.closePath()}}class ba{constructor(a){this.coefficients=a}at(a){return this.coefficients.reduce((b,c)=>c+a*b)}differentiate(){return new ba(this.coefficients.slice(0,-1).map((a,b,{length:c})=>(c-b)*a))}}const ca={s:(b,c,a)=>b*a+.5*c*a*a,v:(b,c,a)=>h(b*b+2*c*a)};const da={x:0,y:-9.81/1e3};const ea=new class{constructor(a,b=0,c=0){this.polynomials=[],this.xs=a.map(({x:a})=>a),this.ys=a.map(({y:a})=>a);const d=this.xs.length;const e=[];const f=[];const g=[];const h=[];const j=[];for(let g=0;g<d-1;g++)e[g]=this.xs[g+1]-this.xs[g],f[g]=(this.ys[g+1]-this.ys[g])/e[g];g[0]=2*(e[0]+e[1]),h[0]=6*(f[1]-f[0]);for(let j=1;j<d-1;j++)g[j]=2*(e[j]+e[j-1])-e[j-1]*e[j-1]/g[j-1],h[j]=6*(f[j]-f[j-1])-e[j-1]*h[j-1]/g[j-1];j[0]=b,j[d-1]=c;for(let f=d-2;0<f;f--)j[f]=(h[f]-e[f]*j[f+1])/g[f];for(let f=0;f<d-1;f++){const g=this.ys[f];const d=-(e[f]*j[f+1]/6)-e[f]*j[f]/3+(this.ys[f+1]-this.ys[f])/e[f];const c=j[f]/2;const b=(j[f+1]-j[f])/(6*e[f]);this.polynomials.push(new ba([b,c,d,g]))}}at(a){const{xs:b}=this;const c=this.polynomials.length;const d=k(b[0],b[c]);const e=X(b[0],b[c]);if(a<d||a>e)throw new Error("Out of bounds.");let f=0;if(b[0]<b[c])for(;f<c&&a>b[f+1];)f++;else for(;f<c&&a<b[f+1];)f++;return this.polynomials[f].at(a-b[f])}maximum(){const a={x:null,y:null};const{xs:d}=this;for(let e=0;e<this.polynomials.length;e++){const f=this.polynomials[e].differentiate();const[g,i,b]=f.coefficients;const c=h(i*i-4*g*b);const j=(-i+c)/(2*g)+d[e];const l=(-i-c)/(2*g)+d[e];const m=k(d[e],d[e+1]);const n=X(d[e],d[e+1]);if(j>=m&&j<=n){const b=this.at(j);b>a.y&&(a.x=j,a.y=b)}if(l>=m&&l<=n){const b=this.at(l);b>a.y&&(a.x=l,a.y=b)}}return a}}([{x:0,y:0},{x:5,y:30},{x:30,y:100},{x:95,y:30},{x:100,y:0}]);const fa={catch:function(a){const b=a/this.duration;const c={x:this.position.x+b*this.width,y:this.position.y-ea.at(100*b)*this.yModifier};return c},throw:function(a){const b={x:this.position.x+ca.s(this.velocity.x,this.acceleration.x,a),y:this.position.y+ca.s(this.velocity.y,this.acceleration.y,a)};return b},wait:function(){return this.position}};const ga=Symbol.for("settings");const ha=Symbol.for("settings");const ia=Symbol.for("balls");const ja=Symbol.for("settings");const ka=Symbol.for("balls");const la=Symbol.for("loop");const ma=Symbol.for("balls");const na=Symbol.for("loop");const oa=Symbol.for("settings");const pa=Symbol.for("balls");const qa=Symbol.for("balls");const ra=Symbol.for("settings");const sa=Symbol.for("settings");const ta=Symbol.for("balls");const ua=Symbol.for("loop");class Animator{constructor(a,b={}){if("string"==typeof a&&(a=document.getElementById(a)),!(a instanceof HTMLCanvasElement))throw new Error("Canvas element not supplied.");this.context=a.getContext("2d"),this.siteswap=null,this.paused=!1,this[ua]=null,this[ta]=[],this[sa]={dwell:.5,slowdown:1,reversed:!1,continuous:!0,ballColor:"#ff3636",beatDuration:300,ballRadius:70,catchWidth:400,innerHeight:0,innerWidth:0,catchHeight:0,multiplier:null},this.configure(b)}}return Animator.Siteswap=Z,Animator.prototype.play=function(a){if(this.paused=!1,void 0!==a){this[la]&&this.stop();const{Siteswap}=this.constructor;if("string"==typeof a&&(a=new Siteswap(a)),this.siteswap=a,!(a instanceof Siteswap))throw new Error("Invalid input.");if(!a.valid)throw new Error("Invalid siteswap.");if(2<a.degree)throw new Error(`Pattern requires ${a.degree} hands.`);if(0!==a.greatestValue){const b=this[ja];const{canvas:c}=this.context;const[f,{innerWidth:h,innerHeight:i,catchHeight:j}]=d(b,a);b.innerWidth=h,b.innerHeight=i,b.catchHeight=j,this[ka]=f,c.width=c.clientWidth,c.height=c.clientHeight,e(this),this[ja].continuous&&this.seek(0,!0),this[la]=new _(a=>g(this,a))}}},Animator.prototype.stop=function(){const a=this[na];a&&(f(this.context),a.kill(),this[na]=null,this[ma].length=0,this.siteswap=null)},Animator.prototype.pause=function(){this.paused=!0},Animator.prototype.configure=function(a){const b=this[$];void 0!==a.beatDuration&&(b.beatDuration=a.beatDuration),void 0!==a.slowdown&&(b.slowdown=a.slowdown),void 0!==a.dwell&&(b.dwell=a.dwell),void 0!==a.ballColor&&(b.ballColor=a.ballColor),void 0!==a.reversed&&(b.reversed=a.reversed),void 0!==a.continuous&&(b.continuous=a.continuous);const{beatDuration:c,dwell:d,slowdown:e,ballColor:f,reversed:g,continuous:h}=b;if("number"!=typeof c)throw new Error("Invalid configuration (`beatDuration` must be a number).");if(0>=c)throw new Error("Invalid configuration (`beatDuration` must be positive).");if("number"!=typeof e)throw new Error("Invalid configuration (`slowdown` must be a number).");if(0>=e)throw new Error("Invalid configuration (`slowdown` must be positive).");if("number"!=typeof d)throw new Error("Invalid configuration (`dwell` must be a number).");if(0>d||1<d)throw new Error("Invalid configuration (`dwell` must be in [0-1] range).");if("string"!=typeof f)throw new Error("Invalid configuration (`ballColor` must be a string).");if(!/^#[0-9a-f]{3}(?:[0-9a-f]{3})?/i.test(f))throw new Error("Invalid configuration (`ballColor` must be a valid css color).");if("boolean"!=typeof g)throw new Error("Invalid configuration (`reversed` must be a boolean).");if("boolean"!=typeof h)throw new Error("Invalid configuration (`continuous` must be a boolean).")},Animator.prototype.dye=function(a,b){const c=this[pa];const d=this[oa];const{context:e}=this;if(void 0===b)for(const b of c)b.color=a;else{if(!c[b])throw new Error("Ball doesn't exist.");c[b].color=a}if(this.paused){f(e);for(const a of c)a.draw(e,d)}},Animator.prototype.seek=function(a,b=!1){if("number"!=typeof a||0>a||100<a)throw new Error("Expected number in [0-100] range.");100===a&&(a=0),b&&(a+=100);const c=this[ra];const d=this[qa];const e=this.siteswap.fullPeriod*(this.siteswap.fullPeriod%2?2:1)*c.beatDuration;const{context:g}=this;for(const c of d)c.update(a/100*e,!0);if(this.paused){f(g);for(const a of d)a.draw(g,c)}},Animator}();