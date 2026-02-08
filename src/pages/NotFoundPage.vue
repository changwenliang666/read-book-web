<template>
    <div class="not-found-page">
        <div class="tip-area">
            <img src="@/assets/image/404.svg" alt="" class="tip-pic">
            <div class="tip-text">页面不见了~</div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.not-found-page {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .tip-area {
        display: flex;
        flex-direction: column;
        align-items: center;

        .tip-pic {
            width: 400px;
        }

        .tip-text {
            font-size: 20px;
            font-weight: 500;
        }
    }


}
</style>
