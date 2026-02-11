import { getUserInfoPro } from "@/httpRequest/user";
import { showMessage } from "@/utils";
import { defineStore } from "pinia";
import { ref } from "vue";


const useUserStore = defineStore('userStore', () => {
    const userInfo = ref<any>({})
    const isLogin = ref(false);

    function setUserInfo(value: any) {
        userInfo.value = value;
        isLogin.value = (Object.keys(value).length > 0)
    }

    function getUserInfo() {
        getUserInfoPro().then(res => {
            if (res.code === 0) {
                setUserInfo(res.data)
            } else {
                if (res._handle) return;
                showMessage({
                    type: 'error',
                    message: res.message
                })
            }
        })
    }
    return {
        userInfo,
        isLogin,
        setUserInfo,
        getUserInfo
    }
})
export default useUserStore