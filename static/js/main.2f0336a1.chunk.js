(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{177:function(t,e,n){t.exports=n(501)},182:function(t,e,n){},501:function(t,e,n){"use strict";n.r(e);var a=n(0),r=n.n(a),o=n(20),i=n.n(o),c=(n(182),n(43)),s=n(169),l=n(60),m=n(61),u=n(63),f=n(62),h=n(64),d=n(170),p=n(171),g=n(176),v=n.n(g),y=n(101),b=n.n(y),S=function(t){function e(t){var n;return Object(l.a)(this,e),(n=Object(u.a)(this,Object(f.a)(e).call(this,t))).textP=r.a.createRef(),n}return Object(h.a)(e,t),Object(m.a)(e,[{key:"componentDidMount",value:function(){this.setAnimate()}},{key:"componentDidUpdate",value:function(t){this.props!==t&&this.setAnimate()}},{key:"setAnimate",value:function(){var t=this.props,e=t.speed,n=t.animation;this.textP.current.animate(n,{duration:1e3*e,iterations:1/0})}},{key:"render",value:function(){var t=this.props,e=t.player,n=t.text,a=t.backgroundColor,o=t.color,i=t.height,c=t.fontSize,s={backgroundColor:a,color:o,overflow:"hidden",position:"relative",height:"".concat(i,"rem")};return e&&delete s.backgroundColor,r.a.createElement("div",{style:s},r.a.createElement("p",{ref:this.textP,style:{position:"absolute",width:"100%",height:"100%",margin:"0",lineHeight:"100%",textAlign:"center",fontSize:"".concat(c,"rem")}},n))}}]),e}(a.Component);S.defaultProps={animation:[{transform:"translateY(100%)"},{transform:"translateY(-100%)"}]};var O=S;var w=function(t){var e=t.name,n=t.increase,a=t.decrease,o={height:"100px",width:"100px",margin:"10px",fontSize:"30px"};return r.a.createElement("div",null,r.a.createElement("p",{className:"name"},e),r.a.createElement("button",{className:"btIncFontSize",type:"button",onClick:n,style:o},"+"),r.a.createElement("button",{className:"btDecFontSize",type:"button",onClick:a,style:o},"-"))},E=n(174),k=n.n(E),x=n(175),C=n.n(x),j=n(172),A=n.n(j),N=n(99),P=n.n(N),L=n(100),I=n.n(L);var F=function(t){var e=t.name,n=t.keys,a=t.direction,o=t.handleChange,i=n.map(function(t){return r.a.createElement(A.a,{key:t,value:t,control:r.a.createElement(k.a,null),label:t})});return r.a.createElement("div",null,r.a.createElement(P.a,{component:"fieldset"},r.a.createElement(I.a,{component:"legend",className:"name"},e),r.a.createElement(C.a,{value:a,onChange:o},i)))},J=10,z={direction:"up",textState:"Text",colorState:"#FFFFFF",fontSize:5,speed:10};var Y=function(t){function e(t){var n;Object(l.a)(this,e),(n=Object(u.a)(this,Object(f.a)(e).call(this,t))).getDefaultPlayerHeight=function(){return J},n.getIncButtunList=function(){return[{name:"fontSize",lowLimit:1,highLimit:100,reverse:!1},{name:"speed",lowLimit:1,highLimit:100,reverse:!0}]},n.getAnimation=function(){var t=n.state,e=t.fontSize,a=t.direction;return n.getAnimationList(e)[a]},n.getAnimationList=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:z.fontSize,e=(J-t)/2;return{up:[{transform:"translateY(".concat(J,"rem)")},{transform:"translateY(".concat(e,"rem)"),offset:.3},{transform:"translateY(".concat(e,"rem)"),offset:.7},{transform:"translateY(-".concat(J,"rem)")}],down:[{transform:"translateY(-".concat(J,"rem)")},{transform:"translateY(".concat(e,"rem)"),offset:.3},{transform:"translateY(".concat(e,"rem)"),offset:.7},{transform:"translateY(".concat(J,"rem)")}],right:[{transform:"translate(-100%, ".concat(e,"rem)")},{transform:"translate(0%, ".concat(e,"rem)"),offset:.3},{transform:"translate(0%, ".concat(e,"rem)"),offset:.7},{transform:"translate(100%, ".concat(e,"rem)")}],left:[{transform:"translate(100%, ".concat(e,"rem)")},{transform:"translate(0%, ".concat(e,"rem)"),offset:.3},{transform:"translate(0%, ".concat(e,"rem)"),offset:.7},{transform:"translate(-100%, ".concat(e,"rem)")}]}},n.updateAnimation=function(){n.setState({currentAnimation:n.getAnimation()})},n.directionChange=function(t){n.setState({direction:t.target.value},n.updateAnimation)},n.textChange=function(t){n.setState({textState:t.target.value})},n.colorChange=function(t){n.setState({colorState:t.hex})},n.downloadJSON=function(){var t={};Object.assign(t,n.state),t.mfp_type="esign",delete t.currentAnimation,function(t,e){var n=new Blob([t],{type:"text/plain;charset=utf-8"});Object(p.saveAs)(n,e)}(JSON.stringify(Object(s.a)({},t),null,4),"esign.json")},n.setStateFromJSON=function(t){n.setState(function(t){var e={};return Object.keys(z).forEach(function(n){Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}),e}(t),n.updateAnimation)},n.loadJSON=function(t){var e=t.target.files[0];if(e){var a=new FileReader;a.onload=function(){var t=JSON.parse(a.result);n.setStateFromJSON(t)},a.readAsText(e)}};var a,r=new URL(window.location.href),o=(a=r.searchParams.get("player"),[1,"1","true","True"].indexOf(a)>-1);return n.state=function(t){var e={};return Object.assign(e,z),Object.keys(z).forEach(function(n){if(t.searchParams.get(n))switch(n){case"colorState":e[n]="#".concat(t.searchParams.get(n));break;case"fontSize":case"speed":e[n]=parseInt(t.searchParams.get(n),10);break;default:e[n]=t.searchParams.get(n)}}),e}(r),n.state.currentAnimation=n.getAnimation(),e.prototype.isPlayerMode=function(){return o},n.getIncButtunList().forEach(function(t){var a=t.name,r=t.lowLimit,o=t.highLimit,i=function(){var t=n.state[a],e=t<o-1?t+1:o;n.setState(Object(c.a)({},a,e),n.updateAnimation)},s=function(){var t=n.state[a],e=t>r+1?t-1:r;n.setState(Object(c.a)({},a,e),n.updateAnimation)};t.reverse?(e.prototype["".concat(a,"Inc")]=s,e.prototype["".concat(a,"Dec")]=i):(e.prototype["".concat(a,"Inc")]=i,e.prototype["".concat(a,"Dec")]=s)}),n}return Object(h.a)(e,t),Object(m.a)(e,[{key:"render",value:function(){var t=this,n=this.state,a=n.currentAnimation,o=n.direction,i=n.textState,c=n.colorState,s={};this.getIncButtunList().forEach(function(e){var n=e.name,a=t.state[n];s[n]=a});var l=this.getIncButtunList().map(function(t){return r.a.createElement(w,{key:t.name,name:t.name,className:t.name,increase:e.prototype["".concat(t.name,"Inc")],decrease:e.prototype["".concat(t.name,"Dec")]})});return r.a.createElement("div",{className:"App"},r.a.createElement(O,Object.assign({className:"player",player:this.isPlayerMode(),text:i,backgroundColor:"black",color:c,height:String(J),direction:"left",animation:a},s)),this.isPlayerMode()?r.a.createElement("div",null):r.a.createElement("div",null,r.a.createElement("input",{type:"file",onChange:this.loadJSON}),r.a.createElement(b.a,{variant:"contained",className:"load",onClick:this.loadJSON},"\uc77d\uc5b4\uc624\uae30"),r.a.createElement(b.a,{variant:"contained",className:"download",onClick:this.downloadJSON},"\uc644\ub8cc"),r.a.createElement(d.SwatchesPicker,{className:"colorInput",onChangeComplete:this.colorChange}),r.a.createElement(v.a,{label:"Text Input",className:"textInput",value:i,onChange:this.textChange,margin:"normal",fullWidth:!0}),r.a.createElement(F,{name:"Direction",keys:Object.keys(this.getAnimationList()),direction:o,handleChange:this.directionChange}),l))}}]),e}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(Y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[177,2,1]]]);
//# sourceMappingURL=main.2f0336a1.chunk.js.map