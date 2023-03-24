import { ref } from "vue"

import { http } from "../utils/http"


export const getCanteenInformationByPage = async (page, qty) => {
    // return await http.get(
    //     './pageCanteen',
    //     {
    //         params: 
    //             {
    //                 skips: (page - 1) * aty,
    //                 limit: qty,
    //             }
    //     }
    // )

    return {
        "canteenInformation": 
        [
            {
                "canteenName": "齐园",
                "campus": "中心校区",
                "level_num": 5,
                "information":
                    [
                        {
                            "windowsNumber": 2,
                            "windowsName": ['麻辣香锅窗口', '螺蛳粉窗口',],
                        },
                    ],
            },
        ]
    }
}