/*
combined files : 

gallery/search-suggest/1.0/plugin/tab

*/
KISSY.add('gallery/search-suggest/1.0/plugin/tab',function(S,Base,DOM,Event,ComboBox){
    function Tab(config) {
        Tab.superclass.constructor.call(this, config || {});
    }
    S.extend(Tab, Base,{
        pluginInitializer:function(sug){
            this._initPluginEvent.call(this,sug);
        },
        tabClick: function(e){
            var self = this,
                sug = self.get("caller"),
                target = e.currentTarget,
                type = DOM.attr(target,"data-searchtype"),
                dataEmpty = DOM.attr(target,"data-defaultpage"),
                dataAction = DOM.attr(target,"data-action"),
                input = sug.comboBox.get("input"),
                form = DOM.parent(input,"form"),
                activeCls = self.get("activeCls"),
                tabCfg;
            //切换tab高亮的class

            DOM.removeClass(DOM.siblings(target),activeCls);
            DOM.addClass(target,activeCls);

            //配置form的data-empty
            dataEmpty&&form.setAttribute("data-defaultpage",dataEmpty);
            dataAction&&form.setAttribute("action",dataAction);

            if(type){
                tabCfg = self.getDefCfg(type);
                tabCfg.action = dataAction;
                sug.update(tabCfg);
            }else{
                var query = sug.query||input.val(),
                    aNode = DOM.get("a",target);
                if(aNode){
                    var href = DOM.attr(aNode,"href");
                    //因为默认情况下,shopsearch的链接是没有search的,所以当有q时,需要拼接
                    href = href.replace("/?","/search?");
                    href = href + "&q="+query;
                    DOM.attr(aNode,"href",href);
                }
            }
            e.preventDefault();
        },
        _initPluginEvent: function(sug){
            var self = this,
                sugCfg = sug.get("sugConfig"),
                activeCls = self.get("activeCls"),
                selectors = sugCfg.tablist,tabActive;
            self.set("caller",sug);
            if(!selectors) return;
            Event.on(selectors,"click",self.tabClick,self);
            S.all(selectors).each(function(n,i){
                if(n.hasClass(activeCls)){
                    sug.tabNode = n;
                }
            })
        },
        update: function(config){
            var self = this,
                sug = self.get("caller"),
                comboBox = sug.comboBox,
                index = config.sugConfig.tab,
                cachedData = sug.configArr[index],
                dataSource,
                dataSourceCfg,xhrCfg,
                sugConfig = config.sugConfig,
                input = comboBox.get("input"),
                form = DOM.parent(input,"form");
            sug.configArr = sug.configArr||[];
            dataSourceCfg = sug.get("dataSourceCfg");
            xhrCfg = dataSourceCfg.xhrCfg;
            xhrCfg.url = sugConfig.sourceUrl;
            S.mix(sug.__attrVals,config,{deep: true});
            //如果cachedData存在，则调用cachedData
            if(!cachedData){
                //如果是没有远程数据，则调用本地数据源,构造一个空的数据
                if(xhrCfg.url === ""){
                    cachedData = sug.configArr[index]={
                        data: new ComboBox.LocalDataSource({
                            data:{},
                            parse: dataSourceCfg.parse
                        })
                    }
                }else{
                    cachedData = sug.configArr[index] = {
                        data: new ComboBox.RemoteDataSource(dataSourceCfg)
                    }
                }
            }else{
                dataSource =  cachedData.data;
            }
            comboBox.set("dataSource",cachedData.data);
            //切换action
            if(form) DOM.attr(form,"action",config.action);
            //切换tab时，默认展开下拉提示
            input[0].focus();
            comboBox.sendRequest(sug.query);
        },
        /**
         * 获取预定义的配置
         * @param type
         * @returns {Object} tabCfg
         */
        getDefCfg:function(type){
            var tabCfg;
            switch(type) {
                case "shop": {
                    tabCfg = {
                        "sugConfig":{
                            "sourceUrl":"http://suggest.taobao.com/sug?area=ssrch&k=1",
                            "resultFormat": '',
                            "tab":"shop",
                            "excludeParam":["q"]
                        },
                        "mods":{
                            "tel": {
                                index:false
                            },
                            "cat": {
                                index:false
                            },
                            "new": {
                                index:false
                            },
                            "jipiao": {
                                index:false
                            },
                            "shop": {
                                index:false
                            },
                            "tdg": {
                                index:false
                            },
                            "showExtra": false
                        },
                        "action":"http://shopsearch.taobao.com/search",
                        tab:"shop"
                    }
                } break;
                case "item": {
                    tabCfg = {
                        sugConfig: {
                            "sourceUrl": "http://suggest.taobao.com/sug?k=1",
                            "resultFormat": '约{count}个宝贝',
                            "tab":"item",
                            "excludeParam":["q"]
                        },
                        "mods":{
                            "cat": {
                                index:4
                            },
                            "new": {
                                index:6
                            },
                            "jipiao": {
                                index:8
                            },
                            "global":{
                                index: 5
                            },
                            "shop": {
                                index:7
                            },
                            "tdg": {
                                index: 9
                            },
                            "showExtra": true
                        },
                        action:"http://s.taobao.com/search"
                    }
                } break;
                case "mall": {
                    tabCfg = {
                        sugConfig: {
                            "sourceUrl": "http://suggest.taobao.com/sug?area=b2c&k=1",
                            "resultFormat": '约{count}个宝贝',
                            "tab":"mall",
                            "excludeParam":["q"]
                        },
                        "mods":{
                            "cat": {
                                index:4
                            },
                            "new": {
                                index:-1
                            },
                            "jipiao": {
                                index: -1
                            },
                            "global":{
                                index: 5
                            },
                            "shop": {
                                index:-1
                            },
                            "tdg": {
                                index: 9
                            },
                            "tel":{
                                index: -1
                            },
                            "showExtra": true
                        },
                        action:"http://list.tmall.com/search_product.htm"
                    }
                } break;
                default:{
                    if(S.isObject(type)){
                        tabCfg = type;
                        //当sugConfig不存在时，赋值
                        if(!tabCfg.sugConfig) tabCfg.sugConfig = {};
                    }else{
                        S.log("配置有误");
                        return;
                    }
                }
            }
            //todo 当sugConfig没有配置时，会报错

            if(tabCfg.sugConfig&&!tabCfg.sugConfig.tab) tabCfg.sugConfig.tab = tabCfg.sugConfig.sourceUrl;
            return tabCfg;
        }
    },{
        ATTRS : {
            pluginId: {
                value: 'tab'
            },
            caller:{
                value: null
            }
        }
    });
    return Tab;
},{
    requires:["base","dom","event","combobox"]
})
