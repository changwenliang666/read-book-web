<template>
  <router-view />
  <login-win v-if="showLoginWin"></login-win>
</template>
<script lang="ts" setup>
import { getTheme, changeTheme } from '@/utils/theme'
import { computed, onMounted } from 'vue';
import LoginWin from '@/components/Login/LoginWin.vue';
import { useLoginStore } from './store/loginStore';
import useUserStore from './store/userStore';

const userStore = useUserStore()

const loginStore = useLoginStore()

const showLoginWin = computed(() => {
  return loginStore.isShowLoginWin
})

function initTheme() { // 初始化主题颜色
  changeTheme(getTheme());
}

onMounted(() => {
  initTheme();
  userStore.getUserInfo();

})
</script>
