export const mtlUrl = {
    tableMetaUrl:'/uniform/pub/ref/getRefMeta',
    tableDataUrl: "/uniform/bill/ref/getRefData",
    treeMetaUrl: '/uniform/pub/ref/getRefMeta',
    treeDataUrl: '/uniform/bill/ref/getRefData'
}
export const serviceCode = 'GZTBDM061';
export const refCode = 'bd_countryref';
export const tablecItemName='country_name';

export const mtlInfo = {
    table:{
        // metaUrl:'https://u8cupc-daily.yyuap.com/uniform/pub/ref/getRefMeta?token=btt3b576345-a494-4926-8e44-970b5c809d13__1559804534444',
        // dataUrl:'https://u8cupc-daily.yyuap.com/uniform/bill/ref/getRefData?terminalType=1&token=btt3b576345-a494-4926-8e44-970b5c809d13__1559804534444',
        // serviceCode:'aa_merchant',
        // refCode:'ucfbasedoc.bd_currencytenantref',  
        refCode:'ustock.aa_orgpur',
        host:'https://u8cupc-daily.yyuap.com',
        token:'bttSWFicUMxL0xXVjhjVUd2TkFuUEZVcjhQaHd3aitUd1NKREorTlI3cThOenYxMTRpTWJpTkkyZXVuQ0dmUFkvbUV6WG04QzUwQ2JhVk1MTFFxREt2dW5FckJlQ1ViRFZSTFJyNGFLMWpxbTA9__1562740378781',  
    },
    tree:{
        // metaUrl:'/uniform/pub/ref/getRefMeta',
        // serviceCode:'enterprise_bank_account_u8c',
        // refCode:'bd_financeorgtreeref',
        // itemName:'orgid_name'  

        // refCode:'ucf-org-center.bd_adminorgtreeref',  
        // host:'https://u8cupc-daily.yyuap.com',
        // token:'btt3176d04c-7883-484b-b647-a283a7e86dd4__1562210394952',
        refCode:'ucf-org-center.org_unit_tree_ref',  
        host:'https://u8cupc-daily.yyuap.com',
        token:'bttSWFicUMxL0xXVjhjVUd2TkFuUEZVcjhQaHd3aitUd1NKREorTlI3cThOenYxMTRpTWJpTkkyZXVuQ0dmUFkvbUV6WG04QzUwQ2JhVk1MTFFxREt2dW5FckJlQ1ViRFZSTFJyNGFLMWpxbTA9__1562740378781',  
    },
    treeTable:{
        // metaUrl:'http://u8cupc-test.yyuap.com/uniform/bill/ref/getRefMeta?terminalType=1&token=btt44f45048-a1de-4dad-a9c2-ada5fec53ce0__1559025009881&refimestamp=1559026546502',
        // dataUrl:'http://u8cupc-test.yyuap.com/uniform/bill/ref/getRefData?token=bttef236866-596b-4881-a2e9-d47639b0024b__1558279973682',
        // host:"http://u8cupc-test.yyuap.com",
        // token:"btt44f45048-a1de-4dad-a9c2-ada5fec53ce0__1559025009881",
        serviceCode:'pc_product',
        refCode:'pc_taxrevenueref'
    }
}