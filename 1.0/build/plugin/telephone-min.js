/*! search-suggest - v1.0 - 2013-06-07 11:30:32 AM
* Copyright (c) 2013 yuncong; Licensed  */
KISSY.add("gallery/search-suggest/1.0/plugin/storage",function(a,b,c,d){function e(a){return f||(e.superclass.constructor.call(this,a||{}),f=this,f.initialize()),f}var f;return e.ATTRS={src:{value:"http://a.tbcdn.cn/apps/tbskip/public/flashStorage.swf"},bridge:{value:null},hasInit:{value:!1}},a.extend(e,c,{initialize:function(a){a=a||{};var b=this;b._addFlash(a.appendTo),b.hasInit=!0},_addFlash:function(a){var b,c=this,d=document,e=d.createElement("div"),f=c.get("src"),g="";e.id="storagetool",e.style.height=0,e.style.overflow="hidden",g+='<object id="J_StorageObj" name="J_StorageObj" ',g+='classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="1" height="1" ',g+='codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab">',g+='<param name="movie" value="'+f+'" />',g+='<param name="allowScriptAccess" value="always" />',g+='<embed name="J_StorageEmbed" src="'+f+'" width="1" height="1" ',g+='allowScriptAccess="always" type="application/x-shockwave-flash" ',g+='pluginspage="http://www.adobe.com/go/getflashplayer">',g+="</embed></object>",a=a||d.body,a.appendChild(e),e.innerHTML=g,-1!==navigator.appVersion.indexOf("MSIE")?(e.style.zoom=1,e.style.filter="alpha(opacity=10)",b=window.J_StorageObj):(e.style.opacity=.1,b=d.J_StorageEmbed),c.set("bridge",b)},save:function(a,b,c){var e=this,f=e.get("bridge");if(c===d&&(c=200),0!==c)try{f.save(a,b)}catch(g){setTimeout(function(){e.save(a,b,c-1)},0)}},read:function(a,b,c){var e,f=this,g=f.get("bridge");if(c===d&&(c=200),0===c)return b&&b.onFailure(),void 0;try{return e=g.read(a),b&&b.onSuccess(e),e}catch(h){setTimeout(function(){f.read(a,b,c-1)},0)}}}),e},{requires:["event","base"]}),KISSY.add("gallery/search-suggest/1.0/plugin/telephone",function(a,b,c){function d(a){d.superclass.constructor.call(this,a||{})}return a.extend(d,b,{pluginInitializer:function(b){var d=this,e=new c;d._telHistory=[],d.set("caller",b),e.read("TBTelNumHistory",{onSuccess:function(b){a.log("loading TBTelNumHistory: "+b),b&&(d._telHistory=b.split(","))},onFailure:function(){a.log("loading TBTelNumHistory failure")}})},renderPlugin:function(){var b=this,c=b.get("caller"),d=c.resultArr||[],e=c.getNick();if(e){c.query;var f='<div data-key="{q=query}&nk={nk}&suggest=celnum_1&source=suggest" key="{allNum}" class="ks-menu-extras-cz">\u7ed9<span class="ks-menu-key">{query}<b>{rest}</b></span>\u5145\u503c</div>',g=c.query,h={};if(/^[0-9]{3,11}$/g.test(g)){for(var i=b._telHistory.length-1;i>-1;i-=2)0===b._telHistory[i-1].indexOf(g)&&(h.rest=b._telHistory[i-1],h.nk=e,c.addContent({html:a.substitute(f,h)}));c.resultArr=d}}}},{ATTRS:{pluginId:{value:"telephone"}}}),d},{requires:["base","./storage"]});