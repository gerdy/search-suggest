KISSY.add(function(){
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
});