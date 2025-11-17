<script setup lang="ts">
    import { ref, computed, watch, nextTick } from 'vue'
    import { usePopup } from '~/composable/usePopup';
    import { Swiper, SwiperSlide } from 'swiper/vue'
    import type { Swiper as SwiperType } from 'swiper'
    import 'swiper/css'
    import { Navigation } from 'swiper/modules'
    import 'swiper/css/navigation'

    const { popupState, setOpen } = usePopup()
    const modules = [Navigation]

    const prevButtonRef = ref<HTMLElement | null>(null)
    const nextButtonRef = ref<HTMLElement | null>(null)
    const swiperInstance = ref<SwiperType | null>(null)

    const navigationConfig = computed(() => {
        if (prevButtonRef.value && nextButtonRef.value) {
            return {
                nextEl: nextButtonRef.value,
                prevEl: prevButtonRef.value
            }
        }
        return {
            nextEl: '.gallery-button-next',
            prevEl: '.gallery-button-prev'
        }
    })

    const onSwiper = (swiper: SwiperType) => {
        swiperInstance.value = swiper
    }

    watch(() => popupState.value.isOpen, async (isOpen) => {
        if (isOpen && popupState.value.popupType === 'gallery') {
            await nextTick()
            if (swiperInstance.value && prevButtonRef.value && nextButtonRef.value) {
                swiperInstance.value.navigation.init()
                swiperInstance.value.navigation.update()
            }
        }
    })

    // Массив картинок из папки about/
    const images = ref<string[]>([
        '/img/about/about1.jpg',
        '/img/about/about2.jpg',
        '/img/about/about3.jpg',
        '/img/about/about4.jpg',
        '/img/about/about5.jpg',
        '/img/about/about6.jpg',
        '/img/about/about7.jpg',
        '/img/about/about8.jpg',
        '/img/about/about9.jpg',
        '/img/about/about10.jpg',
        '/img/about/about11.jpg',
        '/img/about/about12.jpg',
        '/img/about/about13.jpg'
    ])
</script>

<template>
    <Transition name="dialog-fade">
        <dialog v-if="popupState.isOpen && popupState.popupType === 'gallery'" class="dialog dialog-gallery">
            <button class="close-button" @click="setOpen('', false)">
                <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M34.0959 20.8966L28.5962 26.3963L34.0959 31.896C34.3876 32.1878 34.5515 32.5834 34.5515 32.996C34.5515 33.4085 34.3876 33.8042 34.0959 34.0959C33.8042 34.3876 33.4085 34.5515 32.9959 34.5515C32.5834 34.5515 32.1877 34.3876 31.896 34.0959L26.3963 28.5962L20.8966 34.0959C20.6048 34.3877 20.2092 34.5515 19.7966 34.5515C19.3841 34.5515 18.9884 34.3877 18.6967 34.0959C18.405 33.8042 18.2411 33.4085 18.2411 32.996C18.2411 32.5834 18.405 32.1878 18.6967 31.896L24.1964 26.3963L18.6967 20.8966C18.405 20.6049 18.2411 20.2092 18.2411 19.7967C18.2411 19.3841 18.405 18.9884 18.6967 18.6967C18.9884 18.405 19.3841 18.2411 19.7966 18.2411C20.2092 18.2411 20.6048 18.405 20.8966 18.6967L26.3963 24.1964L31.896 18.6967C32.1877 18.405 32.5834 18.2411 32.9959 18.2411C33.4085 18.2411 33.8042 18.405 34.0959 18.6967C34.3876 18.9884 34.5515 19.3841 34.5515 19.7967C34.5515 20.2092 34.3876 20.6049 34.0959 20.8966Z" fill="white"/>
                </svg>
            </button>
            <div class="gallery-block">
                <client-only>
                    <Swiper 
                        :modules="modules"
                        :slides-per-view="1"
                        :space-between="20"
                        :navigation="navigationConfig"
                        @swiper="onSwiper"
                        class="gallery-swiper"
                    >
                        <SwiperSlide v-for="(image, index) in images" :key="index" class="gallery-slide">
                            <img :src="image" :alt="`Фото ${index + 1}`" class="gallery-image" />
                        </SwiperSlide>
                    </Swiper>
                </client-only>
            </div>
        </dialog>
    </Transition>

    <Transition name="backdrop-fade">
        <div v-if="popupState.isOpen && popupState.popupType === 'gallery'" class="inset" @click="setOpen('', false)"></div>
    </Transition>

    <Transition name="dialog-fade">
        <button 
            v-if="popupState.isOpen && popupState.popupType === 'gallery'" 
            ref="prevButtonRef"
            class="gallery-button-prev gallery-nav-button" 
            aria-label="Предыдущие"
        >
            <svg width="10" height="19" viewBox="0 0 10 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.58384 1.58109C9.66838 1.49162 9.73448 1.38638 9.77835 1.27138C9.82222 1.15637 9.84301 1.03385 9.83952 0.910809C9.83604 0.787769 9.80836 0.666618 9.75806 0.554276C9.70776 0.441933 9.63582 0.340598 9.54636 0.256056C9.4569 0.171515 9.35166 0.105422 9.23665 0.0615523C9.12164 0.0176824 8.99912 -0.00310581 8.87608 0.000374834C8.75304 0.00385547 8.63189 0.0315367 8.51955 0.0818379C8.4072 0.132139 8.30587 0.204076 8.22133 0.29354L0.256144 8.72726C0.0916524 8.90125 0 9.1316 0 9.37104C0 9.61047 0.0916524 9.84082 0.256144 10.0148L8.22133 18.4495C8.30531 18.5409 8.40662 18.6147 8.51938 18.6667C8.63214 18.7186 8.75409 18.7476 8.87815 18.752C9.00222 18.7564 9.12592 18.7361 9.24208 18.6923C9.35824 18.6485 9.46453 18.5821 9.55479 18.4969C9.64505 18.4116 9.71748 18.3093 9.76786 18.1958C9.81824 18.0824 9.84558 17.96 9.84828 17.8359C9.85099 17.7118 9.829 17.5884 9.78361 17.4729C9.73821 17.3573 9.67031 17.2519 9.58384 17.1629L2.22589 9.37104L9.58384 1.58109Z" fill="#650F11"/>
            </svg>
        </button>
    </Transition>

    <Transition name="dialog-fade">
        <button 
            v-if="popupState.isOpen && popupState.popupType === 'gallery'" 
            ref="nextButtonRef"
            class="gallery-button-next gallery-nav-button" 
            aria-label="Следующие"
        >
            <svg width="10" height="19" viewBox="0 0 10 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.58384 1.58109C9.66838 1.49162 9.73448 1.38638 9.77835 1.27138C9.82222 1.15637 9.84301 1.03385 9.83952 0.910809C9.83604 0.787769 9.80836 0.666618 9.75806 0.554276C9.70776 0.441933 9.63582 0.340598 9.54636 0.256056C9.4569 0.171515 9.35166 0.105422 9.23665 0.0615523C9.12164 0.0176824 8.99912 -0.00310581 8.87608 0.000374834C8.75304 0.00385547 8.63189 0.0315367 8.51955 0.0818379C8.4072 0.132139 8.30587 0.204076 8.22133 0.29354L0.256144 8.72726C0.0916524 8.90125 0 9.1316 0 9.37104C0 9.61047 0.0916524 9.84082 0.256144 10.0148L8.22133 18.4495C8.30531 18.5409 8.40662 18.6147 8.51938 18.6667C8.63214 18.7186 8.75409 18.7476 8.87815 18.752C9.00222 18.7564 9.12592 18.7361 9.24208 18.6923C9.35824 18.6485 9.46453 18.5821 9.55479 18.4969C9.64505 18.4116 9.71748 18.3093 9.76786 18.1958C9.81824 18.0824 9.84558 17.96 9.84828 17.8359C9.85099 17.7118 9.829 17.5884 9.78361 17.4729C9.73821 17.3573 9.67031 17.2519 9.58384 17.1629L2.22589 9.37104L9.58384 1.58109Z" fill="#650F11"/>
            </svg>
        </button>
    </Transition>
</template>

<style lang="scss" scoped>
    dialog {
        border: none;
        border-radius: 1.875rem;
        background-color: #EDEDE6;
        z-index: 80;
        margin: 0;
    }

    .dialog {
        width: 60rem;
        padding: 0.625rem 0.625rem 3.75rem 0.625rem;

        display: flex;
        flex-direction: column;
        align-items: center;

        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        
        transition: opacity 0.3s ease, transform 0.3s ease;
        
        @include mobile {
            width: calc(100vw - 2rem);
        }

        .close-button {
            width: 4.375rem;
            height: 4.375rem;

            position: absolute;
            top: -5.625rem;
            right: 0;
            z-index: 80;
        
            background-color: #ffffff1a;
            cursor: pointer;
            border-radius: 100%;

            display: flex;
            justify-content: center;
            align-items: center;

            @include mobile {
                width: 3rem;
                height: 3rem;
                top: -4rem;
            }

            svg {
                width: 3.3125rem;
                height: 3.3125rem;

                @include mobile {
                    width: 2rem;
                    height: 2rem;
                }
            }
        }
    }

    .gallery-block {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .gallery-swiper {
        width: 100%;
        max-width: 100%;
    }

    .gallery-slide {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .gallery-image {
        width: 100%;
        height: auto;
        max-height: 50rem;
        object-fit: contain;
        border-radius: 0.625rem;

        @include mobile {
            max-height: 70vh;
        }
    }

    .gallery-nav-button {
        width: 2.1875rem;
        height: 5.125rem;

        position: fixed;
        top: 50%;
        transform: translateY(-50%);
        z-index: 85;
    
        border-radius: 0.3125rem;
        background-color: #E5E0D9;

        display: flex;
        align-items: center;
        justify-content: center;

        cursor: pointer;
        border: none;

        @include mobile {
            width: 1.75rem;
            height: 4rem;
        }
        
        &.gallery-button-prev {
            left: calc((100vw - 57rem) / 2 - 2.5rem - 2.1875rem);
            
            @include mobile {
                left: 0.5rem;
            }
        }
        
        &.gallery-button-next {
            transform: translateY(-50%) rotate(180deg);
            right: calc((100vw - 57rem) / 2 - 2.5rem - 2.1875rem);
            
            @include mobile {
                right: 0.5rem;
            }
        }
        
        &.swiper-button-disabled {
            opacity: 0.35;
            cursor: not-allowed;
        }
    }

    .inset {
        position: fixed;
        background-color: #000000CC;
        z-index: 70;
        top: 0;
        left: 0;

        width: 100%;
        height: 100dvh;

        display: flex;
        justify-content: center;
        align-items: center;
        
        transition: opacity 0.3s ease;
    }

    .dialog-fade-enter-active,
    .dialog-fade-leave-active {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }

    .dialog-fade-enter-from {
        opacity: 0;
        transform: translate(-50%, -60%);
    }

    .dialog-fade-enter-to {
        opacity: 1;
        transform: translate(-50%, -50%);
    }

    .dialog-fade-leave-from {
        opacity: 1;
        transform: translate(-50%, -50%);
    }

    .dialog-fade-leave-to {
        opacity: 0;
        transform: translate(-50%, -60%);
    }

    .backdrop-fade-enter-active,
    .backdrop-fade-leave-active {
        transition: opacity 0.3s ease;
    }

    .backdrop-fade-enter-from,
    .backdrop-fade-leave-to {
        opacity: 0;
    }

    .backdrop-fade-enter-to,
    .backdrop-fade-leave-from {
        opacity: 1;
    }

    .dialog-gallery {
        padding-bottom: 1rem;
    }
</style>

