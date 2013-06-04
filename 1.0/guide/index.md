## 综述
    基于KISSY 1.3的搜索下拉提示

## 组件快速使用
        KISSY.use("gallery/combobox-suggest/0.1/index", function (S,Sug,undefined) {
            var sug = new Sug(config);
            sug.on("beforeSubmit",function(){
                //提交前的处理
            })
            sug.on("beforeFocus",function(){
                //focus时触发的事件
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
                ...
            }
        ####extra 配置所有模块的开关
            extra:{
            //历史纪录模块
                "history": true,
            //手机充值模块
                "tel": true,
            //类目
                "cat": true,
            //全球购模块
                "global": true,
            //新品模块
                "new": true,
            //店铺搜索模块
                "shop": true,
            //机票模块
                "jipiao": true,
            //同店购模块
                "tdg": true
            }
        ####sugConfig 配置suggest的其他配置
            * sourceUrl(String)
                用于配置suggest接口
            "sugConfig":{
                extraParams: "",
                sourceUrl:"http://suggest.taobao.com/sug",
                comboBoxCfg:{
                    srcNode: ".input-auto",
                    "focus": true
                }
            }
    ###事件：
        ####beforeSubmit事件
            当点搜索按钮或者回车时触发提交之前的事件
        ####beforeFocus事件
            当搜索框获得焦点时，触发的事件