KISSY.add(function (S,Base,Event,LocalQuery) {
    function History(config) {
        History.superclass.constructor.call(this, config || {});
        S.sug = S.bind(this._retSug,this);
    }
    S.extend(History, Base,{
        pluginInitializer:function(caller){
            var self = this,
                sugConfig = caller.get("sugConfig"),
                tab = sugConfig.tab||"";
            caller.set('extend',{'history':true});
            self.set("caller",caller);
            self.historyLocalQuery=new LocalQuery({name:'history',tab:tab,user:caller.getNick()});
            self.hitedHistoryListMap={};
            var comboBox=caller.comboBox;
            comboBox.on('afterCollapsedChange',function(e){
                if(!e.newVal){
                    comboBox.detach('afterCollapsedChange',arguments.callee);
                    comboBox.get('menu').get('el').delegate('mousedown','.'+ sugConfig.prefixCls +'menu-history-delete',self._historyDeleteMousedown,self);
                    comboBox.on("click",self.saveItemVal,self);
                }
            });
            caller.on("beforeSubmit",function(){
                var savedVal = comboBox.get("input").val(),localQueryInst;
                if(S.trim(savedVal) === ""){
                    return;
                }
                localQueryInst = self.historyLocalQuery;
                if(localQueryInst){
                    if(/*sugConfig.tab === "item"*/1){
                        localQueryInst._setKey({
                            name:"pinyin"
                        });
                    }
                    localQueryInst.save(savedVal,S.trim(savedVal));

                    localQueryInst._setKey({
                        name:"history"
                    })
                }
            })
            self._getPinyinQuery();
        },
        _getPinyinQuery: function(){
            var self = this,
                localQueryInst = self.historyLocalQuery;
            localQueryInst.checkFlash({
                onSuccess:function(){
                    S.log(arguments);
                    localQueryInst._setKey({
                        name: 'pinyin'
                    })
                    var list = localQueryInst.query();
                    if(list.length > 0){
                        var text = decodeURIComponent(list[0].key);
                        if(/[\u4e00-\u9fa5]/.test(text)){
                            self._getPinyin(list[0].key);
                            localQueryInst.clearByDay(0);
                        }else{
                            localQueryInst._setKey({
                                name: 'history'
                            })
                            localQueryInst.save(text,S.trim(text));
                        }
                    }
                    localQueryInst._setKey({
                        name: 'history'
                    })
                },
                onFailure:function(){
                    S.log("loading flashStorage failure!");
                }
            })
        },
        renderPlugin: function(){
            var self = this,
                caller = self.get("caller"),
                q = caller.query,
                allHitedHistoryList=self.historyLocalQuery.query(q),
                historyItemNum,
                hitedHistoryList,
                sugConfig = caller.get("sugConfig"),
                prefix = sugConfig.prefixCls;
            //只有有历史记录并且q不等于空值,才显示头尾
            if(q === "" && allHitedHistoryList.length > 0){
                caller.__header = {
                    tmpl: '<div class="history-box"><span>搜索历史</span></div>',
                    type: 'history'
                };
                caller.__footer = null;
                /*
                caller.__footer = {
                    tmpl: '<div class="history-box"><a href="javascript:;" class="'+ prefix +'menu-history-clean">清空搜索历史</a></div>',
                    type: 'history'
                };*/
                historyItemNum= 10;
            }else{
                caller.__header = null;
                caller.__footer = null;
                historyItemNum= 2;
            }
            hitedHistoryList = allHitedHistoryList.splice(0,historyItemNum);
            caller._addExtraEvent();
            self._renderHistoryItems(hitedHistoryList);
            self.hitedHistoryListMap[q]=hitedHistoryList;
        },
        saveItemVal: function(e){
            var self = this,
                caller = self.get("caller"),
                node = e.target.get?e.target.get("el"):S.one(e.target),
                savedVal = node.one(".item-text").text(),
                localQueryInst = self.historyLocalQuery;
            if(localQueryInst){
                localQueryInst._setKey({
                    name:"pinyin"
                });
                localQueryInst.save(savedVal,S.trim(savedVal));

                localQueryInst._setKey({
                    name:"history"
                })

            }
        },
        _historyDeleteMousedown:function(e){
            var self = this,
                caller = self.get("caller"),
                target = S.one(e.target),
                index = target.parent().attr("index"),
                parent = target.parent(2),
                comboBox = caller.comboBox,
                menu = comboBox.get('menu'),
                children = menu.get("children");
            for(var i=0;i<children.length;i++){
                var item = children[i];
                if(item.get('el')[0]===parent[0]){
                    menu.removeChild(item,true);
                    break;
                }
            }
            self.historyLocalQuery&&self.historyLocalQuery.deleteItem(index);
            comboBox.sendRequest(caller.query);
        },
        _renderHistoryItems:function(list){
            var self=this,
                caller= self.get("caller"),
                historyItemValue,
                sugConfig = caller.get("sugConfig"),
                prefix = sugConfig.prefixCls,
                resultTmpl='<div class="{prefixCls}menu-extras-history" data-key="q={historyItemValue}&suggest=history_{index}" index="{historyItemValue}">' +
                    '<span class="{prefixCls}menu-history-key">{historyItemValue}</span><span class="{prefixCls}menu-history-delete">删除</span></div>',
                ret = caller.resultArr||(caller.resultArr=[]),
                resultHtml;
            list = S.unique(list);
            for(var i = 0, len = list.length - 1; i <= len; i ++){
                historyItemValue=decodeURI(list[i]['key']);
                resultHtml = resultTmpl.replace(/{historyItemValue}/g,historyItemValue)
                    .replace(/{prefixCls}/g,prefix)
                    .replace(/{index}/g,(i+1).toString());
                ret.push({
                    content: resultHtml,
                    textContent: historyItemValue,
                    unique:true
                });
            }
        },
        _getPinyin: function(text){
            var self = this,
                url = "http://suggest.taobao.com/sug?code=utf-8&area=py&callback=KISSY.sug&q="+text;
            if(window._DEV_&&location.href.indexOf("suggest=online") === -1){
                url = "http://tools.search.taobao.com:9999/proxy.php?url=http://s003187.cm6/sug%3F%26code=utf-8%26area=py%26callback=KISSY.sug%26q="+text;
            }
            self._savedInputValue = decodeURIComponent(text);
            S.getScript(url);
        },
        _retSug: function(data){
            if(data&&data.result){
                var pinyin = data.result[0],
                    self = this,
                    savedVal = self._savedInputValue;
                self.historyLocalQuery&&self.historyLocalQuery.save(savedVal,S.trim(pinyin));
            }
        },
        _cleanHistory:function(){
            var self = this,
                caller = self.get("caller"),
                comboBox = caller.comboBox,
                menu = comboBox.get("menu"),
                container = menu.get("el"),
                input = comboBox.get("input"),
                sugConfig = caller.get("sugConfig"),
                prefix = sugConfig.prefixCls,
                header= container.one('.'+ prefix +'combobox-menu-header');
            self.historyLocalQuery.clearByDay(0);
            self.hitedHistoryListMap = {};
            var siblings =  header.siblings();
            siblings.css("display","none");
            header.html('<div class="history-box"><span>搜索历史已清空</span></div>');
            var anim = new S.Anim(container,{opacity:0},3,'easeIn',function(){
                siblings.css("display","block");
                container.css({"opacity":1,"visibility":"hidden"});
            });
            anim.run();
            input.on("blur keydown mousedown",function(e){
                if(anim.isRunning()){
                    anim.stop(true);
                }
                caller.__header = null;
                caller.__footer = null;
                //当点击清空后,立刻输入就需要马上需要做这个操作
                //还需要判断这个值是否为空,如果为空,则不显示
                if(e.type === "keydown"&&this.value){
                    container.css("visibility","visible");
                }
                input.detach('blur keydown mousedown',arguments.callee);
            })
        },
        /**
         *
         * @param config
         * eg:  {
                    "sugConfig":{
                        "resultFormat": '',
                        "sourceUrl":"http://suggest.taobao.com/sug?area=ssrch",
                        "tab":"item"
                    },
                    "action":"http://shopsearch.taobao.com/search?"
                }
         */
        update:function(config){
            var self = this,
                index = encodeURI(config.sugConfig.tab);
            self.historyLocalQuery._setKey({tab:index});
            self._getPinyinQuery();
        }
    },{
        ATTRS:{
            pluginId:{
                value: "history"
            }
        }
    });
    return History;
},{requires:["base","event","./local-query"]});

