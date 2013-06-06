/*
combined files : 

gallery/search-suggest/1.0/plugin/storage
gallery/search-suggest/1.0/plugin/local-query

*/
KISSY.add('gallery/search-suggest/1.0/plugin/storage',function (S,Event,Base,undefined) {
    var inst;
    function Storage(config) {
        if(!inst){
            Storage.superclass.constructor.call(this, config || {});
            inst = this;
            inst.initialize();
        }
        return inst;
    }

    Storage.ATTRS = {
        "src":{
            value: "http://a.tbcdn.cn/apps/tbskip/public/flashStorage.swf"
        },
        bridge:{
            value:null
        },
        hasInit:{
            value:false
        }
    }
    S.extend(Storage, Base,{
        initialize: function(config){
            config = config || {};
            var self = this;
            self._addFlash(config.appendTo);
            self.hasInit = true;
        },
        _addFlash : function(appendTo) {
            var self = this,
                doc = document,
                container = doc.createElement('div'),
                src = self.get('src'),
                htmlStr = '',
                bridgeVal;

            container.id = 'storagetool';
            container.style.height = 0;
            container.style.overflow = 'hidden';

            htmlStr += '<object id="J_StorageObj" name="J_StorageObj" ';
            htmlStr += 'classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="1" height="1" ';
            htmlStr += 'codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab">';
            htmlStr += '<param name="movie" value="' + src + '" />';
            htmlStr += '<param name="allowScriptAccess" value="always" />';
            htmlStr += '<embed name="J_StorageEmbed" src="' + src + '" width="1" height="1" ';
            htmlStr += 'allowScriptAccess="always" type="application/x-shockwave-flash" ';
            htmlStr += 'pluginspage="http://www.adobe.com/go/getflashplayer">';
            htmlStr += '</embed></object>';

            appendTo = appendTo || doc.body;
            appendTo.appendChild(container);
            container.innerHTML = htmlStr;
            if (navigator.appVersion.indexOf('MSIE') !== -1) {
                //IE
                container.style.zoom = 1;
                container.style.filter = 'alpha(opacity=' + 10 + ')';
                bridgeVal = window['J_StorageObj'];
            } else {
                container.style.opacity = 0.1;
                bridgeVal = doc['J_StorageEmbed'];
            }
            //判断bridgeVal是否有read,如果没有,则表示flash被禁用,则调用localStorage
            self.set("bridge",bridgeVal);
        },
        save : function(key, value, tryCount) {
            var self = this,
                bridge = self.get("bridge");
            if (tryCount === undefined) {
                tryCount = 200;
            }
            if (tryCount === 0) {
                return;
                self.set("bridge",localStorage);
                localStorage.constructor.prototype.read = localStorage.getItem;
                localStorage.constructor.prototype.save = localStorage.setItem;
                bridge = localStorage;
            }
            try {
                bridge.save(key, value);
            } catch (e) {
                setTimeout(function() {
                    self.save(key, value, tryCount - 1);
                }, 0);
            }
        },
        read : function(key, callback,tryCount) {
            var self = this,
                bridge = self.get("bridge"),
                val;
            if (tryCount === undefined) {
                tryCount = 200;
            }
            if (tryCount === 0) {
                callback && callback.onFailure();
                return;
                self.set("bridge",localStorage);
                localStorage.constructor.prototype.read = localStorage.getItem;
                localStorage.constructor.prototype.save = localStorage.setItem;
                bridge = localStorage;
            }
            try {
                val =  bridge.read(key);
                callback&&callback.onSuccess(val);
                return val;
            } catch (e) {
                setTimeout(function() {
                    self.read(key,callback ,tryCount - 1);
                }, 0);
            }
        }
    });
    return Storage;
},{requires:['event','base']})
/**
 *  用于提供本地存储某些数据并且根据key值查询
 */
KISSY.add('gallery/search-suggest/1.0/plugin/local-query',function (S,Base,Event,Storage, undefined) {
    function LocalQuery(config) {
        LocalQuery.superclass.constructor.call(this, config || {});
        this.initialize();
    }
    //私有变量
    /*
     index 用来做删除
     datalist的数据格式为：
     [
     {key:"女装",value:"",time:122123214},
     {key:"女装",value:"",time:122123214},
     {key:"女装",value:"",time:122123214}
     ]

     */
    var datalist=null;
    var prefix='localQuery';
    /*
     组件在存储datalist数据的名字，由name和prefix组成
     */
    var storageKey;


    //业务逻辑，私有方法
    S.extend(LocalQuery, Base, {
        initialize:function () {
            var self = this,
                name=self.get('name'),
                tab = self.get('tab'),
                user=self.get('user');
            storageKey=prefix+name+tab+user;
            self._getStorage();
        },
        checkFlash: function(callback){
            this.storage.read(callback);
        },
        _setKey: function(config){
            var self = this,
                name = config.name||self.get("name"),
                tab = config.tab||self.get("tab"),
                user = config.user||self.get("user");
            storageKey = prefix + name + tab + user
            self.set("tab",tab);
            self.set("name",name);
            self.set("user",user);
            datalist = null;
        },
        _save:function(key, value){
            var list=this._getDatalist(),
                encodeKey = encodeURI(key),
                newItem={
                    key:encodeKey,
                    value:encodeURI(value),
                    time:S.now()
                };
            this._deleteItemByValue(list,encodeKey);//有重复的key便去重
            list.unshift(newItem);

        },
        _deleteItemByValue:function(list,value){
            var targetItem=null,
                oldKey;

            for(var i= 0;i<list.length;i++){
                oldKey=list[i]['key'];

                if(oldKey==value){
                    targetItem=list.splice(i,1);
                    i--;
                }
            }
        },
        /**
         * 根据查询字符串匹配出相应的记录,如果不传则放回所有
         * @param {String} q 查询字符串
         * @return {Array} 排序方式是，越新的记录越搞前
         * @private
         */
        _query:function(q){
            var list=this._getDatalist(),
                resultList=[],
                key,val;

            if(!q){
                return this._distinctByValue(list);
            }
            q=encodeURI(q);
            S.each(list,function(dataItem,index){
                key=dataItem['key'],
                    val = dataItem['value'];
                if(key.indexOf(q)===0||val.indexOf(q)===0){
                    resultList.push(dataItem);
                }
            });
            return this._distinctByValue(resultList);
        },
        /**
         * 根据value做去重
         * @param list
         * @private
         */
        _distinctByValue:function(list){
            var resultList=[],item;
            for(var i= 0,listLength=list.length;i<listLength;i++){
                item=list[i];
                !this._hasItemOfValue(resultList,item['value'])&&resultList.push(item);
            }
            return resultList;
        },
        _hasItemOfValue:function(list,value){
            var result=false;
            for(var i=list.length-1;i>=0;i--){
                if(list[i]['value']===value){
                    result=true;
                }
            }
            return result;
        },

        /**
         * 清理某个时间点之前的数据,由于业务特性，需要删除的往往应该比不需要删除的少，这里从尾部开始比较
         * @param {Number} time 基于毫秒速的字符串 例子：1362034594259
         *
         */
        _cleanBefore:function(time){
            var list=this._getDatalist(),
                item,delFlag=0;

            for(var i=list.length- 1;i>=0;i--){
                item=list[i];
                if(item["time"]>time){
                    delFlag=i+1;
                    break;
                }
            }

            list.length=delFlag;
        },
        _getDatalist:function(){
            //if(!datalist){
            datalist=this.storage.read()||[];
            //}

            return datalist;
        },

        _getStorage:function(){
            var storageType=this.get('storageType');
            switch (storageType){
                case 'flashStorage' : this.storage=this._initFlashStorage();break;
                default : this.storage=false;
            }
        },
        _initFlashStorage:function(){
            return {
                save:function(value){
                    return new Storage().save(storageKey, S.JSON.stringify(datalist));
                },
                read:function(callback){
                    var data= new Storage().read(storageKey,callback);
                    if(data){
                        return S.JSON.parse(data);
                    }else{
                        return undefined;
                    }

                }
            }
        },
        /**
         * 析构函数
         */
        destructor:function(){
            datalist=null;
            prefix=null;
            storageKey=null;
        },
        /**
         * 保存某关键字key的一条结果value
         * @param key
         * @param value
         * @return {*}
         */
        save:function (key, value) {
            if(value==""){
                return;
            }

            var result=this._save(key, value);
            this.storage.save();
            /*hasHistory=true;*/
            return result;
        },
        /**
         * 根据查询字符串查找对应的条目
         * @param q
         * @return {*}
         */
        query:function (q) {
            return this._query(q);
        },
        /**
         * 删除条目
         * @param value
         *
         */
        deleteItem:function (value) {
            var list=this._getDatalist();
            this._deleteItemByValue(list,encodeURI(value));
            this.storage.save();
            /*
             if(list.length===0){
             hasHistory=false;
             }*/
        },
        /**
         * 清理几天前的数据
         * @param {Number} day
         */
        clearByDay:function(day){
            var time=S.now()-day*24*3600*1000;
            this._cleanBefore(time);
            this.storage.save();
        },

        /**
         * 是否还有历史记录
         */
        hasHistory:function(){
            if(this._getDatalist().length>0){
                return true;
            }else{
                return false;
            }
        }
    },{
        //属性
        ATTRS:{
            name:{
                value:'default',
                setter:function (v) {
                    return v;
                }
            },
            user:{
                value:null,
                setter:function (v){
                    return S.fromUnicode(v);
                }
            },
            maxLength:{
                value:500
            },
            storageType:{
                value:"flashStorage",
                setter:function (v) {
                    return v;
                },
                getter:function (v) {
                    return v;
                }
            }
        }
    });
    return LocalQuery;
}, {
    requires:["base","event","./storage"]
});

