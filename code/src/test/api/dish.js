import { ref } from "vue"

import { http } from "../../utils/http"


// page为当前页码，qty为每页数量

export const getDishInformationByPage = (page, qty) => {

    return [
        {
            "dish_name": "红烧兔头",
            "dish_id": "110101001",
            "muslim": false,
            "windows_id": "110101",
            "label": [],
            'date': {
                "morning": false,
                "noon": false,
                "night": false,
            },

        },
    ]
}

export const getWindows = () => {

    return [
        {
            "canteen_name": "齐园",
            "level":
                [
                    {
                        "level_num": 1,
                        "windows":
                            [
                                {
                                    "windows_num": 1,
                                    "windows_id": "110101",
                                },
                            ],
                    },
                ],
        },
        {
            "canteen_name": "3园",
            "level":
                [
                    {
                        "level_num": 1,
                        "windows":
                            [
                                {
                                    "windows_num": 1,
                                    "windows_id": "210101",
                                },{
                                    "windows_num": 2,
                                    "windows_id": "210102",
                                },
                            ],
                    },
                ],
        },
        {
            "canteen_name": "2园",
            "level":
                [
                    {
                        "level_num": 1,
                        "windows":
                            [
                                {
                                    "windows_num": 1,
                                    "windows_id": "310103",
                                },
                            ],
                    },
                ],
        },
    ]
}

export const getDishInformationBySearch = (sreachWord) => {
    console.log("搜索菜品：", sreachWord)
    return [
        {
            "canteen_name": "齐园",
            "canteen_id": "11",
            "level_num":' 1',
            "campus": {
                "campus_name": "中心校区",
                "campus_id": "1",
            },
            "information":
                [
                    {
                        "level_id": "5201",
                        "windows_num": '2',
                        "information":
                            [
                                {
                                    "windows_name": '麻辣香锅窗口',
                                    "windows_id": "520201",
                                },
                                {
                                    "windows_name": '螺蛳粉窗口',
                                    "windows_id": "520202",
                                },
                            ],
                    },
                ],
        },
    ]
}