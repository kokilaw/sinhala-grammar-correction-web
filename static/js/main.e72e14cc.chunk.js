(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{48:function(e,t,n){e.exports=n(83)},57:function(e,t,n){},58:function(e,t,n){},59:function(e,t,n){},83:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(15),i=n.n(o),c=n(21),l=n(11),s=n(9),u=n(17),d=n(37),p=n(38),m=n(19),h="FETCH_CORRECTIONS_FOR_SENTENCES_INIT",b="FETCH_CORRECTIONS_FOR_SENTENCES_SUCCESS",g="FETCH_CORRECTIONS_FOR_SENTENCES_ERROR";var f=Object(s.combineReducers)({correctionsReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(t.type){case h:return Object(m.a)({},e,{status:"LOADING"});case b:return Object(m.a)({},e,{data:t.data,status:"SUCCESS"});case g:return Object(m.a)({},e,{error:t.error,status:"ERROR"});default:return e}}}),E=(n(57),n(58),n(59),n(39)),y=n(40),S=n(46),v=n(41),O=n(45),C=n(8),x=n(12),w=n(13);function N(){var e=Object(x.a)(["\n    display: block;\n    width: 200px;\n    margin: 0px auto 0;\n    padding: 10px;\n    border: none;\n    border-radius: 25px;\n    color: #fff;\n    background-color: #58b846;\n    font: 15px Poppins-Medium;\n    line-height: 1.2;\n    text-transform: uppercase;\n    letter-spacing: 1px;\n    appearance: none;\n    cursor: pointer;\n    transition: all 0.4s;\n    &:hover {\n        box-shadow: 0 0.5em 0.5em -0.4em #8fc866;\n        transform: translateY(-0.25em);\n    }\n    &:focus {\n        outline: none;\n        box-shadow: 0 0 0 2px rgba(68, 68, 68, 0.137);\n    }\n    &:disabled {\n        background-color: #ccc;\n        &:hover {\n            box-shadow: none\n            transform: none\n        }\n    }\n"]);return N=function(){return e},e}function R(){var e=Object(x.a)(["\n    padding: 0.5em 0.6em;\n    display: inline-block;\n    border: 1px solid #ccc;\n    box-shadow: inset 0 1px 3px #ddd;\n    border-radius: 4px;\n    vertical-align: middle;\n    box-sizing: border-box;\n    width: 100%;\n    text-align: center;\n    &:focus {\n        outline: none;\n        box-shadow: 0 0 0 2px rgba(68, 68, 68, 0.137);\n    }\n"]);return R=function(){return e},e}function j(){var e=Object(x.a)(["\n    display: inline-block;\n    width: 46px;\n    height: 46px;\n    &:after {\n        content: ' ';\n        display: block;\n        width: 46px;\n        height: 46px;\n        border-radius: 50%;\n        border: 5px solid #58b846;\n        border-color: #58b846 transparent #58b846 transparent;\n        animation: lds-dual-ring 1.2s linear infinite;\n    }\n    @keyframes lds-dual-ring {\n        0% {\n            transform: rotate(0deg);\n        }\n        100% {\n            transform: rotate(360deg);\n        }\n    }\n"]);return j=function(){return e},e}function T(){var e=Object(x.a)(["\n    display: block;\n    font-family: Poppins-Bold;\n    font-size: 30px;\n    color: #333333;\n    line-height: 1.2;\n    text-align: center;\n"]);return T=function(){return e},e}var k=w.a.span(T()),I=w.a.div(j()),B=w.a.input(R()),_=w.a.button(N()),q=n(25),D=n.n(q),F=function(e,t){return D.a.post("https://35.200.222.127"+e,t)},G="/correct";function V(e){return function(t){return t({type:h}),F(G,e).then(function(e){var n;t((n=e.data,{type:b,data:n}))}).catch(function(e){t(function(e){return{type:g,error:e}}(e.response))})}}var U=function(e){return r.a.createElement("div",{className:"alert alert-success",role:"alert",style:{marginTop:"30px"}},r.a.createElement("pre",null,JSON.stringify(e.data,null,2)))},A=function(){return r.a.createElement("div",{className:"alert alert-danger m-b-26",role:"alert"},r.a.createElement("h4",{className:"alert-heading m-b-8"},"Unsupported Input Format"),r.a.createElement("p",null,"Please note that only sentences with following characteristics are supported by the system currently.",r.a.createElement("ul",{className:"m-l-10"},r.a.createElement("li",null,"- Should contain only sinhala unicode characters and ends with a fullstop."),r.a.createElement("li",null,"- Numbers and other punctuation marks are not supported yet."),r.a.createElement("li",null,"- No additional white spaces are supported."),r.a.createElement("li",null,"- Only Sentence within word limit 3-7 are currently supported."))),r.a.createElement("hr",null),r.a.createElement("p",{className:"mb-0"},"E.g: \u0d9a\u0dca\u200d\u0dbb\u0dd3\u0da9\u0d9a\u0dba\u0dcf \u0d89\u0dad\u0dcf \u0dc0\u0dda\u0d9c\u0dba\u0dd9\u0db1\u0dca \u0daf\u0dd2\u0dc0\u0dca\u0dc0\u0dda\u0dba."))},L=function(e){function t(e){var n;return Object(E.a)(this,t),(n=Object(S.a)(this,Object(v.a)(t).call(this,e))).onInputValueChange=function(e){n.setState({inputSentence:e.target.value})},n.onSubmit=function(e){e.preventDefault();var t=n.props.checkGrammar;n.validateInput(n.state.inputSentence)?(n.setState({showValidationError:!1}),t(n.getRequestBody())):n.setState({showValidationError:!0})},n.getRequestBody=function(){return{sentence:n.state.inputSentence,useBeamSearch:"beem"===n.state.searchType}},n.setSearchType=function(e){n.setState({searchType:e.target.value})},n.validateInput=function(e){var t=new RegExp("[^\u0d80-\u0dff.\u200d ]"),n=new RegExp("( +[.!?])"),a=e.match(/\S+/g)||[];return!t.test(e)&&!n.test(e)&&a.length>=3&&a.length<=7},n.onInputValueChange=n.onInputValueChange.bind(Object(C.a)(Object(C.a)(n))),n.setSearchType=n.setSearchType.bind(Object(C.a)(Object(C.a)(n))),n.getRequestBody=n.getRequestBody.bind(Object(C.a)(Object(C.a)(n))),n.state={inputSentence:"",searchType:"greedy",requestingCorrections:!1,showValidationError:!1},n}return Object(O.a)(t,e),Object(y.a)(t,[{key:"componentWillReceiveProps",value:function(e){e.requestingCorrections!==this.state.requestingCorrections&&this.setState({requestingCorrections:e.requestingCorrections})}},{key:"render",value:function(){var e=this.state,t=e.searchType,n=e.requestingCorrections,a=e.showValidationError,o=this.props.initState,i={};return"SUCCESS"===o&&(i=this.props.correctionData),r.a.createElement("div",{className:"container-login100"},r.a.createElement("div",{className:"wrap-login100"},r.a.createElement("form",{className:"login100-form validate-form"},r.a.createElement(k,{className:"p-b-26"},"Sinhala Grammar Tool Beta"),a&&r.a.createElement(A,null),r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement(B,{placeholder:"Enter the sentence here...",onChange:this.onInputValueChange,disabled:n}),r.a.createElement("div",{style:{textAlign:"center",padding:"20px"}},r.a.createElement("label",{htmlFor:"greedyButton",className:"radio-inline"},r.a.createElement("input",{id:"greedyButton",value:"greedy",type:"radio",name:"optradio",onChange:this.setSearchType,defaultChecked:"greedy"===t,disabled:n}),"Use Greedy Search"),r.a.createElement("label",{htmlFor:"beemButton",className:"radio-inline",style:{paddingLeft:"10px"}},r.a.createElement("input",{id:"beemButton",value:"beem",type:"radio",name:"optradio",onChange:this.setSearchType,defaultChecked:"beem"===t,disabled:n}),"Use Beam Search"))),"LOADING"!==o&&r.a.createElement(_,{onClick:this.onSubmit,disabled:n},"Check Grammar"),"LOADING"===o&&r.a.createElement("div",{style:{textAlign:"center",paddingTop:"20px"}},r.a.createElement(I,null)),"SUCCESS"===o&&r.a.createElement(U,{data:i})))))}}]),t}(r.a.Component);L.defaultProps={correctionData:{results:[],useBeamSearch:!1}};var P=Object(u.b)(function(e,t){return{initState:(e.correctionsReducer||{}).status||"",correctionData:e.correctionsReducer.data,error:e.correctionsReducer.error,requestingCorrections:"LOADING"===(e.correctionsReducer||{}).status}},function(e,t){return{checkGrammar:function(t){return e(V(t))}}})(L),W=function(e){e.location;return r.a.createElement("div",{className:"limiter"},r.a.createElement(P,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var H=Object(s.createStore)(f,Object(d.composeWithDevTools)(Object(s.applyMiddleware)(p.a)));i.a.render(r.a.createElement(c.a,null,r.a.createElement(u.a,{store:H},r.a.createElement(l.a,{component:W}))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[48,1,2]]]);
//# sourceMappingURL=main.e72e14cc.chunk.js.map