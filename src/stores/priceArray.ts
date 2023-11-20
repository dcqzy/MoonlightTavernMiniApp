import type priceDao from '@/common/js/dao/priceDao';
import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

export const usePriceArrayStore = defineStore('priceArray', () => {

        const _data: Ref<priceDao[]> = ref([]);

        function getData():priceDao[] {
            return _data.value
        }

        function setData(data:priceDao[]) {
            _data.value = data;
        }

    return {
        getData,
        setData,
    }
})