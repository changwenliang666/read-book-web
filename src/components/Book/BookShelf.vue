<template>
    <div class="book-shelf">
        <el-scrollbar class="book-scroll-bar">
            <div class="book-list">
                <div class="book-item" v-for="(item, index) in bookList" :key="index">
                    {{ item.name }}
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';

const bookList = ref<any>([])

onMounted(() => {
    for (let i = 0; i < 20; i++) {
        bookList.value.push({
            name: `第${i + 1}本书`
        })
    }
})
</script>
<style lang="scss" scoped>
.book-shelf {
    width: 100%;
    height: 100%;
    padding: 20px 20px;
    box-sizing: border-box;

    .book-scroll-bar {
        height: 100%;
    }

    .book-list {
        padding: 0 12px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(128px, 1fr));
        gap: 16px;
        justify-content: space-between;
        box-sizing: border-box;
    }

    .book-item {
        height: 185px;
        background-color: goldenrod;
        border-radius: 10px;
    }
}
</style>