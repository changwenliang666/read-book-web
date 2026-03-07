<template>
    <div class="book-read-page">
        <Header></Header>
        <div class="book-read-main">
            <epub-read-view
                ref="epubReadView"
                v-if="!isLoading"
                :bookSourceUrl="bookSourceUrl"
                :widthArea="widthArea"
                :heightArea="heightArea"
                :progress="bookProgress"
                @updateReadProgress="saveReadProgressToLocal"
            >
            </epub-read-view>
        </div>
    </div>
</template>
<script lang="ts" setup>
import Header from '@/components/Header/Header.vue';
import EpubReadView from '@/components/Reader/EpubReaderView.vue';
import { getBookDetail } from '@/httpRequest/book';
import { showMessage } from '@/utils';

import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { updateBookProgress } from '@/httpRequest/book';
import { formatCurTime } from '@/utils/timeFormat';

const bookSourceUrl = ref('');
const isLoading = ref(false);
const widthArea = ref(0);
const heightArea = ref(0);
const epubReadView = ref<any>(null);

const route = useRoute();
const bookId = ref<any>(null);
const bookProgress = ref<string>('');
const uploadProgressTimer = ref<any>(null);

function initPageData() {
    let id = route.query.id ? Number(route.query.id) : null;
    if (id) {
        bookId.value = id;
        isLoading.value = true;
        getBookDetail(id)
            .then((res) => {
                if (res.code === 0) {
                    bookSourceUrl.value = `${import.meta.env.VITE_HTTP_BASE_URL}/${res.data.remote_url}`;
                    if (res.data.progress) {
                        bookProgress.value = res.data.progress;
                    }
                } else {
                    showMessage({
                        type: 'error',
                        message: '获取图书信息失败',
                    });
                }
            })
            .finally(() => {
                isLoading.value = false;
            });
    }
}

function updateEpubReadViewSize() {
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    widthArea.value = width - 200;
    heightArea.value = height - 302;
    if (epubReadView.value) {
        epubReadView.value?.resizeReader(widthArea.value, heightArea.value);
    }
}

function listenWindowSize() {
    window.addEventListener('resize', updateEpubReadViewSize);
}

// 保存书籍阅读进度到本地
function saveReadProgressToLocal(progress: string) {
    localStorage.setItem(`book_progress_id_${bookId.value}`, progress);
    uploadProgressToService();
}

function uploadBookProgress(
    bookId: number,
    progress: string,
    updateTime: string,
) {
    updateBookProgress({ bookId, progress, updateTime }).then((res) => {
        if (res.code === 0) {
            console.log('更新进度成功');
            bookProgress.value = res.data;
        }
    });
}

// 开启定时器，10s同步一次进度
function uploadProgressToService() {
    clearTimeout(uploadProgressTimer.value);
    uploadProgressTimer.value = setTimeout(() => {
        let localProgress =
            localStorage.getItem(`book_progress_id_${bookId.value}`) || '';
        if (localProgress != bookProgress.value) {
            console.log('localProgress', localProgress, bookProgress.value);
            uploadBookProgress(bookId.value, localProgress, formatCurTime());
        }
    }, 5 * 1000);
}
// 关闭页面，立即保存
function listenWindowClose() {
    window.addEventListener('beforeunload', () => {
        alert('确定要离开页面吗');
        let localProgress =
            localStorage.getItem(`book_progress_id_${bookId.value}`) || '';
        navigator.sendBeacon(
            `${import.meta.env.VITE_HTTP_BASE_URL}/book/update-book-progress`,
            JSON.stringify({
                bookId: bookId.value,
                progress: localProgress,
                updateTime: formatCurTime(),
            }),
        );
    });
}

onMounted(() => {
    initPageData();
    updateEpubReadViewSize();
    listenWindowSize();
    listenWindowClose();
});
</script>
<style lang="scss" scoped>
.book-read-page {
    width: 100%;
    height: 100vh;
    padding-top: 72px;
    box-sizing: border-box;

    .book-read-main {
        display: flex;
        justify-content: center;
        padding: 80px 32px;
        height: 100%;
        background-color: var(--background-page-sencondary);
        box-sizing: border-box;
    }
}
</style>
