import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoginStore = defineStore('loginStore', () => {
    const isShowLoginWin = ref(false)

    function setShowLogin(value: boolean) {
        isShowLoginWin.value = value;
    }
    return {
        isShowLoginWin,
        setShowLogin
    }
})