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
                    "cookie":'_ga=GA1.2.1214828560.1545451044; locale=zh_CN; gr_user_id=8e520258-78de-4126-904c-dec7a3d15de2; grwng_uid=dc23e26e-13fb-4b14-8fc3-3dc6234e8e87; acw_tc=276aedc515562454477878132e3b041fc1220f9c6e79d8dd15d7fd3a977535; Hm_lvt_diwork=1556245449; SL_GWPT_Show_Hide_tmp=1; SL_wptGlobTipTmp=1; ck_safe_chaoke_csrf_token=4a45429889ddb26b6abbdfa7f53d5c8a; at=12d5f9e4d1cabb70af6eabe4b97732b4; yonyou_uid=4eb96061-ccc5-4012-9998-95d274440c00; yonyou_uname=vipkid0417%40test1988.com; JSESSIONID=node01mw4mtxc3h4rb1wyc36fkx45bz678.node0; yht_username=ST-20694-guVgRebapdiBtkqTopkb-cas01.example.org__4eb96061-ccc5-4012-9998-95d274440c00; yht_usertoken=S2j6Th%2FVvhJdu2s4%2FiLXu4sEdvnaIWBLFw4cozdKPtUqRbadaorqvR29TavO9qvIwg5fkcJCVMGmDCbv35%2BGAw%3D%3D; yht_access_token=btt6246f88c-3178-497b-b6b8-7066971d20c7__1556506607053; wb_at=LMjomsvqjftOfKdaZoch4sjpMnojajbZrmnkdwZlokdknqf; jwt_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaXdvcmsiLCJzZXNzaW9uIjoie1wiY2xpZW50SXBcIjpcIjEwLjMuNS41MVwiLFwiY3JlYXRlRGF0ZVwiOjE1NTY1MDY2MDYsXCJleHRcIjp7XCJvcmdTdGF0dXNcIjpcIm11bHRpXCIsXCJhZG1pblwiOnRydWUsXCJ5aHRfYWNjZXNzX3Rva2VuXCI6XCJidHQ2MjQ2Zjg4Yy0zMTc4LTQ5N2ItYjZiOC03MDY2OTcxZDIwYzdfXzE1NTY1MDY2MDcwNTNcIn0sXCJqd3RFeHBTZWNcIjo2MCxcImp3dFZhbGlkRGF0ZVwiOjAsXCJsYXN0RGF0ZVwiOjE1NTY1MDY2MDgsXCJsb2NhbGVcIjpcInpoX0NOXCIsXCJwcm9kdWN0TGluZVwiOlwidThjXCIsXCJzZXNzaW9uRXhwTWluXCI6MjE2MCxcInNlc3Npb25JZFwiOlwiTE1qb21zdnFqZnRPZktkYVpvY2g0c2pwTW5vamFqYlpybW5rZHdabG9rZGtucWZcIixcInNvdXJjZUlkXCI6XCJkaXdvcmtcIixcInRlbmFudElkXCI6XCJ6ZWR6bXNjbFwiLFwidXNlcklkXCI6XCI0ZWI5NjA2MS1jY2M1LTQwMTItOTk5OC05NWQyNzQ0NDBjMDBcIn0iLCJleHAiOjE1NTY1MDY2Njh9.w56Abl49TSLXVN5l3_-BAJd8PP1ycXsLB7APRUW-Uco; Hm_lpvt_diwork=1556506609; PHPSESSID=6nfmc87u70ijuq8dvj67488md7'
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
            'ref-mdd': path.resolve(__dirname, 'ucf-common/src/mtl-core/')
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