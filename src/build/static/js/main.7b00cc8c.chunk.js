(this["webpackJsonpntp-client"]=this["webpackJsonpntp-client"]||[]).push([[0],{117:function(e){e.exports=JSON.parse('{"sider":[{"title":"C/S \u6a21\u5f0f","icon":"Html5Outlined","key":"Ntpcs"},{"title":"\u5e7f\u64ad\u6a21\u5f0f","icon":"WifiOutlined","key":"NtpBroadcast"},{"title":"\u8bbe\u7f6e","icon":"SettingOutlined","key":"Setting"}],"storeConfig":{"serverAddress":"120.25.115.20","serverPort":"123","originAddress":"115.156.155.100","receivePort":"123"}}')},236:function(e,t,c){"use strict";c.r(t);var n=c(0),r=c.n(n),a=c(31),i=c.n(a),s=(c(156),c(27)),o=c(239),l=c(244),b=c(107),u=c(142),j=c(76),d=function(e,t){return function(){var c=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},t,c.style);return r.a.createElement(e,Object(j.a)(Object(j.a)({},c),{},{style:n}))}}("div",{width:"100%",height:"100%",padding:"40px 70px",display:"flex",flexDirection:"column",justifyContent:"start",overflowY:"auto"}),O=c(243),f=c(146),v=c(51);function h(e){return e.getFullYear()+"\u5e74"+(e.getMonth()+1)+"\u6708"+e.getDate()+"\u65e5 "+e.getHours()+":"+e.getMinutes()+":"+e.getSeconds()+":"+e.getMilliseconds()}var g,p=c(16),m=!1;var x=function(){var e=Object(n.useState)(new Date),t=Object(s.a)(e,2),c=t[0],r=t[1],a=Object(n.useState)(new Date),i=Object(s.a)(a,2),o=i[0],l=i[1],b=Object(n.useState)(new Date),u=Object(s.a)(b,2),j=u[0],x=u[1],y=Object(v.c)((function(e){var t=e.config.get("serverAddress"),c=e.config.get("serverPort");return t&&c?t+":"+c:""})),k=function(){var e=new Date;window.api.ntpcs(y).then((function(t){"success"===t.state&&(r(e),l(t.receiveTime),x(t.backTime))}))};return Object(n.useEffect)((function(){return function(){m=!1,clearInterval(g)}}),[]),Object(p.jsxs)(d,{children:[Object(p.jsx)(O.b,{title:"\u53d1\u9001\u5e27",bordered:!0,column:3,layout:"horizontal",children:Object(p.jsx)(O.b.Item,{label:"\u53d1\u9001\u65f6\u523b",span:3,children:h(c)})}),Object(p.jsxs)(O.b,{title:"\u63a5\u6536\u5e27",bordered:!0,column:3,layout:"horizontal",children:[Object(p.jsx)(O.b.Item,{label:"\u63a5\u6536\u65f6\u523b",span:3,children:h(o)}),Object(p.jsx)(O.b.Item,{label:"\u56de\u9001\u65f6\u523b",span:3,children:h(j)})]}),Object(p.jsx)(f.a,{type:"primary",onClick:k,style:{marginTop:50,alignSelf:"start"},children:"\u77eb\u6b63\u7cfb\u7edf\u65f6\u949f"}),Object(p.jsx)(f.a,{type:"primary",onClick:function(){console.log("isSending? ".concat(m)),m?(m=!1,clearInterval(g)):(m=!0,g=setInterval((function(){k()}),1e3))},style:{marginTop:30,alignSelf:"start"},children:"\u8fde\u7eed\u53d1\u8d77\u8bf7\u6c42"})]})},y=c(121),k=c(241);var S=function(){var e=Object(n.useState)(!1),t=Object(s.a)(e,2),c=t[0],r=t[1],a=Object(n.useState)([]),i=Object(s.a)(a,2),o=i[0],l=i[1],b=Object(n.useCallback)((function(e,t){console.log(e,t),l((function(c){return[{time:h(e),key:1e3*Math.random(),address:t}].concat(Object(y.a)(c)).slice(0,9)}))}),[]),u=Object(n.useCallback)((function(){window.api.ntpbroadcast.subscribe(b),r((function(e){return!e}))}),[b]);return Object(n.useEffect)((function(){return function(){window.api.ntpbroadcast.desubscribe()}}),[b]),Object(p.jsx)(d,{style:{overflow:"hidden"},children:Object(p.jsx)(k.b,{bordered:!0,header:Object(p.jsx)(f.a,{type:"primary",onClick:u,disabled:c,children:"\u5f00\u59cb\u76d1\u542c\u5e7f\u64ad"}),dataSource:Object(y.a)(o).reverse(),renderItem:function(e){return Object(p.jsxs)(k.b.Item,{children:[e.time,"   \u6765\u81ea",e.address,"\u7684\u6d88\u606f"]},e.key)}})})},w=c(240),C=c(238),I=c(242),P=/^([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|((https?:\/\/)?www\.([\S]+\.)+(com|cn|top|edu)(:[0-9]{1,5})?)$/,A=/^[0-9]{1,5}$/;var E={Ntpcs:x,NtpBroadcast:S,Setting:function(){var e=Object(v.d)().getState().config,t=Object(v.b)(),c=Object(n.useState)(!1),r=Object(s.a)(c,2),a=r[0],i=r[1],o=Object(n.useState)(!1),l=Object(s.a)(o,2),b=l[0],u=l[1],j=Object(n.useState)(!1),O=Object(s.a)(j,2),h=O[0],g=O[1],m=Object(n.useState)(!1),x=Object(s.a)(m,2),y=x[0],k=x[1],S=Object(n.useState)(e.get("serverAddress")),E=Object(s.a)(S,2),F=E[0],D=E[1],M=Object(n.useState)(e.get("serverPort")),N=Object(s.a)(M,2),T=N[0],B=N[1],J=Object(n.useState)(e.get("originAddress")),L=Object(s.a)(J,2),z=L[0],G=L[1],H=Object(n.useState)(e.get("receivePort")),Y=Object(s.a)(H,2),$=Y[0],K=Y[1],W=Object(n.useState)(!1),q=Object(s.a)(W,2),Q=q[0],R=q[1],U=Object(n.useCallback)((function(){return i(P.test(F?F.trim():"")),u(A.test(T?T.trim():"")),g(P.test(z?z.trim():"")),k(A.test($?$.trim():"")),a&&b&&h&&y}),[a,b,h,y,F,T,z,$]),V=Object(n.useCallback)((function(e){var t=e.target.value;i(P.test(t.trim())),D(t.trim())}),[]),X=Object(n.useCallback)((function(e){var t=e.target.value;u(A.test(t.trim())),B(t.trim())}),[]),Z=(Object(n.useCallback)((function(e){var t=e.target.value;g(P.test(t.trim())),G(t.trim())}),[]),Object(n.useCallback)((function(e){var t=e.target.value;k(A.test(t.trim())),K(t.trim())}),[]),Object(n.useCallback)((function(){U()&&(t(_({serverAddress:F,serverPort:T,originAddress:z,receivePort:$})),R(!0))}),[F,T,z,$,t,U])),_=function(e){return{type:"CONFIG",payload:{serverAddress:e.serverAddress,serverPort:e.serverPort,originAddress:e.originAddress,receivePort:e.receivePort}}};return Object(n.useEffect)((function(){U()}),[U]),Object(p.jsx)(d,{children:Object(p.jsxs)(w.a,{children:[Object(p.jsxs)("div",{children:[Object(p.jsx)(C.a,{orientation:"left",children:"\u5ba2\u6237\u8bf7\u6c42\u6a21\u5f0f\u914d\u7f6e\uff1a"}),Object(p.jsx)(w.a.Item,{label:"\u670d\u52a1\u5668\u5730\u5740",validateStatus:a?"success":"error",hasFeedback:Q,children:Object(p.jsx)(I.a,{onChange:V,value:F})}),Object(p.jsx)(w.a.Item,{label:"\u670d\u52a1\u5668\u7aef\u53e3",validateStatus:b?"success":"error",hasFeedback:Q,children:Object(p.jsx)(I.a,{onChange:X,value:T})})]}),Object(p.jsx)(f.a,{type:"primary",loading:!1,onClick:Z,children:"\u5b8c\u6210\u8bbe\u7f6e"})]})})}},F=c(117).sider;var D=function(){var e=Object(n.useState)(!0),t=Object(s.a)(e,2),c=t[0],a=t[1],i=Object(n.useState)(F[0].key),j=Object(s.a)(i,2),d=j[0],O=j[1],f=Object(n.useCallback)((function(){a(!1)}),[]),v=Object(n.useCallback)((function(){a(!0)}),[]),h=Object(n.useCallback)((function(e){O(e.key)}),[]);return Object(n.useEffect)((function(){window.api.ntpbroadcast.begin()}),[]),Object(p.jsxs)(o.a,{style:{width:"100vw",height:"100vh",display:"flex",flex:1},children:[Object(p.jsx)(o.a.Sider,{width:150,breakpoint:"sm",collapsed:c,trigger:null,theme:"light",onMouseEnter:f,onMouseLeave:v,style:{height:"100vh",left:0,top:0},children:Object(p.jsx)(l.a,{onClick:h,selectedKeys:[d],style:{border:"none"},children:F.map((function(e){return Object(p.jsx)(l.a.Item,{icon:r.a.createElement(u[e.icon]),children:e.title},e.key)}))})}),Object(p.jsx)(o.a,{style:{height:"100vh",backgroundColor:b.b[0]},children:r.a.createElement(E[d])})]})},M=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,245)).then((function(t){var c=t.getCLS,n=t.getFID,r=t.getFCP,a=t.getLCP,i=t.getTTFB;c(e),n(e),r(e),a(e),i(e)}))},N=c(68),T=c(120),B="CONFIG",J=c(117),L=c(145),z=c(77),G=c.n(z),H=c(150),Y=G.a.mark(K),$=G.a.mark(W);function K(){return G.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(H.a)(B,W);case 2:case"end":return e.stop()}}),Y)}function W(e){return G.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,window.api.config(e);case 2:case"end":return t.stop()}}),$)}var q=Object(L.a)(),Q=Object(N.d)(Object(N.c)({config:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Object(T.a)(Object(j.a)({},J.storeConfig)),t=arguments.length>1?arguments[1]:void 0;switch(t.type){case B:return Object(T.a)(t.payload);default:return e}}}),Object(N.a)(q));q.run(K);var R=Q;i.a.render(Object(p.jsx)(r.a.StrictMode,{children:Object(p.jsx)(v.a,{store:R,children:Object(p.jsx)(D,{})})}),document.getElementById("root")),M()}},[[236,1,2]]]);
//# sourceMappingURL=main.7b00cc8c.chunk.js.map