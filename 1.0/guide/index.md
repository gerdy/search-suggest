## 综述
    基于KISSY 1.3的搜索下拉提示
## 模板
###当使用TAB时
    当使用tab组件时，如果tab属性里包含了data-action和data-defaultpage，则当点击tab时，会把这两个值赋值给form表单。
    data-action即为tab对应的action值
    data-defaultpage为当空query时，点击搜索或者回车触发跳转的url
    当data-defaultpage不为url（包含http）时，则取消跳转
    如：
    <ul class="ks-switchable-nav" id="J_SearchTab">
        <li data-searchtype="item" data-action="http://s.taobao.com/search"
            data-defaultpage="http://list.taobao.com/browse/cat-0.htm" class="selected"><a
            href="" data-spm-anchor-id="1.1000386.0.34">宝贝</a>
        </li>
        <li data-searchtype="mall" data-defaultpage="http://www.tmall.com"
            data-action="http://list.tmall.com/search_product.htm">
            <a href="" data-spm-anchor-id="1.1000386.0.35">天猫</a>
        </li>
        <li data-searchtype="shop" data-defaultpage="http://shopsearch.taobao.com"
            data-action="http://shopsearch.taobao.com/browse/shop_search.htm">
            <a href="">店铺</a>
        </li>
    </ul>
###当页面没有tab时
    会调用form上的data-defaultpage的值
    如： <form data-defaultpage="http://s.taobao.com" action="xxxx"></form>
###当存在底纹时
    会优先调用底纹跳转逻辑
    <label for ="q"><span>底纹文字</span></label>
        目前底纹逻辑只支持宝贝tab，其他tab待增加
## 组件快速使用
        S.use('dom,gallery/search-suggest/1.0/,
            gallery/search-suggest/1.0/plugin/history,
            gallery/search-suggest/1.0/plugin/tab,
            gallery/search-suggest/1.0/plugin/telephone,
            gallery/search-suggest/1.0/new_suggest.css',function(S,DOM,SearchSuggest,History,Tab,Telephone){
                var sug = new SearchSuggest({
                    plugins:[
                        new History({
                            //index为这个插件在下拉提示里的排序
                            //如果不写或者false，则会重置为-1,不会被渲染
                            index: !!(window.TB&&window.TB.Global.isLogin())&&1
                        }),
                        new Tab({
                            //这个为tab高亮的样式，默认为selected
                            "activeCls": "selected",
                            //tab关联的选择器，只支持28原则
                            "node": "#J_SearchTab li"
                        }),
                        new Telephone({
                            index: !!(window.TB&&window.TB.Global.isLogin())&&2
                        })
                    ],
                    "sugConfig": {
                        //当前请求的suggest接口
                        //默认值为""
                        sourceUrl: "http://suggest.taobao.com/sug",
                        //本组件初始化定位的input
                        //默认值为空
                        node: "#q",
                        //标记是否默认触发focused
                        //默认值为false
                        focused: true,
                        //默认的样式前缀,尽量不修改
                        //默认值为"search-"
                        prefixCls:"search-",
                        //是否在点击input就触发下拉提示
                        //默认值为true
                        autoCollapsed：true,
                        //渲染宝贝数量的文本结构,默认值
                        "resultFormat":"约{count}个宝贝"
                    },
                    "mods":{
                        //标记是否开启额外的模块，如同店购和淘宝旅行
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
####beforeBlur事件
    当搜索框获得焦点时，触发的事件

###插件默认接口
####pluginInitializer
    当插件初始化时，会调用
####renderPlugin
    当下拉提示渲染时会调用插件的这个方法
####update
    当下拉提示的update被调用时，会遍历调用插件的update事件
