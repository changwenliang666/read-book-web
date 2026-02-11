<template>
    <div class="home-page">
        <!-- header -->
        <Header></Header>
        <div class="home-main">
            <!-- 个人书架 -->
            <BookShelf></BookShelf>
        </div>
    </div>
</template>
<script setup lang="ts">
import BookShelf from '@/components/Book/BookShelf.vue';
import Header from '@/components/Header/Header.vue';

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