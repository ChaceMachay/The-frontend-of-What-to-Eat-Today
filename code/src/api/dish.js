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
    return await http.get(
        './searchCanteen',
        {
            params: 
                {
                    search: sreachWord,
                },
        },
    )
    console.log("搜索菜品：",sreachWord)
}