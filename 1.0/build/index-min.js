/*! search-suggest - v1.0 - 2013-06-04 6:12:44 PM
* Copyright (c) 2013 yuncong; Licensed  */
KISSY.add("gallery/search-suggest/1.0/plugin/mods",function(){return{"new":{tmpl:'<div class="item-wrapper ks-menu-extras-xp" data-key="suggest=new_{$index}&tab=shopping&auction_tag[]=1154"><span class="ks-menu-xp-tag">\u65b0\u54c1</span><span class="ks-menu-xp-icon">\u65b0\u54c1</span><span class="ks-menu-xp">\u201c{$query}\u201d\u76f8\u5173{new}\u65b0\u54c1</span></div>',index:6},shop:{tmpl:'<div class="item-wrapper ks-menu-extras-dp" data-action="http://shopsearch.taobao.com/search" data-key="suggest=shop_{$index}"><span class="ks-menu-dp-tag">\u5e97\u94fa</span><span class="ks-menu-dp-icon">\u5e97\u94fa</span><span class="ks-menu-dp">\u201c{$query}\u201d\u76f8\u5173\u5e97\u94fa</span></div>',index:7},cat:{tmpl:'<div class="ks-menu-extras-cate" data-key="cat={$1}&suggest=cat_{$index}"><span class="ks-menu-key">{$query}</span><span class="ks-menu-cate">\u5728<b>{$0}</b>\u5206\u7c7b\u4e0b\u641c\u7d22</span></div>',index:3},list:{index:5},global:{tmpl:'<div class="ks-menu-extras-cate" data-key="promote=2097152&suggest=global_{$index}"><span class="ks-menu-key">{$query}</span><span class="ks-menu-cate">\u5728\u5168\u7403\u8d2d\u5e02\u573a\u4e2d\u641c\u7d22</span></div>',index:4},tdg:{pos:"footer",tmpl:'<div class="item-wrapper tdg-box"><form method="get" action="http://s.taobao.com/search" class="clearfix"><input type="hidden" class="tdg-query" name="q" value="{$query}" /><input type="hidden" value="tdg1" name="from" /><h5>\u540c\u5e97\u8d2d\uff1a</h5><input type="text" value="{$query}" class="tdg-input" tabindex="0" placeholder="\u7b2c\u4e00\u4ef6\u5b9d\u8d1d" /><em>+</em><input type="text" value="{$query1}" class="tdg-input" tabindex="1" placeholder="\u53e6\u4e00\u5b9d\u8d1d" /><em>+</em><input type="text" value="{$query2}" class="tdg-input" tabindex="2" placeholder="\u53e6\u4e00\u5b9d\u8d1d" /><button class="tdg-btn" type="submit" tabindex="3">\u641c\u7d22</button></form></div>',always:!0,index:9},jipiao:{pos:"footer",tmpl:'<div class="item-wrapper jipiao-box"><form target="_top" action="http://s.taobao.com/search" method="get"><h5><a target="_blank" href="http://trip.taobao.com">\u6dd8\u5b9d\u65c5\u884c</a></h5><em>\u51fa\u53d1</em><input type="text" class="jp-input J_Jp-et J_Jp-query"  tabindex="0" value="{$0}"><em>+</em><em>\u5230\u8fbe</em><input type="text" class="jp-input J_Jp-et J_Jp-query"  tabindex="1" value="{$1}"><em>+</em><em>\u65e5\u671f</em><input type="text" class="jp-input J_Jp-et"  tabindex="2" value="{$date}"><input type="hidden" id = "J_JipiaoEt" class="J_Jp-et" name="jp_et" value=""><input id="J_JiPiaoForm" class="J_Jp-query" type="hidden" name="q" value="{$query}"><button type="submit" class="jp-btn">\u641c\u7d22</button></form></div>',index:8},showExtra:!1}}),KISSY.add("gallery/search-suggest/1.0/index",function(a,b,c,d,e,f){b.all;var g=c.extend([],{initializer:function(){var a=this;a._init()},_init:function(){var a=this;a._initCombo()},_setComboCache:function(a){var b=this,c=b.get("tab");b.configArr=b.configArr||[],b.configArr[c]={data:a}},_initComboEvent:function(){var b=this,c=b.comboBox,d=c.get("input");d.on("click",function(){if(b.fire("beforeFocus")!==!1){var e=a.trim(d.val()),f=b.get("sugConfig"),g=f.prefixCls,h=c.get("el").hasClass(g+"combobox-focused");h&&(f.autoCollapsed||""===e)&&c.sendRequest(e)}}),d.on("blur",function(){b.fire("beforeBlur")!==!1}),c.on("click",b.comboClick,b),c.on("afterCollapsedChange",b._addExtraEvent,b);var e,f,g=d.parent("form"),h=g.attr("action"),i=h.split("?")[1],j="";g.on("submit",function(){if(b.fire("beforeSubmit")!==!1&&i){e=i.split("&");for(var a in e)f=e[a].split("="),j+='<input type="hidden" name="'+f[0]+'" value="'+f[1]+'"/>';g.append(j)}})},comboClick:function(a){var c=this,e=a.target.get?a.target.get("el"):b.one(a.currentTarget),f=c.comboBox;c.fire("beforeSubmit");var g=c.query,h=c.query,i=d.children(e),j=d.attr(i,"data-key")||"q="+g,k=d.parent(f.get("el"),"form"),l=d.attr(k,"action"),m=d.attr(i,"data-action")||c.get("action")||l,n="&wq="+h+"&suggest_query="+g+"&source=suggest",o=c._getInputsVal(k);m+=m.indexOf("?")>-1?"&":"?",location.href=m+j+n+o},_getInputsVal:function(b){var c,e,f=this,g=f.get("sugConfig"),h=g.excludeParam,i=[];inputs=d.query("input",b);for(var j=inputs.length-1;j>=0;j--)c=inputs[j],e=c.name,a.inArray(e,h)||i.push(e+"="+encodeURIComponent(c.value));return i.join("&")},_getDefComboCfg:function(){return{focused:!1,hasTrigger:!1,matchElWidth:!0,srcNode:".allWidth",highlightMatchItem:!1,menu:{align:{overflow:{adjustY:0}}},cache:!0}},_prepareHtml:function(a,c){var e='<div class="{cls}combobox"><div class="{cls}combobox-input-wrap"></div></div>',f=e.replace(/{cls}/g,c),g=d.create(f);return d.addClass(a,c+"combobox-input"),d.attr(a,{"aria-haspopup":"true","aria-combobox":"list",role:"combobox",autocomplete:"off"}),d.wrap(a,g),b.one("."+c+"combobox")},_getRenderSort:function(){var b,c,d,e=this,g=a.merge(f,e.get("mods")),h=[],i=e.get("plugins");e.set("mods",g);for(var j in i)d=i[j],c=d.get("index")-0||-1,h[c]=d.get("pluginId");for(var j in g)b=g[j],c=b.index,c&&(h[c]=j);this.set("renderIndex",h)},_initCombo:function(){var b,c=this,d=c.get("sugConfig"),f=c.get("dataSourceCfg"),g=c._getDefComboCfg();c._getRenderSort(),f.xhrCfg.url=d.sourceUrl,f.parse=a.bind(c.parse,c),b=new e.RemoteDataSource(f),c._setComboCache(b),g.focused=d.focused,g.srcNode=c._prepareHtml(d.node,d.prefixCls),g.dataSource=b,g.format=a.bind(c.format,c),g.prefixCls=d.prefixCls;var h=new e(g);h.render(),c.comboBox=h,c._initComboEvent(),h.get("input")[0].focus()},update:function(b){for(var c=this,d=c.get("plugins"),e=d.length-1;e>=0;e--){var f=d[e];f&&a.isFunction(f.update)&&f.update.call(f,b)}},parse:function(b,c){if(c.result){var d=this,e=c.result;if(0===e.length)return[[""]];for(var f in e)e[f]||e.splice(f,1);delete c.result;var g=d.comboBox.get("dataSource");return a.isEmptyObject(c)||((g.extraData||(g.extraData=[]))[b]=c),e}},format:function(a,b){var c=this;return c.resultArr=[],c.render(a,b),c.resultArr},render:function(a,b){var c,d,e,f,g,h,i=this,j=i.get("renderIndex"),k=i.get("mods"),l=i._adjustExtra(a,k.showExtra);i.query=a;for(var m in j)if(h=j[m],"list"!==h){if("-1"!==m)if(g=i.getPlugin(h),g&&g.renderPlugin)g.renderPlugin();else if(d=k[h],d&&l&&(!(f=d.pos)||e!==f)){if(c=d.tmpl,!c)continue;var n=i.resultArr.length,o=i.diffLen||0;e=i._defaultRender({tmpl:c,name:h,pos:f,always:d.always&&b.length>0,callback:d.callback,index:n-o})}}else i._list(a,b)},_defaultRender:function(b){var c,d=this,e=b.tmpl,f=b.name,g=d.comboBox.get("dataSource"),h=d.query,i=g.extraData,j=b.pos,k=b.index;if(i&&i[h]||b.always){var l=d._getDate(),m={$query:h,$date:l};if(!b.always){var n=i[h][f],o=!0;if(!n)return;if(a.isArray(n)){n.length>2&&(n.length=2);for(var p=0,q=n.length-1;q>=p;p++){var r=n[p];if(a.isArray(r)){o=!1;for(var s=0,t=r.length-1;t>=s;s++)m["$"+s]=r[s]||"";m.$index=k+1+p,c=a.substitute(e,m),d.addContent({html:c,query:h,position:j,callback:b.callback})}else m["$"+p]=r,m.$index=k+1+p}return o&&(c=a.substitute(e,m),d.addContent({html:c,position:j,callback:b.callback})),j}m[f]=n}return m.$index=k+1,c=a.substitute(e,m),d.addContent({html:c,position:j,callback:b.callback}),j}},_adjustExtra:function(a,b){return""!==a&&b?!0:!1},getNick:function(){var a=this;return a._getCookie("_nk_")||a._getCookie("tracknick")},_getCookie:function(b){var c=window;if(c.userCookie&&!a.isUndefined(c.userCookie[b]))return c.userCookie[b];if(c.SRP_COOKIES||(c.SRP_COOKIES={})&&a.isUndefined(SRP_COOKIES[b])){var d=document.cookie.match("(?:^|;)\\s*"+b+"=([^;]*)");SRP_COOKIES[b]=d&&d[1]?decodeURIComponent(d[1]):""}return SRP_COOKIES[b]},_getDate:function(){var a=new Date;return a.getFullYear()+"-"+(a.getMonth()+1)+"-"+(a.getDate()+1)},_list:function(b,c){var d=this,e=d.get("sugConfig").resultFormat,f=d.resultArr||(d.resultArr=[]),g="<div class='item-wrapper' data-key='q={query}{text}&suggest=0_{index}'><span class='item-text'>{query}<b>{text}</b></span><span class='item-count'>"+e+"</span>"+"</div>";a.each(c,function(d,e){if(!d||!d[0])return c.splice(e,1),void 0;for(var h,i=d[0],j="",k=b;i.indexOf(k)<0;)k=k.substr(0,k.length-1);0===i.indexOf(k)&&(j=k,i=i.replace(k,""));for(var l in f)if(h=f[l],h.textContent===d[0]&&h.unique)return;f.push({textContent:d[0],content:a.substitute(g,{query:j,text:i,index:e+1,count:d[1]})})}),d.resultArr=f},addContent:function(a){var b=this,c=a.html,d=a.position,e=a.query;if(!d){var f=b.resultArr||[];return f.push({content:c,textContent:e}),void 0}b["__"+d]={tmpl:c},b._addExtraEvent()},_addExtraEvent:function(a){var c=this,d=c.comboBox||c,e=c.__header,f=c.__footer,g=c.get("sugConfig").prefixCls;if(!a||a&&!a.newVal){var h=d.get("menu");if(!h.get)return;var i=h.get("el");if(!i||i.all("."+g+"menuitem").length<1)return;var j=i.one("."+g+"combobox-menu-header"),k=i.one("."+g+"combobox-menu-footer");if(f){k||(k=new b("<div class='"+g+"combobox-menu-footer'></div>").appendTo(i)),k.empty().append(f.tmpl);var l=k.one("."+g+"menu-history-clean");l&&l.on("click",function(a){a.halt();var b=c.getPlugin("history");b._cleanHistory()});var m=k.one(".tdg-btn");m&&m.on("click",function(){var a=b.all(".tdg-input",k),c=[],d="",e=b.one(".tdg-query",k);a.each(function(a){d=a.val(),d&&c.push(d)}),e.val(c.join(" + "))});var n=b.one(".jp-btn",k);n&&n.on("click",function(){var a=b.all("input",k),c=[],d=["tbsearch"],e="";a.each(function(a){e=a.val(),e&&a.hasClass("J_Jp-query")&&c.push(e),a.hasClass("J_Jp-et")&&d.push(e||"")}),b.one("#J_JiPiaoForm",k).val(c.join(" ")),b.one("#J_JipiaoEt",k).val(d.join("|"))})}else k&&k.remove();e?(j||(j=new b("<div class='"+g+"combobox-menu-header'></div>").prependTo(i)),j.empty().append(e.tmpl)):j&&j.remove()}else c.__header=null,c.__footer=null}},{ATTRS:{sugConfig:{value:{extraPassParams:"",extraPostParams:"",sourceUrl:"",tab:"item",autoCollapsed:!0,focused:!1,prefixCls:"ks-",tablist:null,excludeParam:[],resultFormat:"\u7ea6{count}\u4e2a\u5b9d\u8d1d"},setter:function(b){var c=this.get("sugConfig");return a.mix(c,b,void 0,void 0,!0)}},mods:{value:{},setter:function(b){var c=this.get("mods");return a.mix(c,b,void 0,void 0,!0)}},input:{getter:function(){return this.comboBox.get("input")}},dataSourceCfg:{value:{xhrCfg:{url:"",dataType:"jsonp",scriptCharset:"utf-8",data:{code:"utf-8"}},allowEmpty:!0,paramName:"q",cache:!0}}}});return g},{requires:["node","rich-base","dom","combobox","./plugin/mods"]});