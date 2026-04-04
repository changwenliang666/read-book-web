<template>
    <div @click="handleClick">
        <slot></slot>
    </div>
    <input
        ref="inputBox"
        class="upload-input"
        type="file"
        :accept="acceptExt"
        @change="handleChange"
    />
</template>
<script lang="ts" setup>
import { showMessage } from '@/utils';
import { uploadFile } from '@/utils/upload';
import { computed, ref } from 'vue';

const props = defineProps({
    acceptFiles: {
        type: Array<string>,
        default: () => [],
    },
});

const emits = defineEmits(['uploadSuccess', 'uploadFail']);

const inputBox = ref<any>(null);

const acceptExt = computed(() => {
    return props.acceptFiles.join(',');
});

function handleChange(e: any) {
    const file = e.target.files[0];
    if (verifyFile(file)) {
        e.target.value = null;
        uploadFile(
            file,
            (key: string) => {
                emits('uploadSuccess', key);
            },
            (progress: number) => {
                console.log('上传进度', progress);
            },
            (errorMsg: string) => {
                emits('uploadFail', errorMsg);
            },
        );
    }
}

function handleClick() {
    inputBox.value.click();
}

function verifyFile(file: File): boolean {
    if (file.size / 1024 / 1024 > 50) {
        showMessage({
            type: 'warning',
            message: '文件大小不能超过50MB',
        });
        return false;
    }
    let fileNameArray = file.name.split('.');
    let fileName = fileNameArray[fileNameArray.length - 1] || '';
    if (!props.acceptFiles.includes(`.${fileName}`)) {
        showMessage({
            type: 'warning',
            message: `只支持${props.acceptFiles.join(',')}等格式`,
        });
        return false;
    }

    return true;
}

// const startUpload = (file: File) => {
//     let formData = new FormData();
//     formData.append('file', file);
//     return new Promise((resolve, reject) => {
//         createBook(formData)
//             .then((res) => {
//                 if (res.code === 0) {
//                     showMessage({
//                         type: 'success',
//                         message: res.message,
//                     });
//                     resolve(true);
//                 } else {
//                     reject(res.message);
//                 }
//             })
//             .catch((err) => {
//                 reject(err);
//             });
//     });
// };
</script>
<style lang="scss" scoped>
.upload-input {
    visibility: hidden;
    width: 0;
}
</style>
