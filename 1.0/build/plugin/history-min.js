/*! search-suggest - v1.0 - 2013-06-08 12:27:34 PM
* Copyright (c) 2013 yuncong; Licensed  */
KISSY.add("gallery/search-suggest/1.0/plugin/storage",function(a,b,c){function d(a){return e||(d.superclass.constructor.call(this,a||{}),e=this,e.initialize()),e}var e;return d.ATTRS={src:{value:"http://a.tbcdn.cn/apps/tbskip/public/flashStorage.swf"},bridge:{value:null},hasInit:{value:!1}},a.extend(d,b,{initialize:function(a){a=a||{};var b=this;b._addFlash(a.appendTo),b.hasInit=!0},_addFlash:function(a){var b,c=this,d=document,e=d.createElement("div"),f=c.get("src"),g="";e.id="storagetool",e.style.height=0,e.style.overflow="hidden",g+='<object id="J_StorageObj" name="J_StorageObj" ',g+='classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="1" height="1" ',g+='codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab">',g+='<param name="movie" value="'+f+'" />',g+='<param name="allowScriptAccess" value="always" />',g+='<embed name="J_StorageEmbed" src="'+f+'" width="1" height="1" ',g+='allowScriptAccess="always" type="application/x-shockwave-flash" ',g+='pluginspage="http://www.adobe.com/go/getflashplayer">',g+="</embed></object>",a=a||d.body,a.appendChild(e),e.innerHTML=g,-1!==navigator.appVersion.indexOf("MSIE")?(e.style.zoom=1,e.style.filter="alpha(opacity=10)",b=window.J_StorageObj):(e.style.opacity=.1,b=d.J_StorageEmbed),c.set("bridge",b)},save:function(a,b,d){var e=this,f=e.get("bridge");if(d===c&&(d=200),0!==d)try{f.save(a,b)}catch(g){setTimeout(function(){e.save(a,b,d-1)},0)}},read:function(a,b,d){var e,f=this,g=f.get("bridge");if(d===c&&(d=200),0===d)return b&&b.onFailure(),void 0;try{return e=g.read(a),b&&b.onSuccess(e),e}catch(h){setTimeout(function(){f.read(a,b,d-1)},0)}}}),d},{requires:["base"]}),KISSY.add("gallery/search-suggest/1.0/plugin/local-query",function(a,b,c,d){function e(a){e.superclass.constructor.call(this,a||{}),this.initialize()}var f,g=null,h="localQuery";return a.extend(e,b,{initialize:function(){var a=this,b=a.get("name"),c=a.get("tab"),d=a.get("user");"item"===c&&(c="baobei"),f=h+b+c+d,a._getStorage()},checkFlash:function(a){this.storage.read(a)},_setKey:function(a){var b=this,c=a.name||b.get("name"),d=a.tab||b.get("tab"),e=a.user||b.get("user");"item"===d&&(d="baobei"),f=h+c+d+e,b.set("tab",d),b.set("name",c),b.set("user",e),g=null},_save:function(b,c){var d=this._getDatalist(),e=encodeURI(b),f={key:e,value:encodeURI(c),time:a.now()};this._deleteItemByValue(d,e),d.unshift(f)},_deleteItemByValue:function(a,b){for(var c,d=null,e=0;e<a.length;e++)c=a[e].key,c==b&&(d=a.splice(e,1),e--)},_query:function(b){var c,d,e=this._getDatalist(),f=[];return b?(b=encodeURI(b),a.each(e,function(a){c=a.key,d=a.value,(0===c.indexOf(b)||0===d.indexOf(b))&&f.push(a)}),this._distinctByValue(f)):this._distinctByValue(e)},_distinctByValue:function(a){for(var b,c=[],d=0,e=a.length;e>d;d++)b=a[d],!this._hasItemOfValue(c,b.value)&&c.push(b);return c},_hasItemOfValue:function(a,b){for(var c=!1,d=a.length-1;d>=0;d--)a[d].value===b&&(c=!0);return c},_cleanBefore:function(a){for(var b,c=this._getDatalist(),d=0,e=c.length-1;e>=0;e--)if(b=c[e],b.time>a){d=e+1;break}c.length=d},_getDatalist:function(){return g=this.storage.read()||[]},_getStorage:function(){var a=this.get("storageType");switch(a){case"flashStorage":this.storage=this._initFlashStorage();break;default:this.storage=!1}},_initFlashStorage:function(){return{save:function(){return(new c).save(f,a.JSON.stringify(g))},read:function(b){var e=(new c).read(f,b);return e?a.JSON.parse(e):d}}},destructor:function(){g=null,h=null,f=null},save:function(a,b){if(""!=b){var c=this._save(a,b);return this.storage.save(),c}},query:function(a){return this._query(a)},deleteItem:function(a){var b=this._getDatalist();this._deleteItemByValue(b,encodeURI(a)),this.storage.save()},clearByDay:function(b){var c=a.now()-1e3*3600*24*b;this._cleanBefore(c),this.storage.save()},hasHistory:function(){return this._getDatalist().length>0?!0:!1}},{ATTRS:{name:{value:"default",setter:function(a){return a}},user:{value:null,setter:function(b){return a.fromUnicode(b)}},maxLength:{value:500},storageType:{value:"flashStorage",setter:function(a){return a},getter:function(a){return a}}}}),e},{requires:["base","./storage"]}),KISSY.add("gallery/search-suggest/1.0/plugin/history",function(a,b,c,d){function e(b){e.superclass.constructor.call(this,b||{}),a.sug=a.bind(this._retSug,this)}return a.extend(e,b,{pluginInitializer:function(b){var c=this,e=b.get("sugConfig"),f=e.tab||"";b.set("extend",{history:!0}),c.set("caller",b),c.historyLocalQuery=new d({name:"history",tab:f,user:b.getNick()}),c.hitedHistoryListMap={};var g=b.comboBox;g.on("afterCollapsedChange",function(a){a.newVal||(g.detach("afterCollapsedChange",arguments.callee),g.get("menu").get("el").delegate("mousedown","."+e.prefixCls+"menu-history-delete",c._historyDeleteMousedown,c),g.on("click",c.saveItemVal,c))}),b.on("beforeSubmit",function(){var b,d=g.get("input").val();""!==a.trim(d)&&(b=c.historyLocalQuery,b&&(b._setKey({name:"pinyin"}),b.save(d,a.trim(d)),b._setKey({name:"history"})))}),c._getPinyinQuery()},_getPinyinQuery:function(){var b=this,c=b.historyLocalQuery;c.checkFlash({onSuccess:function(){a.log(arguments),c._setKey({name:"pinyin"});var d=c.query();if(d.length>0){var e=decodeURIComponent(d[0].key);/[\u4e00-\u9fa5]/.test(e)?(b._getPinyin(d[0].key),c.clearByDay(0)):(c._setKey({name:"history"}),c.save(e,a.trim(e)))}c._setKey({name:"history"})},onFailure:function(){a.log("loading flashStorage failure!")}})},renderPlugin:function(){var a,b,c=this,d=c.get("caller"),e=d.query,f=c.historyLocalQuery.query(e),g=d.get("sugConfig");g.prefixCls,""===e&&f.length>0?(d.__header={tmpl:'<div class="history-box"><span>\u641c\u7d22\u5386\u53f2</span></div>',type:"history"},d.__footer=null,a=10):(d.__header=null,d.__footer=null,a=2),b=f.splice(0,a),d._addExtraEvent(),c._renderHistoryItems(b),c.hitedHistoryListMap[e]=b},saveItemVal:function(b){var c=this,d=(c.get("caller"),b.target.get?b.target.get("el"):a.one(b.target)),e=d.one(".item-text").text(),f=c.historyLocalQuery;f&&(f._setKey({name:"pinyin"}),f.save(e,a.trim(e)),f._setKey({name:"history"}))},_historyDeleteMousedown:function(b){for(var c=this,d=c.get("caller"),e=a.one(b.target),f=e.parent().attr("index"),g=e.parent(2),h=d.comboBox,i=h.get("menu"),j=i.get("children"),k=0;k<j.length;k++){var l=j[k];if(l.get("el")[0]===g[0]){i.removeChild(l,!0);break}}c.historyLocalQuery&&c.historyLocalQuery.deleteItem(f),h.sendRequest(d.query)},_renderHistoryItems:function(b){var c,d,e=this,f=e.get("caller"),g=f.get("sugConfig"),h=g.prefixCls,i='<div class="{prefixCls}menu-extras-history" data-key="q={historyItemValue}&suggest=history_{index}" index="{historyItemValue}"><span class="{prefixCls}menu-history-key">{historyItemValue}</span><span class="{prefixCls}menu-history-delete">\u5220\u9664</span></div>',j=f.resultArr||(f.resultArr=[]);b=a.unique(b);for(var k=0,l=b.length-1;l>=k;k++)c=decodeURI(b[k].key),d=i.replace(/{historyItemValue}/g,c).replace(/{prefixCls}/g,h).replace(/{index}/g,(k+1).toString()),j.push({content:d,textContent:c,unique:!0})},_getPinyin:function(b){var c=this,d="http://suggest.taobao.com/sug?code=utf-8&area=py&callback=KISSY.sug&q="+b;window._DEV_&&-1===location.href.indexOf("suggest=online")&&(d="http://tools.search.taobao.com:9999/proxy.php?url=http://s003187.cm6/sug%3F%26code=utf-8%26area=py%26callback=KISSY.sug%26q="+b),c._savedInputValue=decodeURIComponent(b),a.getScript(d)},_retSug:function(b){if(b&&b.result){var c=b.result[0],d=this,e=d._savedInputValue;d.historyLocalQuery&&d.historyLocalQuery.save(e,a.trim(c))}},_cleanHistory:function(){var b=this,c=b.get("caller"),d=c.comboBox,e=d.get("menu"),f=e.get("el"),g=d.get("input"),h=c.get("sugConfig"),i=h.prefixCls,j=f.one("."+i+"combobox-menu-header");b.historyLocalQuery.clearByDay(0),b.hitedHistoryListMap={};var k=j.siblings();k.css("display","none"),j.html('<div class="history-box"><span>\u641c\u7d22\u5386\u53f2\u5df2\u6e05\u7a7a</span></div>');var l=new a.Anim(f,{opacity:0},3,"easeIn",function(){k.css("display","block"),f.css({opacity:1,visibility:"hidden"})});l.run(),g.on("blur keydown mousedown",function(a){l.isRunning()&&l.stop(!0),c.__header=null,c.__footer=null,"keydown"===a.type&&this.value&&f.css("visibility","visible"),g.detach("blur keydown mousedown",arguments.callee)})},update:function(a){var b=this,c=encodeURI(a.sugConfig.tab);b.historyLocalQuery._setKey({tab:c}),b._getPinyinQuery()}},{ATTRS:{pluginId:{value:"history"}}}),e},{requires:["base","event","./local-query"]});