<script setup lang="ts">
import { onMounted, ref, onUnmounted, nextTick } from 'vue'
import IMask from 'imask'
import { useLinks } from '~/composable/useSocialLinks'

const mapContainer = ref<HTMLElement | null>(null)
const phoneInput = ref<HTMLInputElement | null>(null)
let checkInterval: ReturnType<typeof setInterval> | null = null
let phoneMask: any = null

const formData = ref({
  name: '',
  phone: '',
  email: '',
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref<string | null>(null)

const config = useRuntimeConfig()
const apiKey = config.public.yandexMapsApiKey || 'caa46d61-fe64-4c3b-bfd8-2ee07d8efb8f'
const scriptUrl = apiKey
  ? `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`
  : 'https://api-maps.yandex.ru/2.1/?lang=ru_RU'

useHead({
  script: [
    {
      src: scriptUrl,
      async: true,
    },
    {
      src: 'https://forms.yandex.ru/_static/embed.js',
      async: true,
    },
  ],
})


function initPhoneMask() {
  nextTick(() => {
    if (!phoneInput.value || typeof window === 'undefined') return

    phoneMask = IMask(phoneInput.value, {
      mask: '(000) 000-00-00',
      lazy: false,
    })

    phoneMask.on('accept', () => {
      formData.value.phone = phoneMask.value
    })
  })
}

function initYandexMaps() {
  if (typeof window === 'undefined') return

  if ((window as any).ymaps) {
    initMap()
  } else {
    checkInterval = setInterval(() => {
      if ((window as any).ymaps) {
        if (checkInterval) {
          clearInterval(checkInterval)
          checkInterval = null
        }
        initMap()
      }
    }, 100)

    setTimeout(() => {
      if (checkInterval) {
        clearInterval(checkInterval)
        checkInterval = null
      }
    }, 10000)
  }
}

onUnmounted(() => {
  if (checkInterval) {
    clearInterval(checkInterval)
  }
  
  if (phoneMask) {
    phoneMask.destroy()
  }
})

async function handleSubmit(event: Event) {
  event.preventDefault()
  
  isSubmitting.value = true
  submitError.value = null
  submitSuccess.value = false

  try {
    const response = await $fetch('/api/submit-yandex', {
      method: 'POST',
      body: {
        name: formData.value.name,
        phone: formData.value.phone,
        email: formData.value.email,
      },
    })

    submitSuccess.value = true
    
    formData.value = {
      name: '',
      phone: '',
      email: '',
    }
    
    if (phoneMask) {
      phoneMask.value = ''
    }

    setTimeout(() => {
      submitSuccess.value = false
    }, 5000)
  } catch (error: any) {
    submitError.value = error.data?.message || 'Произошла ошибка при отправке формы. Попробуйте еще раз.'
    
    setTimeout(() => {
      submitError.value = null
    }, 5000)
  } finally {
    isSubmitting.value = false
  }
}

function initMap() {
  if (!mapContainer.value || typeof window === 'undefined') return

  const ymaps = (window as any).ymaps
  if (!ymaps) return

  ymaps.ready(() => {
    if (!mapContainer.value) return

    const map = new ymaps.Map(mapContainer.value, {
      center: [56.689754, 60.859720],
      zoom: 12,
      controls: ['zoomControl', 'fullscreenControl'],
    })

    const placemark = new ymaps.Placemark(
      [56.689754, 60.859720],
      {
        balloonContent: 'Арамильская суконная фабрика',
      },
      {
        preset: 'islands#redDotIcon',
      }
    )

    map.geoObjects.add(placemark)
  })
}

onMounted(() => {
  if (typeof window === 'undefined') return

  initYandexMaps()
  
  initPhoneMask()
})

const { vkGroup, vkMuseu, tg, email, phone, linkPhone } = useLinks

</script>

<template>
    <section id="contacts" class="container">
        <div class="form">
            <div class="feedback">
                <div class="feedback__info-block">
                    <p class="title fs-4">Контакты</p>
                    <p class="desc fs-0-875">Узнайте подробности о наших экскурсиях и запишитесь</p>
                </div>
                <div class="feedback__contacts">
                    <div class="item-contact">
                        <a :href="`tel:${linkPhone}`" class="title fs-1-5">{{ phone }}</a>
                        <p class="desc fs-0-875">По предварительной записи</p>
                    </div>
                    <div class="item-contact">
                        <a :href="'mailto:' + email" class="title fs-1-5">{{ email }}</a>
                        <p class="desc fs-0-875">по всем вопросам</p>
                    </div>
                </div>
                <div class="feedback__links">
                  <div class="link__container">

                  <a :href="vkMuseu" class="link">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M7 3C5.93913 3 4.92172 3.42143 4.17157 4.17157C3.42143 4.92172 3 5.93913 3 7V17C3 18.0609 3.42143 19.0783 4.17157 19.8284C4.92172 20.5786 5.93913 21 7 21H17C18.0609 21 19.0783 20.5786 19.8284 19.8284C20.5786 19.0783 21 18.0609 21 17V7C21 5.93913 20.5786 4.92172 19.8284 4.17157C19.0783 3.42143 18.0609 3 17 3H7ZM17.332 10.055C17.4792 9.83434 17.5327 9.56424 17.4808 9.30413C17.4288 9.04402 17.2757 8.8152 17.055 8.668C16.8343 8.5208 16.5642 8.4673 16.3041 8.51924C16.044 8.57119 15.8152 8.72434 15.668 8.945C15.314 9.415 14.943 9.865 14.509 10.265C14.006 10.729 13.497 11.077 13.001 11.283L12.993 9.383C12.9643 9.13975 12.8474 8.91547 12.6644 8.75272C12.4813 8.58996 12.2449 8.50003 12 8.5C11.458 8.531 11 8.931 11 9.5V13.873C9.052 13.333 8 11.443 8 9.5C8 9.23478 7.89464 8.98043 7.70711 8.79289C7.51957 8.60536 7.26522 8.5 7 8.5C6.73478 8.5 6.48043 8.60536 6.29289 8.79289C6.10536 8.98043 6 9.23478 6 9.5C6 13.132 8.51 16 12 16C12.2652 16 12.5196 15.8946 12.7071 15.7071C12.8946 15.5196 13 15.2652 13 15V13.437C14.332 13.543 15.624 14.484 16.106 15.447C16.1622 15.5686 16.2422 15.6776 16.3413 15.7677C16.4404 15.8578 16.5566 15.927 16.683 15.9713C16.8094 16.0156 16.9433 16.0341 17.077 16.0256C17.2107 16.0172 17.3413 15.982 17.461 15.9221C17.5808 15.8622 17.6874 15.7788 17.7743 15.677C17.8613 15.5751 17.9269 15.4569 17.9673 15.3292C18.0077 15.2015 18.022 15.067 18.0094 14.9337C17.9968 14.8003 17.9576 14.6709 17.894 14.553C17.416 13.596 16.524 12.701 15.426 12.117C15.574 11.9957 15.7207 11.8683 15.866 11.735C16.417 11.2326 16.9088 10.6689 17.332 10.055Z" fill="white"/>
                      </svg>
                    </a>
                    <p class="link__text fs-0-625">Музей</p>
                  </div>
                  <div class="link__container">
                    <a :href="vkGroup" target="_blank" class="link">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7 3C5.93913 3 4.92172 3.42143 4.17157 4.17157C3.42143 4.92172 3 5.93913 3 7V17C3 18.0609 3.42143 19.0783 4.17157 19.8284C4.92172 20.5786 5.93913 21 7 21H17C18.0609 21 19.0783 20.5786 19.8284 19.8284C20.5786 19.0783 21 18.0609 21 17V7C21 5.93913 20.5786 4.92172 19.8284 4.17157C19.0783 3.42143 18.0609 3 17 3H7ZM17.332 10.055C17.4792 9.83434 17.5327 9.56424 17.4808 9.30413C17.4288 9.04402 17.2757 8.8152 17.055 8.668C16.8343 8.5208 16.5642 8.4673 16.3041 8.51924C16.044 8.57119 15.8152 8.72434 15.668 8.945C15.314 9.415 14.943 9.865 14.509 10.265C14.006 10.729 13.497 11.077 13.001 11.283L12.993 9.383C12.9643 9.13975 12.8474 8.91547 12.6644 8.75272C12.4813 8.58996 12.2449 8.50003 12 8.5C11.458 8.531 11 8.931 11 9.5V13.873C9.052 13.333 8 11.443 8 9.5C8 9.23478 7.89464 8.98043 7.70711 8.79289C7.51957 8.60536 7.26522 8.5 7 8.5C6.73478 8.5 6.48043 8.60536 6.29289 8.79289C6.10536 8.98043 6 9.23478 6 9.5C6 13.132 8.51 16 12 16C12.2652 16 12.5196 15.8946 12.7071 15.7071C12.8946 15.5196 13 15.2652 13 15V13.437C14.332 13.543 15.624 14.484 16.106 15.447C16.1622 15.5686 16.2422 15.6776 16.3413 15.7677C16.4404 15.8578 16.5566 15.927 16.683 15.9713C16.8094 16.0156 16.9433 16.0341 17.077 16.0256C17.2107 16.0172 17.3413 15.982 17.461 15.9221C17.5808 15.8622 17.6874 15.7788 17.7743 15.677C17.8613 15.5751 17.9269 15.4569 17.9673 15.3292C18.0077 15.2015 18.022 15.067 18.0094 14.9337C17.9968 14.8003 17.9576 14.6709 17.894 14.553C17.416 13.596 16.524 12.701 15.426 12.117C15.574 11.9957 15.7207 11.8683 15.866 11.735C16.417 11.2326 16.9088 10.6689 17.332 10.055Z" fill="white"/>
                      </svg>
                    </a>
                    <p class="link__text fs-0-625">НитиXНити</p>
                  </div>
                  <div class="link__container">
                    <a :href="tg" target="_blank" class="link">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.64 8.8C16.49 10.38 15.84 14.22 15.51 15.99C15.37 16.74 15.09 16.99 14.83 17.02C14.25 17.07 13.81 16.64 13.25 16.27C12.37 15.69 11.87 15.33 11.02 14.77C10.03 14.12 10.67 13.76 11.24 13.18C11.39 13.03 13.95 10.7 14 10.49C14.0069 10.4582 14.006 10.4252 13.9973 10.3938C13.9886 10.3624 13.9724 10.3337 13.95 10.31C13.89 10.26 13.81 10.28 13.74 10.29C13.65 10.31 12.25 11.24 9.52 13.08C9.12 13.35 8.76 13.49 8.44 13.48C8.08 13.47 7.4 13.28 6.89 13.11C6.26 12.91 5.77 12.8 5.81 12.45C5.83 12.27 6.08 12.09 6.55 11.9C9.47 10.63 11.41 9.79 12.38 9.39C15.16 8.23 15.73 8.03 16.11 8.03C16.19 8.03 16.38 8.05 16.5 8.15C16.6 8.23 16.63 8.34 16.64 8.42C16.63 8.48 16.65 8.66 16.64 8.8Z" fill="white"/>
                        </svg>
                      </a>
                      <p class="link__text fs-0-625">Канал музея</p>
                  </div>
                </div>
            </div>

            <iframe 
                ref="myIframe"
                id="frame-form"
                src="https://forms.yandex.ru/u/68fdf22f90fa7b7457cf8339?iframe=1" 
                frameborder="0" 
                name="ya-form-68fdf22f90fa7b7457cf8339" 
                width="100%"
                height="fit-content">
            </iframe>

            <!-- <form class="form-block">
                <p class="form-block__title fs-1-5625">Запишитесь на экскурсию по Арамильской суконной фабрике!</p>
                
                <div class="form-block__yandex-form">
                    <iframe 
                        ref="myIframe"
                        id="frame-form"
                        src="https://forms.yandex.ru/u/68fdf22f90fa7b7457cf8339?iframe=1" 
                        frameborder="0" 
                        name="ya-form-68fdf22f90fa7b7457cf8339" 
                        width="100%"
                        height="fit-content">
                    </iframe>
                </div> -->
                
                <!-- <div class="form-block__form">
                    <div class="form-block__form__inputs">
                        <label class="input-label error" for="name">
                            <input 
                                v-model="formData.name"
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
                                v-model="formData.phone"
                                placeholder="(999) 999-99-99" 
                                type="tel" 
                                name="phone"
                                id="phone"
                                required
                            >
                        </label>
                        <label class="input-label" for="email">
                            <input 
                                v-model="formData.email"
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
                        :disabled="isSubmitting"
                    >
                        <p class="form-block__button__text">
                            {{ isSubmitting ? 'Отправка...' : 'Отправить заявку' }}
                        </p>
                        <div class="form-block__button__svg-cont">
                            <svg width="18" height="8" viewBox="0 0 18 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.3536 4.03568C17.5488 3.84042 17.5488 3.52384 17.3536 3.32857L14.1716 0.146594C13.9763 -0.0486684 13.6597 -0.0486684 13.4645 0.146594C13.2692 0.341856 13.2692 0.658438 13.4645 0.853701L16.2929 3.68213L13.4645 6.51055C13.2692 6.70582 13.2692 7.0224 13.4645 7.21766C13.6597 7.41292 13.9763 7.41292 14.1716 7.21766L17.3536 4.03568ZM0 3.68213L4.45108e-08 4.18213L17 4.18213L17 3.68213L17 3.18213L-4.45108e-08 3.18213L0 3.68213Z" fill="white"/>
                            </svg>
                        </div>
                    </button>
                </div> -->
            <!-- </form> -->
            <div ref="mapContainer" id="map"></div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
    .form {
        margin-top: 12.5rem;

        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 0.625rem;

        @include mobile {
            margin-top: 5rem;

            grid-template-columns: repeat(1, 1fr);
            gap: 0.3125rem;
        }
    }
    .feedback {
        width: 100%;

        padding: 1.75rem 0rem 2.875rem 3.125rem;
        background-color: #650F11;
        border-radius: 1.25rem;
        
        display: flex;
        flex-direction: column;
        gap: 1.75rem;

        @include mobile {
            max-width: 21.9375rem;

            padding: 3.125rem 0rem;
        }
        &__info-block {
            display: flex;
            flex-direction: column;
            @include mobile {
                align-items: center;
                gap: 0.3125rem;
            }

            .title {
                @include gardenia;
                color: #fff;
                // font-weight: 100;
                // text-transform: uppercase;
                @include mobile {
                    letter-spacing: -0.1187rem;
                    font-weight: 500;
                }
            }
            .desc {
                width: 18.375rem;

                line-height: 130%;
                color: #fff;

                @include mobile {
                    width: 17.9375rem;

                    letter-spacing: 0.0063rem;
                    text-align: center;
                }
            }
        }

        &__contacts {
            display: flex;
            align-items: center;
            gap: 3rem;

            @include mobile {
                flex-direction: column;
                gap: 1.875rem;
            }
            .item-contact {
                display: flex;
                flex-direction: column;
                gap: 0.3125rem;
                .title {
                    color: #fff;
                    letter-spacing: -0.0437rem;
                }
                .desc {
                    color: #fff;
                    line-height: 130%;

                    @include mobile {
                        text-align: center;
                    }
                }
            }
        }

        &__links {
            display: flex;
            align-items: center;
            gap: 0.625rem;
            @include mobile {
                justify-content: center;
            }

            .link {
                width: 3.125rem;
                height: 3.125rem;
    
                background-color: #A43033;
                border-radius: 100%;
    
                display: flex;
                flex-direction: column;
                gap: .5rem;
                justify-content: center;
                align-items: center;
                svg {
                    width: 1.5rem;
                    height: 1.5rem;
                }

                &__container {
                  display: flex;
                  flex-direction: column;
                  gap: .5rem;
                  align-items: center;
                }

                &__text {
                  color: #fff;
                }
            }
        }
    }
    
    .form-message {
        padding: 1rem 1.875rem;
        border-radius: 0.625rem;
        line-height: 130%;
        margin-bottom: 1rem;
        
        &--success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        
        &--error {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
    }
    
    form {
        @include mobile {
            max-width: 21.9375rem;
        }  
    }
    
    #map {
        grid-column: span 2;
        width: 100%;
        height: 25rem;
        border-radius: 1.25rem;
        overflow: hidden;
        @include mobile {
            max-width: 21.9375rem;

            grid-column: span 1;
        }
    }
</style>