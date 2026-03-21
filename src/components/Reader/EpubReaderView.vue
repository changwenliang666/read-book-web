<template>
    <div class="epub-reader-view">
        <div id="area"></div>
        <div class="footer-area">
            <div class="pre-page-btn" @click="prePage">
                <iconpark-icon name="zuojiantou-copy"></iconpark-icon>
                上一页
            </div>
            <div class="next-page-btn" @click="nextPage">
                下一页
                <iconpark-icon name="youjiantou-copy"></iconpark-icon>
            </div>
        </div>
    </div>
</template>
<script setup>
import Epub from 'epubjs';
import { ref, onMounted } from 'vue';

const emits = defineEmits(['updateReadProgress']);
const props = defineProps({
    bookSourceUrl: String,
    progress: {
        type: Object,
        default: '',
    },
    widthArea: {
        type: Number,
        default: 600,
    },
    heightArea: {
        type: Number,
        default: 400,
    },
});

const rendition = ref(null);
const book = ref(null);
const currentCfi = ref(null);
const currentHref = ref(null);

function prePage() {
    rendition.value?.prev();
}

function nextPage() {
    rendition.value?.next();
}
// 监听阅读位置
function relocatedEpub() {
    if (!rendition.value) return;
    rendition.value.on('relocated', (location) => {
        if (!location || !location.start) return null;
        currentCfi.value = location.start.cfi;
        currentHref.value = location.start.href;
        emits('updateReadProgress', {
            cfi: currentCfi.value,
            href: currentHref.value,
        });
    });
}

// 渲染电子书
async function displayEpub() {
    let bookProgress = props.progress ? props.progress : null;
    if (bookProgress && bookProgress.cfi) {
        try {
            await rendition.value.display(props.progress.cfi);
        } catch (error) {
            // 按照章节恢复
            props.progress.href &&
                (await rendition.value.display(props.progress.href));
        }
    } else {
        await rendition.value.display();
    }
}

async function initEpubData() {
    try {
        book.value = Epub(props.bookSourceUrl);
        rendition.value = book.value.renderTo('area', {
            width: props.widthArea,
            height: props.heightArea,
            flow: 'paginated',
            allowScriptedContent: true,
            spread: 'auto',
        });

        displayEpub();
        relocatedEpub();
    } catch (error) {
        console.log('加载书籍失败:', error);
    }
}

function resizeReader(width, height) {
    if (rendition.value.manager) {
        rendition.value.manager.resize(width, height);
    }
}

onMounted(() => {
    initEpubData();
});

defineExpose({
    resizeReader,
});
</script>
<style lang="scss" scoped>
.epub-reader-view {
    width: max-content;
    height: fit-content;
    padding: 20px;
    border-radius: 20px;
    background-color: var(--background-page-primary);

    .loading-view {
        width: var(--view-width);
        height: var(--view-height);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .footer-area {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .pre-page-btn,
        .next-page-btn {
            display: flex;
            align-items: center;
            gap: 5px;
            padding: 0 12px;
            height: 30px;
            line-height: 30px;
            font-size: 14px;
            box-sizing: border-box;
            color: var(--text-sencondary);
            border: 1px solid var(--button-border-primary);
            border-radius: 20px;
            cursor: pointer;
            user-select: none;

            &:hover {
                background-color: var(--button-border-primary-hover);
            }
        }
    }
}
</style>
