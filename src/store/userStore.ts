import constants from "@/constants";
import { getUserInfoPro } from "@/httpRequest/user";
import { showMessage } from "@/utils";
import { defineStore } from "pinia";
import { ref } from "vue";


const useUserStore = defineStore('userStore', () => {
    const userInfo = ref<any>({})

    function setUserInfo(value: any) {
        userInfo.value = value;
    }

    function getUserInfo(id: number) {
        const userId = id || localStorage.getItem(constants.READ_BOOK_WEB_USER_ID)
        if (userId) {
            getUserInfoPro(Number(userId)).then(res => {
                if (res.code === 0) {
                    setUserInfo(res.data)
                } else {
                    showMessage({
                        type: 'error',
                        message: res.message
                    })
                }
            })
        }

    }
    return {
        userInfo,
        setUserInfo,
        getUserInfo
    }
})
export default useUserStore