<script setup lang="ts">
    import { usePopup } from '~/composable/usePopup';
    import { useShare } from '~/composable/useShare';
    import { useHistory, type HistoryTextItem } from '~/composable/useHistory';
    import { ref, computed, watch } from 'vue'
    import { Swiper, SwiperSlide } from 'swiper/vue'
    import 'swiper/css'
    import type { Swiper as SwiperType } from 'swiper'

    const { popupState, setOpen } = usePopup()
    const { shareLink } = useShare()
    const { getHistoryByYear } = useHistory()
    const years = [2021, 2022, 2023, 2024, 2025]
    const currentYearIndex = ref(popupState.value.historyYearIndex ?? 0)
    const swiperInstance = ref<SwiperType | null>(null)

    watch(() => popupState.value.isOpen, (isOpen) => {
        if (isOpen && popupState.value.popupType === 'history') {
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
        <dialog class="popup-content" v-if="popupState.isOpen && popupState.popupType === 'history'">
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
</template>

<style lang="scss">
    .mb-40 {
        margin-bottom: 3.125rem;
    }


    .swiper-buttons {
        margin-top: 1.25rem;
        margin-bottom: 2.5rem;

        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 0.625rem;
        
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

            &__year {
                font-size: 0.75rem;
                line-height: 130%;
                letter-spacing: 0.0063rem;
                color: #2E2D2D;
            }
            &__text-page {
                color: #2E2D2D;
                font-size: 1.25rem;
                line-height: 130%;
                letter-spacing: 0.0125rem;
            }
        }
        svg {
            width: 0.6875rem;
            height: 1.125rem;

            position: absolute;
            right: 1.875rem;
            bottom: 1.5rem;
        }
        .left {

            padding-inline: 0rem 1.875rem;
            align-items: end;

            svg {
                right: 0;
                left: 1.875rem;

                transform: rotate(180deg);
            }
        }
    }
</style>
