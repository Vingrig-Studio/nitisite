<script setup lang="ts">
    import { computed, ref, onUnmounted, watch, nextTick } from 'vue'
    import { usePopup } from '~/composable/usePopup';
    import { useShare } from '~/composable/useShare';
    import { useNews, type NewsTextItem } from '~/composable/useNews';
    import { Swiper, SwiperSlide } from 'swiper/vue'
    import 'swiper/css'

    const { popupState, setOpen } = usePopup()
    const { shareLink } = useShare()
    const { allNewsItems, getNewsById } = useNews()
    
    const popupRef = ref<HTMLElement | null>(null)
    const isScrollButtonVisible = ref(false)

    const checkScroll = (event?: Event) => {
        if (import.meta.client) {
            const popupElement = event?.target as HTMLElement || popupRef.value || document.querySelector('.popup-content') as HTMLElement
            if (popupElement) {
                const scrollTop = popupElement.scrollTop || (popupElement as any).scrollY || 0
                const viewportHeight = window.innerHeight || document.documentElement.clientHeight
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

    watch(() => popupState.value.isOpen, async (isOpen) => {
        if (isOpen && popupState.value.popupType === 'article') {
            await nextTick()
            await nextTick() // Дополнительный nextTick для гарантии монтирования
            setTimeout(() => {
                checkScroll()
            }, 100)
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
    
    const currentNewsItem = computed(() => popupState.value.newsItem)
    
    const filteredRelatedItems = computed(() => {
        if (!currentNewsItem.value) return allNewsItems
        return allNewsItems.filter(item => item.id !== currentNewsItem.value!.id)
    })
    
    const itemsWithPlaceholders = computed(() => {
        const items = filteredRelatedItems.value
        const itemsToAdd = 4 - items.length
        if (itemsToAdd > 0) {
            const placeholders = Array.from({ length: itemsToAdd }, (_, index) => ({
                id: -index - 1,
                type: 'article' as const,
                date: '',
                title: '',
                desc: [],
                isEmpty: true
            }))
            return [...items, ...placeholders]
        }
        return items
    })
    
    const handleShare = () => {
        if (currentNewsItem.value) {
            shareLink('article', String(currentNewsItem.value.id))
        }
    }
    
    const handleOpenRelated = (item: typeof allNewsItems[0]) => {
        if ((item as any).isEmpty || item.id < 0) return
        const newsItem = getNewsById(item.id)
        setOpen(item.type, true, undefined, newsItem || null)
    }
</script>

<template>
    <Transition name="popup-slide-up">
        <dialog v-if="popupState.isOpen && popupState.popupType === 'article'" ref="popupRef" class="popup-content" @scroll="checkScroll">
            <div class="popup-content__content">
            <div class="popup-content__header">
                <div class="popup-content__header__item" @click="setOpen('', false)">
                    <svg class="popup-content__header__item__back" width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.767578 8.35352C0.596225 8.52495 0.5 8.75761 0.5 9C0.5 9.24239 0.596225 9.47505 0.767578 9.64648L8.41406 17.293L9.70703 16L2.70703 9L9.70703 2L8.41406 0.707031L0.767578 8.35352Z" fill="#2E2D2D" stroke="black"/>
                    </svg>
                    <p>Назад</p>
                </div>
                <h2 class="popup-content__header__title">Новости и мероприятия</h2>
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
            <div class="popup-content__container" v-if="currentNewsItem">
                <div class="popup-content__text-content">
                    <div class="popup-content__text-content__head-info">
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.9854 0L15.4062 10.3239L17.6637 0.241056L16.2344 10.4742L20.256 0.956477L17.0224 10.77L22.6788 2.12327L17.745 11.2017L24.8544 3.70393L18.3789 11.7555L26.7128 5.64765L18.9037 12.4135L28.1943 7.89197L19.3025 13.1547L29.2512 10.3647L19.5626 13.9553L29.8496 12.9865L19.6756 14.7894L29.9702 15.673L19.6379 15.6302L29.6093 18.3378L19.4506 16.4508L28.7783 20.8954L19.1197 17.2248L27.504 23.2635L18.656 17.9273L25.8273 25.3659L18.0744 18.5357L23.8021 27.1353L17.3934 19.0304L21.4936 28.5145L16.6351 19.3956L18.9759 29.4594L15.8237 19.6195L16.3299 29.9396L14.9854 19.695L13.6408 29.9396L14.147 19.6195L10.9948 29.4594L13.3356 19.3956L8.4771 28.5145L12.5773 19.0304L6.16857 27.1353L11.8963 18.5357L4.14343 25.3659L11.3147 17.9273L2.46675 23.2635L10.851 17.2248L1.19244 20.8954L10.5201 16.4508L0.361433 18.3378L10.3328 15.6302L0.000455856 15.673L10.2951 14.7894L0.121105 12.9865L10.4081 13.9553L0.719503 10.3647L10.6682 13.1547L1.77642 7.89197L11.067 12.4135L3.25788 5.64765L11.5918 11.7555L5.11627 3.70393L12.2257 11.2017L7.29186 2.12327L12.9483 10.77L9.71473 0.956477L13.7363 10.4742L12.307 0.241056L14.5645 10.3239L14.9854 0Z" fill="#A43033"/>
                        </svg>
                        <p>{{ currentNewsItem.type === 'article' ? 'Статья' : 'Мероприятие' }} · {{ currentNewsItem.date }}</p>
                    </div>
                    <h3 class="popup-content__text-content__title">{{ currentNewsItem.title }}</h3>
                    <template v-for="(contentItem, index) in currentNewsItem.desc" :key="index">
                        <p v-if="contentItem.type === 'desc'" :class="contentItem.margin">{{ contentItem.value }}</p>
                        <img v-else-if="contentItem.type === 'img'" :src="contentItem.value" alt="Фото из статьи" :class="`${contentItem.margin} popup-content__text-content__img`">
                    </template>
                </div>
            </div>
            <div class="watch-more">
                <h3 class="watch-more__title">Смотрите также</h3>
                <div class="news-swiper-container">

                    <client-only>
                        <Swiper :slides-per-view="4" :space-between="10"
                                :watch-overflow="true"
                                :observer="true" :observe-parents="true"
                        >
                            <SwiperSlide v-for="item in itemsWithPlaceholders" :key="item.id">
                                <div class="item-swiper" :class="{ 'item-swiper--empty': (item as any).isEmpty }">
                                    <img v-if="!(item as any).isEmpty && item.desc.find((d: NewsTextItem) => d.type === 'img')" 
                                         class="item-swiper__img" 
                                         :src="item.desc.find((d: NewsTextItem) => d.type === 'img')?.value || '/img/news-img.png'" 
                                         alt="Новость">
                                    <div v-if="!(item as any).isEmpty" class="item-swiper__texts">
                                        <div class="item-swiper__texts-small">
                                            <div class="item-swiper__texts-extra-small">
                                                <div class="item-swiper__date">{{ item.date }}</div>
                                                <h3 class="item-swiper__title">{{ item.title }}</h3>
                                            </div>
                                            <p class="item-swiper__desc">{{ item.desc.find((d: NewsTextItem) => d.type === 'desc')?.value || '' }}</p>
                                        </div>
                                        <button class="item-swiper__button" @click="handleOpenRelated(item)">Подробнее</button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </client-only>
                </div>
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

<style lang="scss" scoped>
    .item-swiper--empty {
        visibility: hidden;
        pointer-events: none;
    }

    .popup-scroll-to-top {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        z-index: 101;

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
</style>