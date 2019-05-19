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
                    "cookie":'acw_tc=3ccdc16515566030932683593e077dc701159bc0942a794a1d5bcd893843e1; locale=zh_CN; Hm_lvt_diwork=1556603095,1557907056; SL_GWPT_Show_Hide_tmp=1; SL_wptGlobTipTmp=1; NTKF_T2D_CLIENTID=guest68B63E98-56B6-D9DE-42C9-C365F9D35577; nTalk_CACHE_DATA={uid:yu_1000_ISME9754_guest68B63E98-56B6-D9,tid:1558056401363664}; PHPSESSID=39v80as94n7rje8jqs02pmh0v6; YKJ_IS_DIWORK=1; YKJ_DIWORK_DATA=%7B%22data%22%3A%7B%22is_diwork%22%3A1%2C%22cur_qzid%22%3A%2217829%22%7D%2C%22key%22%3A%22381bccb4ebc01c9aedbce7f79e317644%22%7D; ck_safe_chaoke_csrf_token=89368146d8aba86eaaf2e1b03381234f; at=88c15cbdafaea66b18235f901871ca4d; yonyou_uid=e6229947-f4e3-4456-bc37-82348d06b208; yonyou_uname=19452888888; JSESSIONID=node010eyaj71d1r7hcwzl2fto1eh52037.node0; yht_username=ST-2682-ykCGmsu110UNKX3bS3yc-cas01.example.org__e6229947-f4e3-4456-bc37-82348d06b208; yht_usertoken=s9Mncg4uOfhrMOlIgF5pWzPmG6KrHHKVNn6QLKV%2BZl9L3ZKy2JM%2BtaZg9Mw1X9n0tuYq%2ByY6YNuabuSYUW21wA%3D%3D; yht_access_token=bttef236866-596b-4881-a2e9-d47639b0024b__1558279973682; wb_at=LMjosuojxj59lrtnnmNGDQpaLpxbjbZrmnkdwZlokdknqf; jwt_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaXdvcmsiLCJzZXNzaW9uIjoie1wiY2xpZW50SXBcIjpcIjEwLjMuNS41MlwiLFwiY3JlYXRlRGF0ZVwiOjE1NTgyNzk5NzMsXCJleHRcIjp7XCJvcmdTdGF0dXNcIjpcIm11bHRpXCIsXCJhZG1pblwiOnRydWUsXCJsb2dvXCI6XCJodHRwOi8vY2RuLnlvbnlvdWNsb3VkLmNvbS9kZXYvYXBjZW50ZXIvaW1nL2xvZ28vTE9HTy5wbmdcIixcInlodF9hY2Nlc3NfdG9rZW5cIjpcImJ0dGVmMjM2ODY2LTU5NmItNDg4MS1hMmU5LWQ0NzYzOWIwMDI0Yl9fMTU1ODI3OTk3MzY4MlwifSxcImp3dEV4cFNlY1wiOjYwLFwiand0VmFsaWREYXRlXCI6MCxcImxhc3REYXRlXCI6MTU1ODI3OTk3MyxcImxvY2FsZVwiOlwiemhfQ05cIixcInByb2R1Y3RMaW5lXCI6XCJ1OGNcIixcInNlc3Npb25FeHBNaW5cIjoyMTYwLFwic2Vzc2lvbklkXCI6XCJMTWpvc3VvanhqNTlscnRubm1OR0RRcGFMcHhiamJacm1ua2R3Wmxva2RrbnFmXCIsXCJzb3VyY2VJZFwiOlwiZGl3b3JrXCIsXCJ0ZW5hbnRJZFwiOlwidTA3MmYxYW1cIixcInVzZXJJZFwiOlwiZTYyMjk5NDctZjRlMy00NDU2LWJjMzctODIzNDhkMDZiMjA4XCJ9IiwiZXhwIjoxNTU4MjgwMDMzfQ.O0aD9_Y0L9fCB46Jy2bOg9uGxnsOpEXkOGH2eG2LhQg; Hm_lpvt_diwork=1558279974'
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


