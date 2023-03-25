import { ref } from "vue"

import { http } from "../utils/http"


// page为当前页码，qty为每页数量

export const getCanteenInformationByPage = (page, qty) => {
    // return await http.get(
    //     './pageCanteen',
    //     {
    //         params: 
    //             {
    //                 skips: (page - 1) * aty,
    //                 limit: qty,
    //             },
    //     },
    // )

    return [
            {
                "canteen_name": "齐园",
                "canteen_id": "123123",
                "level_num": 5,
                "campus": {
                    "campus_name":"中心校区",
                    "campus_id": "123123",
                },
                "information":
                    [
                        {
                            "level_id": "5202",
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

export const getCampus =  () => {
    // return await http.get(
    //     './campus',
    // )

    return [
            {
                "campus_name": "中心校区",
                "campus_id": "123123",
            },
            {
                "campus_name": "兴隆山校区",
                "campus_id": "123123",
            },
            {
                "campus_name": "软件园校区",
                "campus_id": "123123",
            },
            {
                "campus_name": "洪家楼校区",
                "campus_id": "123123",
            },
            {
                "campus_name": "千佛山校区",
                "campus_id": "123123",
            }, 
            {
                "campus_name": "趵突泉校区",
                "campus_id": "123123",
            },
        ]
}