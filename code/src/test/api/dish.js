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
            "picture": "/static/1681088941.490633.jpg",
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
                                    "windows_id": "220101",
                                }, {
                                    "windows_num": 2,
                                    "windows_id": "220102",
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
                                    "windows_id": "330103",
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
            "level_num": ' 1',
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

export const uploadPicture = async (a) => {
    let formData = new FormData()
    console.log(formData)
    formData.append('photo', a.file)
    // await axios({
    //     url: url,
    //     method: 'POST',
    //     transformRequest: [function (data, headers) {
    //         headers.Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJja3ciLCJleHAiOjE2ODA5NzAwMzB9.Wb4uWnmOlWJlnqcs-i3v7Qs9YIaUR5Ii-sThymaZx34'
    //         console.log(headers)
    //         delete headers['Content-Type']
    //         return data
    //     }],
    //     data: formData,
    // }
     
    return await http.post('/background/photos', formData)
    .then(res => {
        console.log(res.data.data.url)
        return res.data.data.url
    }).catch((err) => {
        console.log(err);
    })
}