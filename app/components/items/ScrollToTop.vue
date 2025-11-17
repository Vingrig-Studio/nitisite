<script setup lang="ts">
    import { ref, computed, onMounted, onUnmounted } from 'vue'
    import { usePopup } from '~/composable/usePopup'

    const { popupState } = usePopup()
    const isVisible = ref(false)
    const scrollThreshold = 100 // 100dvh в пикселях (примерно)

    const shouldShowButton = computed(() => {
        return isVisible.value && !(popupState.value.isOpen && popupState.value.popupType === 'history')
    })

    const checkScroll = () => {
        if (import.meta.client) {
            const scrollY = window.scrollY || window.pageYOffset
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight
            const threshold = viewportHeight // 100dvh
            
            isVisible.value = scrollY >= threshold
        }
    }

    const scrollToTop = () => {
        if (import.meta.client) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }
    }

    onMounted(() => {
        if (import.meta.client) {
            checkScroll()
            window.addEventListener('scroll', checkScroll, { passive: true })
        }
    })

    onUnmounted(() => {
        if (import.meta.client) {
            window.removeEventListener('scroll', checkScroll)
        }
    })
</script>

<template>
    <Transition name="scroll-button-fade">
        <button 
            v-if="shouldShowButton" 
            @click="scrollToTop"
            class="scroll-to-top"
            aria-label="Наверх"
        >
            <svg width="10" height="19" viewBox="0 0 10 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.58384 1.58109C9.66838 1.49162 9.73448 1.38638 9.77835 1.27138C9.82222 1.15637 9.84301 1.03385 9.83952 0.910809C9.83604 0.787769 9.80836 0.666618 9.75806 0.554276C9.70776 0.441933 9.63582 0.340598 9.54636 0.256056C9.4569 0.171515 9.35166 0.105422 9.23665 0.0615523C9.12164 0.0176824 8.99912 -0.00310581 8.87608 0.000374834C8.75304 0.00385547 8.63189 0.0315367 8.51955 0.0818379C8.4072 0.132139 8.30587 0.204076 8.22133 0.29354L0.256144 8.72726C0.0916524 8.90125 0 9.1316 0 9.37104C0 9.61047 0.0916524 9.84082 0.256144 10.0148L8.22133 18.4495C8.30531 18.5409 8.40662 18.6147 8.51938 18.6667C8.63214 18.7186 8.75409 18.7476 8.87815 18.752C9.00222 18.7564 9.12592 18.7361 9.24208 18.6923C9.35824 18.6485 9.46453 18.5821 9.55479 18.4969C9.64505 18.4116 9.71748 18.3093 9.76786 18.1958C9.81824 18.0824 9.84558 17.96 9.84828 17.8359C9.85099 17.7118 9.829 17.5884 9.78361 17.4729C9.73821 17.3573 9.67031 17.2519 9.58384 17.1629L2.22589 9.37104L9.58384 1.58109Z" fill="#650F11"/>
            </svg>
        </button>
    </Transition>
</template>

<style lang="scss" scoped>
    .scroll-to-top {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        z-index: 50;

        width: 3.125rem;
        height: 3.125rem;

        background-color: #E5E0D9;
        border-radius: 100%;
        border: none;
        cursor: pointer;

        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
            background-color: #D0C9C0;
        }

        svg {
            width: 0.625rem;
            height: 1.1875rem;

            transform: rotate(90deg);
        }

        @include mobile {
            bottom: 1rem;
            right: 1rem;
            width: 2.75rem;
            height: 2.75rem;

            svg {
                width: 0.5rem;
                height: 0.9375rem;
                transform: rotate(90deg);
            }
        }
    }

    .scroll-button-fade-enter-active,
    .scroll-button-fade-leave-active {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }

    .scroll-button-fade-enter-from {
        opacity: 0;
        transform: scale(0.8);
    }

    .scroll-button-fade-enter-to {
        opacity: 1;
        transform: scale(1);
    }

    .scroll-button-fade-leave-from {
        opacity: 1;
        transform: scale(1);
    }

    .scroll-button-fade-leave-to {
        opacity: 0;
        transform: scale(0.8);
    }
</style>

