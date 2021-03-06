/*
combined files : 

gallery/search-suggest/1.0/plugin/storage
gallery/search-suggest/1.0/plugin/telephone

*/
KISSY.add('gallery/search-suggest/1.0/plugin/storage',function (S,Base,undefined) {
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
},{requires:['base']})
KISSY.add('gallery/search-suggest/1.0/plugin/telephone',function (S,Base,Storage) {
    function Telephone(config) {
        Telephone.superclass.constructor.call(this, config || {});
    }
    S.extend(Telephone, Base,{
        /**
         * 读取电话号码的值
         * @private
         */
        pluginInitializer: function(caller){
            var self = this,storage = new Storage();
            self._telHistory = [];
            self.set("caller",caller);
            storage.read('TBTelNumHistory', {
                onSuccess: function(val) {
                    S.log('loading TBTelNumHistory: ' + val);
                    // 最后的是最新的
                    if (val) self._telHistory = val.split(',');
                },
                onFailure: function() {
                    S.log('loading TBTelNumHistory failure');
                }
            });
        },
        /**
         * suggest调用的render事件
         */
        renderPlugin: function(){
            var self = this,
                caller = self.get("caller"),
                ret = caller.resultArr||[];
            //如果用户没有登录,则不显示
            var nk = caller.getNick();
            if(!nk){
                return;
            }
            var query = caller.query;
            var tmpl = '<div data-key="{q=query}&nk={nk}&suggest=celnum_1&source=suggest" key="{allNum}" class="ks-menu-extras-cz">给<span class="ks-menu-key">{query}<b>{rest}</b></span>充值</div>';
            var newVal = caller.query,arr = {};
            //如果符合手机号码的正则匹配规则
            if (/^[0-9]{3,11}$/g.test(newVal)) {
                // 顺序以最近时间最前显示
                for (var i = self._telHistory.length - 1; i > -1; i -= 2) {
                    if (self._telHistory[i - 1].indexOf(newVal) === 0) {
                        arr.rest = self._telHistory[i - 1];
                        arr.nk = nk;
                        caller.addContent({
                            html:S.substitute(tmpl,arr)
                        });
                    }
                }
                caller.resultArr = ret;
            }
        }
    },{
        ATTRS:{
            pluginId:{
                value: "telephone"
            }
        }
    })
    return Telephone;
},{requires:['base','./storage']})
