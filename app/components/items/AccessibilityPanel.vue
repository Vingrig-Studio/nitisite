<script setup lang="ts">
import { useAccessibility } from '~/composable/useAccessibility'

const { fontSize, theme, imagesVisible, setFontSize, setTheme, toggleImages, loadSettings } = useAccessibility()
const isOpen = ref(false)

const togglePanel = () => {
    isOpen.value = !isOpen.value
}

onMounted(() => {
    loadSettings()
})
</script>

<template>
    <div class="accessibility-panel" :class="{ 'accessibility-panel--open': isOpen }">
        <button @click="togglePanel" class="button-change-theme">
            <svg class="button-change-theme__svg" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.8756 10.4071C12.9556 10.4071 12.0733 10.7726 11.4227 11.4231C10.7721 12.0737 10.4067 12.956 10.4067 13.876C10.4067 14.796 10.7721 15.6784 11.4227 16.3289C12.0733 16.9795 12.9556 17.345 13.8756 17.345C14.7956 17.345 15.678 16.9795 16.3285 16.3289C16.9791 15.6784 17.3446 14.796 17.3446 13.876C17.3446 12.956 16.9791 12.0737 16.3285 11.4231C15.678 10.7726 14.7956 10.4071 13.8756 10.4071ZM13.8756 19.6576C12.3422 19.6576 10.8717 19.0485 9.78742 17.9642C8.70316 16.88 8.09403 15.4094 8.09403 13.876C8.09403 12.3427 8.70316 10.8721 9.78742 9.78783C10.8717 8.70357 12.3422 8.09444 13.8756 8.09444C15.409 8.09444 16.8796 8.70357 17.9638 9.78783C19.0481 10.8721 19.6572 12.3427 19.6572 13.876C19.6572 15.4094 19.0481 16.88 17.9638 17.9642C16.8796 19.0485 15.409 19.6576 13.8756 19.6576ZM13.8756 5.20364C8.09403 5.20364 3.15656 8.79979 1.15613 13.876C3.15656 18.9523 8.09403 22.5484 13.8756 22.5484C19.6572 22.5484 24.5947 18.9523 26.5951 13.876C24.5947 8.79979 19.6572 5.20364 13.8756 5.20364Z" fill="white"/>
            </svg>
        </button>
        <div class="accessibility-panel__content" v-if="isOpen">
            <div class="accessibility-panel__header">
                <span class="accessibility-panel__title fs-1">Версия для слабовидящих</span>
                <button 
                    class="accessibility-panel__close" 
                    @click="togglePanel"
                    aria-label="Закрыть"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </button>
            </div>

            <!-- Размер шрифта -->
            <div class="accessibility-panel__section">
                <span class="accessibility-panel__section-title fs-0-875">Размер шрифта:</span>
                <div class="accessibility-panel__options">
                    <button 
                        class="accessibility-panel__option"
                        :class="{ active: fontSize === 'small' }"
                        @click="setFontSize('small')"
                    >
                        <span class="fs-0-75">Мелкий</span>
                    </button>
                    <button 
                        class="accessibility-panel__option"
                        :class="{ active: fontSize === 'medium' }"
                        @click="setFontSize('medium')"
                    >
                        <span class="fs-0-875">Средний</span>
                    </button>
                    <button 
                        class="accessibility-panel__option"
                        :class="{ active: fontSize === 'large' }"
                        @click="setFontSize('large')"
                    >
                        <span class="fs-1">Крупный</span>
                    </button>
                </div>
            </div>

            <!-- Цветовая схема -->
            <div class="accessibility-panel__section">
                <span class="accessibility-panel__section-title fs-0-875">Цветовая схема:</span>
                <div class="accessibility-panel__options">
                    <button 
                        class="accessibility-panel__option"
                        :class="{ active: theme === 'normal' }"
                        @click="setTheme('normal')"
                    >
                        <span class="fs-0-75">Обычная</span>
                    </button>
                    <button 
                        class="accessibility-panel__option theme-dark-preview"
                        :class="{ active: theme === 'dark' }"
                        @click="setTheme('dark')"
                    >
                        <span class="fs-0-75">Чёрная</span>
                    </button>
                    <button 
                        class="accessibility-panel__option theme-brown-preview"
                        :class="{ active: theme === 'brown' }"
                        @click="setTheme('brown')"
                    >
                        <span class="fs-0-75">Коричневая</span>
                    </button>
                </div>
            </div>

            <!-- Изображения -->
            <div class="accessibility-panel__section">
                <label class="accessibility-panel__checkbox">
                    <input 
                        type="checkbox" 
                        :checked="imagesVisible"
                        @change="toggleImages"
                    />
                    <span class="fs-0-875">Показывать изображения</span>
                </label>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../../assets/css/main.scss';

.accessibility-panel {
    position: fixed;
    top: 1.25rem;
    right: 1.5rem;
    z-index: 50;

    @include mobile {
        top: 8.5rem;
    }

    &__toggle {
        width: 3.125rem;
        height: 3.125rem;
        
        background-color: #3498DB;
        border: none;
        border-end-start-radius: 0.3906rem;
        border-start-start-radius: 0.3906rem;
        
        display: flex;
        align-items: center;
        justify-content: center;
        
        cursor: pointer;

        svg {
            width: 1.7188rem;
            height: 1.7188rem;
        }
    }

    &__content {
        position: absolute;
        top: 0;
        right: 3.125rem;
        
        width: fit-content;
        
        background-color: #EDEDE6;
        border-radius: 0.625rem;
        box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.15);
        
        padding: 1.25rem;
        
        animation: slideIn 0.3s ease;

        @include mobile {
            // width: 16rem;
            right: 0rem;
            padding: 1rem;
        }
    }

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1.25rem;
        padding-bottom: 0.75rem;
        border-bottom: 1px solid #D0C9C0;
    }

    &__title {
        font-weight: 600;
        color: #2E2D2D;
    }

    &__close {
        width: 1.5rem;
        height: 1.5rem;
        
        background: none;
        border: none;
        
        display: flex;
        align-items: center;
        justify-content: center;
        
        color: #2E2D2D;
        cursor: pointer;
        
        transition: color 0.2s ease;

        &:hover {
            color: #650F11;
        }
    }

    &__section {
        margin-bottom: 1rem;

        &:last-child {
            margin-bottom: 0;
        }
    }

    &__section-title {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: #2E2D2D;
    }

    &__options {
        display: flex;
        gap: 0.5rem;
        @include mobile {
            flex-direction: column;
        }
    }

    &__option {
        flex: 1;
        padding: 0.625rem 0.5rem;
        
        background-color: white;
        border: 2px solid #E5E0D9;
        border-radius: 0.375rem;
        
        color: #2E2D2D;
        cursor: pointer;
        
        transition: all 0.2s ease;

        &:hover {
            border-color: #650F11;
        }

        &.active {
            background-color: #650F11;
            border-color: #650F11;
            color: white;
        }

        &.theme-dark-preview {
            background-color: #000;
            color: white;
            border-color: #333;

            &:hover {
                border-color: white;
            }

            &.active {
                border-color: white;
            }
        }

        &.theme-brown-preview {
            background-color: #3b2716;
            color: #a9e44d;
            border-color: #5a3d23;

            &:hover {
                border-color: #a9e44d;
            }

            &.active {
                border-color: #a9e44d;
            }
        }

        span {
            font-weight: 500;
        }
    }

    &__checkbox {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;

        input[type="checkbox"] {
            width: 1.125rem;
            height: 1.125rem;
            cursor: pointer;
        }

        span {
            color: #2E2D2D;
        }
    }
}


    .button-change-theme {
        position: fixed;
        top: 1.25rem;
        right: 0rem;
        z-index: 50;
        
        width: 3.125rem;
        height: 3.125rem;

        background-color: #3498DB;
        border-end-start-radius: 0.3906rem;
        border-start-start-radius: 0.3906rem;

        display: flex;
        align-items: center;
        justify-content: center;

        @include mobile {
            top: 4.9375rem;
        }
        &__svg {
            width: 1.7188rem;
            height: 1.7188rem;
        }
    }

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(1rem);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}
</style>

