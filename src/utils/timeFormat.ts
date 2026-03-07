import dayjs from "dayjs";

export function formatCurTime() {
    return dayjs().format('YYYY-MM-DD HH:mm:ss')
}