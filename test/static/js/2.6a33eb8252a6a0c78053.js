webpackJsonp([2],{"+H76":function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={data:function(){return{time:5,timeR:[]}},created:function(){var t=this,e=setInterval(function(){t.time--,0==t.time&&(clearInterval(e),t.$router.replace({path:"/home"}))},1e3);this.timeR.push(e)},destroyed:function(){},methods:{toHome:function(){this.$router.replace({path:"/home"}),clearInterval(this.timeR[0])}}},a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"common_flex_negative",staticStyle:{height:"100vh",overflow:"hidden"}},[i("img",{attrs:{src:r("5mYX"),alt:""}}),t._v(" "),i("p",[t._v("您访问的页面暂时无法访问")]),t._v(" "),i("div",{staticClass:"common_flex_align_center"},[i("div",{staticClass:"error_button",staticStyle:{"background-color":"#fff",color:"#333",border:"1px #eee solid"}},[t._v(t._s(t.time)+" 秒后回到首页...")]),t._v(" "),i("div",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"error_button",staticStyle:{width:"100px","margin-left":"20px"},on:{click:t.toHome}},[t._v("点击返回")])])])},staticRenderFns:[]};var n=r("VU/8")(i,a,!1,function(t){r("rSaJ")},"data-v-0e376ee8",null);e.default=n.exports},"5mYX":function(t,e,r){t.exports=r.p+"static/img/404.8e1777d.png"},rSaJ:function(t,e){}});