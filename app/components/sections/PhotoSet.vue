<script setup lang="ts">
    import { Swiper, SwiperSlide } from 'swiper/vue'
    import 'swiper/css'
    import { Navigation } from 'swiper/modules'
    import 'swiper/css/navigation'
    const modules = [Navigation]
</script>

<template>
    <section id="photoalbum" class="container">
        <div class="photoset">
            <div class="photoset__title-block">
                <h2 class="photoset__title fs-4">Фотоотчет</h2>
                <p class="photoset__desc fs-1-5625">Наш проект — площадка для коммуникации <br>
                    молодежи и старшего поколения и передачи бесценного <br> исторического опыта через формы современного искусства</p>
            </div>
            <div class="photoset__category">
                <div class="category-item">
                    <div class="category-item__container">
                        <svg class="category-item__svg" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.12464 12.8016L3.82339 9.50036L2.69922 10.6166L7.12464 15.042L16.6246 5.54203L15.5084 4.42578L7.12464 12.8016Z" fill="#A43033"/>
                        </svg>
                    </div>
                    <p class="category-item__text fs-1-5625">Туризм</p>
                </div>
                <div class="category-item">
                    <div class="category-item__container">
                        <svg class="category-item__svg" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.12464 12.8016L3.82339 9.50036L2.69922 10.6166L7.12464 15.042L16.6246 5.54203L15.5084 4.42578L7.12464 12.8016Z" fill="#A43033"/>
                        </svg>
                    </div>
                    <p class="category-item__text fs-1-5625">Образование</p>
                </div>
                <div class="category-item">
                    <div class="category-item__container">
                        <svg class="category-item__svg" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.12464 12.8016L3.82339 9.50036L2.69922 10.6166L7.12464 15.042L16.6246 5.54203L15.5084 4.42578L7.12464 12.8016Z" fill="#A43033"/>
                        </svg>
                    </div>
                    <p class="category-item__text fs-1-5625">Коммуникации</p>
                </div>
                <div class="category-item">
                    <div class="category-item__container">
                        <svg class="category-item__svg" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.12464 12.8016L3.82339 9.50036L2.69922 10.6166L7.12464 15.042L16.6246 5.54203L15.5084 4.42578L7.12464 12.8016Z" fill="#A43033"/>
                        </svg>
                    </div>
                    <p class="category-item__text fs-1-5625">Развлечения</p>
                </div>
            </div>
        </div>
        <ItemsCanScroll style="margin-top: 2.625rem;" />
    </section>


    <div class="photoset__swiper">
        <div class="left-blur desktop"></div>
        <div class="right-blur desktop"></div>

        <button class="prev-photo desktop" aria-label="Предыдущие">
            <svg width="10" height="19" viewBox="0 0 10 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.58384 1.58109C9.66838 1.49162 9.73448 1.38638 9.77835 1.27138C9.82222 1.15637 9.84301 1.03385 9.83952 0.910809C9.83604 0.787769 9.80836 0.666618 9.75806 0.554276C9.70776 0.441933 9.63582 0.340598 9.54636 0.256056C9.4569 0.171515 9.35166 0.105422 9.23665 0.0615523C9.12164 0.0176824 8.99912 -0.00310581 8.87608 0.000374834C8.75304 0.00385547 8.63189 0.0315367 8.51955 0.0818379C8.4072 0.132139 8.30587 0.204076 8.22133 0.29354L0.256144 8.72726C0.0916524 8.90125 0 9.1316 0 9.37104C0 9.61047 0.0916524 9.84082 0.256144 10.0148L8.22133 18.4495C8.30531 18.5409 8.40662 18.6147 8.51938 18.6667C8.63214 18.7186 8.75409 18.7476 8.87815 18.752C9.00222 18.7564 9.12592 18.7361 9.24208 18.6923C9.35824 18.6485 9.46453 18.5821 9.55479 18.4969C9.64505 18.4116 9.71748 18.3093 9.76786 18.1958C9.81824 18.0824 9.84558 17.96 9.84828 17.8359C9.85099 17.7118 9.829 17.5884 9.78361 17.4729C9.73821 17.3573 9.67031 17.2519 9.58384 17.1629L2.22589 9.37104L9.58384 1.58109Z" fill="#650F11"/>
            </svg>
        </button>
        <button class="next-photo desktop" aria-label="Следующие">
            <svg width="10" height="19" viewBox="0 0 10 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.58384 1.58109C9.66838 1.49162 9.73448 1.38638 9.77835 1.27138C9.82222 1.15637 9.84301 1.03385 9.83952 0.910809C9.83604 0.787769 9.80836 0.666618 9.75806 0.554276C9.70776 0.441933 9.63582 0.340598 9.54636 0.256056C9.4569 0.171515 9.35166 0.105422 9.23665 0.0615523C9.12164 0.0176824 8.99912 -0.00310581 8.87608 0.000374834C8.75304 0.00385547 8.63189 0.0315367 8.51955 0.0818379C8.4072 0.132139 8.30587 0.204076 8.22133 0.29354L0.256144 8.72726C0.0916524 8.90125 0 9.1316 0 9.37104C0 9.61047 0.0916524 9.84082 0.256144 10.0148L8.22133 18.4495C8.30531 18.5409 8.40662 18.6147 8.51938 18.6667C8.63214 18.7186 8.75409 18.7476 8.87815 18.752C9.00222 18.7564 9.12592 18.7361 9.24208 18.6923C9.35824 18.6485 9.46453 18.5821 9.55479 18.4969C9.64505 18.4116 9.71748 18.3093 9.76786 18.1958C9.81824 18.0824 9.84558 17.96 9.84828 17.8359C9.85099 17.7118 9.829 17.5884 9.78361 17.4729C9.73821 17.3573 9.67031 17.2519 9.58384 17.1629L2.22589 9.37104L9.58384 1.58109Z" fill="#650F11"/>
            </svg>
        </button>

        <client-only>
            <Swiper :modules="modules" 
                    :slides-per-view="1.1"
                    :space-between="5"
                    :breakpoints="{
                        769: {
                            slidesPerView: 3,
                            spaceBetween: 10
                        }
                    }"
                    :loop="true"
                    :observer="true" 
                    :observe-parents="true"
                    :navigation="{ nextEl: '.next-photo', prevEl: '.prev-photo' }">
                <SwiperSlide>
                    <img class="photoset__swiper__img" src="/img/photo1.png" alt="Фото" />
                </SwiperSlide>
                <SwiperSlide>
                    <img class="photoset__swiper__img" src="/img/photo2.png" alt="Фото" />
                </SwiperSlide>
                <SwiperSlide>
                    <img class="photoset__swiper__img" src="/img/photo7.jpeg" alt="Фото" />
                </SwiperSlide>
                <SwiperSlide>
                    <img class="photoset__swiper__img" src="/img/photo3.jpg" alt="Фото" />
                </SwiperSlide>
                <SwiperSlide>
                    <img class="photoset__swiper__img" src="/img/photo5.jpg" alt="Фото" />
                </SwiperSlide>
                <SwiperSlide>
                    <img class="photoset__swiper__img" src="/img/photo4.jpg" alt="Фото" />
                </SwiperSlide>
                <SwiperSlide>
                    <img class="photoset__swiper__img" src="/img/photo6.jpeg" alt="Фото" />
                </SwiperSlide>
                <SwiperSlide>
                    <img class="photoset__swiper__img" src="/img/photo8.jpg" alt="Фото" />
                </SwiperSlide>
                <SwiperSlide>
                    <img class="photoset__swiper__img" src="/img/photo10.jpg" alt="Фото" />
                </SwiperSlide>
                <SwiperSlide>
                    <img class="photoset__swiper__img" src="/img/photo9.jpg" alt="Фото" />
                </SwiperSlide>
            </Swiper>
        </client-only>
    </div>
</template>

<style lang="scss" scoped>
    .photoset {
        margin-top: 12.5rem;

        display: flex;
        flex-direction: column;
        gap: 3.75rem;

        @include mobile {
            margin-top: 6.25rem;
            gap: 1.875rem;
        }

        &__title-block {
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
            align-items: center;
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

        &__desc {
            width: 44.8125rem;
            text-align: center;
            letter-spacing: -0.0625rem;

            @include mobile {
                width: 100%;
                letter-spacing: -0.0375rem;
            }
        }

        &__category {
            display: flex;
            justify-content: center;
            gap: 7.5rem;
            
            @include mobile {
                flex-wrap: wrap;
                gap: 1rem;
            }

            .category-item {
                display: flex;
                align-items: center;
                gap: 0.8125rem;
                &__container {
                    width: 1.875rem;
                    height: 1.875rem;
                
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    border-radius: 100%;
                    background-color: #A430331A;

                    @include mobile {
                        width: 1.5rem;
                        height: 1.5rem;
                    }
                }
                &__svg {
                    width: 1.1875rem;
                    height: 1.1875rem;

                    @include mobile {
                        width: 0.95rem;
                        height: 0.95rem;
                    }
                
                }
                &__text {
                    letter-spacing: -0.0825rem;
                    color: #2E2D2D;

                    @include mobile {
                        letter-spacing: -0.0375rem;
                    }
                }
            }
        }

    }
    .swiper {
        margin-top: 3.75rem;
        padding: 0px 3.75rem;
        @include mobile {
            padding: 0rem;
            padding-left: 0.75rem;
        }
    }
    .photoset__swiper {
        position: relative;
        &__img {
            width: 100%;
            // height: fit-content;
            border-radius: 0.625rem;
        }
    }
    .prev-photo, .next-photo {
        width: 2.1875rem;
        height: 5.125rem;

        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 15;
    
        border-radius: 0.3125rem;
        background-color: #E5E0D9;

        display: flex;
        align-items: center;
        justify-content: center;

        cursor: pointer;
        border: none;
    }

    .prev-photo {
        left: 20px;
    }

    .next-photo {
        transform: translateY(-50%) rotate(180deg);
        right: 20px;
    }

    .left-blur {
        width: 11.5rem;
        height: 100%;

        background: linear-gradient(270deg, #F8F8F400 0%, #F8F8F4FF 100%);

        position: absolute;
        left: -3.75rem;
        top: 0rem;

        z-index: 10;
        pointer-events: none;
    }

    .right-blur {
        width: 11.5rem;
        height: 100%;

        background: linear-gradient(90deg, #F8F8F400 0%, #F8F8F4FF 100%);

        position: absolute;
        right: -3.75rem;
        top: 0rem;

        z-index: 10;
        pointer-events: none;
    }
</style>