<template>
    <div class="login-win">
        <div class="main" ref="loginMain">
            <div class="title">
                登录
            </div>
            <div class="content">
                <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
                    class="demo-ruleForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input class="common-input" v-model="ruleForm.username" type="text" autocomplete="off"
                            clearable />
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input class="common-input" v-model="ruleForm.password" type="password" autocomplete="off"
                            clearable />
                    </el-form-item>
                </el-form>
            </div>
            <div class="common-button" @click="submitLoginForm(ruleFormRef)">
                <span v-if="!isLoading">登录</span>
                <iconpark-icon v-else class="loading-animation" name="loading-four"
                    color="var(--text-white)"></iconpark-icon>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
import { userLogin } from '@/httpRequest/login';
import { showMessage } from '@/utils';
import constants from '@/constants/index';
import { useLoginStore } from '@/store/loginStore';
import useUserStore from '@/store/userStore';

const ruleFormRef = ref<FormInstance>()
const isLoading = ref(false)
const loginStore = useLoginStore()
const userStore = useUserStore()

const loginMain = ref<any>(null)

const ruleForm = reactive({
    username: '',
    password: "",
})

const validateUsername = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入用户名'))
    } else if (value.length < 5 || value.length > 50) {
        callback(new Error("用户名的长度要在5~50之间!"))
    } else {
        callback()
    }
}
const validatePassword = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else if (value.length < 8 || value.length > 100) {
        callback(new Error("密码的长度要在8~100之间!"))
    } else {
        callback()
    }
}

const rules = reactive<FormRules<typeof ruleForm>>({
    username: [{ validator: validateUsername, trigger: 'blur' }],
    password: [{ validator: validatePassword, trigger: 'blur' }],
})


function submitLoginForm(formEl: FormInstance | undefined) {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            isLoading.value = true;
            userLogin(ruleForm).then(res => {
                if (res.code === 0) {
                    showMessage({
                        type: 'success',
                        message: res.message
                    })
                    const token = res.data.token;
                    localStorage.setItem(constants.READ_BOOK_WEB_TOKEN, token);
                    localStorage.setItem(constants.READ_BOOK_WEB_USER_ID, res.data.id);
                    loginStore.setShowLogin(false);
                    userStore.getUserInfo(res.data.id);
                } else {
                    showMessage({
                        type: 'error',
                        message: res.message
                    })
                }
            }).finally(() => {
                isLoading.value = false;
            })
        }
    })
}

function clickOutSise(e: any) {
    if (!loginMain.value.contains(e.target)) {
        loginStore.setShowLogin(false)
    }
}

onMounted(() => {
    document.addEventListener('click', clickOutSise)
})

onUnmounted(() => {
    document.removeEventListener('click', clickOutSise)
})

</script>
<style lang="scss" scoped>
.login-win {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 10;

    .main {
        display: flex;
        flex-direction: column;
        gap: 24px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 11;
        width: 400px;
        height: fit-content;
        padding: 24px;
        background-color: var(--background-page-primary);
        border-radius: 12px;
        box-sizing: border-box;

        .title {
            font-size: 20px;
            font-weight: 500;
            color: var(--text-primary);
        }

        .common-button {
            width: 298px;
            margin-left: 52px;
        }
    }
}
</style>