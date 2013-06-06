## 综述
    基于KISSY 1.3的搜索下拉提示
## 模板
###当使用TAB时
    当使用tab组件时，如果tab属性里包含了data-action和data-empty，则当点击tab时，会把这两个值赋值给form表单。
    data-action即为tab对应的action值
    data-empty为当空query时，点击搜索或者回车触发跳转的url
    如：
    <ul class="ks-switchable-nav" id="J_SearchTab">
        <li data-searchtype="item" data-action="http://s.taobao.com"
            data-action="http://list.taobao.com/browse/cat-0.htm" class="selected"><a
            href="" data-spm-anchor-id="1.1000386.0.34">宝贝</a>
        </li>
        <li data-searchtype="mall" data-empty="http://www.tmall.com"
            data-action="http://list.tmall.com/search_product.htm">
            <a href="" data-spm-anchor-id="1.1000386.0.35">天猫</a>
        </li>
        <li data-searchtype="shop" data-empty="http://shopsearch.taobao.com"
            data-action="http://shopsearch.taobao.com/browse/shop_search.htm">
            <a href="">店铺</a>
        </li>
    </ul>
###当页面没有tab时
    data-empty的值会存在form上
    如： <form data-empty="http://s.taobao.com" action="xxxx"></form>
###当存在底纹时
    会优先调用底纹跳转逻辑
## 组件快速使用
        S.use('dom,gallery/search-suggest/1.0/,
            gallery/search-suggest/1.0/plugin/history,
            gallery/search-suggest/1.0/plugin/tab,
            gallery/search-suggest/1.0/plugin/telephone,
            gallery/search-suggest/1.0/new_suggest.css',function(S,DOM,SearchSuggest,History,Tab,Telephone){
                var sug = new SearchSuggest({
                    plugins:[
                        new History({
                            index: !!(window.TB&&window.TB.Global.isLogin())&&1
                        }),
                        new Tab({
                            "activeCls": "selected"
                        }),
                        new Telephone({
                            index: !!(window.TB&&window.TB.Global.isLogin())&&2
                        })
                    ],
                    "sugConfig": {
                        sourceUrl: "http://suggest.taobao.com/sug",
                        node: "#q",
                        focused: true,
                        //由于只支持简单的选择器，所以给这里加一个id
                        tablist: "#J_SearchTab li"
                    },
                    "mods":{
                        "showExtra":true
                    }
                });
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
    ...
}

####sugConfig 配置suggest的其他配置
    * sourceUrl(String)
        用于配置suggest接口
    "sugConfig":{
        sourceUrl:"http://suggest.taobao.com/sug",
        node: "#q",
        focused: true
    }

###事件：
####beforeSubmit事件
    当点搜索按钮或者回车时触发提交之前的事件
####beforeFocus事件
    当搜索框获得焦点时，触发的事件