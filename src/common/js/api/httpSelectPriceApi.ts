import { request } from '@/common/js/utils/requst'
import { usePriceArrayStore } from '@/stores/priceArray'
import { useSearchValueStore } from '@/stores/searchValue'
import priceDao from '../dao/priceDao'

export const httpSelectPriceApi = (options:any) => {
    console.log(options)
    return request({
        url:'/checkprice/' + options.name + '/' + options.zone,
        method: 'GET',
    })
}

export async function requstHttpCheckPriceData() {
    try{
        const checkPriceData:any = await httpSelectPriceApi({
            name:useSearchValueStore().getCheckPriceName(),
            zone:useSearchValueStore().getCheckPriceZone()
        })

        useSearchValueStore().setLastUploadTime(checkPriceData.lastUploadTime);

        let data:priceDao[] = [];

        checkPriceData.listings.forEach((item) => {
            data.push(new priceDao(item.retainerName, item.pricePerUnit, item.quantity, item.lastReviewTime, item.worldName, item.hq))
        });

        usePriceArrayStore().setData(data)

    } catch(e) {
        console.log("请求失败 error：", e);
    }
}