import constants from "@/constants"
import { useConfigStore } from "@/store/configStore"

type Theme = 'dark' | 'light'

export function changeTheme(value: Theme) {
    const htmlEl = document.documentElement;
    const configStore = useConfigStore();
    if (value === 'light') {
        htmlEl.classList.remove('dark-mode');
        htmlEl.classList.add('light-mode');
    } else {
        htmlEl.classList.remove('light-mode');
        htmlEl.classList.add('dark-mode');
    }
    localStorage.setItem(constants.READ_BOOK_WEB_THEME, value);
    configStore.setTheme(value);

}

export function getTheme(): Theme {
    return (localStorage.getItem(constants.READ_BOOK_WEB_THEME) || 'light') as Theme
}
