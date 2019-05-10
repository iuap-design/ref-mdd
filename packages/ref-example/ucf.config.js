require('@babel/polyfill');
/**
 * UCF配置文件 更多说明文档请看 https://github.com/iuap-design/ucf-web/blob/master/packages/ucf-scripts/README.md
 */
const path = require('path');
module.exports = (env, argv) => {
    return {
        context: "",// 上下文对象
        // 启动所有模块，默认这个配置，速度慢的时候使用另外的配置
        bootList: true,
        // 代理的配置
        proxy: [
            {
                enable: true,
                headers: {
                    "Referer": "https://mock.yonyoucloud.com"
                },
                //要代理访问的对方路由
                router: [
                    '/mock'
                ],
                url: 'https://mock.yonyoucloud.com'
            }, {
                enable: true,
                headers: {
                    "Referer": "http://localhost:3010"
                },
                //要代理访问的对方路由
                router: [
                    '/nodeRefer'
                ],
                url: 'http://localhost:3010/'
            },{
                enable: true,
                headers: {
                    "Referer": "http://ucfbasedoc-fe.test.app.yyuap.com",
                    "cookie":'locale=zh_CN; SL_GWPT_Show_Hide_tmp=1; SL_wptGlobTipTmp=1; Hm_lvt_diwork=1557047341; PHPSESSID=a0bglf6vb14te0g4fr2mo81320; at=409bebc5caebea4c3f2b422982b7fb54; yonyou_uid=99ea7655-00a2-4bda-b23c-19ade37ea574; yonyou_uname=u8c_vip%40163.com; JSESSIONID=node01hstemnpsyy8biq19vrjmr8rn1082.node0; yht_username=ST-2215-yzbOhdYOwcKpTmglGRhI-cas01.example.org__99ea7655-00a2-4bda-b23c-19ade37ea574; yht_usertoken=vVKYw5AlnH3OxfcUNmDgtH4yT6wg99aEoledmd24Lb5BBE9VeqzzaXIc0F7Tzwuxp8f94KXfAaUrEf2KVpgCEQ%3D%3D; yht_access_token=bttf1ecb88f-3cce-4f41-8100-3c553608b742__1557369520724; wb_at=LMjoonrjxyaHgcRHvbDoMlfk9KgBjbZrmnkdwZlokdknqf; jwt_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaXdvcmsiLCJzZXNzaW9uIjoie1wiY2xpZW50SXBcIjpcIjEwLjYuMTkzLjExNVwiLFwiY3JlYXRlRGF0ZVwiOjE1NTczNjk1MjAsXCJleHRcIjp7XCJvcmdTdGF0dXNcIjpcIm11bHRpXCIsXCJhZG1pblwiOnRydWUsXCJsb2dvXCI6XCJodHRwczovL2ZpbGUtY2RuLnlvbnlvdWNsb3VkLmNvbS93b3JrYmVuY2gtaW1hZ2UtcGF0aC1hcHBsaWNhdGlvbkljb24vMjlkYTYzNzYtYTAwNS00YWRiLTgyMmItZDg3MmVmMGM5MjU5L3Bob3RvLmpwZ1wiLFwieWh0X2FjY2Vzc190b2tlblwiOlwiYnR0ZjFlY2I4OGYtM2NjZS00ZjQxLTgxMDAtM2M1NTM2MDhiNzQyX18xNTU3MzY5NTIwNzI0XCJ9LFwiand0RXhwU2VjXCI6NjAsXCJqd3RWYWxpZERhdGVcIjowLFwibGFzdERhdGVcIjoxNTU3MzY5NTIzLFwibG9jYWxlXCI6XCJ6aF9DTlwiLFwicHJvZHVjdExpbmVcIjpcInU4Y1wiLFwic2Vzc2lvbkV4cE1pblwiOjIxNjAsXCJzZXNzaW9uSWRcIjpcIkxNam9vbnJqeHlhSGdjUkh2YkRvTWxmazlLZ0JqYlpybW5rZHdabG9rZGtucWZcIixcInNvdXJjZUlkXCI6XCJkaXdvcmtcIixcInRlbmFudElkXCI6XCJhNjV4dHF3elwiLFwidXNlcklkXCI6XCI5OWVhNzY1NS0wMGEyLTRiZGEtYjIzYy0xOWFkZTM3ZWE1NzRcIn0iLCJleHAiOjE1NTczNjk1ODN9.z0RFcw0X18vtRKRDlh8R6Yvtc9kDWTou6Bkg08cYa3U; Hm_lpvt_diwork=1557369524'
                },
                //要代理访问的对方路由
                router: [
                    '/uniform'
                ],
                url: 'http://ucfbasedoc-fe.test.app.yyuap.com'
                
            }
        ],
        // 静态托管服务
        static: 'ucf-common/src/static',
        // 展开打包后的资源文件，包含图片、字体图标相关
        res_extra: false,
        // 构建资源的时候产出sourceMap，调试服务不会生效
        open_source_map: false,
        // CSS loader 控制选项
        css: {
            modules: false
        },
        // 全局环境变量
        global_env: {
            GROBAL_HTTP_CTX: JSON.stringify("/iuap_demo"),
        },
        // 别名配置
        alias: {
            'ref-mdd': path.resolve(__dirname, 'ucf-common/src/ref-mdd/')
        },
        // 构建排除指定包
        externals: {
            //'tinper-bee': 'TinperBee'
        },
        // 加载器Loader
        loader: [],
        // 调试服务需要运行的插件
        devPlugins: [],
        // 构建服务需要运行的插件
        buildPlugins: []
    }
}


