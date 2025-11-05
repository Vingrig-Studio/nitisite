<template>
    <section class="container">
        <div class="category">
            <div class="category__item">
                <p class="category__item__text">Экскурсии</p>
                <div class="category__item__check">
                    <svg class="category__item__check__svg" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.12464 12.8011L3.82339 9.49988L2.69922 10.6161L7.12464 15.0415L16.6246 5.54154L15.5084 4.42529L7.12464 12.8011Z" fill="#A43033"/>
                    </svg>
                </div>
            </div>
            <div class="category__item">
                <p class="category__item__text">Фестивали</p>
                <div class="category__item__check">
                    <svg class="category__item__check__svg" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.12464 12.8011L3.82339 9.49988L2.69922 10.6161L7.12464 15.0415L16.6246 5.54154L15.5084 4.42529L7.12464 12.8011Z" fill="#A43033"/>
                    </svg>
                </div>
            </div>
            <div class="category__item">
                <p class="category__item__text">Музей</p>
                <div class="category__item__check">
                    <svg class="category__item__check__svg" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.12464 12.8011L3.82339 9.49988L2.69922 10.6161L7.12464 15.0415L16.6246 5.54154L15.5084 4.42529L7.12464 12.8011Z" fill="#A43033"/>
                    </svg>
                </div>
            </div>
            <div class="category__item">
                <p class="category__item__text">Культурный центр</p>
                <div class="category__item__check">
                    <svg class="category__item__check__svg" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.12464 12.8011L3.82339 9.49988L2.69922 10.6161L7.12464 15.0415L16.6246 5.54154L15.5084 4.42529L7.12464 12.8011Z" fill="#A43033"/>
                    </svg>
                </div>
            </div>
            <div class="category__item span-2">
                <p class="category__item__text">Арт-пространство</p>
                <div class="category__item__check">
                    <svg class="category__item__check__svg" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.12464 12.8011L3.82339 9.49988L2.69922 10.6161L7.12464 15.0415L16.6246 5.54154L15.5084 4.42529L7.12464 12.8011Z" fill="#A43033"/>
                    </svg>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
    .category {
        width: 100%;

        margin-top: 0.625rem;

        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 0.625rem;

        @include mobile {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.3125rem;
        }

        &__item {
            width: 100%;
            height: 9.4375rem;

            padding: 1.875rem 2.5rem;  

            border-radius: 0.625rem;
            position: relative;
            background-color: #EDEDE6;

            display: flex;
            justify-content: start;
            align-items: end;

            position: relative;
            z-index: 10;

            @include mobile {
                height: 4.3125rem;

                padding: 0.9375rem 1.25rem;
            }

            &__text {
                font-size: 1.25rem;
                letter-spacing: -0.0375rem;
                color: #171717;

                @include mobile {
                    font-size: 1rem;
                    letter-spacing: -0.0313rem;
                }
            }
            &__check {
                width: 1.875rem;
                height: 1.875rem;

                position: absolute;
                top: 1.25rem;
                right: 1.25rem;

                background-color: #A430331A;
                border-radius: 100%;

                display: flex;
                justify-content: center;
                align-items: center;

                @include mobile {
                    top: 0.625rem;
                    right: 0.625rem;

                    min-width: 1.5rem;
                    min-height: 1.5rem;

                    width: 1.5rem;
                    height: 1.5rem;
                }
            }
            &__svg {
                width: 1.1875rem;
                height: 1.1875rem;
            
                @include mobile {
                    min-width: 0.95rem;
                    min-height: .95rem;
                }
            }
        }

        .span-2 {
            @include mobile {
                grid-column: span 2;
            }
        }
    }
</style>