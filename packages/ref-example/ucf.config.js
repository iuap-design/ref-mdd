require('@babel/polyfill');
/**
 * UCF配置文件 更多说明文档请看 https://github.com/iuap-design/ucf-web/blob/master/packages/ucf-scripts/README.md
 */
const path = require('path');
module.exports = (env, argv) => {
    console.log('env---',env);
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
                    // "Referer": "http://ucfbasedoc-fe.test.app.yyuap.com",
                    "Referer": "http://u8cupc-test.yyuap.com",
                    "cookie":'locale=zh_CN; Hm_lvt_diwork=1559024986; at=498fecae2527ecd16528e6fd3b9a940c; yonyou_uid=99ea7655-00a2-4bda-b23c-19ade37ea574; yonyou_uname=u8c_vip%40163.com; JSESSIONID=node01qsmitigw35lm12y3yun0nt59h386.node0; yht_username=ST-1298-Xy0wGNbfESfzaYOxRUkj-cas01.example.org__99ea7655-00a2-4bda-b23c-19ade37ea574; yht_usertoken=74ovuFQhiy4GHM7wHvayhlPgaqC8KDKgm0lUKK%2BciyAZynOokhPobIhiiysTxSgU8pjwjLPLKsK3Kadtam%2BQPA%3D%3D; yht_access_token=btt44f45048-a1de-4dad-a9c2-ada5fec53ce0__1559025009881; wb_at=LMjnovujQxmv9Gae7LeyZRHwKNjijbZrmnkdwZlokdknqf; jwt_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaXdvcmsiLCJzZXNzaW9uIjoie1wiY2xpZW50SXBcIjpcIjEwLjMuMTUuMjA2XCIsXCJjcmVhdGVEYXRlXCI6MTU1OTAyNTAwOSxcImV4dFwiOntcIm9yZ1N0YXR1c1wiOlwibXVsdGlcIixcImFkbWluXCI6dHJ1ZSxcImxvZ29cIjpcImh0dHBzOi8vZmlsZS1jZG4ueW9ueW91Y2xvdWQuY29tL3dvcmtiZW5jaC1pbWFnZS1wYXRoLWFwcGxpY2F0aW9uSWNvbi8yOWRhNjM3Ni1hMDA1LTRhZGItODIyYi1kODcyZWYwYzkyNTkvcGhvdG8uanBnXCIsXCJ5aHRfYWNjZXNzX3Rva2VuXCI6XCJidHQ0NGY0NTA0OC1hMWRlLTRkYWQtYTljMi1hZGE1ZmVjNTNjZTBfXzE1NTkwMjUwMDk4ODFcIn0sXCJqd3RFeHBTZWNcIjo2MCxcImp3dFZhbGlkRGF0ZVwiOjAsXCJsYXN0RGF0ZVwiOjE1NTkwMjUwMTAsXCJsb2NhbGVcIjpcInpoX0NOXCIsXCJwcm9kdWN0TGluZVwiOlwidThjXCIsXCJzZXNzaW9uRXhwTWluXCI6MjE2MCxcInNlc3Npb25JZFwiOlwiTE1qbm92dWpReG12OUdhZTdMZXlaUkh3S05qaWpiWnJtbmtkd1psb2tka25xZlwiLFwic291cmNlSWRcIjpcImRpd29ya1wiLFwidGVuYW50SWRcIjpcImE2NXh0cXd6XCIsXCJ1c2VySWRcIjpcIjk5ZWE3NjU1LTAwYTItNGJkYS1iMjNjLTE5YWRlMzdlYTU3NFwifSIsImV4cCI6MTU1OTAyNTA3MH0.DYI72UcHDxAJAhbcBn39BpRiLKhvkj4TiiPfqxl6omE; Hm_lpvt_diwork=1559025011; PHPSESSID=hrcvjtiq5jvonv6jtbaglikbj2'
                },
                //要代理访问的对方路由
                router: [
                    '/uniform'
                ],
                url: 'http://u8cupc-test.yyuap.com'
                
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


