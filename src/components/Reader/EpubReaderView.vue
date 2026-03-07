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
import Epub from "epubjs"
import { ref, onMounted } from "vue"

const props = defineProps({
    bookSourceUrl: String,
    widthArea: {
        type: Number,
        default: 600
    },
    heightArea: {
        type: Number,
        default: 400
    },
})

const rendition = ref(null)
const book = ref(null)
const currentCfi = ref(null)

function prePage() {
    rendition.value?.prev()
}

function nextPage() {
    rendition.value?.next()
}
// 监听阅读位置
function relocatedEpub() {
    if (!rendition.value) return;
    rendition.value.on("relocated", (location) => {
        currentCfi.value = location.start.cfi
        console.log('阅读进度---', currentCfi.value)
    })
}

function initEpubData() {
    book.value = Epub(props.bookSourceUrl)
    rendition.value = book.value.renderTo("area", {
        width: props.widthArea,
        height: props.heightArea,
        flow: "paginated",
        allowScriptedContent: true,
        spread: "auto"
    })

    relocatedEpub()
    rendition.value.display()
}

function resizeReader(width, height) {
    if (rendition.value.manager) {
        rendition.value.manager.resize(width, height)
    }
}

onMounted(() => {
    initEpubData()
})

defineExpose({
    resizeReader
})
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