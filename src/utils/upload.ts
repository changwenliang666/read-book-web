import { getUploadFileUrl } from '@/httpRequest/upload';

export function uploadFile(
    file: File,
    successCallback: Function,
    progressCallback: Function,
    errorCallback: Function,
) {
    getUploadFileUrl(file.name).then((res) => {
        if (res.code == 0) {
            const uploadUrl = res.data.upload_url;
            const key = res.data.key;
            const xhr = new XMLHttpRequest();
            xhr.open('PUT', uploadUrl, true);
            xhr.upload.onprogress = (e) => {
                if (e.lengthComputable) {
                    let progress = 0;
                    progress = Math.round((e.loaded / e.total) * 100);
                    if (progressCallback) progressCallback(progress);
                }
            };

            xhr.onload = () => {
                if (successCallback) successCallback(key);
            };

            xhr.onerror = () => {
                if (errorCallback) errorCallback();
            };
            xhr.send(file);
        }
    });
}
