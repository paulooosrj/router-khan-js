"use strict";const Router=class{static create(){return Router.instance||(Router.instance=new this),Router.instance}constructor(){this.routes=new Map}any(a,b){!1===this.routes.has(a)&&this.routes.set(a,b)}toObject(a,b){for(var d={},f=0;f<a.length;f++)d[a[f]]=b[f];return d}trate(a){let b=[],d=this,f=a;if(!1===this.routes.has(a))for(var g of this.routes.keys())g.includes('{')&&g.includes('}')&&b.push(g);return 0<b.length&&(b=b.map(h=>{var j=new RegExp(h.replace(/{(.*?)}/gi,'(.*)'),'gi'),l=new RegExp(h.replace(/{(.*?)}/gi,'(.*)'),'gi'),m=new RegExp(h.replace(/{(.*?)}/gi,'(.*)'),'gi');if(!1===j.test(f))return!1;var[,...n]=l.exec(h),[,...o]=m.exec(f);return n=n.map(q=>q.replace(/[{}]/gi,'')),{route:h,param:d.toObject(n,o)}})),b[0]}push_event(a){window.history.pushState({url:a},a,a);var b=this.trate(a);b&&this.routes.get(b.route)(b.param),this.routes.has(a)&&!b&&this.routes.get(a)()}dispatch(){window.onpopstate=()=>{var d=''===window.location.hash?window.location.pathname:window.location.hash.split('#').pop();this.push_event(d)};let a=''===window.location.hash?window.location.pathname:window.location.hash.split('#').pop();this.push_event(a)}};
