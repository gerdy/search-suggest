/*! search-suggest - v1.0 - 2013-06-06 2:17:52 PM
* Copyright (c) 2013 yuncong; Licensed  */
KISSY.add("gallery/search-suggest/1.0/plugin/tips-notice",function(a,b,c,d,e){function f(a){f.superclass.constructor.call(this,a||{})}return a.extend(f,b,{pluginInitializer:function(a){var b=this;b.set("caller",a),b._renderHTML()},_renderHTML:function(){var a=c.get(".search-site");if(!a)return!1;c.after('<div class="tip" style="display: none"><div class="tip-arrow-contain"><div class="tip-arrow"></div><div class="tip-container"><p class="tip-content">\u201c\u5929\u732b\u3001\u4e8c\u624b\u3001\u5168\u7403\u8d2d\u201d \u642c\u5230\u8fd9\u91cc\u4e86\uff01</p><div class="tip-close">&#215</div></div></div></div>',a);var b=c.get(".tip");e.get("tip_showed")||(c.show(b),e.set("tip_showed",!0,1)),self._initPluginEvent(b)},_initPluginEvent:function(a){d.on(".tip-close","click",function(){c.hasClass(a,"flag-hit-wordlist")&&e.set("tip_closed",!0,1),c.hide(a)}).on("mouseenter",function(){c.addClass(a,"hover")}).on("mouseleave",function(){c.removeClass(a,"hover")})},renderPlugin:function(){if(!e.get("tip_closed")){var b,d=this,f=d.get("caller").comboBox,g=f.get("input"),h=a.trim(g[0].value);if(!h)return;b=["\u5929\u732b","\u4e8c\u624b","\u5168\u7403\u8d2d","\u4ee3\u8d2d","\u76f4\u90ae","\u5927\u724c","\u6b63\u54c1","\u5962\u4f88\u54c1","\u660e\u661f\u540c\u6b3e","\u8fdb\u53e3","\u6d77\u5916\u76f4\u90ae","Abercrombie Fitch","Alexander McQueen","Alexander Wang","American Eagle","ASOS","Balenciaga","Bally","BCBG Max Azria","Bottega Veneta","Breguet","Burberry","Bvlgari","Celine","Chanel","Clinique","Coach","Dior","Estee Lauder","Folli Follie","Gucci","Guess","Hermes","Jimmy Choo","Karicare","Kate Spade","LA MER","Lancome","Laneige","Laroche Posay","Louis Vuitton","MARC BY MARC JACOBS","Minnetonka","Miu Miu","Patek Philippe","Paul Frank","Prada","Ralph Lauren","Rolex","Salvatore Ferragamo","senshukai","THERMOS","Timberland","UGG","V.Constantin","Valentino","Victoria's Secret","Yves Saint Laurent","AF","BCBG","BV","LV","Marc Jacobs","YSL","\u4e9a\u5386\u5c71\u5927 \u9ea6\u6606","\u4e9a\u5386\u5c71\u5927\u9ea6\u6606","\u4e9a\u5386\u5c71\u5927 \u738b","\u4e9a\u5386\u5c71\u5927\u738b","AE\u7f8e\u56fd\u9e70","ASOS","\u5df4\u9ece\u4e16\u5bb6","\u5df4\u5229","\u5b9d\u7f07\u5609","\u5b9d\u7391","\u5df4\u5b9d\u8389","\u5b9d\u683c\u4e3d","\u745f\u4ee4","\u9999\u5948\u513f","\u5029\u78a7","\u853b\u9a70","\u8fea\u5965","\u96c5\u8bd7\u5170\u9edb","\u8299\u4e3d\u8299\u4e3d","\u53e4\u7426","Guess","\u7231\u9a6c\u4ed5","\u5468\u4ef0\u6770","\u53ef\u745e\u5eb7","\u51ef\u7279 \u4e1d\u84d3","\u51ef\u7279\u4e1d\u84d3","\u6d77\u84dd\u4e4b\u8c1c","\u5170\u853b","\u5170\u829d","\u7406\u80a4\u6cc9","\u8def\u6613 \u5a01\u767b","\u8def\u6613\u5a01\u767b","\u9a6c\u514b \u96c5\u53ef\u5e03","\u9a6c\u514b\u96c5\u53ef\u5e03","\u8ff7\u4f60\u5510\u5361","\u7f2a\u7f2a","\u767e\u8fbe\u7fe1\u4e3d","\u5927\u5634\u7334","\u666e\u62c9\u8fbe","\u62c9\u592b \u52b3\u4f26","\u62c9\u592b\u52b3\u4f26","\u52b3\u529b\u58eb","\u83f2\u62c9\u683c\u6155","\u5343\u8da3\u4f1a","\u81b3\u9b54\u5e08","\u5929\u4f2f\u4f26","UGG","\u6c5f\u8bd7\u4e39\u987f","\u534e\u4f26\u5929\u5974","\u7ef4\u591a\u5229\u4e9a\u7684\u79d8\u5bc6","\u5723\u7f57\u5170"];for(var i=0;i<b.length;i++)if(h.toLowerCase().indexOf(b[i].toLowerCase())>-1){var j=c.get(".tip");c.addClass(j,"flag-hit-wordlist"),c.show(j);break}}}},{ATTRS:{pluginId:{value:"tipsNotice"}}}),f},{requires:["base","dom","event","cookie"]});