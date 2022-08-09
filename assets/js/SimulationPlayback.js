define("DS/UrbanWidget/APIBeta/models/Utils",[],(function(){return{getAuthorizationHeader:e=>e.username&&e.password?{Authorization:"Basic "+btoa(e.username+":"+e.password)}:{Authorization:e}}})),define("DS/UrbanWidget/APIBeta/SimulationPlaybackLatest",["DS/i3DXCompassServices/i3DXCompassServices","DS/PlatformAPI/PlatformAPI","DS/WAFData/WAFData","DS/UrbanWidget/APIBeta/models/Utils"],(function(e,t,n,o){var i,r,a=[];function s(e,i,r){return new Promise((function(s,l){new Promise((function(e,n){var o=t.subscribe("3DEXPERIENCity.GetAreaInViewReturn",(function(n){t.unsubscribe(o),e(n[0])}));t.publish("3DEXPERIENCity.GetAreaInView")})).then((function(t){a[e]={id:e,anchor:t,agentsCount:[],elapsed:0,speed:1,follow:{}},null==r&&(r={}),function(e,t,i){return new Promise((function(r,s){var l={method:"GET",type:"json",timeout:24e4,onComplete(t){console.log("Simulation data loaded."),function(e,t){return new Promise((function(t,n){var o=[],i=0;!function(e,t,n,o){var i=0;!function r(){for(var a=Math.min(i+t,e);i<a;++i)n.call(null,i);i<e?setTimeout(r,0):o.call(null)}()}(e.length,50,(function(){var t=function(e){for(var t={},n=[0,0],o=0,i=e.feature_type.length;o<i;o++){null==t[e.feature_type[o]]&&(t[e.feature_type[o]]={coordinates:[],orientations:[],featureIds:[]});var r=t[e.feature_type[o]].coordinates.length;t[e.feature_type[o]].coordinates[r]=[e.coordinates[o][0]+n[0],e.coordinates[o][1]+n[1],e.coordinates[o][2]],t[e.feature_type[o]].orientations[r]=e.orientations[o],t[e.feature_type[o]].featureIds[r]=e.feature_id[o]}return t}(e[i].geoJson.features[0]),n=function(e){var t=new Date(e).getTime();isNaN(t)&&(n=e.split(/\D+/),t=new Date(Date.UTC(n[0],--n[1],n[2],n[3],n[4],n[5],n[6])).getTime());var n;return t}(e[i].timestamp);o.push({timestamp:n,features:t}),++i}),(function(){console.log("done processing"),t(o)}))}))}(t).then((function(t){a[e].data=t,r()}))},onFailure(e){console.log(e)}};i.noCache&&(l.cache=-1),i.authorization&&(l.headers=o.getAuthorizationHeader(i.authorization)),n.request(t,l)}))}(e,i,r).then(p.bind(this,e,t,r.featureTypes)).then((function(){setTimeout(g.bind(this,a[e],0,e),100),s(!0)}))}))}))}function l(e,t,n,o){return{id:e,className:"Feature",visible:!0,selectable:!1,selected:!1,hoverable:!1,hovered:!1,Geometry:{url:o,spec:null,scale:n,Coordinate:{position:{x:t[0],y:t[1],z:t[2]||0},projection:i.projection,shifted:!1,altitudeMode:"absolute",rotation:{x:0,y:0,z:0},id:e+"_Coord",className:"Coordinate"},Shader:null,shadow:!0,extension:"3dxc",renderID:"",Rendering:{Material:{opacity:1,wireframe:!1,alphaTest:0,side:0,specular:"#000000",ambient:"#ffffff",diffuse:"#ffffff",depthTest:!0,depthWrite:!0,shininess:1,color:"#ffffff",renderingDescription:""},ElementRendering:[{ElementIds:["AllIds"],ElementMaterial:{diffuse:"#ffffff",ambient:"#ffffff",color:"#ffffff",opacity:1}}]},id:UWA.Utils.getUUID(),className:"Geometry"},userData:{editablePosition:!0}}}function u(e,t){for(var n=[],o=0;o<t.numberOfAgents;o++){var i=t.type+"_"+o,r=t.model,a=t.scale;n.push(l(i,e,a,r))}return n}function c(e,t){return{type:"Feature",geometry:{type:"Point",coordinates:t},properties:{strid:"agent_"+e,name:"Agent "+e}}}function d(e,t){for(var n={type:"FeatureCollection",features:[]},o=0;o<t;o++)n.features.push(c(o,e));var r=i.widgetData.currentReferential.toJSON();return n.features.push(c("min",[r.bbox.xmin,r.bbox.ymin])),n.features.push(c("max",[r.bbox.xmax,r.bbox.ymax])),n}function f(e,t,n){return 1==e.textured?{name:e.type,id:n+"_"+e.type,visible:!0,selectable:!1,children:u(t,e),exclusive:!1,opened:!1,className:"Folder"}:{className:"Feature",name:e.type,id:n+"_"+e.type,visible:!0,selectable:!1,Geometry:{className:"RdbLink",levelMax:0,levelMin:0,priority:100,priorityOffset:0,cache:0,invertY:!0,type:"json",url:"data:application/json;base64,"+btoa(JSON.stringify(d(t,e.numberOfAgents))),Factory:{className:"pointofinterest3d",stridAttribute:"strid",nameAttribute:"strid",isPickable:!1,geometryMode:"primitive",renderMode:"dual",shapeType:e.model,opacityFactor:.2,switchDistance:150,scale:e.scale,color:e.color}}}}function p(e,n,o){return new Promise((function(i,r){t.subscribe("3DEXPERIENCity.Load3DContentConfigReturn",(function(e){t.unsubscribe("3DEXPERIENCity.Load3DContentConfigReturn"),i("")})),o=o||[{type:"0",color:"rgb(0,0,255)",model:"https://sgp-server2015x.uwglobe.com/widget/assets/models3d/arrow.json",scale:[6.5,6.5,2.5]},{type:"100",color:"rgb(3,253,25)",model:"https://sgp-server2015x.uwglobe.com/widget/assets/models3d/arrow.json",scale:[6.5,6.5,2.5]},{type:"200",color:"rgb(0,255, 0)",model:"https://sgp-server2015x.uwglobe.com/widget/assets/models3d/arrow.json",scale:[6.5,6.5,2.5]},{type:"300",color:"rgb(255,255,0)",model:"https://sgp-server2015x.uwglobe.com/widget/assets/models3d/arrow.json",scale:[6.5,6.5,2.5]},{type:"400",color:"rgb(255,127,0)",model:"https://sgp-server2015x.uwglobe.com/widget/assets/models3d/arrow.json",scale:[6.5,6.5,2.5]},{type:"500",color:"rgb(255,0,0)",model:"https://sgp-server2015x.uwglobe.com/widget/assets/models3d/arrow.json",scale:[6.5,6.5,2.5]}];for(var s=0;s<o.length;s++){var l=o[s].type;o[s].numberOfAgents=Math.max.apply(Math,a[e].data.map((function(e){return e.features[l]?e.features[l].coordinates.length:0}))),a[e].agentsCount[o[s].type]=o[s].numberOfAgents}for(var u=[],c=(s=0,o.length);s<c;s++)u.push(f(o[s],n,e));var d={Root:[{className:"Folder",name:"Simulation Playback",id:e,exclusive:!1,visible:!1,children:u}]};t.publish("3DEXPERIENCity.Load3DContentConfig",{widget_id:widget.id,json_config_url:"data:application/json;base64,"+btoa(JSON.stringify(d))})}))}function m(e,t,n){var o=a[e];if(o.isPlaying){null==o.prevTimestamp&&(o.prevTimestamp=n);var i=(n-o.prevTimestamp)*o.speed;o.elapsed+=i,o.prevTimestamp=n;var r=o.data[0].timestamp,s=o.data[o.data.length-2].timestamp;if(o.elapsed+r>=s&&(o.elapsed=0,!o.loop))return b.stop(e),o.prevTimestamp=void 0,void(t.ended&&t.ended());g(o).then((function(n){if(t.playing){var i=new Date(r+o.elapsed),a=i.getFullYear()+"-"+(i.getMonth()<9?"0":"")+(i.getMonth()+1)+"-"+(i.getDate()<10?"0":"")+i.getDate()+" "+(i.getHours()<10?"0":"")+i.getHours()+":"+(i.getMinutes()<10?"0":"")+i.getMinutes()+":"+(i.getSeconds()<10?"0":"")+i.getSeconds()+"."+i.getMilliseconds();t.playing({timestamp:a})}window.requestAnimationFrame(m.bind(this,e,t))}))}}function g(e){return new Promise((function(t,n){for(var o=e.data,i=e.elapsed,r=(e.id,[]),a=o.find((function(e){return o[0].timestamp+i<e.timestamp})),s=o.indexOf(a),l=o[s-1],u=a.timestamp-l.timestamp,c=(o[0].timestamp+i-l.timestamp)/u,d=Object.keys(l.features),f=0,p=d.length;f<p;f++){var m=d[f],g={coordinates:l.features[m].coordinates,orientations:l.features[m].orientations,ids:l.features[m].featureIds},h={coordinates:a.features[m].coordinates,orientations:a.features[m].orientations,ids:a.features[m].featureIds};r.push(y(m,g,h,c,e))}Promise.all(r).then(t)}))}function y(e,t,n,o,r){return new Promise((function(a,s){var l=i.findItem({id:v(r.id,e)});if("Folder"==l.get("className")){for(var u=l.get("children"),c=0;c<u.length;c++){var d=h(e,u[c].get("id"),t,n,o,r),f=u[c].get("Coordinate"),p=f.get("position");p.x=d.agentPosition[0],p.y=d.agentPosition[1],p.z=d.agentPosition[2],f.set("position",p);var m=f.get("rotation");m.x=d.agentOrientation[0]*(180/Math.PI),m.z=d.agentOrientation[1]*(180/Math.PI),f.set("rotation",m)}a()}else{var g=0;l.updatePosition((function(i){var s=h(e,i,t,n,o,r);return g++,r.agentsCount[e]>=g&&setTimeout(a),{position:s.agentRelativePosition,orientation:s.agentOrientation}}))}}))}function h(e,t,n,o,a,s){var l,u,c,d,f,p,m=[0,0,1e6],g=[0,0,1e6],y=[0,0,0],h=t.split("_"),v=parseInt(h[h.length-1],10);if(n.coordinates[v]){var b={coordinates:n.coordinates[v],orientations:n.orientations[v],id:n.ids[v]},w=o.ids.findIndex(e=>e==b.id);-1==w&&(w=v);var P={coordinates:o.coordinates[w]||n.coordinates[v],orientations:o.orientations[w]||n.orientations[v],id:o.ids[w]||n.ids[v]};b.coordinates[2]=b.coordinates[2]||0,P.coordinates[2]=P.coordinates[2]||0;var D=[(P.coordinates[0]-b.coordinates[0])*a,(P.coordinates[1]-b.coordinates[1])*a,(P.coordinates[2]-b.coordinates[2])*a];m=[(g=[b.coordinates[0]+D[0],b.coordinates[1]+D[1],b.coordinates[2]+D[2]])[0]-s.anchor[0],g[1]-s.anchor[1],g[2]];var S=[(P.orientations[0]-b.orientations[0])*a,(P.orientations[1]-b.orientations[1])*a,(P.orientations[2]-b.orientations[2])*a];y=[-b.orientations[0]+S[0],-b.orientations[2]+S[2]],function(e,t,n){return t==e.follow.type&&n==e.follow.featureId}(s,e,v)&&(l=g,u=b.orientations,c=s.follow,d=new r.Vector3(l[0]+c.offset[0],l[1],l[2]+c.offset[1]),f=new r.Vector3(u[2]+Math.PI,1.309,0),p=c.offset[2],i._urbanImpl.getView3D().getControl().teleport(d,p,f))}return{agentPosition:g,agentRelativePosition:m,agentOrientation:y}}function v(e,t){return e+"_"+t.split("-")[0]}!function e(){if(null==i){var t=function(e){return e.parentElement.offsetWidth>0&&e.parentElement.offsetHeight>0},n=Array.from(parent.document.querySelectorAll('[class*="CityDiscover"]')).find(t),o=Array.from(parent.document.querySelectorAll('[class*="City3Dplay"]')).find(t),a=n||o;null!=a&&null!=(i=a.querySelector("iframe").contentWindow.xCity)?a.querySelector("iframe").contentWindow.require(["DS/Visualization/ThreeJS_DS"],(function(e,t){r=e})):setTimeout(e.bind(this),200)}}();var b={load:function(e,t,n){return s(e,t,n)},start:function(e,t={}){t={loop:null==t.loop||t.loop,callbacks:t.callbacks||{}},a[e].isPlaying=!0,a[e].loop=t.loop,window.requestAnimationFrame(m.bind(this,e,t.callbacks))},stop:function(e){a[e].isPlaying=!1,a[e].prevTimestamp=void 0},clear:function(e){t.publish("3DEXPERIENCity.RemoveContent",e),a[e]&&(a[e].prevTimestamp=void 0,a[e].elapsed=0,b.unsetFollow(e))},setPlaybackSpeed:function(e,t){isNaN(t)||0==t||(a[e].speed=t)},setFollow:function(e,t,n,o){null!=t&&null!=n&&(a[e].follow.type=t,a[e].follow.featureId=n,Array.isArray(o)?a[e].follow.offset=[o[0]||0,o[1]||0,o[2]||.01]:a[e].follow.offset=[0,0,.01])},unsetFollow:function(e){a[e].follow.type=void 0,a[e].follow.featureId=void 0,a[e].follow.offset=[0,0,5]}};return b})),define("DS/UrbanWidget/APIBeta/SimulationPlaybackLegacy",["DS/i3DXCompassServices/i3DXCompassServices","DS/PlatformAPI/PlatformAPI","DS/WAFData/WAFData","DS/UrbanWidget/APIBeta/models/Utils"],(function(e,t,n,o){var i,r,a="",s="",l=[],u=[0,0],c=[],d={isPlaying:!1,speed:1,prevTimestamp:void 0,elapsed:0},f={type:void 0,featureId:void 0,offset:[0,0,5]};function p(){return function e(){if(null!=i)return;var t=function(e){return e.parentElement.offsetWidth>0&&e.parentElement.offsetHeight>0},n=Array.from(parent.document.querySelectorAll("[class*='CityReferential']")).find(t),o=Array.from(parent.document.querySelectorAll("[class*='CityDiscover']")).find(t),a=Array.from(parent.document.querySelectorAll("[class*='City3Dplay']")).find(t),s=n||o||a;if(null==s)return void setTimeout(e.bind(this),200);if(null==(i=s.querySelector("iframe").contentWindow.xCity))return void setTimeout(e.bind(this),200);s.querySelector("iframe").contentWindow.require(["DS/Visualization/ThreeJS_DS"],(function(e,t){r=e}))}(),new Promise((function(t,n){a?t(""):e.getServiceUrl({serviceName:"3DSpace",platformId:widget.getValue("x3dPlatformId"),onComplete:function(e){a=e,t("")},onFailure:function(e){n("Unable to get required service URI")}})}))}function m(e,n){return new Promise((function(o,i){new Promise((function(e,n){var o=t.subscribe("3DEXPERIENCity.GetAreaInViewReturn",(function(n){t.unsubscribe(o),e(n[0])}));t.publish("3DEXPERIENCity.GetAreaInView")})).then((function(t){u=t,s="SimulationPlayback",null==n&&(n={}),S(e,n).then(D.bind(this,t,n.featureTypes)).then((function(){setTimeout(A.bind(this,l,0),100),o(!0)}))}))}))}function g(e,t,n){return new Promise((function(o,i){s=e,null==n&&(n={}),Promise.all([y(e),S(t,n)]).then((function(){setTimeout(A.bind(this,l,0),100),o(!0)}))}))}function y(e){return new Promise((function(t,n){p().then(h.bind(this,e)).then(v.bind(this)).then(D.bind(this)).then((function(){t("")}))}))}function h(e){return new Promise((function(t,o){var i="/resources/v2/e6w/service/ObjectSearch?&typeStr=Document&searchStr="+e;console.log("Get config url:",a+i),n.authenticatedRequest(a+i,{method:"GET",type:"json",onComplete(e){console.log("Get config file rs",e),0==e.data.length?t():t(e)},onFailure(e){o("Search for config file in 3DSpace failed: ",e)}})}))}function v(e){return new Promise((function(t,o){var i="/resources/v1/modeler/documents/"+e.data[0].id+"/files/DownloadTicket";n.authenticatedRequest(a+i,{method:"PUT",headers:{"content-type":"application/json"},data:JSON.stringify({csrf:e.csrf}),type:"json",responseType:"json",onComplete(e){console.log("TICKET PUT",e),t(e.data[0].dataelements.ticketURL)},onFailure(e){o("Unable to retreive config file from 3DSpace: ",e)}})}))}function b(e,t){return{type:"Feature",geometry:{type:"Point",coordinates:t},properties:{strid:"agent_"+e,name:"Agent "+e}}}function w(e,t){for(var n={type:"FeatureCollection",features:[]},o=0;o<t;o++)n.features.push(b(o,e));var r=i.widgetData.currentReferential.toJSON();return n.features.push(b("min",[r.bbox.xmin,r.bbox.ymin])),n.features.push(b("max",[r.bbox.xmax,r.bbox.ymax])),n}function P(e,t,n){return{className:"Feature",name:e.type,id:n+"_"+e.type,visible:!0,selectable:!1,Geometry:{className:"RdbLink",levelMax:0,levelMin:0,priority:100,priorityOffset:0,cache:0,invertY:!0,type:"json",url:"data:application/json;base64,"+btoa(JSON.stringify(w(t,e.numberOfAgents))),Factory:{className:"pointofinterest3d",stridAttribute:"strid",nameAttribute:"strid",isPickable:!1,geometryMode:"primitive",renderMode:"dual",shapeType:e.model,opacityFactor:.2,switchDistance:150,scale:e.scale,color:e.color}}}}function D(e,n){return new Promise((function(o,i){t.subscribe("3DEXPERIENCity.Load3DContentConfigReturn",(function(e){t.unsubscribe("3DEXPERIENCity.Load3DContentConfigReturn"),o("")})),n=n||[{type:"0",color:"rgb(0,0,255)",model:"https://sgp-server2015x.uwglobe.com/widget/assets/models3d/arrow.json",scale:[6.5,6.5,2.5]},{type:"100",color:"rgb(3,253,25)",model:"https://sgp-server2015x.uwglobe.com/widget/assets/models3d/arrow.json",scale:[6.5,6.5,2.5]},{type:"200",color:"rgb(0,255, 0)",model:"https://sgp-server2015x.uwglobe.com/widget/assets/models3d/arrow.json",scale:[6.5,6.5,2.5]},{type:"300",color:"rgb(255,255,0)",model:"https://sgp-server2015x.uwglobe.com/widget/assets/models3d/arrow.json",scale:[6.5,6.5,2.5]},{type:"400",color:"rgb(255,127,0)",model:"https://sgp-server2015x.uwglobe.com/widget/assets/models3d/arrow.json",scale:[6.5,6.5,2.5]},{type:"500",color:"rgb(255,0,0)",model:"https://sgp-server2015x.uwglobe.com/widget/assets/models3d/arrow.json",scale:[6.5,6.5,2.5]}];for(var r=0;r<n.length;r++){var a=n[r].type;n[r].numberOfAgents=Math.max.apply(Math,l.map((function(e){return e.features[a]?e.features[a].coordinates.length:0}))),c[n[r].type]=n[r].numberOfAgents}for(var u=[],d=(r=0,n.length);r<d;r++)u.push(P(n[r],e,s));var f={Root:[{className:"Folder",name:"Simulation Playback",id:s,exclusive:!1,visible:!1,children:u}]};t.publish("3DEXPERIENCity.Load3DContentConfig",{widget_id:widget.id,json_config_url:"data:application/json;base64,"+btoa(JSON.stringify(f))})}))}function S(e,t){return new Promise((function(i,r){var a={method:"GET",type:"json",timeout:24e4,onComplete(e){console.log("Simulation data loaded."),function(e,t){return new Promise((function(t,n){var o=[],i=0;!function(e,t,n,o){var i=0;!function r(){for(var a=Math.min(i+t,e);i<a;++i)n.call(null,i);i<e?setTimeout(r,0):o.call(null)}()}(e.length,50,(function(){var t=function(e){for(var t={},n=[0,0],o=0,i=e.feature_type.length;o<i;o++){null==t[e.feature_type[o]]&&(t[e.feature_type[o]]={coordinates:[],orientations:[],featureIds:[]});var r=t[e.feature_type[o]].coordinates.length;t[e.feature_type[o]].coordinates[r]=[e.coordinates[o][0]+n[0],e.coordinates[o][1]+n[1],e.coordinates[o][2]],t[e.feature_type[o]].orientations[r]=e.orientations[o],t[e.feature_type[o]].featureIds[r]=e.feature_id[o]}return t}(e[i].geoJson.features[0]),n=function(e){var t=new Date(e).getTime();isNaN(t)&&(n=e.split(/\D+/),t=new Date(Date.UTC(n[0],--n[1],n[2],n[3],n[4],n[5],n[6])).getTime());var n;return t}(e[i].timestamp);o.push({timestamp:n,features:t}),++i}),(function(){console.log("done processing"),l=o,t()}))}))}(e).then((function(){i()}))},onFailure(e){console.log(e)}};t.noCache&&(a.cache=-1),t.authorization&&(a.headers=o.getAuthorizationHeader(t.authorization)),n.request(e,a)}))}function I(e,t){if(d.isPlaying){null==d.prevTimestamp&&(d.prevTimestamp=t);var n=(t-d.prevTimestamp)*d.speed;d.elapsed+=n,d.prevTimestamp=t;var o=l[0].timestamp,i=l[l.length-2].timestamp;d.elapsed+o>=i&&(d.elapsed=0),A(l,d.elapsed).then((function(t){var n=new Date(o+d.elapsed),i=n.getFullYear()+"-"+(n.getMonth()<9?"0":"")+(n.getMonth()+1)+"-"+(n.getDate()<10?"0":"")+n.getDate()+" "+(n.getHours()<10?"0":"")+n.getHours()+":"+(n.getMinutes()<10?"0":"")+n.getMinutes()+":"+(n.getSeconds()<10?"0":"")+n.getSeconds()+"."+n.getMilliseconds();e({timestamp:i}),window.requestAnimationFrame(I.bind(this,e))}))}}function A(e,t){return new Promise((function(n,o){for(var i=[],r=e.find((function(n){return e[0].timestamp+t<n.timestamp})),a=e.indexOf(r),s=e[a-1],l=r.timestamp-s.timestamp,u=(e[0].timestamp+t-s.timestamp)/l,c=Object.keys(s.features),d=0,f=c.length;d<f;d++){var p=c[d],m={coordinates:s.features[p].coordinates,orientations:s.features[p].orientations,ids:s.features[p].featureIds},g={coordinates:r.features[p].coordinates,orientations:r.features[p].orientations,ids:r.features[p].featureIds};i.push(C(p,m,g,u))}Promise.all(i).then(n)}))}function C(e,t,n,o){return new Promise((function(a,s){var l=0;i.findItem({id:x(e)}).updatePosition((function(s){var d=s.split("_"),p=parseInt(d[d.length-1],10);if(!t.coordinates[p])return{position:[0,0,1e6]};var m={coordinates:t.coordinates[p],orientations:t.orientations[p],id:t.ids[p]},g=n.ids.findIndex(e=>e==m.id);-1==g&&(g=p);var y={coordinates:n.coordinates[g]||t.coordinates[p],orientations:n.orientations[g]||t.orientations[p],id:n.ids[g]||t.ids[p]};m.coordinates[2]=m.coordinates[2]||0,y.coordinates[2]=y.coordinates[2]||0;var h=[(y.coordinates[0]-m.coordinates[0])*o,(y.coordinates[1]-m.coordinates[1])*o,(y.coordinates[2]-m.coordinates[2])*o],v=[m.coordinates[0]+h[0],m.coordinates[1]+h[1],m.coordinates[2]+h[2]],b=[v[0]-u[0],v[1]-u[1],v[2]],w=[(y.orientations[0]-m.orientations[0])*o,(y.orientations[1]-m.orientations[1])*o,(y.orientations[2]-m.orientations[2])*o],P=[-m.orientations[0]+w[0],-m.orientations[2]+w[2]];return function(e,t){return e==f.type&&t==f.featureId}(e,m.id)&&function(e,t){var n=new r.Vector3(e[0]+f.offset[0],e[1],e[2]+f.offset[1]),o=new r.Vector3(t[2]+Math.PI,1.309,0),a=f.offset[2];i._urbanImpl.getView3D().getControl().teleport(n,a,o)}(v,m.orientations),l++,c[e]>=l&&setTimeout(a),{position:b,orientation:P}}))}))}function x(e){var t=e.split("-");return s+"_"+t[0]}p();var E={load:function(){if("string"==typeof arguments[1]||arguments[1]instanceof String){var e=arguments[0];return g(e,arguments[1],arguments[2])}return m(arguments[0],arguments[1])},start:function(e){d.isPlaying=!0,window.requestAnimationFrame(I.bind(this,e))},stop:function(){d.isPlaying=!1,d.prevTimestamp=void 0},clear:function(){t.publish("3DEXPERIENCity.RemoveContent",s),d.prevTimestamp=void 0,d.elapsed=0,E.unsetFollow()},setPlaybackSpeed:function(e){isNaN(e)||0==e||(d.speed=e)},setFollow:function(e,t,n){null!=e&&null!=t&&(f.type=e,f.featureId=t,Array.isArray(n)?f.offset=[n[0]||0,n[1]||0,n[2]||.01]:f.offset=[0,0,.01])},unsetFollow:function(){f.type=void 0,f.featureId=void 0,f.offset=[0,0,5]}};return E})),define("DS/UrbanWidget/APIBeta/SimulationPlayback",["DS/UrbanWidget/APIBeta/SimulationPlaybackLegacy","DS/UrbanWidget/APIBeta/SimulationPlaybackLatest"],(function(e,t){return{load:function(n,o,i){return("string"==typeof arguments[0]||arguments[0]instanceof String)&&("string"==typeof arguments[1]||arguments[1]instanceof String)?t.load.apply(null,arguments):e.load.apply(null,arguments)},start:function(){return"string"==typeof arguments[0]||arguments[0]instanceof String?t.start.apply(null,arguments):e.start.apply(null,arguments)},stop:function(){return arguments.length>0?t.stop.apply(null,arguments):e.stop()},clear:function(){return arguments.length>0?t.clear.apply(null,arguments):e.clear()},setPlaybackSpeed:function(){return arguments.length>1?t.setPlaybackSpeed.apply(null,arguments):e.setPlaybackSpeed.apply(null,arguments)},setFollow:function(){return arguments.length>3?t.setFollow.apply(null,arguments):e.setFollow.apply(null,arguments)},unsetFollow:function(){return arguments.length>0?t.unsetFollow.apply(null,arguments):e.unsetFollow()}}}));