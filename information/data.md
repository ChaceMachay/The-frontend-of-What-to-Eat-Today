#  餐厅管理

1.  按页获取餐厅信息

    + 格式如下：

        ```javascript
        return {
            "canteen_information": 
            [
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
                                "level_id": "12315",
                                "windows_num": 2,
                                "information": 
                                [
                                    {
                                        "windows_name":'麻辣香锅窗口',
                                        "windows_id": "123123564",
                                    }, 
                                    {
                                        "windwos_name":'螺蛳粉窗口',
                                        "windows_id": "123123564",
                                    },
                                ],
                            },
                        ],
                },
            ],
        }
        ```

2.  获取校区与其id的对应序列

    +  格式如下：

        ```javascript
        return {
            "campus":
            [
                {
                    "campus_name": "齐园"，
                    "campus_id": "123456",
                },
            ],
        }
        ```

3.  按搜索和筛选获取餐厅信息

    +  未规划





#  菜品管理

1.  按页获取菜品信息   `图片待定`

    +  格式如下:

        ```javascript
        return {
            "dish_information": 
            [
                {
                    "dish_name" : "红烧兔头",
                    "dish_id" : "123123",
                    "muslim" : false,
                    "windows_id" : "124545",
                    "label" : [],
                    'date': 
                        [
                            {
                                "morning": false,
                                "noon": false,
                                "night": false,
                            },
                        ],
                    
                },
            ],
        }
        ```

2.  获取窗口及其id的序列

    +  格式如下：

        ```javascript
        return {
            "canteen_infor":
                [
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
                                        "windows_id": "123123",
                                    },
                                ],
                            },
                        ],
                    },
                ],
        }
        ```

3.  按搜索和筛选获取菜品信息

    +  未规划


#   登录相关

1. 登录





#  编辑信息

1.  2023年3月25日，邹鑫/张伟 第一次前后端碰头会，编辑由邹鑫完成。 



