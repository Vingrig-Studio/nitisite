<script setup lang="ts">
    import { computed } from 'vue'
    import { usePopup } from '~/composable/usePopup';
    import { useShare } from '~/composable/useShare';
    import { useNews, type NewsTextItem } from '~/composable/useNews';
    import { Swiper, SwiperSlide } from 'swiper/vue'
    import 'swiper/css'

    const { popupState, setOpen } = usePopup()
    const { shareLink } = useShare()
    const { allNewsItems, getNewsById } = useNews()
    
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
            shareLink('event', String(currentNewsItem.value.id))
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
        <dialog v-if="popupState.isOpen && popupState.popupType === 'event'" class="popup-content">
            <div class="popup-content__content">
            <div class="popup-content__header">
                <div class="popup-content__header__item" @click="setOpen('', false)">
                    <svg class="popup-content__header__item__back" width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.767578 8.35352C0.596225 8.52495 0.5 8.75761 0.5 9C0.5 9.24239 0.596225 9.47505 0.767578 9.64648L8.41406 17.293L9.70703 16L2.70703 9L9.70703 2L8.41406 0.707031L0.767578 8.35352Z" fill="#2E2D2D" stroke="black"/>
                    </svg>
                    <p>Назад</p>
                </div>
                <h2 class="popup-content__header__title">Новости и мероприятия 1</h2>
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

                <div class="form-container" v-if="currentNewsItem">
                    <div class="form-container__text-block">
                        <h3 class="form-container__text-block__title">Запишитесь на мероприятие</h3>
                        <p class="form-container__text-block__desc">Дата проведения: {{ currentNewsItem.date }}</p>
                    </div>
                    
                    <form class="form-block">
                        <p class="form-block__title">Запишитесь на экскурсию по Арамильской суконной фабрике!</p>
                        
                        <div class="form-block__form">
                            <div class="form-block__form__inputs">
                                <label class="input-label" for="name">
                                    <input 
                                        placeholder="Как Вас зовут?" 
                                        type="text" 
                                        name="name"
                                        id="name"
                                        required
                                    >
                                </label>
                                <label class="input-phone" for="phone">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18 13.5C18 14.0304 17.7893 14.5391 17.4142 14.9142C17.0391 15.2893 16.5304 15.5 16 15.5H2C1.46957 15.5 0.960859 15.2893 0.585786 14.9142C0.210714 14.5391 0 14.0304 0 13.5V11.5H18V13.5Z" fill="#CE2028"/>
                                        <path d="M0 6.5H18V11.5H0V6.5Z" fill="#22408C"/>
                                        <path d="M16 2.5H2C1.46957 2.5 0.960859 2.71071 0.585786 3.08579C0.210714 3.46086 0 3.96957 0 4.5L0 6.5H18V4.5C18 3.96957 17.7893 3.46086 17.4142 3.08579C17.0391 2.71071 16.5304 2.5 16 2.5Z" fill="#EEEEEE"/>
                                    </svg>
                                    <p class="input-phone__first-number">+7</p>
                                    <input 
                                        ref="phoneInput"
                                        placeholder="(999) 999-99-99" 
                                        type="tel" 
                                        name="phone"
                                        id="phone"
                                        required
                                    >
                                </label>
                                <label class="input-label" for="email">
                                    <input 
                                        placeholder="Электронная почта" 
                                        type="email" 
                                        name="email"
                                        id="email"
                                        required
                                    >
                                </label>
                            </div>
                            <button 
                                type="submit" 
                                class="form-block__button"
                            >
                                <p class="form-block__button__text">
                                    Отправить заявку
                                </p>
                                <div class="form-block__button__svg-cont">
                                    <svg width="18" height="8" viewBox="0 0 18 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.3536 4.03568C17.5488 3.84042 17.5488 3.52384 17.3536 3.32857L14.1716 0.146594C13.9763 -0.0486684 13.6597 -0.0486684 13.4645 0.146594C13.2692 0.341856 13.2692 0.658438 13.4645 0.853701L16.2929 3.68213L13.4645 6.51055C13.2692 6.70582 13.2692 7.0224 13.4645 7.21766C13.6597 7.41292 13.9763 7.41292 14.1716 7.21766L17.3536 4.03568ZM0 3.68213L4.45108e-08 4.18213L17 4.18213L17 3.68213L17 3.18213L-4.45108e-08 3.18213L0 3.68213Z" fill="white"/>
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </form>
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
                                         :src="item.desc.find((d: NewsTextItem) => d.type === 'img')?.value || '../../assets/img/news-img.png'" 
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
</template>

<style lang="scss" scoped>
    .form-container {

        margin-top: 3.125rem;
        margin-bottom: 3.125rem;

        display: flex;
        flex-direction: column;
        gap: 2.375rem;

        &__text-block {
            display: flex;
            flex-direction: column;
            gap: 0.625rem;

            &__title {
                font-size: 2rem;
                letter-spacing: -0.0625rem;
                color: #171717;
                font-weight: 400;
            }

            &__desc {
                font-size: 1.25rem;
                color: #2e2d2d;
                line-height: 130%;
                letter-spacing: 0.0125rem;
                font-weight: 400;
            }
        }
    }

    .item-swiper--empty {
        visibility: hidden;
        pointer-events: none;
    }
</style>