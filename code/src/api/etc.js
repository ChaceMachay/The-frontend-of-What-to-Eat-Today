export function convertToChinaNum(num) {
    var arr1 = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    var arr2 = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千','万', '十', '百', '千','亿'];
    var arr3 = ['第', '负']//可继续追加更高位转换值
    var english = num.toString().split("")
    var result = "";
    var sign = ''
    if (english[0] === '-'){
        english = english.slice(1)
        sign = arr3[1]
    }
    else {
        sign = arr3[0]
    }

    console.log(sign , english)
    for (var i = 0; i < english.length; i++) {
        var des_i = english.length - 1 - i;//倒序排列设值
        result = arr2[i] + result;
        var arr1_index = english[des_i];
        result = arr1[arr1_index] + result;
    }
    //将【零千、零百】换成【零】 【十零】换成【十】
    result = result.replace(/零(千|百|十)/g, '零').replace(/十零/g, '十');
    //合并中间多个零为一个零
    result = result.replace(/零+/g, '零');
    //将【零亿】换成【亿】【零万】换成【万】
    result = result.replace(/零亿/g, '亿').replace(/零万/g, '万');
    //将【亿万】换成【亿】
    result = result.replace(/亿万/g, '亿');
    //移除末尾的零
    result = result.replace(/零+$/, '')
    //将【零一十】换成【零十】
    //result = result.replace(/零一十/g, '零十');//貌似正规读法是零一十
    //将【一十】换成【十】
    result = result.replace(/^一十/g, '十');
    if (result.length !== 1 && result[0] === "零")
        {
            result = result.substring(1)
        }
    return sign + result
}

export const showDishDateChinese = (obj) => {
    let res = ''
    console.log(obj)
    if(obj.morning){
        res += '早餐'
        if (obj.noon){
            res += '、午餐'
        }
        if (obj.night){
            res += '、晚餐'
        }
        return res
    }else if(obj.noon) {
        res += '午餐'
        if (obj.night){
            res += '、晚餐'
        }
        return res
    }else if (obj.night){
        res += '晚餐'
        return res
    }else {
        res += '尚未开放供应'
        return res
    }

}
