<script setup lang="ts">
    import { usePopup } from '~/composable/usePopup';
    import { useShare } from '~/composable/useShare';
    import { useHistory, type HistoryTextItem } from '~/composable/useHistory';
    import { ref, computed, watch, onUnmounted, nextTick } from 'vue'
    import { Swiper, SwiperSlide } from 'swiper/vue'
    import 'swiper/css'
    import type { Swiper as SwiperType } from 'swiper'

    const { popupState, setOpen } = usePopup()
    const { shareLink } = useShare()
    const { getHistoryByYear } = useHistory()
    
    const popupRef = ref<HTMLElement | null>(null)
    const isScrollButtonVisible = ref(false)

    const checkScroll = (event?: Event) => {
        if (import.meta.client) {
            const popupElement = event?.target as HTMLElement || popupRef.value || document.querySelector('.popup-content') as HTMLElement
            if (popupElement) {
                const scrollTop = popupElement.scrollTop || (popupElement as any).scrollY || 0
                const viewportHeight = 100
                const threshold = viewportHeight // 100dvh
                
                isScrollButtonVisible.value = scrollTop >= threshold
            }
        }
    }

    const scrollToTop = () => {
        if (import.meta.client) {
            const popupElement = popupRef.value || document.querySelector('.popup-content') as HTMLElement
            if (popupElement) {
                popupElement.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                })
            }
        }
    }

    const years = [2021, 2022, 2023, 2024, 2025]
    const currentYearIndex = ref(popupState.value.historyYearIndex ?? 0)
    const swiperInstance = ref<SwiperType | null>(null)

    watch(() => popupState.value.isOpen, async (isOpen) => {
        if (isOpen && popupState.value.popupType === 'history') {
            await nextTick()
            await nextTick() // Дополнительный nextTick для гарантии монтирования
            setTimeout(() => {
                checkScroll()
            }, 100)
            const index = popupState.value.historyYearIndex ?? 0
            if (index >= 0 && index < years.length) {
                currentYearIndex.value = index
                if (swiperInstance.value) {
                    swiperInstance.value.slideTo(index)
                    setTimeout(() => {
                        swiperInstance.value?.updateAutoHeight()
                    }, 100)
                }
            }
        } else {
            isScrollButtonVisible.value = false
        }
    })

    onUnmounted(() => {
        if (import.meta.client) {
            const popupElement = popupRef.value || document.querySelector('.popup-content') as HTMLElement
            if (popupElement) {
                popupElement.removeEventListener('scroll', checkScroll)
            }
        }
    })
    
    watch(() => popupState.value.historyYearIndex, (newIndex) => {
        if (swiperInstance.value && newIndex !== undefined && newIndex >= 0 && newIndex < years.length) {
            currentYearIndex.value = newIndex
            swiperInstance.value.slideTo(newIndex)
            setTimeout(() => {
                swiperInstance.value?.updateAutoHeight()
            }, 100)
        }
    })
    
    const getCurrentHistoryItem = (year: number) => {
        return getHistoryByYear(year)
    }

    const prevYear = computed(() => {
        const prevIndex = currentYearIndex.value - 1
        return prevIndex >= 0 ? years[prevIndex] : null
    })

    const nextYear = computed(() => {
        const nextIndex = currentYearIndex.value + 1
        return nextIndex < years.length ? years[nextIndex] : null
    })

    const handleNext = () => {
        if (swiperInstance.value && currentYearIndex.value < years.length - 1) {
            swiperInstance.value.slideNext()
        }
    }

    const handlePrev = () => {
        if (swiperInstance.value && currentYearIndex.value > 0) {
            swiperInstance.value.slidePrev()
        }
    }

    const onSlideChange = (swiper: SwiperType) => {
        currentYearIndex.value = swiper.activeIndex
        swiper.updateAutoHeight()
    }

    const onSwiper = (swiper: SwiperType) => {
        swiperInstance.value = swiper
        if (popupState.value.isOpen && popupState.value.popupType === 'history') {
            const index = popupState.value.historyYearIndex ?? 0
            if (index >= 0 && index < years.length && index !== swiper.activeIndex) {
                swiper.slideTo(index)
                currentYearIndex.value = index
            } else {
                currentYearIndex.value = swiper.activeIndex
            }
        } else {
            currentYearIndex.value = swiper.activeIndex
        }
        setTimeout(() => {
            swiper.updateAutoHeight()
        }, 100)
    }
    
    const handleShare = () => {
        shareLink('history', currentYearIndex.value)
    }
</script>

<template>
    <Transition name="popup-slide-up">
        <dialog class="popup-content" v-if="popupState.isOpen && popupState.popupType === 'history'" ref="popupRef" @scroll="checkScroll">
        <div class="popup-content__content">
            <div class="popup-content__header">
                <div class="popup-content__header__item" @click="setOpen('', false)">
                    <svg class="popup-content__header__item__back" width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.767578 8.35352C0.596225 8.52495 0.5 8.75761 0.5 9C0.5 9.24239 0.596225 9.47505 0.767578 9.64648L8.41406 17.293L9.70703 16L2.70703 9L9.70703 2L8.41406 0.707031L0.767578 8.35352Z" fill="#2E2D2D" stroke="black"/>
                    </svg>
                    <p>Назад</p>
                </div>
                <h2 class="popup-content__header__title">История проекта</h2>
                <div class="popup-content__header__item" @click="handleShare">
                    <svg class="popup-content__header__item__send" width="26" height="23" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_18494_3518)">
                        <path d="M23.214 14.0296V22.7349H0.275391V5.32422H10.6928C9.93726 5.66774 9.226 6.10132 8.5745 6.61551C7.99422 7.09273 7.46868 7.63287 7.00753 8.226H3.17718V19.8331H20.3122V17.0765L23.214 14.0296Z" fill="#2E2D2D"/>
                        <path d="M25.7242 8.26946L17.6427 0.187988V5.51276C15.5389 5.59982 7.48647 6.57192 6.58691 15.7851C6.59445 15.8039 6.60746 15.8201 6.62427 15.8315C6.64108 15.8429 6.66092 15.849 6.68122 15.849C6.70152 15.849 6.72136 15.8429 6.73817 15.8315C6.75498 15.8201 6.76799 15.8039 6.77553 15.7851C7.48647 13.8264 9.83691 10.8085 17.6427 10.6779V16.3074L25.7242 8.26946Z" fill="#2E2D2D"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_18494_3518">
                        <rect width="26" height="22.9096" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                </div>
            </div>
            <div class="popup-content__container">
                <client-only>
                    <Swiper 
                        :slides-per-view="1" 
                        :space-between="0"
                        :initial-slide="currentYearIndex"
                        :auto-height="true"
                        :allow-touch-move="false"
                        :observer="true" 
                        :observe-parents="true"
                        @slide-change="onSlideChange"
                        @swiper="onSwiper">
                        <SwiperSlide v-for="year in years" :key="year">
                            <div class="popup-content__text-content" v-if="getCurrentHistoryItem(year)">
                                <div class="popup-content__text-content__head-info">
                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.9854 0L15.4062 10.3239L17.6637 0.241056L16.2344 10.4742L20.256 0.956477L17.0224 10.77L22.6788 2.12327L17.745 11.2017L24.8544 3.70393L18.3789 11.7555L26.7128 5.64765L18.9037 12.4135L28.1943 7.89197L19.3025 13.1547L29.2512 10.3647L19.5626 13.9553L29.8496 12.9865L19.6756 14.7894L29.9702 15.673L19.6379 15.6302L29.6093 18.3378L19.4506 16.4508L28.7783 20.8954L19.1197 17.2248L27.504 23.2635L18.656 17.9273L25.8273 25.3659L18.0744 18.5357L23.8021 27.1353L17.3934 19.0304L21.4936 28.5145L16.6351 19.3956L18.9759 29.4594L15.8237 19.6195L16.3299 29.9396L14.9854 19.695L13.6408 29.9396L14.147 19.6195L10.9948 29.4594L13.3356 19.3956L8.4771 28.5145L12.5773 19.0304L6.16857 27.1353L11.8963 18.5357L4.14343 25.3659L11.3147 17.9273L2.46675 23.2635L10.851 17.2248L1.19244 20.8954L10.5201 16.4508L0.361433 18.3378L10.3328 15.6302L0.000455856 15.673L10.2951 14.7894L0.121105 12.9865L10.4081 13.9553L0.719503 10.3647L10.6682 13.1547L1.77642 7.89197L11.067 12.4135L3.25788 5.64765L11.5918 11.7555L5.11627 3.70393L12.2257 11.2017L7.29186 2.12327L12.9483 10.77L9.71473 0.956477L13.7363 10.4742L12.307 0.241056L14.5645 10.3239L14.9854 0Z" fill="#A43033"/>
                                    </svg>
                                    <p>Отчеты НитиФест · {{ year }}</p>
                                </div>
                                <h3 class="popup-content__text-content__title">{{ getCurrentHistoryItem(year)?.title || `История проекта ${year} года` }}</h3>
                                <h4 v-if="getCurrentHistoryItem(year)?.shortDesc" class="mt-20 popup-content__text-content__desc">{{ getCurrentHistoryItem(year)?.shortDesc }}</h4>
                                <template v-for="(contentItem, index) in getCurrentHistoryItem(year)?.desc" :key="index">
                                    <p v-if="contentItem.type === 'desc'" :class="contentItem.margin">{{ contentItem.value }}</p>
                                    <img v-else-if="contentItem.type === 'img'" :src="contentItem.value" alt="Фото из статьи" :class="`${contentItem.margin} popup-content__text-content__img`">
                                    <h4 v-else-if="contentItem.type === 'title'" :class="`${contentItem.margin} popup-content__text-content__sub-title`">{{ contentItem.value }}</h4>
                                </template>
                                <div class="popup-content__text-content__tags mt-30">
                                    <p class="popup-content__text-content__tag">{{ year }}</p>
                                </div>
                                <div class="swiper-buttons">
                                    <button v-if="prevYear" class="swiper-buttons__button left" @click="handlePrev">
                                        <p class="swiper-buttons__button__year">{{ prevYear }}</p>
                                        <p class="swiper-buttons__button__text-page">Предыдущий год</p>
                                        
                                        <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.99984 9.99984L1.99969 18L0 16.0003L7.00031 9L0 1.99969L1.99969 0L9.99984 8.00016C10.265 8.26536 10.4139 8.625 10.4139 9C10.4139 9.375 10.265 9.73464 9.99984 9.99984Z" fill="#2E2D2D"/>
                                        </svg>
                                    </button>
                                    <button v-if="nextYear" class="swiper-buttons__button" @click="handleNext">
                                        <p class="swiper-buttons__button__year">{{ nextYear }}</p>
                                        <p class="swiper-buttons__button__text-page">Следующий год</p>
                                        
                                        <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.99984 9.99984L1.99969 18L0 16.0003L7.00031 9L0 1.99969L1.99969 0L9.99984 8.00016C10.265 8.26536 10.4139 8.625 10.4139 9C10.4139 9.375 10.265 9.73464 9.99984 9.99984Z" fill="#2E2D2D"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div class="popup-content__text-content" v-else>
                                <div class="popup-content__text-content__head-info">
                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.9854 0L15.4062 10.3239L17.6637 0.241056L16.2344 10.4742L20.256 0.956477L17.0224 10.77L22.6788 2.12327L17.745 11.2017L24.8544 3.70393L18.3789 11.7555L26.7128 5.64765L18.9037 12.4135L28.1943 7.89197L19.3025 13.1547L29.2512 10.3647L19.5626 13.9553L29.8496 12.9865L19.6756 14.7894L29.9702 15.673L19.6379 15.6302L29.6093 18.3378L19.4506 16.4508L28.7783 20.8954L19.1197 17.2248L27.504 23.2635L18.656 17.9273L25.8273 25.3659L18.0744 18.5357L23.8021 27.1353L17.3934 19.0304L21.4936 28.5145L16.6351 19.3956L18.9759 29.4594L15.8237 19.6195L16.3299 29.9396L14.9854 19.695L13.6408 29.9396L14.147 19.6195L10.9948 29.4594L13.3356 19.3956L8.4771 28.5145L12.5773 19.0304L6.16857 27.1353L11.8963 18.5357L4.14343 25.3659L11.3147 17.9273L2.46675 23.2635L10.851 17.2248L1.19244 20.8954L10.5201 16.4508L0.361433 18.3378L10.3328 15.6302L0.000455856 15.673L10.2951 14.7894L0.121105 12.9865L10.4081 13.9553L0.719503 10.3647L10.6682 13.1547L1.77642 7.89197L11.067 12.4135L3.25788 5.64765L11.5918 11.7555L5.11627 3.70393L12.2257 11.2017L7.29186 2.12327L12.9483 10.77L9.71473 0.956477L13.7363 10.4742L12.307 0.241056L14.5645 10.3239L14.9854 0Z" fill="#A43033"/>
                                    </svg>
                                    <p>Отчеты НитиФест · {{ year }}</p>
                                </div>
                                <h3 class="popup-content__text-content__title">История проекта {{ year }} года</h3>
                                <h4 class="popup-content__text-content__desc">Мы вынуждены отталкиваться от того, что экономическая повестка сегодняшнего.</h4>
                                <p class="mt-30">Мы вынуждены отталкиваться от того, что экономическая повестка сегодняшнего дня предопределяет высокую востребованность экспериментов, поражающих по своей масштабности и грандиозности. Но многие известные личности, превозмогая сложившуюся непростую экономическую ситуацию, указаны как претенденты на роль ключевых факторов. Вот вам яркий пример современных тенденций — дальнейшее развитие различных форм деятельности позволяет выполнить важные задания по разработке новых принципов формирования материально-технической и кадровой базы.</p>
                                <img src="/img/popupContent.png" alt="Фото из статьи" class="mt-40 popup-content__text-content__img">
                                <h5 class="popup-content__text-content__sub-title">Второй заголовок</h5>
                                <p class="mt-20">Мы вынуждены отталкиваться от того, что экономическая повестка сегодняшнего дня предопределяет высокую востребованность экспериментов, поражающих по своей масштабности и грандиозности. Но многие известные личности, превозмогая сложившуюся непростую экономическую ситуацию, указаны как претенденты на роль ключевых факторов. Вот вам яркий пример современных тенденций — дальнейшее развитие различных форм деятельности позволяет выполнить важные задания по разработке новых принципов формирования материально-технической и кадровой базы.</p>
                                <p class="mt-30">Мы вынуждены отталкиваться от того, что экономическая повестка сегодняшнего дня предопределяет высокую востребованность экспериментов, поражающих по своей масштабности и грандиозности. Но многие известные личности, превозмогая сложившуюся непростую экономическую ситуацию, указаны как претенденты на роль ключевых факторов. Вот вам яркий пример современных тенденций — дальнейшее развитие различных форм деятельности позволяет выполнить важные задания по разработке новых принципов формирования материально-технической и кадровой базы.</p>
                                <div class="popup-content__text-content__tags mt-30">
                                    <p class="popup-content__text-content__tag">{{ year }}</p>
                                    <p class="popup-content__text-content__tag">25.10.{{ year }}</p>
                                </div>
                                <div class="swiper-buttons">
                                    <button v-if="prevYear" class="swiper-buttons__button left" @click="handlePrev">
                                        <p class="swiper-buttons__button__year">{{ prevYear }}</p>
                                        <p class="swiper-buttons__button__text-page">Предыдущий год</p>
                                        
                                        <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.99984 9.99984L1.99969 18L0 16.0003L7.00031 9L0 1.99969L1.99969 0L9.99984 8.00016C10.265 8.26536 10.4139 8.625 10.4139 9C10.4139 9.375 10.265 9.73464 9.99984 9.99984Z" fill="#2E2D2D"/>
                                        </svg>
                                    </button>
                                    <button v-if="nextYear" class="swiper-buttons__button" @click="handleNext">
                                        <p class="swiper-buttons__button__year">{{ nextYear }}</p>
                                        <p class="swiper-buttons__button__text-page">Следующий год</p>
                                        
                                        <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.99984 9.99984L1.99969 18L0 16.0003L7.00031 9L0 1.99969L1.99969 0L9.99984 8.00016C10.265 8.26536 10.4139 8.625 10.4139 9C10.4139 9.375 10.265 9.73464 9.99984 9.99984Z" fill="#2E2D2D"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </client-only>
            </div>

        </div>
        </dialog>
    </Transition>
    
    <Transition name="scroll-button-fade">
        <button 
            v-if="isScrollButtonVisible" 
            @click="scrollToTop"
            class="popup-scroll-to-top"
            aria-label="Наверх"
        >
            <svg width="10" height="19" viewBox="0 0 10 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.58384 1.58109C9.66838 1.49162 9.73448 1.38638 9.77835 1.27138C9.82222 1.15637 9.84301 1.03385 9.83952 0.910809C9.83604 0.787769 9.80836 0.666618 9.75806 0.554276C9.70776 0.441933 9.63582 0.340598 9.54636 0.256056C9.4569 0.171515 9.35166 0.105422 9.23665 0.0615523C9.12164 0.0176824 8.99912 -0.00310581 8.87608 0.000374834C8.75304 0.00385547 8.63189 0.0315367 8.51955 0.0818379C8.4072 0.132139 8.30587 0.204076 8.22133 0.29354L0.256144 8.72726C0.0916524 8.90125 0 9.1316 0 9.37104C0 9.61047 0.0916524 9.84082 0.256144 10.0148L8.22133 18.4495C8.30531 18.5409 8.40662 18.6147 8.51938 18.6667C8.63214 18.7186 8.75409 18.7476 8.87815 18.752C9.00222 18.7564 9.12592 18.7361 9.24208 18.6923C9.35824 18.6485 9.46453 18.5821 9.55479 18.4969C9.64505 18.4116 9.71748 18.3093 9.76786 18.1958C9.81824 18.0824 9.84558 17.96 9.84828 17.8359C9.85099 17.7118 9.829 17.5884 9.78361 17.4729C9.73821 17.3573 9.67031 17.2519 9.58384 17.1629L2.22589 9.37104L9.58384 1.58109Z" fill="#650F11"/>
            </svg>
        </button>
    </Transition>
</template>

<style lang="scss">
    .popup-scroll-to-top {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        z-index: 120;

        width: 3.125rem;
        height: 3.125rem;

        background-color: #E5E0D9;
        border-radius: 100%;
        border: none;
        cursor: pointer;

        display: flex;
        justify-content: center;
        align-items: center;

        transition: background-color 0.3s ease;

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

    .mb-40 {
        margin-bottom: 3.125rem;
    }


    .swiper-buttons {
        margin-top: 1.25rem;
        margin-bottom: 2.5rem;

        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 0.625rem;

        @include mobile {
            margin-top: 1rem;
            margin-bottom: 1.5rem;
            gap: 0.5rem;
        }
        
        &__button {
            width: 100%;

            border-radius: 0.9375rem;
            background-color: #EDEDE6;

            position: relative;
        
            padding: 1.75rem 0rem 1.25rem 1.875rem;
        
            display: flex;
            flex-direction: column;
            align-items: start;
            gap: 1.6875rem;

            cursor: pointer;

            @include mobile {
                padding: 1rem 0rem 0.75rem 1rem;
                gap: 0.875rem;
            }

            &__year {
                font-size: 0.75rem;
                line-height: 130%;
                letter-spacing: 0.0063rem;
                color: #2E2D2D;

                @include mobile {
                    font-size: 0.625rem;
                }
            }
            &__text-page {
                color: #2E2D2D;
                font-size: 1.25rem;
                line-height: 130%;
                letter-spacing: 0.0125rem;

                @include mobile {
                    font-size: 0.875rem;
                    letter-spacing: 0.0063rem;
                }
            }
        }
        svg {
            width: 0.6875rem;
            height: 1.125rem;

            position: absolute;
            right: 1.875rem;
            bottom: 1.5rem;

            @include mobile {
                width: 0.5rem;
                height: 0.875rem;
                right: 1rem;
                bottom: 1rem;
            }
        }
        .left {

            padding-inline: 0rem 1.875rem;
            align-items: end;

            @include mobile {
                padding-inline: 0rem 1rem;
            }

            svg {
                right: 0;
                left: 1.875rem;

                transform: rotate(180deg);

                @include mobile {
                    left: 1rem;
                }
            }
        }
    }
</style>
