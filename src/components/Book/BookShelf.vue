<template>
    <div class="book-shelf">
        <div class="shelf-title">
            {{ shelfTitlt }}
        </div>
        <el-scrollbar class="book-scroll-bar">
            <div class="book-list">
                <div class="book-item" v-for="(item, index) in bookList" :key="index">
                    <!-- {{ item.name }} -->
                    <img :src="`http://localhost:3000/${item.cover}`" class="book-cover" />
                </div>
                <div class="book-upload">
                    <upload-book :accept-files="['.epub']" @create-success="createBookSuccess">
                        <div class="add-book-icon">
                            <iconpark-icon name="add-one" size="24"></iconpark-icon>
                        </div>
                    </upload-book>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>
<script setup lang="ts">
import { getBookList } from '@/httpRequest/book';
import { onMounted, ref } from 'vue';
import UploadBook from '../Upload/UploadBook.vue';


const bookList = ref<any>([])
const isLoading = ref<boolean>(false)
const props = defineProps({
    shelfTitlt: {
        type: String,
        default: "书架"
    }
})

function initBookData() {
    isLoading.value = true;
    getBookList().then(res => {
        if (res.code === 0) {
            bookList.value = res.data;
        }
    }).finally(() => {
        isLoading.value = false;
    })
}

function createBookSuccess() {
    initBookData()
}


onMounted(() => {
    initBookData();
})
</script>
<style lang="scss" scoped>
.book-shelf {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    height: 100%;
    padding: 20px 20px;
    box-sizing: border-box;

    .shelf-title {
        padding: 0 12px;
        font-size: 24px;
        color: var(--text-primary);
    }

    .book-scroll-bar {
        height: 100%;
    }

    .book-list {
        padding: 0 12px;
        display: grid;
        grid-template-columns: repeat(auto-fit, 128px);
        gap: 16px;
        // justify-content: space-between;
        box-sizing: border-box;
    }

    .book-item {
        height: 185px;
        background-color: goldenrod;
        border-radius: 10px;

        .book-cover {
            width: 100%;
            height: 100%;
            object-fit: fill;
        }
    }

    .book-upload {
        height: 185px;
        background-color: gainsboro;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;

        .add-book-icon {
            &:hover {
                cursor: pointer;
            }
        }
    }
}
</style>