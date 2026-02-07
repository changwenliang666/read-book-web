<template>
  <router-view />
</template>
<script lang="ts" setup>
import {userLogin} from './httpRequest/login'
import { onMounted } from 'vue'
import constants from './constants/index'

onMounted(() => {
  console.log("haha")
  userLogin({
    username:'changwenliang678',
    password:'12345678'
  }).then(res => {
    console.log('res---',res)
    if(res.code === 0) {
      localStorage.setItem(constants.READ_BOOK_WEB_TOKEN,res.data.token)
    }else {

    }
    localStorage.set
  })
})
</script>

