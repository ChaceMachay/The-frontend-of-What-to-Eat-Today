import { ref } from "vue"

import { http } from "../utils/http"


// page为当前页码，qty为每页数量

export const getDishInformationByPage = async (page, qty) => {
    return await http.get(
        './pageDish',
        {
            params: 
                {
                    skips: (page - 1) * aty,
                    limit: qty,
                },
        },
    )
}

export const getCampus = async () => {
    return await http.get(
        './campus',
    )
}

export const getDishInformationBySearch = async (sreachWord) => {
    console.log("搜索菜品：",sreachWord)
    return await http.get(
        './searchCanteen',
        {
            params: 
                {
                    search: sreachWord,
                },
        },
    )
}

export const uploadPicture = async (a) => {
    let formData = new FormData()
    console.log(formData)
    formData.append('photo', a.file)
    return await http.post('/background/photos', formData)
    .then(res => {
        console.log(res.data.data.url)
        return res.data.data.url
    }).catch((err) => {
        console.log(err);
    })
}

export const addDish = async () => {
    
}