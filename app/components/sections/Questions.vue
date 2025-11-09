<script setup lang="ts">
    import { ref } from 'vue'
    
    const openItems = ref<boolean[]>([])
    
    const toggleItem = (index: number) => {
        openItems.value[index] = !openItems.value[index]
    }
    
    const questions = [
        {
            question: 'Для кого будет интересен проект?',
            questionFirstWord: 'Для кого',
            answer: 'Арамильская суконная фабрика братьев Злоказовых — представителей богатой купеческой семьи Урала — была основана в середине XIX века и за свою долгую историю пережила немало подъемов и спадов.  Одним из самых ярких эпизодов в жизни производства было изготовление суконной ткани для солдатских шинелей в годы Великой Отечественной войны. Женщины работали круглосуточно, в несколько смен, без остановки оборудования. В 1990-е годы фабрика разорилась. Долгое время она переходила из рук в руки и медленно ветшала. В память о трудовом подвиге арамильцев рядом с фабрикой в 2013 году установили единственный в мире памятник шинели. А в 2021 году совместно с Арамильским краеведческим музеем был создан проект Нити х Нити, призванный сохранить наследие Арамильской суконной фабрики.'
        }
    ]
</script>

<template>
    <section class="container">
        <div class="questions">
            <h2 class="questions__title fs-4">Частые вопросы</h2>
            <div class="questions__content">
                <div v-for="(item, index) in questions" :key="index" class="item-question">
                    <div class="item-question__top" @click="toggleItem(index)">
                        <p class="title fs-1-25">
                            <span class="red">{{ item.questionFirstWord }}</span> {{ item.question.replace(item.questionFirstWord, '').trim() }}
                        </p>
                        <div class="svg-cont" :class="{ active: openItems[index] }">
                            <svg v-if="!openItems[index]" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 12.998H13V17.998C13 18.2633 12.8946 18.5176 12.7071 18.7052C12.5196 18.8927 12.2652 18.998 12 18.998C11.7348 18.998 11.4804 18.8927 11.2929 18.7052C11.1054 18.5176 11 18.2633 11 17.998V12.998H6C5.73478 12.998 5.48043 12.8927 5.29289 12.7052C5.10536 12.5176 5 12.2633 5 11.998C5 11.7328 5.10536 11.4785 5.29289 11.2909C5.48043 11.1034 5.73478 10.998 6 10.998H11V5.99805C11 5.73283 11.1054 5.47848 11.2929 5.29094C11.4804 5.1034 11.7348 4.99805 12 4.99805C12.2652 4.99805 12.5196 5.1034 12.7071 5.29094C12.8946 5.47848 13 5.73283 13 5.99805V10.998H18C18.2652 10.998 18.5196 11.1034 18.7071 11.2909C18.8946 11.4785 19 11.7328 19 11.998C19 12.2633 18.8946 12.5176 18.7071 12.7052C18.5196 12.8927 18.2652 12.998 18 12.998Z" fill="#A43033"/>
                            </svg>
                            <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 12.998H6C5.73478 12.998 5.48043 12.8927 5.29289 12.7052C5.10536 12.5176 5 12.2633 5 11.998C5 11.7328 5.10536 11.4785 5.29289 11.2909C5.48043 11.1034 5.73478 10.998 6 10.998H18C18.2652 10.998 18.5196 11.1034 18.7071 11.2909C18.8946 11.4785 19 11.7328 19 11.998C19 12.2633 18.8946 12.5176 18.7071 12.7052C18.5196 12.8927 18.2652 12.998 18 12.998Z" fill="#A43033"/>
                            </svg>
                        </div>
                    </div>
                    <div class="item-question__content" :class="{ active: openItems[index] }">
                        <p class="item-question__answer fs-0-875">{{ item.answer }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
    .questions {
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
            color: #000;
            // font-weight: 100;
            // text-transform: uppercase;
            @include mobile {
                font-weight: 400;
                letter-spacing: -0.1187rem;
            }
        }
        &__content {
            max-width: 41rem;
            display: flex;
            flex-direction: column;
            gap: 1.25rem;

            .item-question {
                width: 41rem;
                padding: 0.9375rem 1.3125rem 0.9375rem 2.25rem;

                background-color: #EDEDE6;
                border-radius: 0.625rem;

                @include mobile {
                    width: 100%;

                    padding: 0.625rem 0.4375rem 1.4375rem 1rem;
                }
                &__top {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    cursor: pointer;
                
                    .title {
                        letter-spacing: -0.0375rem;
                        color: #171717;

                        @include mobile {
                            letter-spacing: -0.025rem;

                            padding-top: 0.8125rem;
                        }
                    }
                    .red {
                        color: #A43033;
                    }

                    .svg-cont {
                        width: 2.8125rem;
                        height: 2.8125rem;
                    
                        background-color:  rgba(164, 48, 51, 0.1);
                        border-radius: 100%;
                     
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        
                        svg {
                            width: 1.5rem;
                            height: 1.5rem;
                            transition: opacity 0.3s ease;
                        }
                    }
                }
                
                &__content {
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.3s ease, padding 0.3s ease;
                    padding-top: 0;
                    
                    &.active {
                        max-height: 500px;
                        padding-top: 1.25rem;
                    }
                }
                
                &__answer {
                    line-height: 130%;
                    color: #171717;
                    padding-bottom: 0.5rem;

                    @include mobile {
                        letter-spacing: 0.0063rem;
                    }
                }
            }
        }
    }
</style>