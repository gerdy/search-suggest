/*! search-suggest - v1.0 - 2013-06-08 12:27:34 PM
* Copyright (c) 2013 yuncong; Licensed  */
KISSY.add("gallery/search-suggest/1.0/plugin/mods",function(){return{"new":{tmpl:'<div class="item-wrapper {prefixCls}menu-extras-xp" data-key="q={$query}&suggest=new_{$index}&tab=shopping&auction_tag[]=1154"><span class="{prefixCls}menu-xp-tag">\u65b0\u54c1</span><span class="{prefixCls}menu-xp-icon">\u65b0\u54c1</span><span class="{prefixCls}menu-xp">\u201c{$query}\u201d\u76f8\u5173{new}\u65b0\u54c1</span></div>',index:6},shop:{tmpl:'<div class="item-wrapper {prefixCls}menu-extras-dp" data-action="http://shopsearch.taobao.com/search" data-key="q={$query}&suggest=shop_{$index}"><span class="{prefixCls}menu-dp-tag">\u5e97\u94fa</span><span class="{prefixCls}menu-dp-icon">\u5e97\u94fa</span><span class="{prefixCls}menu-dp">\u201c{$query}\u201d\u76f8\u5173\u5e97\u94fa</span></div>',index:7},cat:{tmpl:'<div class="{prefixCls}menu-extras-cate" data-key="q={$query}&cat={$1}&suggest=cat_{$index}"><span class="{prefixCls}menu-key">{$query}</span><span class="{prefixCls}menu-cate">\u5728<b>{$0}</b>\u5206\u7c7b\u4e0b\u641c\u7d22</span></div>',index:3},list:{index:5},global:{tmpl:'<div class="{prefixCls}menu-extras-cate" data-key="q={$query}&promote=2097152&suggest=global_{$index}"><span class="{prefixCls}menu-key">{$query}</span><span class="{prefixCls}menu-cate">\u5728\u5168\u7403\u8d2d\u5e02\u573a\u4e2d\u641c\u7d22</span></div>',index:4},tdg:{pos:"footer",tmpl:'<div class="item-wrapper tdg-box"><form method="get" action="http://s.taobao.com/search" class="clearfix"><input type="hidden" class="tdg-query" name="q" value="{$query}" /><input type="hidden" value="tdg1" name="from" /><h5>\u540c\u5e97\u8d2d\uff1a</h5><input type="text" value="{$query}" class="tdg-input" tabindex="0" placeholder="\u7b2c\u4e00\u4ef6\u5b9d\u8d1d" /><em>+</em><input type="text" value="{$query1}" class="tdg-input" tabindex="1" placeholder="\u53e6\u4e00\u5b9d\u8d1d" /><em>+</em><input type="text" value="{$query2}" class="tdg-input" tabindex="2" placeholder="\u53e6\u4e00\u5b9d\u8d1d" /><button class="tdg-btn" type="submit" tabindex="3">\u641c\u7d22</button></form></div>',always:!0,index:9},jipiao:{pos:"footer",tmpl:'<div class="item-wrapper jipiao-box"><form target="_top" action="http://s.taobao.com/search" method="get"><h5><a target="_blank" href="http://trip.taobao.com">\u6dd8\u5b9d\u65c5\u884c</a></h5><em>\u51fa\u53d1</em><input type="text" class="jp-input J_Jp-et J_Jp-query"  tabindex="0" value="{$0}"><em>+</em><em>\u5230\u8fbe</em><input type="text" class="jp-input J_Jp-et J_Jp-query"  tabindex="1" value="{$1}"><em>+</em><em>\u65e5\u671f</em><input type="text" class="jp-input J_Jp-et"  tabindex="2" value="{$date}"><input type="hidden" id = "J_JipiaoEt" class="J_Jp-et" name="jp_et" value=""><input id="J_JiPiaoForm" class="J_Jp-query" type="hidden" name="q" value="{$query}"><button type="submit" class="jp-btn">\u641c\u7d22</button></form></div>',index:8},showExtra:!1}}),KISSY.add("gallery/search-suggest/1.0/index",function(a,b,c,d,e,f){b.all;var g=c.extend([],{initializer:function(){var a=this;a._initCombo()},_setComboCache:function(a){var b=this,c=b.get("tab");b.configArr=b.configArr||[],b.configArr[c]={data:a}},_checkHasTab:function(){var a=this,b=a.getPlugin("tab");b||(a.tabNode=a.comboBox.get("input").parent("form"))},_initComboEvent:function(){var b=this,c=b.comboBox,d=c.get("input");d.on("click",function(){if(b.fire("beforeFocus")!==!1){var e=a.trim(d.val()),f=b.get("sugConfig"),g=f.prefixCls,h=c.get("el").hasClass(g+"combobox-focused");h&&(f.autoCollapsed||""===e)&&c.sendRequest(e)}}),d.on("blur",function(){b.fire("beforeBlur")!==!1}),c.on("click",b.comboClick,b),c.on("afterCollapsedChange",b._addExtraEvent,b),b._formSubmitEvent()},_formSubmitEvent:function(){var b,c,d=this,e=d.comboBox,f=e.get("input"),g=f.parent("form"),h=g.attr("action"),i=h.split("?")[1],j="",k=e.get("input");g.on("submit",function(e){if(d.fire("beforeSubmit")!==!1&&(""===a.trim(k.val())&&d._emptyJump(g)===!1&&e.preventDefault(),i)){b=i.split("&");for(var f in b)c=b[f].split("="),j+='<input type="hidden" name="'+c[0]+'" value="'+c[1]+'"/>';g.append(j)}})},_defaultPageJump:function(b){var c,d=this,e=d.tabNode;if(!e)return!1;if(c=e.attr("data-defaultpage")){if(!a.startsWith(c,"http"))return!1;b.attr("action",c)}},_emptyJump:function(a){var b,c=this,d=a.one("label"),e=c.get("sugConfig"),f=e.tab;return d?(b=d.one("span"),b&&""!==b.text()&&"item"===f?(d.hide(),c._holderJump(a,b.text()),void 0):c._defaultPageJump(a)):c._defaultPageJump(a)},_holderJump:function(a,b){var c=a[0].q;c&&(c.value=b),a.append('<input type="hidden" name="style" value="grid" />')},comboClick:function(a){var c=this,e=a.target.get?a.target.get("el"):b.one(a.currentTarget),f=c.comboBox;c.fire("beforeSubmit");var g=c.query,h=c.query,i=d.children(e),j=d.attr(i,"data-key")||"q="+g,k=d.parent(f.get("el"),"form"),l=d.attr(k,"action"),m=d.attr(i,"data-action")||c.get("action")||l,n="&wq="+h+"&suggest_query="+g+"&source=suggest",o=c._getInputsVal(k);m+=m.indexOf("?")>-1?"&":"?",c.redirect(m+j+n+o)},redirect:function(a){var b=document.createElement("a");return b.click?(b.setAttribute("href",a),b.setAttribute("target","_self"),b.style.display="none",document.body.appendChild(b),b.click(),void 0):(window.location=a,void 0)},_getInputsVal:function(b){var c,e,f=this,g=f.get("sugConfig"),h=g.excludeParam,i=[];inputs=d.query("input",b);for(var j=inputs.length-1;j>=0;j--)c=inputs[j],e=c.name,a.inArray(e,h)||i.push(e+"="+encodeURIComponent(c.value));return i.join("&")},_getDefComboCfg:function(){return{focused:!1,hasTrigger:!1,matchElWidth:!0,srcNode:".allWidth",highlightMatchItem:!1,menu:{align:{overflow:{adjustY:0}}},cache:!0}},_prepareHtml:function(a,c){var e='<div class="{cls}combobox"><div class="{cls}combobox-input-wrap"></div></div>',f=e.replace(/{cls}/g,c),g=d.create(f),h=this.getPlugin("history"),i={"aria-haspopup":"true","aria-combobox":"list",role:"combobox",autocomplete:"off","class":c+"combobox-input"};return d.attr(a,"aria-label")||(i.title=i["aria-label"]=h&&h.get("index")?"\u8bf7\u8f93\u5165\u641c\u7d22\u6587\u5b57\u6216\u4ece\u641c\u7d22\u5386\u53f2\u4e2d\u9009\u62e9":"\u8bf7\u8f93\u5165\u641c\u7d22\u6587\u5b57"),d.attr(a,i),d.wrap(a,g),this.get("sugConfig").focused&&d.get(a).focus(),b.one("."+c+"combobox")},_getRenderSort:function(){var b,c,d,e=this,g=a.merge(f,e.get("mods")),h=[],i=e.get("plugins");e.set("mods",g);for(var j in i)d=i[j],c=d.get("index")-0||-1,h[c]=d.get("pluginId");for(var j in g)b=g[j],c=b.index,c&&(h[c]=j);this.set("renderIndex",h)},_initCombo:function(){var b,c=this,d=c.get("sugConfig"),f=c.get("dataSourceCfg"),g=c._getDefComboCfg();c._getRenderSort(),f.xhrCfg.url=d.sourceUrl,f.parse=a.bind(c.parse,c),b=new e.RemoteDataSource(f),c._setComboCache(b),g.srcNode=c._prepareHtml(d.node,d.prefixCls),g.dataSource=b,g.format=a.bind(c.format,c),g.prefixCls=d.prefixCls;var h=new e(g);h.render(),c.comboBox=h,c._checkHasTab(),c._initComboEvent()},update:function(b){for(var c=this,d=c.get("plugins"),e=0,f=d.length-1;f>=e;e++){var g=d[e];g&&a.isFunction(g.update)&&g.update.call(g,b)}},parse:function(b,c){if(c.result){var d=this,e=c.result;if(0===e.length)return[[""]];for(var f in e)e[f]||e.splice(f,1);delete c.result;var g=d.comboBox.get("dataSource");return a.isEmptyObject(c)||((g.extraData||(g.extraData=[]))[b]=c),e}},format:function(a,b){var c=this;return c.resultArr=[],c.render(a,b),c.resultArr},render:function(a,b){var c,d,e,f,g,h,i=this,j=i.get("renderIndex"),k=i.get("mods"),l=i._adjustExtra(a,k.showExtra);i.query=a;for(var m=0,n=j.length-1;n>=m;m++)if(h=j[m])if("list"!==h){if(-1!==m)if(g=i.getPlugin(h),g&&g.renderPlugin)g.renderPlugin();else if(d=k[h],d&&l&&(!(f=d.pos)||e!==f)){if(c=d.tmpl,!c)continue;var o=i.resultArr.length,p=i.diffLen||0;e=i._defaultRender({tmpl:c,name:h,pos:f,always:d.always&&b.length>0,callback:d.callback,index:o-p})}}else i._list(a,b);i.fire("afterQueryChange",{query:a})},_defaultRender:function(b){var c,d=this,e=b.tmpl,f=b.name,g=d.comboBox.get("dataSource"),h=d.query,i=d.get("sugConfig").prefixCls,j=g.extraData,k=b.pos,l=b.index;if(j&&j[h]||b.always){var m=d._getDate(),n={$query:h,$date:m,prefixCls:i};if(!b.always){var o=j[h][f],p=!0;if(!o)return;if(a.isArray(o)){o.length>2&&(o.length=2);for(var q=0,r=o.length-1;r>=q;q++){var s=o[q];if(a.isArray(s)){p=!1;for(var t=0,u=s.length-1;u>=t;t++)n["$"+t]=s[t]||"";n.$index=l+1+q,c=a.substitute(e,n),d.addContent({html:c,query:h,position:k,callback:b.callback})}else n["$"+q]=s,n.$index=l+1+q}return p&&(c=a.substitute(e,n),d.addContent({html:c,position:k,callback:b.callback})),k}n[f]=o}return n.$index=l+1,c=a.substitute(e,n),d.addContent({html:c,position:k,callback:b.callback}),k}},_adjustExtra:function(a,b){return""!==a&&b?!0:!1},getNick:function(){var a=this;return a._getCookie("_nk_")||a._getCookie("tracknick")},_getCookie:function(b){var c=window;if(c.userCookie&&!a.isUndefined(c.userCookie[b]))return c.userCookie[b];if(c.SRP_COOKIES||(c.SRP_COOKIES={})&&a.isUndefined(SRP_COOKIES[b])){var d=document.cookie.match("(?:^|;)\\s*"+b+"=([^;]*)");SRP_COOKIES[b]=d&&d[1]?decodeURIComponent(d[1]):""}return SRP_COOKIES[b]},_getDate:function(){var a=new Date;return a.getFullYear()+"-"+(a.getMonth()+1)+"-"+(a.getDate()+1)},_list:function(b,c){var d=this,e=d.get("sugConfig").resultFormat,f=d.resultArr||(d.resultArr=[]),g="<div class='item-wrapper' data-key='q={query}{text}&suggest=0_{index}'><span class='item-text'>{query}<b>{text}</b></span><span class='item-count'>"+e+"</span>"+"</div>";a.each(c,function(d,e){if(!d||!d[0])return c.splice(e,1),void 0;for(var h,i=d[0],j="",k=b;i.indexOf(k)<0;)k=k.substr(0,k.length-1);0===i.indexOf(k)&&(j=k,i=i.replace(k,""));for(var l in f)if(h=f[l],h.textContent===d[0]&&h.unique)return;f.push({textContent:d[0],content:a.substitute(g,{query:j,text:i,index:e+1,count:d[1]})})}),d.resultArr=f},addContent:function(a){var b=this,c=a.html,d=a.position,e=a.query;if(!d){var f=b.resultArr||[];return f.push({content:c,textContent:e}),void 0}b["__"+d]={tmpl:c},b._addExtraEvent()},_renderHeader:function(a,c,d){if(c){var e=this.get("sugConfig").prefixCls;a||(a=new b("<div class='"+e+"combobox-menu-header'></div>").prependTo(d)),a.empty().append(c.tmpl)}else a&&a.remove()},_renderFooter:function(a,c,d){var e=this,f=e.get("sugConfig").prefixCls;if(c){a||(a=new b("<div class='"+f+"combobox-menu-footer'></div>").appendTo(d)),a.empty().append(c.tmpl);var g=a.one("."+f+"menu-history-clean");g&&g.on("click",function(a){a.halt();var b=e.getPlugin("history");b._cleanHistory()});var h=a.one(".tdg-btn");h&&h.on("click",function(){var c=b.all(".tdg-input",a),d=[],e="",f=b.one(".tdg-query",a);c.each(function(a){e=a.val(),e&&d.push(e)}),f.val(d.join(" + "))});var i=b.one(".jp-btn",a);i&&i.on("click",function(){var c=b.all("input",a),d=[],e=["tbsearch"],f="";c.each(function(a){f=a.val(),f&&a.hasClass("J_Jp-query")&&d.push(f),a.hasClass("J_Jp-et")&&e.push(f||"")}),b.one("#J_JiPiaoForm",a).val(d.join(" ")),b.one("#J_JipiaoEt",a).val(e.join("|"))})}else a&&a.remove()},_addExtraEvent:function(a){var b=this,c=b.comboBox||b,d=b.__header,e=b.__footer,f=b.__lastHeader,g=b.__lastFooter,h=b.get("sugConfig").prefixCls;if(!a||a&&!a.newVal){var i=c.get("menu");if(!i.get)return;var j=i.get("el");if(!j||j.all("."+h+"menuitem").length<1)return;var k=j.one("."+h+"combobox-menu-header"),l=j.one("."+h+"combobox-menu-footer");f!==d&&(b.__lastHeader=d,b._renderHeader(k,d,j)),g!==e&&(b.__lastFooter=e,b._renderFooter(l,e,j))}else b.__header=null,b.__footer=null}},{ATTRS:{sugConfig:{value:{extraPassParams:"",extraPostParams:"",sourceUrl:"",tab:"item",autoCollapsed:!0,focused:!1,prefixCls:"search-",excludeParam:[],resultFormat:"\u7ea6{count}\u4e2a\u5b9d\u8d1d"},setter:function(b){var c=this.get("sugConfig");return a.mix(c,b,void 0,void 0,!0)}},mods:{value:{},setter:function(b){var c=this.get("mods");return a.mix(c,b,void 0,void 0,!0)}},input:{getter:function(){return this.comboBox.get("input")}},form:{getter:function(){return this.get("input").parent("form")}},dataSourceCfg:{value:{xhrCfg:{url:"",dataType:"jsonp",scriptCharset:"utf-8",data:{code:"utf-8"}},allowEmpty:!0,paramName:"q",cache:!0}}}});return g},{requires:["node","rich-base","dom","combobox","./plugin/mods"]});