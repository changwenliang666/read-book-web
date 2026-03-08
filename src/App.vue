<template>
    <router-view />
    <login-win v-if="showLoginWin"></login-win>
</template>
<script lang="ts" setup>
import { getTheme, changeTheme } from '@/utils/theme';
import { computed, onMounted } from 'vue';
import LoginWin from '@/components/Login/LoginWin.vue';
import { useLoginStore } from './store/loginStore';
import useUserStore from './store/userStore';

const userStore = useUserStore();

const loginStore = useLoginStore();

const showLoginWin = computed(() => {
    return loginStore.isShowLoginWin;
});

function initTheme() {
    // 初始化主题颜色
    changeTheme(getTheme());
}

function createSSE() {
    let content = '';
    const sse = new EventSource(
        `${import.meta.env.VITE_HTTP_BASE_URL}/ai/get-deepseek-service`,
    );
    sse.onmessage = (e) => {
        // e.data 是服务器发送的增量文本
        content += e.data; // 追加文本
        console.log('content---', content);
    };

    sse.onerror = (err) => {
        console.error('SSE 错误:', err);
        content += '\n[流式连接已断开]';
        sse.close(); // 关闭连接
    };
}

onMounted(() => {
    initTheme();
    userStore.getUserInfo();
    createSSE();
});
</script>
