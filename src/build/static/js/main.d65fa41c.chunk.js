(this["webpackJsonpntp-client"]=this["webpackJsonpntp-client"]||[]).push([[0],{117:function(e){e.exports=JSON.parse('{"sider":[{"title":"C/S \u6a21\u5f0f","icon":"Html5Outlined","key":"Ntpcs"},{"title":"\u5e7f\u64ad\u6a21\u5f0f","icon":"WifiOutlined","key":"NtpBroadcast"},{"title":"\u8bbe\u7f6e","icon":"SettingOutlined","key":"Setting"}],"storeConfig":{"serverAddress":"120.25.115.20","serverPort":"123","originAddress":"115.156.155.100","receivePort":"123"}}')},236:function(e,t,c){"use strict";c.r(t);var r=c(0),n=c.n(r),a=c(31),i=c.n(a),s=(c(156),c(27)),o=c(239),l=c(244),b=c(107),j=c(142),u=c(76),d=function(e,t){return function(){var c=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=Object.assign({},t,c.style);return n.a.createElement(e,Object(u.a)(Object(u.a)({},c),{},{style:r}))}}("div",{width:"100%",height:"100%",padding:"40px 70px",display:"flex",flexDirection:"column",justifyContent:"start",overflowY:"auto"}),O=c(243),h=c(146),f=c(51),v=c(15);var g=function(){var e=Object(r.useState)(new Date),t=Object(s.a)(e,2),c=t[0],n=t[1],a=Object(r.useState)(new Date),i=Object(s.a)(a,2),o=i[0],l=i[1],b=Object(r.useState)(new Date),j=Object(s.a)(b,2),u=j[0],g=j[1],p=Object(f.c)((function(e){var t=e.config.get("serverAddress"),c=e.config.get("serverPort");return t&&c?t+":"+c:""}));return Object(v.jsxs)(d,{children:[Object(v.jsx)(O.b,{title:"\u53d1\u9001\u5e27",bordered:!0,column:3,layout:"horizontal",children:Object(v.jsxs)(O.b.Item,{label:"\u53d1\u9001\u65f6\u523b",span:3,children:[c.toString(),":",c.getMilliseconds()]})}),Object(v.jsxs)(O.b,{title:"\u63a5\u6536\u5e27",bordered:!0,column:3,layout:"horizontal",children:[Object(v.jsxs)(O.b.Item,{label:"\u63a5\u6536\u65f6\u523b",span:3,children:[o.toString(),":",o.getMilliseconds()]}),Object(v.jsxs)(O.b.Item,{label:"\u56de\u9001\u65f6\u523b",span:3,children:[u.toString(),":",u.getMilliseconds()]})]}),Object(v.jsx)(h.a,{type:"primary",onClick:function(){var e=new Date;window.api.ntpcs(p).then((function(t){n(e),l(t.receiveTime),g(t.backTime)}))},style:{marginTop:50,alignSelf:"start"},children:"\u53d1\u8d77\u8bf7\u6c42"})]})},p=c(121),m=c(241);var x=function(){var e=Object(r.useState)(!1),t=Object(s.a)(e,2),c=t[0],n=t[1],a=Object(r.useState)([]),i=Object(s.a)(a,2),o=i[0],l=i[1],b=Object(r.useCallback)((function(e){l((function(t){return[{time:e.toString()+":"+e.getMilliseconds(),key:1e3*Math.random()}].concat(Object(p.a)(t)).slice(0,9)}))}),[]),j=Object(r.useCallback)((function(){window.api.ntpbroadcast.subscribe(b),n((function(e){return!e}))}),[b]);return Object(r.useEffect)((function(){return function(){window.api.ntpbroadcast.desubscribe()}}),[b]),Object(v.jsx)(d,{style:{overflow:"hidden"},children:Object(v.jsx)(m.b,{bordered:!0,header:Object(v.jsx)(h.a,{type:"primary",onClick:j,disabled:c,children:"\u5f00\u59cb\u76d1\u542c\u5e7f\u64ad"}),dataSource:Object(p.a)(o).reverse(),renderItem:function(e){return Object(v.jsx)(m.b.Item,{children:e.time},e.key)}})})},S=c(240),k=c(238),y=c(242),w=/^([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|((https?:\/\/)?www\.([\S]+\.)+(com|cn|top|edu)(:[0-9]{1,5})?)$/,C=/^[0-9]{1,5}$/;var I={Ntpcs:g,NtpBroadcast:x,Setting:function(){var e=Object(f.d)().getState().config,t=Object(f.b)(),c=Object(r.useState)(!1),n=Object(s.a)(c,2),a=n[0],i=n[1],o=Object(r.useState)(!1),l=Object(s.a)(o,2),b=l[0],j=l[1],u=Object(r.useState)(!1),O=Object(s.a)(u,2),g=O[0],p=O[1],m=Object(r.useState)(!1),x=Object(s.a)(m,2),I=x[0],P=x[1],A=Object(r.useState)(e.get("serverAddress")),F=Object(s.a)(A,2),E=F[0],M=F[1],N=Object(r.useState)(e.get("serverPort")),D=Object(s.a)(N,2),T=D[0],B=D[1],J=Object(r.useState)(e.get("originAddress")),L=Object(s.a)(J,2),z=L[0],G=L[1],$=Object(r.useState)(e.get("receivePort")),H=Object(s.a)($,2),K=H[0],W=H[1],Y=Object(r.useState)(!1),q=Object(s.a)(Y,2),Q=q[0],R=q[1],U=Object(r.useCallback)((function(){return i(w.test(E?E.trim():"")),j(C.test(T?T.trim():"")),p(w.test(z?z.trim():"")),P(C.test(K?K.trim():"")),a&&b&&g&&I}),[a,b,g,I,E,T,z,K]),V=Object(r.useCallback)((function(e){var t=e.target.value;i(w.test(t.trim())),M(t.trim())}),[]),X=Object(r.useCallback)((function(e){var t=e.target.value;j(C.test(t.trim())),B(t.trim())}),[]),Z=Object(r.useCallback)((function(e){var t=e.target.value;p(w.test(t.trim())),G(t.trim())}),[]),_=Object(r.useCallback)((function(e){var t=e.target.value;P(C.test(t.trim())),W(t.trim())}),[]),ee=Object(r.useCallback)((function(){U()&&(t(te({serverAddress:E,serverPort:T,originAddress:z,receivePort:K})),R(!0))}),[E,T,z,K,t,U]),te=function(e){return{type:"CONFIG",payload:{serverAddress:e.serverAddress,serverPort:e.serverPort,originAddress:e.originAddress,receivePort:e.receivePort}}};return Object(r.useEffect)((function(){U()}),[U]),Object(v.jsx)(d,{children:Object(v.jsxs)(S.a,{children:[Object(v.jsxs)("div",{children:[Object(v.jsx)(k.a,{orientation:"left",children:"\u5ba2\u6237\u8bf7\u6c42\u6a21\u5f0f\u914d\u7f6e\uff1a"}),Object(v.jsx)(S.a.Item,{label:"\u670d\u52a1\u5668\u5730\u5740",validateStatus:a?"success":"error",hasFeedback:Q,children:Object(v.jsx)(y.a,{onChange:V,value:E})}),Object(v.jsx)(S.a.Item,{label:"\u670d\u52a1\u5668\u7aef\u53e3",validateStatus:b?"success":"error",hasFeedback:Q,children:Object(v.jsx)(y.a,{onChange:X,value:T})})]}),Object(v.jsxs)("div",{children:[Object(v.jsx)(k.a,{orientation:"left",children:"\u5e7f\u64ad\u6a21\u5f0f\u914d\u7f6e\uff1a"}),Object(v.jsx)(S.a.Item,{label:"\u5e7f\u64ad\u6765\u6e90\u5730\u5740",validateStatus:g?"success":"error",hasFeedback:Q,children:Object(v.jsx)(y.a,{onChange:Z,value:z})}),Object(v.jsx)(S.a.Item,{label:"\u6307\u5b9a\u63a5\u6536\u7aef\u53e3",validateStatus:I?"success":"error",hasFeedback:Q,children:Object(v.jsx)(y.a,{onChange:_,value:K})})]}),Object(v.jsx)(h.a,{type:"primary",loading:!1,onClick:ee,children:"\u5b8c\u6210\u8bbe\u7f6e"})]})})}},P=c(117).sider;var A=function(){var e=Object(r.useState)(!0),t=Object(s.a)(e,2),c=t[0],a=t[1],i=Object(r.useState)(P[0].key),u=Object(s.a)(i,2),d=u[0],O=u[1],h=Object(r.useCallback)((function(){a(!1)}),[]),f=Object(r.useCallback)((function(){a(!0)}),[]),g=Object(r.useCallback)((function(e){O(e.key)}),[]);return Object(r.useEffect)((function(){window.api.ntpbroadcast.begin()}),[]),Object(v.jsxs)(o.a,{style:{width:"100vw",height:"100vh",display:"flex",flex:1},children:[Object(v.jsx)(o.a.Sider,{width:150,breakpoint:"sm",collapsed:c,trigger:null,theme:"light",onMouseEnter:h,onMouseLeave:f,style:{height:"100vh",left:0,top:0},children:Object(v.jsx)(l.a,{onClick:g,selectedKeys:[d],style:{border:"none"},children:P.map((function(e){return Object(v.jsx)(l.a.Item,{icon:n.a.createElement(j[e.icon]),children:e.title},e.key)}))})}),Object(v.jsx)(o.a,{style:{height:"100vh",backgroundColor:b.b[0]},children:n.a.createElement(I[d])})]})},F=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,245)).then((function(t){var c=t.getCLS,r=t.getFID,n=t.getFCP,a=t.getLCP,i=t.getTTFB;c(e),r(e),n(e),a(e),i(e)}))},E=c(68),M=c(120),N="CONFIG",D=c(117),T=c(145),B=c(77),J=c.n(B),L=c(150),z=J.a.mark($),G=J.a.mark(H);function $(){return J.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(L.a)(N,H);case 2:case"end":return e.stop()}}),z)}function H(e){return J.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,window.api.config(e);case 2:case"end":return t.stop()}}),G)}var K=Object(T.a)(),W=Object(E.d)(Object(E.c)({config:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Object(M.a)(Object(u.a)({},D.storeConfig)),t=arguments.length>1?arguments[1]:void 0;switch(t.type){case N:return Object(M.a)(t.payload);default:return e}}}),Object(E.a)(K));K.run($);var Y=W;i.a.render(Object(v.jsx)(n.a.StrictMode,{children:Object(v.jsx)(f.a,{store:Y,children:Object(v.jsx)(A,{})})}),document.getElementById("root")),F()}},[[236,1,2]]]);
//# sourceMappingURL=main.d65fa41c.chunk.js.map