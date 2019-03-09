
// 根据url动态解析生成组件
// url分成三块儿/meta/voucherlist/custdoctree；一个值为meta，第二个值为页面类型，列表还是表单，第三个值为模块名称
// 根据第二个参数进行页面的解析
// todo具体的有哪些页面（登录、注册、错误页面），以及通用页面里面的布局有哪些具体参数需要讨论定下
// todo 组件对应的Model是否需要，只是有ministore是否可以完成任务
// todo 样式命名是否需要统一，加个** 前缀之类的，感觉好像不需要
// todo json的数据怎么传过来
// todo 更改mtl-core如何动态刷新
// switch(cBillType){
//     case "voucher": 

//     case "ArchiveList":

//     case "grid"
// }
import React ,{ Component }from "react";
import Routes from './routes'

class ViewContent extends Component{

    render(){
        return <Routes/>
    }
}

export default ViewContent;
