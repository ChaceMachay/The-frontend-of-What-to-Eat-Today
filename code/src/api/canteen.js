import { ref } from "vue"

import { http } from "../utils/http"


// page为当前页码，qty为每页数量

export const getCanteenInformationByPage = async (page, qty) => {
    await http.get(
        './pageCanteen',
        {
            params: 
                {
                    skips: (page - 1) * aty,
                    limit: qty,
                },
        },
    )
    .then((i)=>{
        let data = i.data.canteens_information
    })
}    
export const getCampus =  () => {
    // return await http.get(
    //     './campus',
    // )

    return [
            {
                "campus_name": "中心校区",
                "campus_id": "1",
            },
            {
                "campus_name": "兴隆山校区",
                "campus_id": "2",
            },
            {
                "campus_name": "软件园校区",
                "campus_id": "3",
            },
            {
                "campus_name": "洪家楼校区",
                "campus_id": "4",
            },
            {
                "campus_name": "千佛山校区",
                "campus_id": "5",
            }, 
            {
                "campus_name": "趵突泉校区",
                "campus_id": "6",
            },
        ]
}

export const getCanteenInformationBySearch =  (sreachWord) => {
    // return await http.get(
    //     './searchCanteen',
    //     {
    //         params: 
    //             {
    //                 search: sreachWord,
    //             },
    //     },
    // )
    console.log("搜索餐厅：",sreachWord)
    return [
            {
                "canteen_name": "齐园",
                "canteen_id": "11",
                "level_num": 1,
                "campus": {
                    "campus_name":"中心校区",
                    "campus_id": "1",
                },
                "information":
                    [
                        {
                            "level_id": "5201",
                            "windows_num": 2,
                            "information": 
                            [
                                {
                                    "windows_name":'麻辣香锅窗口',
                                    "windows_id": "520201",
                                }, 
                                {
                                    "windows_name":'螺蛳粉窗口',
                                    "windows_id": "520202",
                                },
                            ],
                        },
                    ],
            },
        ]
}

export const addCanteen = async (data) => {
    return await http.post('/background/canteens', data)
    .then((i)=> {
        return i 
    })
    .catch((err)=>{
        return err
    })
}