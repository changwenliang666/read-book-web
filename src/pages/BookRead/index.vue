<template>
    <div class="book-read-page">
        <Header></Header>
        <div class="book-read-main">
            <epub-read-view v-if="!isLoading" :bookSourceUrl="bookSourceUrl"></epub-read-view>
        </div>
    </div>
</template>
<script lang="ts" setup>
import Header from '@/components/Header/Header.vue';
import EpubReadView from '@/components/Reader/EpubReaderView.vue'
import { getBookDetail } from '@/httpRequest/book';
import { showMessage } from '@/utils';

import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const bookSourceUrl = ref('')
const isLoading = ref(false)

const route = useRoute()

function initPageData() {
    let id = route.query.id ? Number(route.query.id) : null
    if (id) {
        isLoading.value = true;
        getBookDetail(id).then(res => {
            if (res.code === 0) {
                bookSourceUrl.value = `${import.meta.env.VITE_HTTP_BASE_URL}/${res.data.remote_url}`
            } else {
                showMessage({
                    type: 'error',
                    message: "获取图书信息失败"
                })
            }
        }).finally(() => {
            isLoading.value = false;
        })
    }
}

onMounted(() => {
    initPageData()
})
</script>
<style lang="scss" scoped>
.book-read-page {
    width: 100%;
    height: 100vh;
    padding-top: 72px;
    box-sizing: border-box;

    .book-read-main {
        height: 100%;
        background-color: var(--background-page-primary);
        box-sizing: border-box;
    }
}
</style>