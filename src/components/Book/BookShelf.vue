<template>
    <div class="book-shelf">
        <div class="shelf-title">
            {{ name }}
        </div>
        <el-scrollbar class="book-scroll-bar">
            <div class="book-list">
                <div
                    class="book-item"
                    v-for="(item, index) in bookList"
                    :key="index"
                    @click="handleClick(item)"
                >
                    <img :src="getBookCover(item.cover)" class="book-cover" />
                    <div class="book-name" :title="item.name">
                        {{ item.name }}
                    </div>
                </div>
                <div class="book-upload">
                    <upload-file
                        :accept-files="['.epub']"
                        @upload-success="uploadSuccess"
                        @upload-fail="uploadFail"
                    >
                        <el-tooltip
                            class="box-item"
                            effect="dark"
                            content="添加图书"
                            placement="top"
                        >
                            <div class="add-book-icon">
                                <iconpark-icon
                                    name="add-one"
                                    size="24"
                                ></iconpark-icon>
                            </div>
                        </el-tooltip>
                    </upload-file>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>
<script setup lang="ts">
import UploadFile from '@/components/Upload/UploadFile.vue';
import { createBook, getCreateBookProgess } from '@/httpRequest/book';
import { showMessage } from '@/utils';
import { ref } from 'vue';

const props = defineProps({
    name: {
        type: String,
        default: '书架',
    },
    bookList: {
        type: Array<any>,
        default: () => [],
    },
});
const emits = defineEmits(['select', 'addBookSuccess']);
const queryTimer = ref(null);

function createBookSuccess() {
    emits('addBookSuccess');
}

function handleClick(bookInfo: any) {
    emits('select', bookInfo);
}

function getBookCover(url: string) {
    return `${import.meta.env.VITE_FILE_BASE_URL}${url}`;
}

function queryCreateBookProgress(taskId: string) {
    clearTimeout(queryTimer.value);
    queryTimer.value = setTimeout(() => {
        getCreateBookProgess(taskId).then((res) => {
            if (res.code === 0) {
                if (
                    res.data.status !== 'success' &&
                    res.data.status !== 'fail'
                ) {
                    return queryCreateBookProgress(taskId);
                } else if (res.data.status === 'success') {
                    createBookSuccess();
                } else if (res.data.status === 'fail') {
                    showMessage({
                        type: 'error',
                        message: '创建图书失败',
                    });
                }
            }
        });
    }, 2000);
}

function uploadSuccess(key: string) {
    createBook(key).then((res) => {
        if (res.code === 0) {
            queryCreateBookProgress(res.data.task_id);
        } else {
            showMessage({
                type: 'error',
                message: '创建图书失败',
            });
        }
    });
}

function uploadFail(errMsg: string) {
    showMessage({
        type: 'error',
        message: errMsg,
    });
}
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
        font-size: 20px;
        color: var(--text-primary);
        font-weight: 500;
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
        height: fit-content;
        display: flex;
        flex-direction: column;
        gap: 8px;
        cursor: pointer;

        .book-cover {
            width: 100%;
            height: 100%;
            object-fit: fill;
            border-radius: 10px;
        }

        .book-name {
            width: 100%;
            color: var(--text-primary);
            font-size: 14px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            font-weight: 500;
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
