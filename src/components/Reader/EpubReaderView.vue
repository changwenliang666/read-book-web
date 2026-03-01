<template>
    <div id="area"></div>
    <button type="primary" @click="prePage">
        上一页
    </button>
    <button type="primary" @click="nextPage">
        下一页
    </button>
</template>
<script setup>
import Epub from 'epubjs';
import { ref, onMounted } from 'vue'

const props = defineProps({
    bookSourceUrl: {
        type: String,
        default: ""
    },
    widthArea: {
        type: Number,
        default: 400
    },
    heightArea: {
        type: Number,
        default: 400
    }
})

const rendition = ref(null)
const bookEpub = ref(null)

function prePage() {
    if (rendition) {
        rendition.value.prev()
    }
}

function nextPage() {
    if (rendition) {
        rendition.value.next()
    }
}

function initEpubData() {
    var bookEpub = Epub(props.bookSourceUrl);
    rendition.value = bookEpub.renderTo("area", {
        width: props.widthArea,
        height: props.heightArea,
        flow: "paginated",
        allowScriptedContent: true
    })
    rendition.value.display()
}

onMounted(() => {
    // //获取元数据
    // book.loaded.metadata.then(metadata => {
    //     console.log("书名:", metadata.title);
    //     console.log("作者:", metadata.creator);
    //     console.log("书籍信息:", metadata)
    // });

    // //获取封面 Blob
    // book.coverUrl().then(url => {
    //     // url 是封面图片地址，可以直接在 img 标签显示
    //     const img = document.createElement("img");
    //     img.src = url;
    //     document.body.appendChild(img);
    // });
    initEpubData()
})
</script>