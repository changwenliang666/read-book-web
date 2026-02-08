import { defineStore } from "pinia";
import { ref } from "vue";

export const useConfigStore = defineStore('configStore', () => {
    const theme = ref('light');
    function setTheme(value: string) {
        theme.value = value;
    }
    return {
        theme,
        setTheme
    }
})