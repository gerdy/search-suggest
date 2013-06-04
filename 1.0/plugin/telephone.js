KISSY.add(function (S,Base,Storage) {
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