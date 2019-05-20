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
                    "cookie":'locale=zh_CN; Hm_lvt_diwork=1557047341,1557822327; SL_GWPT_Show_Hide_tmp=1; SL_wptGlobTipTmp=1; NTKF_T2D_CLIENTID=guest68B63E98-56B6-D9DE-42C9-C365F9D35577; nTalk_CACHE_DATA={uid:yu_1000_ISME9754_guest68B63E98-56B6-D9,tid:1558056401363664}; PHPSESSID=39v80as94n7rje8jqs02pmh0v6; YKJ_IS_DIWORK=1; YKJ_DIWORK_DATA=%7B%22data%22%3A%7B%22is_diwork%22%3A1%2C%22cur_qzid%22%3A%2217829%22%7D%2C%22key%22%3A%22381bccb4ebc01c9aedbce7f79e317644%22%7D; ck_safe_chaoke_csrf_token=fbe0d250ecaa7d87ab333088c5d87759; at=fbc68bda27d06a38b342594a9bac21c9; yonyou_uid=99ea7655-00a2-4bda-b23c-19ade37ea574; yonyou_uname=u8c_vip%40163.com; JSESSIONID=node0ejycashddlf3oah69alewqh939.node0; yht_username=ST-190-eXq1fl9hR9nUWVvRSgHc-cas01.example.org__99ea7655-00a2-4bda-b23c-19ade37ea574; yht_usertoken=KTFh%2FqT1SpFKSu7GORZbJdS4pXUQpfrjDpvWwA7VbYvmM4ETMUWq%2BL7zv%2BtSPd8VxAOkMawwqQJQEOIzPuhl4w%3D%3D; yht_access_token=bttdddbcd08-596c-4931-a035-bba0eae51d4b__1558316195400; wb_at=LMjnvmjdQpnekvgKvmNPOuKLfAbjbZrmnkdwZlokdknqf; Hm_lpvt_diwork=1558316196; jwt_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaXdvcmsiLCJzZXNzaW9uIjoie1wiY2xpZW50SXBcIjpcIjEwLjMuMTUuMjA2XCIsXCJjcmVhdGVEYXRlXCI6MTU1ODMxNjE5NCxcImV4dFwiOntcIm9yZ1N0YXR1c1wiOlwibXVsdGlcIixcImFkbWluXCI6dHJ1ZSxcImxvZ29cIjpcImh0dHBzOi8vZmlsZS1jZG4ueW9ueW91Y2xvdWQuY29tL3dvcmtiZW5jaC1pbWFnZS1wYXRoLWFwcGxpY2F0aW9uSWNvbi8yOWRhNjM3Ni1hMDA1LTRhZGItODIyYi1kODcyZWYwYzkyNTkvcGhvdG8uanBnXCIsXCJ5aHRfYWNjZXNzX3Rva2VuXCI6XCJidHRkZGRiY2QwOC01OTZjLTQ5MzEtYTAzNS1iYmEwZWFlNTFkNGJfXzE1NTgzMTYxOTU0MDBcIn0sXCJqd3RFeHBTZWNcIjo2MCxcImp3dFZhbGlkRGF0ZVwiOjE1NTgzMTc0NDAsXCJsYXN0RGF0ZVwiOjE1NTgzMTc0NDMsXCJsb2NhbGVcIjpcInpoX0NOXCIsXCJwcm9kdWN0TGluZVwiOlwidThjXCIsXCJzZXNzaW9uRXhwTWluXCI6MjE2MCxcInNlc3Npb25JZFwiOlwiTE1qbnZtamRRcG5la3ZnS3ZtTlBPdUtMZkFiamJacm1ua2R3Wmxva2RrbnFmXCIsXCJzb3VyY2VJZFwiOlwiZGl3b3JrXCIsXCJ0ZW5hbnRJZFwiOlwiYTY1eHRxd3pcIixcInVzZXJJZFwiOlwiOTllYTc2NTUtMDBhMi00YmRhLWIyM2MtMTlhZGUzN2VhNTc0XCJ9IiwiZXhwIjoxNTU4MzE3NTAzfQ.qFZwul3cjoekkEceoInyjA9b3tQL6HTygjm2BQ_k6_g'
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
            'ref-mdd1': path.resolve(__dirname, 'ucf-common/src/ref-mdd/')
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


