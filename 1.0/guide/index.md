## 综述
    基于KISSY 1.3的搜索下拉提示

## 组件快速使用
    var pre = "gallery/search-suggest/1.0/",
            mods = [ pre + 'index','new_suggest.css'],

            srhSuggestCfg = {
                "extra": {
                    "history": !!window.TB && window.TB.Global.isLogin()
                            && !!(mods.push
                            ('plugin/history')),
                    "telephone": !!window.TB && window.TB.Global.isLogin()
                            && !!(mods.push
                            ('plugin/telephone')),
                    "cat": true,
                    "global": true,
                    "new": true,
                    "shop": true,
                    "jipiao": true,
                    "tdg": true,
                    "tab": !!(mods.push
                            ('plugin/tab')),
                    "tipsNotice": !!(mods.push
                            ('plugin/tips-notice'))
                },
                "mods": {
                    "tab": {
                        "activeCls": "selected"
                    }
                },
                "sugConfig": {
                    extraParams: "",
                    sourceUrl: "http://suggest.taobao.com/sug",
                    node: "#q",
                    focused: true,
                    //由于只支持简单的选择器，所以给这里加一个id
                    tablist: "#J_SearchTab li"
                }
            };
    S.use(mods.join("," + pre), function (S, SearchSuggest) {
        var DOM = S.DOM, sug = new SearchSuggest(srhSuggestCfg);
        while (arguments.length > 2) {
            sug.plug(new (Array.prototype.pop.call(arguments)));
        }
        sug.on("beforeFocus", function () {


        })
        sug.on("beforeBlur", function () {

        })
    })
##组件api
###属性： config的参数
####mods 对额外模块的配置
            * modname(String)
                额外模块对应的脚本
            * tmpl(String)
                某些简单的模块，可以通过配置tmpl来调用内置的简单渲染逻辑
            * pos:<span>["header"|"footer"](String)
                和tmpl搭配使用，表示渲染的模块插入的位置
            "mods":{
                "history":{
                    "modname": "gallery/combobox-suggest/0.1/plugins/history",
                    "tmpl":"xxxxx"
                },
                "tab": {
                    "activeCls": "selected"
                }
                ...
            }
####extra 配置所有模块的开关
            extra:{
            //历史纪录模块
                "history": true,
            //手机充值模块
                "tel": false,
            //类目
                "cat": false,
            //全球购模块
                "global": false,
            //新品模块
                "new": false,
            //店铺搜索模块
                "shop": false,
            //机票模块
                "jipiao": false,
            //同店购模块
                "tdg": false
            }
####sugConfig 配置suggest的其他配置
            * sourceUrl(String)
                用于配置suggest接口
            "sugConfig":{
                extraParams: "",
                sourceUrl: "http://suggest.taobao.com/sug",
                node: "#q",
                focused: true,
                //由于只支持简单的选择器，所以给这里加一个id
                tablist: "#J_SearchTab li"
            }
###事件：
####beforeSubmit事件
            当点搜索按钮或者回车时触发提交之前的事件
####beforeFocus事件
            当搜索框获得焦点时，触发的事件
####beforeBlur事件
            当搜索框获得焦点时，触发的事件