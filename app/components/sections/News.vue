<script setup lang="ts">
    import { ref, computed } from 'vue'
    import { Swiper, SwiperSlide } from 'swiper/vue'
    import 'swiper/css'
    import { Navigation } from 'swiper/modules'
    import 'swiper/css/navigation'
    import { usePopup } from '~/composable/usePopup'
    import { useNews, type NewsTextItem } from '~/composable/useNews'

    const modules = [Navigation]
    const { setOpen } = usePopup()
    const { getFilteredNews, getNewsById } = useNews()

    const activeFilter = ref<'all' | 'articles' | 'events'>('all')

    const filteredNewsItems = computed(() => {
        return getFilteredNews(activeFilter.value)
    })

    const itemsWithPlaceholders = computed(() => {
        const items = filteredNewsItems.value
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

    const swiperBreakpoints = computed(() => {
        return {
            769: {
                slidesPerView: 'auto',
                spaceBetween: 10
            }
        }
    })

    const handleFilterChange = (filter: 'all' | 'articles' | 'events') => {
        activeFilter.value = filter
    }

    const handleOpenPopup = (item: { id: number, type: 'article' | 'event' }) => {
        if ((item as any).isEmpty || item.id < 0) return
        const newsItem = getNewsById(item.id)
        setOpen(item.type, true, undefined, newsItem || null)
    }
</script>

<template>
    <section id="events" class="container">
        <div class="news">
            <h2 class="news__title fs-4">Новости и события</h2>
            <ItemsCanScroll />
            <div class="news__content">
                <div class="news__content__category">
                    <button 
                        class="item-category fs-1" 
                        :class="{ active: activeFilter === 'all' }"
                        @click="handleFilterChange('all')">
                        Все
                    </button>
                    <button 
                        class="item-category fs-1"
                        :class="{ active: activeFilter === 'articles' }"
                        @click="handleFilterChange('articles')">
                        Статьи
                    </button>
                    <button 
                        class="item-category fs-1"
                        :class="{ active: activeFilter === 'events' }"
                        @click="handleFilterChange('events')">
                        Мероприятия
                    </button>
                </div>
                <div class="news__swiper news-swiper-container">

                    <div class="left-blur desktop"></div>
                    <div class="right-blur desktop"></div>

                    <button class="prev desktop" aria-label="Предыдущие">
                        <svg width="10" height="19" viewBox="0 0 10 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.58384 1.58109C9.66838 1.49162 9.73448 1.38638 9.77835 1.27138C9.82222 1.15637 9.84301 1.03385 9.83952 0.910809C9.83604 0.787769 9.80836 0.666618 9.75806 0.554276C9.70776 0.441933 9.63582 0.340598 9.54636 0.256056C9.4569 0.171515 9.35166 0.105422 9.23665 0.0615523C9.12164 0.0176824 8.99912 -0.00310581 8.87608 0.000374834C8.75304 0.00385547 8.63189 0.0315367 8.51955 0.0818379C8.4072 0.132139 8.30587 0.204076 8.22133 0.29354L0.256144 8.72726C0.0916524 8.90125 0 9.1316 0 9.37104C0 9.61047 0.0916524 9.84082 0.256144 10.0148L8.22133 18.4495C8.30531 18.5409 8.40662 18.6147 8.51938 18.6667C8.63214 18.7186 8.75409 18.7476 8.87815 18.752C9.00222 18.7564 9.12592 18.7361 9.24208 18.6923C9.35824 18.6485 9.46453 18.5821 9.55479 18.4969C9.64505 18.4116 9.71748 18.3093 9.76786 18.1958C9.81824 18.0824 9.84558 17.96 9.84828 17.8359C9.85099 17.7118 9.829 17.5884 9.78361 17.4729C9.73821 17.3573 9.67031 17.2519 9.58384 17.1629L2.22589 9.37104L9.58384 1.58109Z" fill="#650F11"/>
                        </svg>
                    </button>
                    <button class="next desktop" aria-label="Следующие">
                        <svg width="10" height="19" viewBox="0 0 10 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.58384 1.58109C9.66838 1.49162 9.73448 1.38638 9.77835 1.27138C9.82222 1.15637 9.84301 1.03385 9.83952 0.910809C9.83604 0.787769 9.80836 0.666618 9.75806 0.554276C9.70776 0.441933 9.63582 0.340598 9.54636 0.256056C9.4569 0.171515 9.35166 0.105422 9.23665 0.0615523C9.12164 0.0176824 8.99912 -0.00310581 8.87608 0.000374834C8.75304 0.00385547 8.63189 0.0315367 8.51955 0.0818379C8.4072 0.132139 8.30587 0.204076 8.22133 0.29354L0.256144 8.72726C0.0916524 8.90125 0 9.1316 0 9.37104C0 9.61047 0.0916524 9.84082 0.256144 10.0148L8.22133 18.4495C8.30531 18.5409 8.40662 18.6147 8.51938 18.6667C8.63214 18.7186 8.75409 18.7476 8.87815 18.752C9.00222 18.7564 9.12592 18.7361 9.24208 18.6923C9.35824 18.6485 9.46453 18.5821 9.55479 18.4969C9.64505 18.4116 9.71748 18.3093 9.76786 18.1958C9.81824 18.0824 9.84558 17.96 9.84828 17.8359C9.85099 17.7118 9.829 17.5884 9.78361 17.4729C9.73821 17.3573 9.67031 17.2519 9.58384 17.1629L2.22589 9.37104L9.58384 1.58109Z" fill="#650F11"/>
                        </svg>
                    </button>

                    <client-only>
                        <Swiper :modules="modules" 
                                :slides-per-view="'auto'"
                                :space-between="10"
                                :breakpoints="swiperBreakpoints"
                                :watch-overflow="true"
                                :centered-slides="false"
                                :navigation="{ nextEl: '.next', prevEl: '.prev' }">
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
                                                <h3 class="item-swiper__title fs-1-5">{{ item.title }}</h3>
                                            </div>
                                            <p class="item-swiper__desc fs-0-875">{{ item.desc.find((d: NewsTextItem) => d.type === 'desc')?.value || '' }}</p>
                                        </div>
                                        <button class="item-swiper__button fs-1" @click="handleOpenPopup(item)">Подробнее</button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </client-only>
                    <PopupArticle />
                    <PopupEvent />
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
    .news {
        margin-top: 12.5rem;

        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.875rem;

        @include mobile {
            margin-top: 6.25rem;
        }

        &__title {
            @include gardenia;
            color: #171717;
            // font-weight: 100;
            // text-transform: uppercase;
            @include mobile {
                font-weight: 500;
            }
        }

        &__content {
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
            
            @include mobile {
                overflow: visible;
            }

            &__category {
                display: flex;
                align-items: center;
                gap: 0.75rem;

                margin-inline: auto;
                
                @include mobile {
                    width: 100%;
                    margin: 0rem;
                    padding-left: 0.75rem;
                    overflow-x: scroll;
                    scrollbar-width: none;
                }
                
                .item-category {
                    padding: 0.9375rem 1.5938rem;

                    color: #171717;
                    
                    background-color: #EDEDE6;
                    border-radius: 31.25rem;
                }
                .active {
                    background-color: #460000;
                    color: #FFFFFF;
                }
            }
        }
    }

    .item-swiper--empty {
        visibility: hidden;
        pointer-events: none;
    }

    :deep(.swiper-slide) {
        width: 20.125rem !important;
        flex-shrink: 0;
        flex-basis: 20.125rem;
    }

    @include mobile {
        :deep(.swiper-slide) {
            width: 20.4375rem !important;
            flex-basis: 20.4375rem;
        }
    }

    :deep(.item-swiper__title) {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1.3;
        min-height: 2.6em;
        height: 2.6em;
    }
</style>