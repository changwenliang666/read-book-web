import { ElMessage } from 'element-plus'

export function showMessage(params: any) {
    ElMessage(params)
}

export function debounce(fn: Function, delay: number = 200) {
    let timer: any = null
    return function (...args: any) {
        const ctx: any = this;
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(ctx, args)
        }, delay)
    }
}