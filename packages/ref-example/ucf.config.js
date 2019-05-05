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
                    "Referer": "https://u8cucf-daily.yyuap.com",
                    "cookie":'acw_tc=3ccdc16515566030932683593e077dc701159bc0942a794a1d5bcd893843e1; locale=zh_CN; Hm_lvt_diwork=1556603095; SL_GWPT_Show_Hide_tmp=1; SL_wptGlobTipTmp=1; at=1f574a325eac79e5796de43a4869a9c0; yonyou_uid=804fc21c-cbc3-4b73-afc2-040c3f476e74; yonyou_uname=19433888888; JSESSIONID=node01dd3cznnaqk661k3ie4g24iocb1249.node0; yht_username=ST-21631-ZKvu2fMueFNSJAeBLaY3-cas01.example.org__804fc21c-cbc3-4b73-afc2-040c3f476e74; yht_usertoken=3CBNW5mgZhu4wyCj3RUF%2FzMoAQFoE9HonsrNORzbVzPYgPqJsAOXs8vUZfjYPCBJVPkd1AxMm866NL8TZSKBRg%3D%3D; yht_access_token=btt4397e535-3ac2-402b-a2b4-4e46d69aef51__1556603319228; wb_at=LMjonspnjSDutoeFtd8GLC3d4EZRpjbZrmnkdwZlokdknqf; jwt_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaXdvcmsiLCJzZXNzaW9uIjoie1wiY2xpZW50SXBcIjpcIjEwLjMuNS41MlwiLFwiY3JlYXRlRGF0ZVwiOjE1NTY2MDMzMTksXCJleHRcIjp7XCJvcmdTdGF0dXNcIjpcIm11bHRpXCIsXCJhZG1pblwiOnRydWUsXCJsb2dvXCI6XCJodHRwOi8vY2RuLnlvbnlvdWNsb3VkLmNvbS9kZXYvYXBjZW50ZXIvaW1nL2xvZ28vTE9HTy5wbmdcIixcInlodF9hY2Nlc3NfdG9rZW5cIjpcImJ0dDQzOTdlNTM1LTNhYzItNDAyYi1hMmI0LTRlNDZkNjlhZWY1MV9fMTU1NjYwMzMxOTIyOFwifSxcImp3dEV4cFNlY1wiOjYwLFwiand0VmFsaWREYXRlXCI6MCxcImxhc3REYXRlXCI6MTU1NjYwMzMyMCxcImxvY2FsZVwiOlwiemhfQ05cIixcInByb2R1Y3RMaW5lXCI6XCJ1OGNcIixcInNlc3Npb25FeHBNaW5cIjoyMTYwLFwic2Vzc2lvbklkXCI6XCJMTWpvbnNwbmpTRHV0b2VGdGQ4R0xDM2Q0RVpScGpiWnJtbmtkd1psb2tka25xZlwiLFwic291cmNlSWRcIjpcImRpd29ya1wiLFwidGVuYW50SWRcIjpcImVteHZycTMwXCIsXCJ1c2VySWRcIjpcIjgwNGZjMjFjLWNiYzMtNGI3My1hZmMyLTA0MGMzZjQ3NmU3NFwifSIsImV4cCI6MTU1NjYwMzM4MH0.tIL2hcJYhG_-VjVSy6BYEl0mwN3cFUwRfsE3H-uwO-Q; Hm_lpvt_diwork=1556603321; PHPSESSID=qke7mb8cqb7o4npdg01kgeoj17; ck_safe_chaoke_csrf_token=fc31e859568a347646d23988b57a7770'
                },
                //要代理访问的对方路由
                router: [
                    '/uniform'
                ],
                url: 'https://u8cucf-daily.yyuap.com'
                
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
            'ref-mdd1': path.resolve(__dirname, 'ucf-common/src/mtl-core/')
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


