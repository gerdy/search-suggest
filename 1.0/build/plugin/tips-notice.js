/*
combined files : 

gallery/search-suggest/1.0/plugin/tips-notice

*/
KISSY.add('gallery/search-suggest/1.0/plugin/tips-notice',function(S,Base,DOM,Event,Cookie){
    function TipsNotice(config) {
        TipsNotice.superclass.constructor.call(this, config || {});
    }
    S.extend(TipsNotice, Base,{
        pluginInitializer:function(sug){
            var self = this;
            self.set("caller",sug);
            self._renderHTML();

        },
        _renderHTML: function(){
            var siteNode = DOM.get(".search-site");
            if(!siteNode) return false;
            DOM.after(
                '<div class="tip" style="display: none">' +
                    '<div class="tip-arrow-contain">' +
                    '<div class="tip-arrow"></div>'+
                    '<div class="tip-container">' +
                    '<p class="tip-content">“天猫、二手、全球购” 搬到这里了！</p>' +
                    '<div class="tip-close">&#215</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>',siteNode);
            var tip = DOM.get('.tip');
            if(!Cookie.get('tip_showed')){
                DOM.show(tip);

                Cookie.set('tip_showed',true,1);
            }
            self._initPluginEvent(tip);
        },
        _initPluginEvent:function(tip){
            Event.on(".tip-close","click",function(){
                if(DOM.hasClass(tip,'flag-hit-wordlist')){
                    Cookie.set('tip_closed',true,1);
                }
                DOM.hide(tip);
            }).on('mouseenter',function(){
                    DOM.addClass(tip,'hover');
                }).on('mouseleave',function(){
                    DOM.removeClass(tip,'hover');
                });
        },
        renderPlugin:function(){
            /*
             * 提示功能， 全部、天猫、二手、全球购位置移动的提示
             */

            if(!Cookie.get('tip_closed')){
                var self = this,
                    comboBox = self.get("caller").comboBox,
                    input = comboBox.get("input"),
                    q= S.trim(input[0].value),
                    wordlist;
                if(!q) return;
                wordlist=['天猫','二手','全球购','代购','直邮','大牌',
                    '正品','奢侈品','明星同款','进口','海外直邮','Abercrombie Fitch',
                    'Alexander McQueen','Alexander Wang','American Eagle',
                    'ASOS','Balenciaga','Bally','BCBG Max Azria',
                    'Bottega Veneta','Breguet','Burberry','Bvlgari',
                    'Celine','Chanel','Clinique','Coach','Dior',
                    'Estee Lauder','Folli Follie','Gucci',
                    'Guess','Hermes','Jimmy Choo','Karicare',
                    'Kate Spade','LA MER','Lancome','Laneige',
                    'Laroche Posay','Louis Vuitton','MARC BY MARC JACOBS',
                    'Minnetonka','Miu Miu','Patek Philippe','Paul Frank',
                    'Prada','Ralph Lauren','Rolex','Salvatore Ferragamo',
                    'senshukai','THERMOS','Timberland','UGG','V.Constantin',
                    'Valentino','Victoria\'s Secret','Yves Saint Laurent','AF',
                    'BCBG','BV','LV','Marc Jacobs','YSL','亚历山大 麦昆','亚历山大麦昆',
                    '亚历山大 王','亚历山大王',
                    'AE美国鹰','ASOS','巴黎世家','巴利','宝缇嘉','宝玑','巴宝莉','宝格丽',
                    '瑟令','香奈儿','倩碧','蔻驰','迪奥','雅诗兰黛','芙丽芙丽',
                    '古琦','Guess','爱马仕','周仰杰','可瑞康','凯特 丝蓓','凯特丝蓓','海蓝之谜',
                    '兰蔻','兰芝','理肤泉','路易 威登','路易威登','马克 雅可布','马克雅可布','迷你唐卡','缪缪',
                    '百达翡丽','大嘴猴','普拉达','拉夫 劳伦','拉夫劳伦','劳力士','菲拉格慕','千趣会',
                    '膳魔师','天伯伦','UGG','江诗丹顿','华伦天奴','维多利亚的秘密','圣罗兰'];

                for(var i=0;i<wordlist.length;i++){
                    if(q.toLowerCase().indexOf(wordlist[i].toLowerCase()) > -1){
                        /*alert('命中');*/
                        var tip=DOM.get('.tip');
                        DOM.addClass(tip,'flag-hit-wordlist');
                        DOM.show(tip);
                        break;
                    }
                }
            }
        }
    },{
        ATTRS:{
            pluginId:{
                value: "tipsNotice"
            }
        }
    });
    return TipsNotice;
},{
    requires:["base","dom","event","cookie"]
})
