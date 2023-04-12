// 新增餐厅传参
return{
  "canteen_name": "string",
  "campus_id": 0,
  "level_num": 0,
  "levels": [
    {
      "level": 0,
      "windows_num": 0,
      "windows_information": [
        {
          "windows_name": "string",
          "windows": 0
        }
      ]
    }
  ]
}


// 按页返回餐厅信息返回
return{
  "message": "success",
  "detail": "获取成功",
  "data": {
    "canteens_information": [
      {
        "canteen_name": "欣园",
        "canteen_id": "01",
        "level_num": 1,
        "campus": {
          "campus_name": "兴隆山校区",
          "campus_id": 0
        },
        "levels_information": [
          {
            "level_id": "0102",
            "windows_num": 1,
            "windows_information": [
              {
                "windows_name": "麻辣兔头",
                "windows_id": "010201"
              }
            ]
          }
        ]
      }
    ]
  }
}

// 修改餐厅信息传参
return{
  "canteen_id": "string",
  "canteen_name": "string",
  "level_num": 0,
  "levels": [
    {
      "level": 0,
      "windows_num": 0,
      "windows_information": [
        {
          "windows_name": "string",
          "windows": 0
        }
      ]
    }
  ]
}

// 获取校区与其id的对应序列返回
return{
  "message": "success",
  "detail": "获取成功",
  "data": {
    "campus": [
      {
        "campus_name": "兴隆山校区",
        "campus_id": 0
      }
    ]
  }
}

// 筛选餐厅返回格式同按页返回餐厅

// 增加新菜品传参
return{
  "name": "麻辣兔头",
  "morning": true,
  "noon": true,
  "night": true,
  "canteen_id": "01",
  "muslim": true,
  "photos": "string",
  "spare_photos": "string",
  "price": 0,
  "size": "small",
  "level": 2,
  "window": 1
    }

// 修改菜品信息传参
return{
  "dish_id": "string",
  "name": "string",
  "morning": true,
  "noon": true,
  "night": true,
  "muslim": true,
  "photos": "string",
  "spare_photos": "string",
  "price": 0,
  "size": "string"
}

// 按页返回菜品信息返回
return{
  "message": "success",
  "detail": "获取成功",
  "data": {
    "dishes_information": [
      {
        "dish_name": "麻辣兔头",
        "dish_id": "010201001",
        "muslim": true,
        "date": {
          "morning": true,
          "noon": true,
          "night": true
        },
        "position": {
          "campus": {
            "campus_id": 0,
            "campus_name": "兴隆山校区"
          },
          "level": {
            "level_id": "0102",
            "level": 2
          },
          "window": {
            "window_id": "010201",
            "window_name": "麻辣兔头"
          }
        }
      }
    ]
  }
}
//筛选菜品同按页返回菜品