import { request } from "@/common/js/utils/requst"

export const httpGatherArray = (options:any)=>{
    return request({
        url:'/gather-data',
        method:'POST',
        data:options,
    })
}