var a = {
    keepAspect: false,
    left: 'ds_series_wordcloud_left|STRING',
    top: 'ds_series_wordcloud_top|STRING',
    width: 'ds_series_wordcloud_width|STRING',
    height: 'ds_series_wordcloud_height|STRING',
    right: 'ds_series_wordcloud_right|STRING',
    bottom: 'ds_series_wordcloud_bottom|STRING',

    sizeRange:'ds_series_wordcloud_sizeRange|STRING',
    rotationRange:'ds_series_wordcloud_sizeRange|STRING',
    rotationStep:'ds_series_wordcloud_rotationStep|NUMBER',
    gridSize:'ds_series_wordcloud_gridSize|NUMBER',
    drawOutOfBound:'ds_series_wordcloud_drawOutOfBound|BOOLEAN',
    layoutAnimation:'ds_series_wordcloud_layoutAnimation|BOOLEAN',

    textStyle:{
        fontFamily: 'ds_series_wordcloud_textStyle_fontFamily|STRING',
        fontWeight: 'ds_series_wordcloud_textStyle_fontWeight|STRING',
        // 颜色可以用一个函数来返回字符串
        color:'ds_series_wordcloud_textStyle_color|STRING'
    },
    emphasis: {
        focus: 'self',
        textStyle: {
            textShadowBlur: 'ds_series_wordcloud_emphasis_textShadowBlur|NUMBER',
            textShadowColor: 'ds_series_wordcloud_emphasis_textShadowColor|STRING'
        }
    },


}


var pro = {
    ds_series_wordcloud_left:'center',
    ds_series_wordcloud_top:'center',
    ds_series_wordcloud_width:'70%',
    ds_series_wordcloud_height:'80%',
    ds_series_wordcloud_right:null,
    ds_series_wordcloud_bottom:null,

    ds_series_wordcloud_sizeRange:[12, 60],  // 词的大小，最小12px，最大60px，可以在这个范围调整词的大小
    ds_series_wordcloud_rotationRange: [-90, 90],    // 每个词旋转的角度范围
    ds_series_wordcloud_rotationStep:45,//渲染的梯度就是，这个值越小，词云里出现的角度种类就越多
    ds_series_wordcloud_gridSize:8,//词云中每个词的间距
    ds_series_wordcloud_drawOutOfBound:false,//是否允许超出画布
    ds_series_wordcloud_layoutAnimation:true,// 布局的时候是否有动画
    ds_series_wordcloud_textStyle_fontFamily:'sans-serif',//字体
    ds_series_wordcloud_textStyle_fontWeight:'bold',//字体粗细
    ds_series_wordcloud_textStyle_color:'STRING',//字体颜色

    ds_series_wordcloud_emphasis_textShadowBlur:10,
    ds_series_wordcloud_emphasis_textShadowColor:'#333'


}