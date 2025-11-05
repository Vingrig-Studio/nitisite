<script setup lang="ts">
    import { usePopup } from '~/composable/usePopup';

    const { popupState, setOpen } = usePopup()

    const sendData = ref<boolean>(false)

    useHead({
        script: [
            {
                src: 'https://forms.yandex.ru/_static/embed.js',
                defer: true
            }
        ]
    })

</script>

<template>
    <Transition name="dialog-fade">
        <dialog v-if="!sendData && popupState.isOpen && popupState.popupType === 'form'" class="dialog">
            <button class="close-button" @click="setOpen('', false)">
            <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M34.0959 20.8966L28.5962 26.3963L34.0959 31.896C34.3876 32.1878 34.5515 32.5834 34.5515 32.996C34.5515 33.4085 34.3876 33.8042 34.0959 34.0959C33.8042 34.3876 33.4085 34.5515 32.9959 34.5515C32.5834 34.5515 32.1877 34.3876 31.896 34.0959L26.3963 28.5962L20.8966 34.0959C20.6048 34.3877 20.2092 34.5515 19.7966 34.5515C19.3841 34.5515 18.9884 34.3877 18.6967 34.0959C18.405 33.8042 18.2411 33.4085 18.2411 32.996C18.2411 32.5834 18.405 32.1878 18.6967 31.896L24.1964 26.3963L18.6967 20.8966C18.405 20.6049 18.2411 20.2092 18.2411 19.7967C18.2411 19.3841 18.405 18.9884 18.6967 18.6967C18.9884 18.405 19.3841 18.2411 19.7966 18.2411C20.2092 18.2411 20.6048 18.405 20.8966 18.6967L26.3963 24.1964L31.896 18.6967C32.1877 18.405 32.5834 18.2411 32.9959 18.2411C33.4085 18.2411 33.8042 18.405 34.0959 18.6967C34.3876 18.9884 34.5515 19.3841 34.5515 19.7967C34.5515 20.2092 34.3876 20.6049 34.0959 20.8966Z" fill="white"/>
            </svg>
        </button>
        <img class="dialog__img" src="../../assets/img/dialog.png" alt="Фото диалогового окна">
        <div class="dialog__text-block">
            <h2 class="dialog__text-block__title">Заявка</h2>
            <p class="dialog__text-block__desc">Запишитесь на экскурсию <br> по Арамильской суконной фабрике!</p>
        </div>
        <!-- <form class="form-block">
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
                    <p class="form-block__button__text">Отправить заявку</p>
                    <div class="form-block__button__svg-cont">
                        <svg width="18" height="8" viewBox="0 0 18 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.3536 4.03568C17.5488 3.84042 17.5488 3.52384 17.3536 3.32857L14.1716 0.146594C13.9763 -0.0486684 13.6597 -0.0486684 13.4645 0.146594C13.2692 0.341856 13.2692 0.658438 13.4645 0.853701L16.2929 3.68213L13.4645 6.51055C13.2692 6.70582 13.2692 7.0224 13.4645 7.21766C13.6597 7.41292 13.9763 7.41292 14.1716 7.21766L17.3536 4.03568ZM0 3.68213L4.45108e-08 4.18213L17 4.18213L17 3.68213L17 3.18213L-4.45108e-08 3.18213L0 3.68213Z" fill="white"/>
                        </svg>
                    </div>
                </button>
            </div>
        </form>
        <p class="dialog__policity">
            Отправляя заявку, Вы соглашаетесь с нашей <span class="red">Политикой конфиденциальности</span>
        </p> -->
        <div class="form-block">
            <iframe 
                src="https://forms.yandex.ru/u/68fdf22f90fa7b7457cf8339?iframe=1" 
                frameborder="0" 
                name="ya-form-68fdf22f90fa7b7457cf8339" 
                width="650"
                class="yandex-form"
            ></iframe>
        </div>
        </dialog>

    </Transition>

    <!-- <Transition name="dialog-fade">
        <dialog class="sucsses" v-if="sendData && popupState.isOpen && popupState.popupType === 'form'">
            <div class="sucsses__content">
                <div class="sucsses__svg-cont">
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.12464 12.8016L3.82339 9.50036L2.69922 10.6166L7.12464 15.042L16.6246 5.54203L15.5084 4.42578L7.12464 12.8016Z" fill="#378D18"/>
                    </svg>
                </div>
                <div class="sucsses__text-block">
                    <h2 class="sucsses__text-block__title">Успешно!</h2>
                    <p class="sucsses__text-block__desc">Ваша заявка успешно отправлена. <br> Мы свяжемся с вами в ближайшее время!</p>
                </div>
                <button class="sucsses__button" @click="setOpen('', false)">ок</button>
            </div>
        </dialog>
    </Transition> -->

    <Transition name="backdrop-fade">
        <div v-if="popupState.isOpen && popupState.popupType === 'form'" class="inset" @click="setOpen('', false)"></div>
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
        width: 41rem;
        padding: 0.625rem 0.625rem 3.75rem 0.625rem;

        display: flex;
        flex-direction: column;
        align-items: center;

        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        
        transition: opacity 0.3s ease, transform 0.3s ease;
        &__img {
            width: 100%;
            height: 11.25rem;
        }
        &__text-block {
            margin-top: 2rem;

            display: flex;
            flex-direction: column;
            gap: 0.625rem;

            &__title {
                font-size: 4rem;
                letter-spacing: -0.2375rem;
                font-weight: 500;
                color: #2E2D2D;
                text-align: center;
            }
            &__desc {
                font-size: 1rem;
                letter-spacing: 0.0125rem;
                line-height: 130%;
                color: #460000;
                
                text-align: center;
            }
        }
        &__policity {
            width: 18.375rem;
            
            color: #7B7B7B;
            font-size: 0.75rem;
            line-height: 130%;
            letter-spacing: 0.0063rem;
            text-align: center;
            text-underline-offset: 0.0625rem;

            cursor: pointer;
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

            svg {
                width: 3.3125rem;
                height: 3.3125rem;
            }
        }
    }

    .sucsses {
        width: 28.375rem;
        height: 20.6875rem;

        padding: 0.625rem;
        
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        
        &__content {
            width: 100%;
            height: 100%;

            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            gap: 1.875rem;

            background-color: #D6E4D1;
            border-radius: 1.5625rem;
        }
        &__svg-cont {
            width: 1.875rem;
            height: 1.875rem;

            display: flex;
            justify-content: center;
            align-items: center;
        
            background-color: #ffffff80;
            border-radius: 100%;

            svg {
                width: 1.1875rem;
                height: 1.1875rem;
            }
        }
        &__text-block {
            width: 15.4375rem;

            display: flex;
            align-items: center;
            flex-direction: column;
            gap: 0.625rem;
            &__title {
                font-size: 1.5625rem;
                color: #2E2D2D;
                letter-spacing: -0.0625rem;
                text-align: center;
            }
            &__desc {
                font-size: 0.75rem;
                line-height: 130%;
                letter-spacing: 0.0063rem;
                text-align: center;
                color: #2E2D2D;
            }
        }
        &__button {
            width: 11rem;
            height: 3.125rem;
            
            border-radius: 31.25rem;
            background-color: #378D18;
            
            color: #fff;
            text-transform: uppercase;
            font-size: 1rem;
        }
    }

    .form-block {
        width: 100%;
        display: flex;
        justify-content: center;
        
        .yandex-form {
            width: 100%;
            max-width: 650px;
            height: 600px;
            border: none;
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

    .red {
        color: #A43033;
        text-decoration: underline;
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

    // Анимации для backdrop
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
</style>