/*! search-suggest - v1.0 - 2013-06-07 10:49:37 AM
* Copyright (c) 2013 yuncong; Licensed  */
KISSY.add("gallery/search-suggest/1.0/plugin/storage",function(a,b,c,d){function e(a){return f||(e.superclass.constructor.call(this,a||{}),f=this,f.initialize()),f}var f;return e.ATTRS={src:{value:"http://a.tbcdn.cn/apps/tbskip/public/flashStorage.swf"},bridge:{value:null},hasInit:{value:!1}},a.extend(e,c,{initialize:function(a){a=a||{};var b=this;b._addFlash(a.appendTo),b.hasInit=!0},_addFlash:function(a){var b,c=this,d=document,e=d.createElement("div"),f=c.get("src"),g="";e.id="storagetool",e.style.height=0,e.style.overflow="hidden",g+='<object id="J_StorageObj" name="J_StorageObj" ',g+='classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="1" height="1" ',g+='codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab">',g+='<param name="movie" value="'+f+'" />',g+='<param name="allowScriptAccess" value="always" />',g+='<embed name="J_StorageEmbed" src="'+f+'" width="1" height="1" ',g+='allowScriptAccess="always" type="application/x-shockwave-flash" ',g+='pluginspage="http://www.adobe.com/go/getflashplayer">',g+="</embed></object>",a=a||d.body,a.appendChild(e),e.innerHTML=g,-1!==navigator.appVersion.indexOf("MSIE")?(e.style.zoom=1,e.style.filter="alpha(opacity=10)",b=window.J_StorageObj):(e.style.opacity=.1,b=d.J_StorageEmbed),c.set("bridge",b)},save:function(a,b,c){var e=this,f=e.get("bridge");if(c===d&&(c=200),0!==c)try{f.save(a,b)}catch(g){setTimeout(function(){e.save(a,b,c-1)},0)}},read:function(a,b,c){var e,f=this,g=f.get("bridge");if(c===d&&(c=200),0===c)return b&&b.onFailure(),void 0;try{return e=g.read(a),b&&b.onSuccess(e),e}catch(h){setTimeout(function(){f.read(a,b,c-1)},0)}}}),e},{requires:["event","base"]}),KISSY.add("gallery/search-suggest/1.0/plugin/local-query",function(a,b,c,d,e){function f(a){f.superclass.constructor.call(this,a||{}),this.initialize()}var g,h=null,i="localQuery";return a.extend(f,b,{initialize:function(){var a=this,b=a.get("name"),c=a.get("tab"),d=a.get("user");"item"===c&&(c="baobei"),g=i+b+c+d,a._getStorage()},checkFlash:function(a){this.storage.read(a)},_setKey:function(a){var b=this,c=a.name||b.get("name"),d=a.tab||b.get("tab"),e=a.user||b.get("user");"item"===d&&(d="baobei"),g=i+c+d+e,b.set("tab",d),b.set("name",c),b.set("user",e),h=null},_save:function(b,c){var d=this._getDatalist(),e=encodeURI(b),f={key:e,value:encodeURI(c),time:a.now()};this._deleteItemByValue(d,e),d.unshift(f)},_deleteItemByValue:function(a,b){for(var c,d=null,e=0;e<a.length;e++)c=a[e].key,c==b&&(d=a.splice(e,1),e--)},_query:function(b){var c,d,e=this._getDatalist(),f=[];return b?(b=encodeURI(b),a.each(e,function(a){c=a.key,d=a.value,(0===c.indexOf(b)||0===d.indexOf(b))&&f.push(a)}),this._distinctByValue(f)):this._distinctByValue(e)},_distinctByValue:function(a){for(var b,c=[],d=0,e=a.length;e>d;d++)b=a[d],!this._hasItemOfValue(c,b.value)&&c.push(b);return c},_hasItemOfValue:function(a,b){for(var c=!1,d=a.length-1;d>=0;d--)a[d].value===b&&(c=!0);return c},_cleanBefore:function(a){for(var b,c=this._getDatalist(),d=0,e=c.length-1;e>=0;e--)if(b=c[e],b.time>a){d=e+1;break}c.length=d},_getDatalist:function(){return h=this.storage.read()||[]},_getStorage:function(){var a=this.get("storageType");switch(a){case"flashStorage":this.storage=this._initFlashStorage();break;default:this.storage=!1}},_initFlashStorage:function(){return{save:function(){return(new d).save(g,a.JSON.stringify(h))},read:function(b){var c=(new d).read(g,b);return c?a.JSON.parse(c):e}}},destructor:function(){h=null,i=null,g=null},save:function(a,b){if(""!=b){var c=this._save(a,b);return this.storage.save(),c}},query:function(a){return this._query(a)},deleteItem:function(a){var b=this._getDatalist();this._deleteItemByValue(b,encodeURI(a)),this.storage.save()},clearByDay:function(b){var c=a.now()-1e3*3600*24*b;this._cleanBefore(c),this.storage.save()},hasHistory:function(){return this._getDatalist().length>0?!0:!1}},{ATTRS:{name:{value:"default",setter:function(a){return a}},user:{value:null,setter:function(b){return a.fromUnicode(b)}},maxLength:{value:500},storageType:{value:"flashStorage",setter:function(a){return a},getter:function(a){return a}}}}),f},{requires:["base","event","./storage"]});