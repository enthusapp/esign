(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{183:function(e,t,a){e.exports=a(505)},188:function(e,t,a){},505:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(20),c=a.n(o),i=(a(188),a(51)),l=a(175),s=a(106),m=a(35),u=a(36),d=a(38),p=a(37),f=a(39),h=a(176),g=a(177),v=a(182),y=a.n(v),S=a(42),E=a.n(S),b=a(41),w=a.n(b),k=a(40),O=a.n(k),N=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(d.a)(this,Object(p.a)(t).call(this,e))).textP=r.a.createRef(),a}return Object(f.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.setAnimate()}},{key:"componentDidUpdate",value:function(e){this.props!==e&&this.setAnimate()}},{key:"setAnimate",value:function(){var e=this.props,t=e.speed,a=e.animation;this.textP.current.animate(a,{duration:1e3*t,iterations:1/0})}},{key:"render",value:function(){var e=this.props,t=e.player,a=e.text,n=e.backgroundColor,o=e.color,c=e.height,i=e.fontSize,l={backgroundColor:n,color:o,overflow:"hidden",position:"relative",height:"".concat(c,"rem")};return t&&delete l.backgroundColor,r.a.createElement("div",{style:l},r.a.createElement("p",{ref:this.textP,style:{position:"absolute",width:"100%",height:"100%",margin:"0",lineHeight:"100%",textAlign:"center",fontSize:"".concat(i,"rem")}},a))}}]),t}(n.Component);N.defaultProps={animation:[{transform:"translateY(100%)"},{transform:"translateY(-100%)"}]};var x=N;var A=function(e){var t=e.increase,a=e.decrease,n={height:"3rem",width:"3rem",margin:"0.5rem",fontSize:"30px"};return r.a.createElement("div",null,r.a.createElement("button",{className:"btIncFontSize",type:"button",onClick:t,style:n},"+"),r.a.createElement("button",{className:"btDecFontSize",type:"button",onClick:a,style:n},"-"))},j=a(181),C=a.n(j),F=a(180),P=a.n(F),z=a(104),D=a.n(z),L=a(178),I=a.n(L),Y=a(105),B=a.n(Y);var M=function(e){var t=e.keys,a=e.checkedKeys,n=e.handleChange,o=t.map(function(e){return r.a.createElement(I.a,{key:e,control:r.a.createElement(P.a,{className:"".concat(e,"checkBox"),checked:a.indexOf(e)>-1,onChange:n,value:e}),label:e})}),c=a.length<1;return r.a.createElement(D.a,{required:!0,error:c,component:"fieldset"},r.a.createElement(C.a,{row:!0},o),r.a.createElement(B.a,null,"\ubc18\ub4dc\uc2dc \ud55c\uac1c \uc774\uc0c1 \uc120\ud0dd\ud574\uc57c \ud569\ub2c8\ub2e4."))},R=a(52),H=a.n(R),J=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(d.a)(this,Object(p.a)(t).call(this,e))).load=function(e){var t=a.props,n=t.load;t.isElectron&&a.setState({isLoaded:!0}),n(e)},a.state={isLoaded:!1},a}return Object(f.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.props,t=e.download,a=e.cancel,n=e.saveAs,o=e.isElectron,c=this.state.isLoaded,i=c?"\uc218\uc815\uc644\ub8cc":"\uc0c8\ub85c \ub9cc\ub4e4\uae30",l=c?t:n,s={margin:"0.5rem",width:"6rem"};return r.a.createElement("div",{style:{backgroundColor:"#eeeeee",width:"100%"}},c?r.a.createElement(r.a.Fragment,null):r.a.createElement("label",{htmlFor:"load"},r.a.createElement("input",{id:"load",className:"load",type:"file",onChange:this.load,accept:".esign",style:{display:"none"}}),r.a.createElement(H.a,{variant:"contained",color:"primary",component:"span",className:"loadText",style:s},"\uc77d\uc5b4\uc624\uae30")),r.a.createElement(H.a,{variant:"contained",color:"primary",className:"save",onClick:o?l:t,style:s},o?i:"\uc644\ub8cc"),c?r.a.createElement(H.a,{variant:"contained",color:"primary",className:"saveAs",onClick:n,style:s},"\uc0c8\ub85c \ub9cc\ub4e4\uae30"):r.a.createElement(r.a.Fragment,null),r.a.createElement(H.a,{variant:"contained",color:"primary",className:"cancel",onClick:a,style:s},o?"\ucde8\uc18c":"\ucd08\uae30\ud654"))}}]),t}(n.Component),W=a(53),T=a.n(W);var U=function(e){return e/parseFloat(getComputedStyle(document.querySelector("body"))["font-size"])},q=function(e){function t(e){var a;Object(m.a)(this,t),(a=Object(d.a)(this,Object(p.a)(t).call(this,e))).getIncButtunList=function(){return[{label:"\uae00\uc790 \ud06c\uae30",name:"fontSize",increase:function(e){var t=100;return e<1?t=e+.1:e<2?t=e+.2:e<99&&(t=e+1),T.a.round10(t,-1)},decrease:function(e){var t=.1;return e>2?t=e-1:e>1?t=e-.2:e>.2&&(t=e-.1),T.a.round10(t,-1)}},{label:"\uc18d\ub3c4",name:"speed",increase:function(e){return e>2?e-1:1},decrease:function(e){return e<99?e+1:100}}]},a.getDefaultState=function(){return{direction:["up"],textState:"ENTHUS \ubbf8\ub514\uc5b4 \ud30c\uc0ac\ub4dc",colorState:"#FFFFFF",fontSize:2,speed:5}},a.getNewState=function(e){var t={};return Object.keys(a.getDefaultState()).forEach(function(a){Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a])}),t},a.getNewStateFromURL=function(e){var t={};return Object.assign(t,a.getDefaultState()),Object.keys(a.getDefaultState()).forEach(function(n){if("direction"===n)return t[n]=e.searchParams.getAll("".concat(n,"[]")),void(0===t[n].length&&(t[n]=a.getDefaultState()[n]));if(e.searchParams.get(n))switch(n){case"colorState":t[n]="#".concat(e.searchParams.get(n));break;case"fontSize":case"speed":t[n]=parseInt(e.searchParams.get(n),10);break;default:t[n]=e.searchParams.get(n)}}),t},a.getAnimation=function(){var e=a.state,t=e.fontSize,n=e.direction,r=[];n.forEach(function(e){r=[].concat(Object(s.a)(r),Object(s.a)(a.getAnimationList(t)[e]))});var o=T.a.ceil10(1/(r.length-1),-4),c=0;return r.map(function(e){var t=c;return(c=T.a.ceil10(c+o,-4))>1&&(c=1),{transform:e,offset:t}})},a.getAnimationList=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a.getDefaultState().fontSize,t=a.getPlayerHeight(),n=(t-e)/2;return{up:["translateY(".concat(t,"rem)"),"translateY(".concat(n,"rem)"),"translateY(".concat(n,"rem)"),"translateY(-".concat(t,"rem)")],down:["translateY(-".concat(t,"rem)"),"translateY(".concat(n,"rem)"),"translateY(".concat(n,"rem)"),"translateY(".concat(t,"rem)")],right:["translate(-100%, ".concat(n,"rem)"),"translate(0%, ".concat(n,"rem)"),"translate(0%, ".concat(n,"rem)"),"translate(100%, ".concat(n,"rem)")],left:["translate(100%, ".concat(n,"rem)"),"translate(0%, ".concat(n,"rem)"),"translate(0%, ".concat(n,"rem)"),"translate(-100%, ".concat(n,"rem)")]}},a.updateAnimation=function(){var e=a.state,t=e.speed,n=e.direction;a.setState({currentAnimation:a.getAnimation()}),a.setState({currentSpeed:t*n.length})},a.directionChange=function(e){var t=a.state.direction,n=t.indexOf(e.target.value);e.target.checked?-1===n&&t.push(e.target.value):n>-1&&t.length>1&&t.splice(n,1),a.setState({direction:t},a.updateAnimation)},a.textChange=function(e){a.setState({textState:e.target.value})},a.colorChange=function(e){a.setState({colorState:e.hex})},a.download=function(e){var t=new Blob([JSON.stringify(e,null,4)],{type:"text/plain;charset=utf-8"});Object(g.saveAs)(t,"message.esign")},a.makeDownloadFormat=function(e){return{fontSize:e.fontSize,speed:e.speed,colorState:e.colorState,textState:e.textState,direction:e.direction,mfp_type:"esign"}},a.save=function(){var e=a.makeDownloadFormat(a.state),t=a.state.fileName;a.isElectron()&&(e.fileName=t),a.download(e)},a.saveAs=function(){a.download(Object(l.a)({saveAs:!0},a.makeDownloadFormat(a.state)))},a.setStateFromJSON=function(e){a.setState(a.getNewState(e),a.updateAnimation)},a.fileReaderOnLoad=function(e,t){var n=JSON.parse(e.result);a.setStateFromJSON(n),a.isElectron()&&a.setState({fileName:t.name})},a.load=function(e){var t=e.target.files[0];if(t){var n=new FileReader;n.onload=function(){a.fileReaderOnLoad(n,t)},n.readAsText(t)}};var n,r=new URL(window.location.href),o=(n=r.searchParams.get("player"),[1,"1","true","True"].indexOf(n)>-1),c=navigator.userAgent.toLowerCase().indexOf(" electron/")>-1,u=U(window.innerHeight),f=o?u:5;t.prototype.isPlayerMode=function(){return o},t.prototype.isElectron=function(){return c},t.prototype.getPlayerHeight=function(){return f},t.prototype.cancel=c?function(){return a.download({cancel:!0})}:function(){return a.setState(a.getDefaultState(),a.updateAnimation)},a.state=a.getNewStateFromURL(r),a.state.currentAnimation=a.getAnimation();var h=a.state,v=h.speed,y=h.direction;return a.state.currentSpeed=y.length*v,a.getIncButtunList().forEach(function(e){var n=e.name,r=e.increase,o=e.decrease;t.prototype["".concat(n,"Inc")]=function(){var e=a.state[n];a.setState(Object(i.a)({},n,r(e)),a.updateAnimation)},t.prototype["".concat(n,"Dec")]=function(){var e=a.state[n];a.setState(Object(i.a)({},n,o(e)),a.updateAnimation)}}),a}return Object(f.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.state,a=e.currentAnimation,n=e.direction,o=e.textState,c=e.colorState,i=e.currentSpeed,l=e.fontSize,s=this.getIncButtunList().map(function(e){return r.a.createElement(E.a,{item:!0,xs:!0,key:e.name},r.a.createElement(w.a,{elevation:1,style:{padding:"1rem"}},r.a.createElement(O.a,{component:"p"},e.label),r.a.createElement(A,{className:e.name,increase:t.prototype["".concat(e.name,"Inc")],decrease:t.prototype["".concat(e.name,"Dec")]})))});return r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"PlayerWrap",style:{position:"sticky",top:0,zIndex:10}},r.a.createElement(x,Object.assign({className:"player",player:this.isPlayerMode(),text:o,backgroundColor:"black",color:c,height:String(this.getPlayerHeight()),speed:i,fontSize:l,animation:a},{})),this.isPlayerMode()?r.a.createElement(r.a.Fragment,null):r.a.createElement(J,{className:"mainButton",load:this.load,download:this.save,cancel:this.cancel,saveAs:this.saveAs,isElectron:this.isElectron()})),this.isPlayerMode()?r.a.createElement(r.a.Fragment,null):r.a.createElement("div",{className:"InputWrap",style:{zIndex:1,padding:"0.5rem"}},r.a.createElement(E.a,{container:!0,spacing:24,justify:"center"},r.a.createElement(E.a,{item:!0,xs:12},r.a.createElement(w.a,{elevation:1,style:{padding:"1rem"}},r.a.createElement(O.a,{component:"p"},"\uba54\uc2dc\uc9c0 \uc785\ub825"),r.a.createElement(y.a,{className:"textInput",value:o,onChange:this.textChange,margin:"normal",fullWidth:!0}))),s,r.a.createElement(E.a,{item:!0,xs:!0},r.a.createElement(w.a,{elevation:1,style:{padding:"1rem"}},r.a.createElement(O.a,{component:"p"},"\ubc29\ud5a5 \uc124\uc815"),r.a.createElement(M,{checkedKeys:n,keys:Object.keys(this.getAnimationList()),handleChange:this.directionChange}))),r.a.createElement(E.a,{item:!0,xs:12},r.a.createElement(w.a,{elevation:1,style:{padding:"1rem"}},r.a.createElement(O.a,{component:"p"},"\uc0c9 \uc124\uc815"),r.a.createElement("div",{style:{paddingTop:"0.5rem"}},r.a.createElement(h.SwatchesPicker,{className:"colorInput",onChangeComplete:this.colorChange,width:window.innerWidth-50,height:170})))))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(q,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},53:function(e,t){function a(){}function n(e,t,a){var n=t,r=a;return"undefined"===typeof r||0===+r?Math[e](n):(n=+n,r=+r,Number.isNaN(n)||"number"!==typeof r||r%1!==0?NaN:(n=n.toString().split("e"),n=(n=Math[e](+"".concat(n[0],"e").concat(n[1]?+n[1]-r:-r))).toString().split("e"),+"".concat(n[0],"e").concat(n[1]?+n[1]+r:r)))}e.exports=new a,a.prototype.round10=function(e,t){return n("round",e,t)},a.prototype.ceil10=function(e,t){return n("ceil",e,t)}}},[[183,2,1]]]);
//# sourceMappingURL=main.ffec7fdb.chunk.js.map