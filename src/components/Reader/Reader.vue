<template>
    <h1>我是首页</h1>
    <div id="area"></div>
    <!-- <n-button type="primary" @click="prePage">
        上一页
    </n-button>
    <n-button type="primary" @click="nextPage">
        下一页
    </n-button> -->
</template>
<script setup>
import Epub from 'epubjs';
import { ref, onMounted } from 'vue'
const rendition = ref(null)


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

onMounted(() => {
    var book = Epub("http://182.92.1.221/books/epub/Autobiography of Benjamin Franklin.epub");
    rendition.value = book.renderTo("area", {
        width: 600,
        height: 400,
        flow: "paginated",
        allowScriptedContent: true
    });
    var displayed = rendition.value.display();
    // 获取元数据
    book.loaded.metadata.then(metadata => {
        console.log("书名:", metadata.title);
        console.log("作者:", metadata.creator);
        console.log("书籍信息:", metadata)
    });

    // 获取封面 Blob
    book.coverUrl().then(url => {
        // url 是封面图片地址，可以直接在 img 标签显示
        const img = document.createElement("img");
        img.src = url;
        document.body.appendChild(img);
    });
})
</script>