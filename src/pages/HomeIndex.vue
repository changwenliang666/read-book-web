<template>
    <div class="home-page">
        <!-- header -->
        <Header></Header>
        <div class="home-main">
            <!-- 个人书架 -->
            <BookShelf :name="shelfTitle" :bookList="bookList" @addBookSuccess="initBookData"
                @select="handleSelectBook"></BookShelf>
        </div>
    </div>
</template>
<script setup lang="ts">
import BookShelf from '@/components/Book/BookShelf.vue';
import Header from '@/components/Header/Header.vue';
import { getBookList } from '@/httpRequest/book';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const shelfTitle = ref("个人书架")
const pageIndex = ref(1)
const pageSize = ref(20)
const totalCount = ref(0)
const bookList = ref([])

function initBookData() {
    getBookList({
        pageIndex,
        pageSize
    }).then(res => {
        if (res.code === 0) {
            bookList.value = res.data.bookList;
            totalCount.value = res.data.totalCount;
        }
    }).finally(() => {

    })
}

function handleSelectBook(bookInfo: any) {
    router.push(`/read-book?id=${bookInfo.id}`)
}


onMounted(() => {
    initBookData()
})


</script>
<style lang="scss" scoped>
.home-page {
    width: 100%;
    height: 100vh;
    padding-top: 72px;
    box-sizing: border-box;

    .home-main {
        height: 100%;
        background-color: var(--background-page-primary);
        box-sizing: border-box;
    }
}
</style>