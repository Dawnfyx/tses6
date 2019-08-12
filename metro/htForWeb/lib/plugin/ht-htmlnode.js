!function(O){"use strict";var n="ht",x=O[n],s=function(){return document},m=function(){return s().body},j=function(L,_,R){L.style.setProperty(_,R,null)},C=function(G){return s().createElement(G)},W=function(){return C("div")},d=function(){var s=C("canvas");return s},y=function(V,o){j(V,"-webkit-transform",o),j(V,"-ms-transform",o),j(V,"transform",o)},p=function(r,w){j(r,"-webkit-transform-origin",w),j(r,"-ms-transform-origin",w),j(r,"transform-origin",w)},l=function(X,L){X.appendChild(L)},L=function(k,Z){k.removeChild(Z)},R=O.parseInt,H=x.Default,v=H.eventListenerOptionsFalse,h=(H.eventListenerOptionsTrue,function(F,H,a,E){F.addEventListener(H,a,E?v:v)}),V=H.getInternal(),z=Math.PI,D="white-space",S="visibility",I="left",q="top",N="width",Q="height",B="position",Z="display",Y="z-index",u="px",K="0 0",f="absolute",J="visible",A="hidden",F="none",G="block",X="nowrap",t="rgba(0, 0, 0, 0.005)";H.setImage("node_dragger","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAN9JREFUeNrsV9sNhDAMKyzQVdgARmGzrMJNUFZhAh6nfkVcG9PQgHSR8lEksJs6pnGuLCimSRzAa0yyBK9O4gy8GokU+O0kJOAwiQYg0LP1xNYDW3+0CfBYNb7VOuN4LAGpiOaYUhFDas9F2NPHDELNENJqaHgBgSQJ3ufakfQJqckERcOiK+Ae1FGWBNKGh9oX5WPpLpdNYfffijbsxTHh7VKP7388n1g1h7OKUoUuyGpJakQEuhwkZAKcDXVOdWcrOrL/feBVBHI/q8fcjE1nA9PpyHQ+NJ2Qi8A3AQYAOtS27fCoRY0AAAAASUVORK5CYII=");var g=x.graph.GraphView.prototype,a=g._42;g.adjustHtmlNodeIndex=!0,g._42=function(J,G){if(a.call(this,J,G),this.adjustHtmlNodeIndex)for(var e=this.getDataModel()._datas._as,u=e.length,f=1,Z=0;u>Z;Z++){var p=e[Z];if(p instanceof T){var t=this.getDataUI(p);j(t.$2f,Y,f+""),j(t.$3f,Y,f+1+""),f+=2}}};var i=x.HtmlNodeUI=function(C,c){var M=this;i.superClass.constructor.call(M,C,c);var v=M.$2f=W(),V=M.$3f=d();j(v,B,f),j(v,S,A),j(v,D,X),V.draggable=!1,j(V,B,f),j(V,Z,F),p(V,K),h(v,"change",function(n){var N=n.target,r=N.bind||N.getAttribute("bind"),O=N.type&&"checkbox"===N.type?N.checked:N.value,Q=c.getContext();r&&Q&&(Q[r]=O,M.$4f=JSON.stringify(Q))}),["mousedown","touchstart","keydown","mousewheel","DOMMouseScroll"].forEach(function(r){h(v,r,this.$9f.bind(this))},M)};H.def(i,V.ui().NodeUI,{_visible:!0,$11f:function(){var N=this,s=N.$3f,S=N._data,X=S.getDraggerImageWidth(),g=S.getDraggerImageHeight(),q=S.getDraggerImage(),I=V.initContext(s);I.beginPath(),V.setCanvas(s,X,g),V.translateAndScale(I,0,0,1),I.clearRect(0,0,X,g),H.drawImage(I,H.getImage(q),0,0,X,g),I.restore()},_80o:function(P){i.superClass._80o.call(this,P);var O=this,M=O._data,U=M._padding,b=2*U,s=O.$2f,H=O.$3f,k=O.gv,V=k.getZoom(),_=k.getTranslateX(),C=k.getTranslateY(),v=k.getView(),n=O._83o,L=M._width,o=M._height,K=n.position,m=n.rotation,T=(L-b)/M.$5f*V,w=(o-b)/M.$6f*V,h=O._html,d=M._html,p=M.getHtmlType();if("html"===p){var c=M.getContext()||{},D=O.$4f,g=M.$10f,a=JSON.stringify(c);h&&D&&h===d&&D===a||(O.$4f=a,O._html=d,s.innerHTML=g?g(c):d)}else if(null!=p){var r=M.getHtml();"ht"===p&&(r=r.getView()),h&&h===r&&s.contains(h)||(O._html=r,s.innerHTML="",l(s,r))}if(!s.parentNode){var E=k.$1f;if(!E){var x=W();j(x,B,f),j(x,Y,"0"),E=k.$1f=x;var X=k._canvas.nextSibling;X?v.insertBefore(x,X):l(v,x)}l(E,s),l(E,H),M.onContentInitialized&&M.onContentInitialized(s)}if(M._scalable){var e=M.$5f,$=M.$6f;y(s,"rotate("+180*(m/z)+"deg) scale("+T+","+w+")"),j(s,N,""),j(s,Q,""),j(s,I,(K.x-e/V/2)*V+_+u),j(s,q,(K.y-$/V/2)*V+C+u)}else{var Oj=R(s.style.width),Jk=R(s.style.height),ar=R((L-b)*V),Lo=R((o-b)*V),vn="100%",Ic=s.children[0];j(Ic,N,vn),j(Ic,Q,vn),(Oj!==ar||Jk!==Lo)&&(j(s,N,ar+u),j(s,Q,Lo+u),"ht"===p&&d.invalidate()),y(s,"rotate("+180*(m/z)+"deg)"),j(s,I,(K.x-ar/V/2)*V+_+u),j(s,q,(K.y-Lo/V/2)*V+C+u)}var _o=O.dragRect;k.isMovable(M)&&k.isSelected(M)&&_o?(P.save(),P.fillStyle=t,P.fillRect(_o.x,_o.y,_o.width,_o.height),P.restore(),j(H,I,_o.x*V+_+u),j(H,q,_o.y*V+C+u),y(H,"scale("+V+","+V+")"),j(H,Z,G),O.$11f()):j(H,Z,F),j(s,S,this._visible?J:A)},dispose:function(){var K=this.gv.$1f;this.$2f.parentNode===K&&K.removeChild(this.$2f),this.$3f.parentNode===K&&K.removeChild(this.$3f)},_84o:function(C){this._visible=C,j(this.$2f,S,C?J:A),j(this.$3f,Z,C?G:F)},_3O:function(){var a=this,M=a.gv,I=a._data;i.superClass._3O.call(a);var m=I.getRect();M.isEditable(I)&&(a.dragRect={x:m.x+m.width+I._padding,y:m.y+10,width:I.getDraggerImageWidth(),height:I.getDraggerImageHeight()},a._68o(a.dragRect))},rectIntersects:function(R){var m=this._79o();return x.Default.intersection(m,R)?!0:void 0},$9f:function(v){var N=this.gv,J=this._data;N.sm().contains(J)&&v.stopPropagation()}});var T=x.HtmlNode=function(){T.superClass.constructor.call(this)};x.Default.def(T,x.Node,{ms_ac:["html","context","scalable","padding","draggerImage","draggerImageWidth","draggerImageHeight"],_padding:x.Default.isTouchable?12:6,_image:null,_scalable:!0,_draggerImage:"node_dragger",_draggerImageWidth:20,_draggerImageHeight:20,setHtml:function(o){var v=this,s=v._html;v._html=o,"html"===v.getHtmlType()&&"Handlebars"in O&&(v.$10f=Handlebars.compile(o)),v.$13f(),v.fp("html",s,o)},setContext:function(Q){var W=this,N=W._context;W._context=Q,W.fp("context",N,Q),W.$13f()},setScalable:function(M){var s=this,n=s._scalable;s._scalable=M,s.fp("scalable",n,M),s.$13f()},getHtmlType:function(){var M=this._html;return M?"string"==typeof M?"html":M.getView?"ht":"dom":null},$13f:function(){var J=this,V=J._html,r=J.$10f;if(V){var _=W(),x=!1,e=J.getHtmlType();if(j(_,B,f),j(_,D,X),j(_,S,A),"html"===e?(_.innerHTML=r?r(J.getContext()||{}):V,x=!0):"ht"===e?(l(_,V.getView()),x=!0):"dom"===e&&(l(_,V),x=!0),x){var u=2*J._padding;l(m(),_),J.$5f=_.scrollWidth,J.$6f=_.scrollHeight,J._width=J.$5f+u,J._height=J.$6f+u,J._originWidth=J._width,J._originHeight=J._height,L(m(),_)}}},getUIClass:function(){return x.HtmlNodeUI}})}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);