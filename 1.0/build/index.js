/*
combined files : 

gallery/search-suggest/1.0/plugin/mods
gallery/search-suggest/1.0/index

*/
KISSY.add('gallery/search-suggest/1.0/plugin/mods',function(){
    return {
        "new":{
            "tmpl": '<div class="item-wrapper {prefixCls}menu-extras-xp" ' +
                'data-key="q={$query}&suggest=new_{$index}&tab=shopping&auction_tag[]=1154">' +
                '<span class="{prefixCls}menu-xp-tag">新品</span>' +
                '<span class="{prefixCls}menu-xp-icon">新品</span>' +
            '<span class="{prefixCls}menu-xp">“{$query}”相关{new}新品</span></div>',
            "index": 6
        },
        "shop":{
            "tmpl": '<div class="item-wrapper {prefixCls}menu-extras-dp" ' +
                'data-action="http://shopsearch.taobao.com/search" data-key="q={$query}&suggest=shop_{$index}">' +
                '<span class="{prefixCls}menu-dp-tag">店铺</span>' +
                '<span class="{prefixCls}menu-dp-icon">店铺</span>' +
            '<span class="{prefixCls}menu-dp">“{$query}”相关店铺</span></div>',
            "index": 7
        },
        "cat":{
            "tmpl": '<div class="{prefixCls}menu-extras-cate" data-key="q={$query}&cat={$1}&suggest=cat_{$index}">' +
                '<span class="{prefixCls}menu-key">{$query}</span>' +
            '<span class="{prefixCls}menu-cate">在<b>{$0}</b>分类下搜索</span></div>',
            "index": 3
        },
        "list":{
            "index": 5
        },
        "global":{
            "tmpl": '<div class="{prefixCls}menu-extras-cate" data-key="q={$query}&promote=2097152&suggest=global_{$index}">' +
                '<span class="{prefixCls}menu-key">{$query}</span>' +
            '<span class="{prefixCls}menu-cate">在全球购市场中搜索</span></div>',
            "index": 4
        },
        "tdg":{
            "pos": 'footer',
                "tmpl": '<div class="item-wrapper tdg-box"><form method="get" action="http://s.taobao.com/search" class="clearfix">' +
                '<input type="hidden" class="tdg-query" name="q" value="{$query}" />' +
                '<input type="hidden" value="tdg1" name="from" />' +
                '<h5>同店购：</h5>' +
                '<input type="text" value="{$query}" class="tdg-input" tabindex="0" placeholder="第一件宝贝" />' +
                '<em>+</em>' +
                '<input type="text" value="{$query1}" class="tdg-input" tabindex="1" placeholder="另一宝贝" />' +
                '<em>+</em>' +
                '<input type="text" value="{$query2}" class="tdg-input" tabindex="2" placeholder="另一宝贝" />' +
                '<button class="tdg-btn" type="submit" tabindex="3">搜索</button></form></div>',
            "always": true,
            "index": 9
        },
        "jipiao":{
            "pos":'footer',
                "tmpl": '<div class="item-wrapper jipiao-box"><form target="_top" action="http://s.taobao.com/search" method="get">' +
                '<h5><a target="_blank" href="http://trip.taobao.com">淘宝旅行</a></h5>' +
                '<em>出发</em><input type="text" class="jp-input J_Jp-et J_Jp-query"  tabindex="0" value="{$0}"><em>+</em>' +
                '<em>到达</em><input type="text" class="jp-input J_Jp-et J_Jp-query"  tabindex="1" value="{$1}"><em>+</em>' +
                '<em>日期</em><input type="text" class="jp-input J_Jp-et"  tabindex="2" value="{$date}">' +
                '<input type="hidden" id = "J_JipiaoEt" class="J_Jp-et" name="jp_et" value="">' +
                '<input id="J_JiPiaoForm" class="J_Jp-query" type="hidden" name="q" value="{$query}">' +
            '<button type="submit" class="jp-btn">搜索</button></form></div>',
            "index": 8
        },
        "showExtra": false
    };
})
/**
 * @fileoverview search-suggest的入口文件
 * @author gerdy<gerdyhk@gmail.com>
 * @module searchSuggest
 **/
KISSY.add('gallery/search-suggest/1.0/index',function (S, Node,RichBase,DOM,ComboBox,Mods) {
    var EMPTY = '';
    var $ = Node.all;
    /**
     * 请修改组件描述
     * @class SearchSuggest
     * @constructor
     * @extends Base
     */
    var SearchSuggest = RichBase.extend([],{
        initializer: function(){
            var self = this;
            //调用父类构造函数
            self._initCombo();
        },
        /**
         * 设置comboBox的缓存,比如tab之间的切换
         * @param dataSource 需要cached的dataSource
         * @private
         */
        _setComboCache: function(dataSource){
            var self = this,
                index = self.get("tab");
            self.configArr = self.configArr||[];
            self.configArr[index] = {
                data:dataSource
            };
        },
        /**
         * 绑定combo的事件
         * @private
         */
        _initComboEvent: function(){
            var self = this,
                comboBox = self.comboBox,
                input = comboBox.get("input");

            input.on("click",function(){
                if(self.fire("beforeFocus") !== false){
                    var inputVal = S.trim(input.val()),
                        sugConfig = self.get("sugConfig"),
                        prefix = sugConfig.prefixCls,
                        isFocused = comboBox.get("el").hasClass(prefix + "combobox-focused");
                    //如果已经触发focus，则自动展开
                    if(isFocused){
                        if(sugConfig.autoCollapsed||inputVal === ""){
                            comboBox.sendRequest(inputVal);
                        }
                    }
                }
            })
            input.on("blur",function(){
                if(self.fire("beforeBlur") !== false){

                }
            })
            comboBox.on("click",self.comboClick,self);
            comboBox.on("afterCollapsedChange", self._addExtraEvent,self);
            self._formSubmitEvent();
        },
        /**
         * 绑定form的提交事件
         * @private
         */
        _formSubmitEvent: function(){
            var self = this,
                comboBox = self.comboBox,
                input = comboBox.get("input"),
                form = input.parent("form"),action = form.attr("action"),
                paramStr = action.split("?")[1],params,param,inputsStr="",
                qNode = comboBox.get("input");
            form.on("submit",function(ev){
                if (self.fire("beforeSubmit") !== false){
                    //如果是空query，则先判断是否有底纹
                    // 然后判断form的data-defaultpage参数。
                    // 如果参数为空，则不跳转
                    // 如果有参数则跳转到该参数
                    if(S.trim(qNode.val()) === ""){
                        if(self._emptyJump(form) === false){
                            ev.preventDefault();
                        }
                    }
                    if(paramStr){
                        //将action里的参数转成隐藏域
                        params = paramStr.split("&");
                        for(var i in params){
                            param = params[i].split("=");
                            inputsStr += '<input type="hidden" name="'+ param[0] +'" value="'+ param[1] +'"/>';
                        }
                        form.append(inputsStr);
                    }
                }
            })
        },
        /**
         * 当form为空时的跳转事件
         * @param form
         * @returns {boolean}  如果为false则终止跳转
         * @private
         */
        _emptyJump: function(form){
            var self = this,
                holderLabel = form.one("label"),
                holderSpan,emptyAction,
                //获取当前所在tab
                sugConfig = self.get("sugConfig"),
                tab = sugConfig.tab,
                tabSel = sugConfig.tablist;
            //如果存在底纹
            if(holderLabel && tab === "item"){
                holderSpan = holderLabel.one("span");
                //获取底纹的query
                if(holderSpan){
                    //如果默认搜索底纹，需要隐藏底纹
                    holderLabel.hide();
                    self._holderJump(form,holderSpan.text());
                }
            }else{
                emptyAction = (self.tabNode||form).attr("data-defaultpage");
                if(emptyAction){
                    if(S.startsWith(emptyAction,"http")){
                        form.attr("action",emptyAction);
                    }else{
                        return false;
                    }
                }
            }
        },
        /**
         * 底纹的跳转逻辑
         * @param form 搜索框所在的表单
         * @param query 底纹的query词
         * @private
         */
        _holderJump: function(form,query){
            //获取底纹的query词
            //插入大图逻辑
            //给name = q 的隐藏域赋值
            var q = form[0].q;
            if(q) q.value = query;

            form.append('<input type="hidden" name="style" value="grid" />');

        },
        /**
         * 下拉提示的条目点击事件
         * @param e
         */
        comboClick: function(e){
            var self = this,
                el = e.target.get?e.target.get("el"):Node.one(e.currentTarget),
                comboBox = self.comboBox;
            self.fire("beforeSubmit");
            var  retQuery = self.query,
                inputQuery = self.query,
                _child = DOM.children(el),
                dataKey = DOM.attr(_child,"data-key")||"q="+retQuery,
                _form = DOM.parent(comboBox.get("el"),"form"),
                _action = DOM.attr(_form,"action"),
                dataAction = DOM.attr(_child,"data-action")||self.get("action")||_action,
                otherQuery = "&wq=" + inputQuery +"&suggest_query=" + retQuery + "&source=suggest",
                extraParam=self._getInputsVal(_form);
            //如果有?,则使用&连接,否则使用?
            if(dataAction.indexOf("?") > -1){
                dataAction +="&";
            }else{
                dataAction += "?";
            }
            self.redirect(dataAction + dataKey + otherQuery + extraParam);
        },
        redirect: function(url) {
            var a = document.createElement("a");
            if(!a.click) { //only IE has this (at the moment);
                window.location = url;
                return;
            }
            a.setAttribute("href", url);
            a.style.display = "none";
            document.body.appendChild(a); //prototype shortcut
            a.click();
        },
        /**
         *  获取context里所有input隐藏域并拼成urlParam
         * @param context
         * @returns {string}
         * @private
         */
        _getInputsVal: function(context){
            var self = this,
                sugCfg = self.get("sugConfig"),
                excludeArr = sugCfg.excludeParam,
                extraParamArr = [],
                inputEl,param;
                inputs = DOM.query("input",context);
            for(var i = inputs.length -1; i >= 0; i --){
                inputEl = inputs[i];
                param = inputEl.name;
                if(!S.inArray(param,excludeArr)){
                    extraParamArr.push(param+"="+encodeURIComponent(inputEl.value));
                }
            }
            return extraParamArr.join("&");

        },
        /**
         * 获取默认的comboBox配置
         * @returns {{focused: boolean, hasTrigger: boolean, matchElWidth: boolean, srcNode: string, highlightMatchItem: boolean, menu: {align: {overflow: {adjustY: number}}}, cache: boolean}}
         * @private
         */
        _getDefComboCfg: function(){
            return {
                focused: false,
                hasTrigger:false,
                matchElWidth: true,
                //对应的节点
                srcNode: ".allWidth",
                //当用户输入的query与条目匹配时，是否高亮
                highlightMatchItem: false,
                //配置popmenu不随页面高度进行调整
                menu :{
                    align:{overflow:{adjustY:0}}
                },
                cache: true
            }
        },
        /**
         * 生成comboBox所需的结构
         * @param seletor
         * @param wrapCls
         * @returns {*}
         * @private
         */
        _prepareHtml: function(seletor,wrapCls){
            var wrapTpl = '<div class="{cls}combobox"><div class="{cls}combobox-input-wrap"></div></div>',
                wrapHtml = wrapTpl.replace(/{cls}/g,wrapCls),
                wrapper = DOM.create(wrapHtml);
            DOM.addClass(seletor,wrapCls + "combobox-input");
            DOM.attr(seletor,{
                "aria-haspopup":"true",
                "aria-combobox":"list",
                "role":"combobox",
                "autocomplete":"off"
            });
            DOM.wrap(seletor,wrapper);
            return Node.one("."+wrapCls+"combobox");
        },
        /**
         * 根据配置生成下拉提示的排序
         * mods:{"new":{index:3}}
         * plugins:{}
         * @private
         */
        _getRenderSort: function(){
            var self = this,
                mods = S.merge(Mods,self.get("mods")),arr = [],
                mod,index,
                plugins = self.get("plugins"),
                plugin;
            self.set("mods",mods);
            for(var i in plugins){
                plugin = plugins[i];
                index = plugin.get("index") - 0||-1;
                arr[index] = plugin.get("pluginId");
            }
            for(var i in mods){
                mod = mods[i],
                index = mod.index;
                if(!index) continue;
                arr[index] = i;
            }
            this.set("renderIndex",arr);
        },
        /**
         * 初始化下拉提示
         * @private
         */
        _initCombo: function(){
            var self = this ,
            //获取suggest的配置
                sugCfg = self.get("sugConfig"),
            //获取datasource的配置
                dataSourceCfg = self.get("dataSourceCfg"),
                dataSource,
                //获取comboBox的默认配置
                comboBoxCfg = self._getDefComboCfg();
            //获得mods的配置
            self._getRenderSort();
            dataSourceCfg.xhrCfg.url = sugCfg.sourceUrl;
            dataSourceCfg.parse = S.bind(self.parse,self);
            //实例化一个数据源
            dataSource = new ComboBox.RemoteDataSource(dataSourceCfg);
            self._setComboCache(dataSource);
            //使用当前实例的配置来覆盖comboBox的配置
            comboBoxCfg.focused = sugCfg.focused;
            comboBoxCfg.srcNode = self._prepareHtml(sugCfg.node,sugCfg.prefixCls);
            comboBoxCfg.dataSource = dataSource;
            comboBoxCfg.format = S.bind(self.format,self);
            comboBoxCfg.prefixCls = sugCfg.prefixCls;
            //实例化comboBox
            var comboBox = new ComboBox(comboBoxCfg);
            comboBox.render();
            self.comboBox = comboBox;
            //初始化comboBox的事件
            self._initComboEvent();
            //comboBox.get("input")[0].focus();
        },
        /**
         * 当实例需要更新配置，调用本方法
         * @param config
         */
        update: function(config){
            var self = this,
                plugins = self.get("plugins");
            //如果模块包含update,则调用模块的update方法
            for(var i = 0, len= plugins.length -1; i <= len; i ++){
                var item = plugins[i];
                item&& S.isFunction(item.update)&& item.update.call(item,config);
            }

        },
        /**
         * comboBox预留的对数据进行处理的接口
         * @param {String} query 触发suggest时的query
         * @param {Object} results 接口返回的数据
         * @returns {Array} 需要展示的数据
         */
        parse: function (query, results) {
            if(!results.result) return;
            var self = this,
            // 返回结果对象数组
                _result = results.result;
            //如果query为空
            if(_result.length === 0){
                return [[""]];
            }

            //临时过滤机票query的bug
            // 当query为空时,为了避免suggest面板收起,生成了一个空的数据,需要在这里过滤
            for(var i in _result){
                if(!_result[i]){
                    _result.splice(i,1);
                }
            }
            delete(results.result);
            var dataSource = self.comboBox.get("dataSource");
            if(!S.isEmptyObject(results)) {
                (dataSource["extraData"]||(dataSource["extraData"]=[]))[query] = results;
            }
            return _result;
        },
        format: function (query, results) {
            var self = this;
            self.resultArr = [];
            self.render(query,results);
            return self.resultArr;
        },
        /**
         *
         * @param {String} query 触发suggest时的query
         * @param {Object} results 接口返回的数据
         *
         */
        render: function(query,results){
            var self = this,
                renderIndex = self.get("renderIndex"),
                tmpl,mod,addedPos,pos,
                plugin,
                mods = self.get("mods"),
                isShowExtra = self._adjustExtra(query,mods.showExtra),
                indexVal;
            //每次渲染的时候,获取一个query值
            self.query = query;
            for(var i = 0, renderLen = renderIndex.length -1; i <= renderLen; i ++){
                indexVal = renderIndex[i];
                //如果always为真,则一直都执行

                if(!indexVal) continue;
                if(indexVal === "list"){
                    self._list(query,results);
                    continue;
                }
                if(i !== -1){
                    plugin = self.getPlugin(indexVal);
                    if(plugin&&plugin.renderPlugin){
                        plugin.renderPlugin();
                    }else{
                        mod = mods[indexVal];
                        if(mod&&isShowExtra&& (!(pos=mod.pos)||(addedPos !== pos))){
                            tmpl = mod.tmpl;
                            if(!tmpl) continue;
                            var len = self.resultArr.length,
                                diff = self.diffLen||0;
                            addedPos = self._defaultRender({
                                "tmpl": tmpl,
                                "name": indexVal,
                                "pos": pos,
                                "always": mod.always&&(results.length> 0),
                                "callback": mod.callback,
                                "index": len - diff
                            });
                        }
                    }
                }
            }
        },
        /**
         * 模块默认的渲染方法
         * @param config 默认渲染调用的配置
         * @returns {String} 有可能为空,当不为空时,则表示为插入到对应的位置,比如header,footer
         * @private
         */
        _defaultRender: function(config){
            var self = this,
            //配置项的模板
                tmpl = config.tmpl,
            //配置项的名称
                name = config.name,
            //当前suggest的数据源
                dataSource = self.comboBox.get("dataSource"),
            //获取当前query
                query = self.query,
                prefixCls = self.get("sugConfig").prefixCls,
                extraData = dataSource.extraData,
                pos = config.pos,
                index = config.index,
                html;
            if(extraData&&extraData[query]||config.always){
                var date = self._getDate(),
                    data = {"$query": query,"$date": date,"prefixCls":prefixCls};
                if(!config.always){
                    var retData = extraData[query][name],
                        noChildArr = true;
                    if(!retData) return;
                    if(S.isArray(retData)){
                        //当suggest返回的类目或者其他的数量超过2个时,只显示两个
                        if(retData.length >2) retData.length = 2;
                        for(var i = 0,len = retData.length -1; i <= len; i++){
                            var _item = retData[i];
                            if(S.isArray(_item)){
                                noChildArr = false;
                                for(var n = 0,leng = _item.length - 1; n <= leng; n ++){
                                    data["$"+n] = _item[n]||"";
                                }
                                data["$index"] = index + 1 + i;
                                html = S.substitute(tmpl,data);
                                self.addContent({
                                    "html":html,
                                    "query":query,
                                    "position": pos,
                                    "callback": config.callback
                                });
                                continue;
                            }else{
                                data["$"+i] = _item;
                                data["$index"] = index + 1 + i;
                            }
                        }
                        if(noChildArr){
                            html = S.substitute(tmpl,data);
                            self.addContent({
                                "html":html,
                                "position": pos,
                                "callback": config.callback
                            });
                        }
                        return pos;
                    }
                    data[name] = retData;
                }
                data["$index"] = index + 1;
                html = S.substitute(tmpl,data);
                self.addContent({
                    "html":html,
                    "position": pos,
                    "callback": config.callback
                });
                return pos;
            }
        },
        /**
         * 根据query判断是否要出额外的结构代码
         * @param query
         * @param extra
         * @returns {*}
         * @private
         */
        _adjustExtra: function(query,isShowExtra){
            if(query !=="" && isShowExtra){
                return true;
            }else{
                return false;
            }
        },
        /**
         * 获取当前登录用户的昵称
         * @returns {String} 返回用户的昵称
         */
        getNick: function(){
            var self = this;
            return self._getCookie('_nk_') || self._getCookie('tracknick');
        },
        /**
         * 从Cookie里获取对应key值的value
         * @param name cookie的名称
         * @returns {String} 返回对应的value
         * @private
         */
        _getCookie: function(name) {
            var win = window;
            if (win.userCookie && !S.isUndefined(win.userCookie[name])) {
                return win.userCookie[name];
            }

            if (win.SRP_COOKIES||(win.SRP_COOKIES = {})&&S.isUndefined(SRP_COOKIES[name])) {
                var m = document.cookie.match('(?:^|;)\\s*' + name + '=([^;]*)');
                SRP_COOKIES[name] = (m && m[1]) ? decodeURIComponent(m[1]) : '';
            }
            return SRP_COOKIES[name];
        },
        /**
         *
         * @returns {string} 返回当天的日期
         * @private
         */
        _getDate: function(){
            var date = new Date();
            return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + (date.getDate()+1);
        },
        _list: function(query,results){
            var self = this,
                resultFormat = self.get("sugConfig").resultFormat,
                ret = self.resultArr||(self.resultArr=[]),tmpl = "<div class='item-wrapper' data-key='q={query}{text}&suggest=0_{index}'>" +
                    "<span class='item-text'>{query}<b>{text}</b></span>" +
                    "<span class='item-count'>"+ resultFormat +"</span>" +
                    "</div>";

            S.each(results, function (r,index) {
                if(!r||!r[0]) {
                    results.splice(index,1);
                    return;
                }
                var text = r[0],prefix = "",item,
                    _query = query;
                while(text.indexOf(_query) < 0){
                    _query = _query.substr(0,_query.length -1);
                };
                if(text.indexOf(_query) === 0){
                    prefix = _query;
                    text = text.replace(_query,"");
                }
                for(var i in ret){
                    item = ret[i];
                    if(item.textContent === r[0] && item.unique){
                        return;
                    }
                }
                ret.push({
                    // 点击菜单项后要放入 input 中的内容
                    textContent:r[0],
                    // 菜单项的
                    content:S.substitute(tmpl, {
                        query: prefix,
                        text:text,
                        index: index+1,
                        count:r[1]
                    })
                });
            });
            self.resultArr = ret;
        },
        /**
         * 给下拉列表添加内容
         * @param config {Object}
         *      config.html 需要被插入的html代码
         *      config.pos 插入的位置,eg: footer和header,或者null
         *      config.callback 回调函数
         */
        addContent: function(config){
            var self = this,
                html = config.html,
                pos = config.position,
                query = config.query;
            if(!pos){
                var ret = self.resultArr||[];
                ret.push({
                    "content" : html,
                    "textContent" : query
                });
                return;
            }else{
                self["__"+pos] = {
                    "tmpl": html
                };
                self._addExtraEvent();
            }
        },
        /**
         * 渲染搜索下拉提示的头部模块
         * @param header
         * @param headerCfg
         * @param context
         * @private
         */
        _renderHeader: function(header,headerCfg,context){
            if(headerCfg){
                var prefix = this.get("sugConfig").prefixCls;
                if(!header){
                    header = new Node("<div class='"+ prefix +"combobox-menu-header'></div>").prependTo(context);
                }
                header.empty().append(headerCfg.tmpl);
            }else{
                header&&header.remove();
            }
        },
        /**
         * 渲染搜索下拉提示的底部模块
         * @param footer
         * @param footerCfg
         * @param context
         * @private
         */
        _renderFooter: function(footer,footerCfg,context){
            var self = this,prefix = self.get("sugConfig").prefixCls;
            if(footerCfg){
                if(!footer){
                    footer = new Node("<div class='"+ prefix +"combobox-menu-footer'></div>").appendTo(context);
                }
                footer.empty().append(footerCfg.tmpl);
                var historyClean = footer.one("."+ prefix +"menu-history-clean");
                if(historyClean){
                    historyClean.on("click",function(e){
                        e.halt();
                        var History = self.getPlugin("history");
                        History._cleanHistory();
                    })
                }
                var tdgBtn = footer.one(".tdg-btn");
                if(tdgBtn){
                    tdgBtn.on("click",function(){
                        var tdgInputs = Node.all(".tdg-input",footer),
                            tdgArr = [],val="",
                            tdgQueryInput = Node.one(".tdg-query",footer);
                        tdgInputs.each(function(node){
                            val = node.val();
                            if(val){
                                tdgArr.push(val);
                            }
                        })
                        tdgQueryInput.val(tdgArr.join(" + "));
                    })

                }
                var jpBtn = Node.one(".jp-btn",footer);
                if(jpBtn){
                    jpBtn.on("click",function(){
                        var inputs = Node.all("input",footer),
                            jpArr = [],jpEtArr=["tbsearch"],val = "";
                        inputs.each(function(node){
                            val = node.val();
                            if(val){
                                if(node.hasClass("J_Jp-query")){
                                    jpArr.push(val);
                                }
                            }
                            //当用户只输入两个input时，没有填写的需要一个空值
                            if(node.hasClass("J_Jp-et")){
                                jpEtArr.push(val||"");
                            }

                        })
                        Node.one("#J_JiPiaoForm",footer).val(jpArr.join(" "));
                        Node.one("#J_JipiaoEt",footer).val(jpEtArr.join("|"));
                    })
                }
            }else{
                footer&&footer.remove();
            }
        },
        _addExtraEvent: function(e){
            var self = this,
                //这里会触发两次，分别是comboBox和suggest
                comboBox = self.comboBox||self,
                headerCfg = self.__header,
                footerCfg = self.__footer,
                lastHeaderCfg = self.__lastHeader,
                lastFooterCfg = self.__lastFooter,
                prefix = self.get("sugConfig").prefixCls;
            if(!e||(e&&!e.newVal)){
                var menu = comboBox.get("menu");
                if(!menu.get){
                    return;
                }
                var menuEl = menu.get("el");
                if(!menuEl||menuEl.all("."+ prefix +"menuitem").length < 1) {
                    return;
                }
                var header = menuEl.one("."+ prefix +"combobox-menu-header"),
                    footer = menuEl.one("."+ prefix +"combobox-menu-footer");
                //如果头尾的内容没换
                if(lastHeaderCfg !== headerCfg){
                    self.__lastHeader = headerCfg;
                    self._renderHeader(header,headerCfg,menuEl);
                }
                if(lastFooterCfg !== footerCfg){
                    self.__lastFooter = footerCfg;
                    self._renderFooter(footer,footerCfg,menuEl);
                }
            }
            else{
                self.__header = null;
                self.__footer = null;
            }
        }
    }, {ATTRS : /** @lends SearchSuggest*/{
        sugConfig:{
            value:{
                //跳转需要附加的参数
                extraPassParams: "",
                //suggest接口需要的参数
                extraPostParams:"",
                sourceUrl: "",
                tab:"item",
                autoCollapsed: true,
                focused: false,
                prefixCls:"search-",
                tablist: null,
                excludeParam:[],
                //默认的显示格式
                "resultFormat": '约{count}个宝贝'
            },
            setter:function(v){
                var _cfg = this.get("sugConfig");
                return S.mix(_cfg,v,undefined,undefined,true);
            }
        },
        mods:{
            value:{

            },
            setter:function(v){
                var _mods = this.get("mods");
                return S.mix(_mods,v,undefined,undefined,true);
            }
        },
        input:{
            getter:function(v){
                return this.comboBox.get("input");
            }
        },
        dataSourceCfg:{
            value:{
                xhrCfg:{
                    url: "",
                    dataType:'jsonp',
                    scriptCharset:'utf-8',
                    data:{
                        code: "utf-8"
                    }
                },
                //设置为允许为空
                allowEmpty: true,
                paramName: 'q',
                cache:true
            }
        }
    }});
    return SearchSuggest;
}, {requires:['node', 'rich-base','dom','combobox','./plugin/mods']});




