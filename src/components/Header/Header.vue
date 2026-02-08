<template>
    <div class="header-nav">
        <div class="left-info">
            <iconpark-icon name="book" size="40" color="var(--text-primary)"></iconpark-icon>
            <div class="text">极简阅读</div>
        </div>
        <div class="right-info">
            <div class="theme-info" @click.stop="handleChangeTheme">

                <iconpark-icon v-if="theme === 'light'" name="sun-one" size="24"
                    color="var(--text-primary)"></iconpark-icon>
                <iconpark-icon v-else name="moon" size="24" color="var(--text-primary)"></iconpark-icon>

                <!-- <div>{{ theme === 'light' ? '夜间模式' : '日间模式' }}</div> -->
            </div>
            <div class="user-info">
                <iconpark-icon name="user2" size="24" color="var(--text-primary)"
                    @click.stop="handleLogin"></iconpark-icon>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useConfigStore } from '@/store/configStore';
import { useLoginStore } from '@/store/loginStore';
import { changeTheme } from '@/utils/theme';
import { computed } from 'vue';

const loginStore = useLoginStore();
const configStore = useConfigStore();

const theme = computed(() => {
    return configStore.theme
})

function handleChangeTheme() {
    changeTheme(theme.value === 'light' ? 'dark' : 'light')
}

function handleLogin() {
    loginStore.setShowLogin(true);
}

</script>
<style lang="scss" scoped>
.header-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 72px;
    padding: 0 32px;
    border-bottom: 1px solid var(--border-primary);
    box-sizing: border-box;
    user-select: none;
    cursor: pointer;

    .left-info {
        height: 72px;
        display: flex;
        gap: 12px;
        align-items: center;

        .text {
            font-weight: 500;
            font-size: 20px;
            color: var(--text-primary);
        }
    }

    .right-info {
        height: 72px;
        display: flex;
        align-items: center;
        gap: 40px;
        cursor: pointer;

        iconpark-icon {
            cursor: pointer;
        }

        .user-info {
            cursor: pointer;
        }
    }
}
</style>