
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T

interface _GlobalComponents {
  'Footer': typeof import("../../app/components/footer/index.vue")['default']
  'HeaderMobileSidebar': typeof import("../../app/components/header/MobileSidebar.vue")['default']
  'Header': typeof import("../../app/components/header/index.vue")['default']
  'ItemsCanScroll': typeof import("../../app/components/items/CanScroll.vue")['default']
  'PopupArticle': typeof import("../../app/components/popup/Article.vue")['default']
  'PopupEvent': typeof import("../../app/components/popup/Event.vue")['default']
  'PopupForm': typeof import("../../app/components/popup/Form.vue")['default']
  'PopupHistoryYear': typeof import("../../app/components/popup/HistoryYear.vue")['default']
  'SectionsAboutProject': typeof import("../../app/components/sections/AboutProject.vue")['default']
  'SectionsCategory': typeof import("../../app/components/sections/Category.vue")['default']
  'SectionsForm': typeof import("../../app/components/sections/Form.vue")['default']
  'SectionsHeroBlock': typeof import("../../app/components/sections/HeroBlock.vue")['default']
  'SectionsHistory': typeof import("../../app/components/sections/History.vue")['default']
  'SectionsNews': typeof import("../../app/components/sections/News.vue")['default']
  'SectionsPhotoSet': typeof import("../../app/components/sections/PhotoSet.vue")['default']
  'SectionsQuestions': typeof import("../../app/components/sections/Questions.vue")['default']
  'SectionsSyconcart': typeof import("../../app/components/sections/Syconcart.vue")['default']
  'NuxtWelcome': typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']
  'NuxtLayout': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
  'NuxtErrorBoundary': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
  'ClientOnly': typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']
  'DevOnly': typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']
  'ServerPlaceholder': typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']
  'NuxtLink': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']
  'NuxtLoadingIndicator': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
  'NuxtTime': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
  'NuxtRouteAnnouncer': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
  'NuxtImg': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
  'NuxtPicture': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
  'NuxtPage': typeof import("../../node_modules/nuxt/dist/pages/runtime/page")['default']
  'NoScript': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']
  'Link': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']
  'Base': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']
  'Title': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']
  'Meta': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']
  'Style': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']
  'Head': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']
  'Html': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']
  'Body': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']
  'NuxtIsland': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']
  'LazyFooter': LazyComponent<typeof import("../../app/components/footer/index.vue")['default']>
  'LazyHeaderMobileSidebar': LazyComponent<typeof import("../../app/components/header/MobileSidebar.vue")['default']>
  'LazyHeader': LazyComponent<typeof import("../../app/components/header/index.vue")['default']>
  'LazyItemsCanScroll': LazyComponent<typeof import("../../app/components/items/CanScroll.vue")['default']>
  'LazyPopupArticle': LazyComponent<typeof import("../../app/components/popup/Article.vue")['default']>
  'LazyPopupEvent': LazyComponent<typeof import("../../app/components/popup/Event.vue")['default']>
  'LazyPopupForm': LazyComponent<typeof import("../../app/components/popup/Form.vue")['default']>
  'LazyPopupHistoryYear': LazyComponent<typeof import("../../app/components/popup/HistoryYear.vue")['default']>
  'LazySectionsAboutProject': LazyComponent<typeof import("../../app/components/sections/AboutProject.vue")['default']>
  'LazySectionsCategory': LazyComponent<typeof import("../../app/components/sections/Category.vue")['default']>
  'LazySectionsForm': LazyComponent<typeof import("../../app/components/sections/Form.vue")['default']>
  'LazySectionsHeroBlock': LazyComponent<typeof import("../../app/components/sections/HeroBlock.vue")['default']>
  'LazySectionsHistory': LazyComponent<typeof import("../../app/components/sections/History.vue")['default']>
  'LazySectionsNews': LazyComponent<typeof import("../../app/components/sections/News.vue")['default']>
  'LazySectionsPhotoSet': LazyComponent<typeof import("../../app/components/sections/PhotoSet.vue")['default']>
  'LazySectionsQuestions': LazyComponent<typeof import("../../app/components/sections/Questions.vue")['default']>
  'LazySectionsSyconcart': LazyComponent<typeof import("../../app/components/sections/Syconcart.vue")['default']>
  'LazyNuxtWelcome': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
  'LazyNuxtLayout': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
  'LazyNuxtErrorBoundary': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
  'LazyClientOnly': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']>
  'LazyDevOnly': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']>
  'LazyServerPlaceholder': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
  'LazyNuxtLink': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
  'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
  'LazyNuxtTime': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
  'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
  'LazyNuxtImg': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
  'LazyNuxtPicture': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
  'LazyNuxtPage': LazyComponent<typeof import("../../node_modules/nuxt/dist/pages/runtime/page")['default']>
  'LazyNoScript': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
  'LazyLink': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']>
  'LazyBase': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']>
  'LazyTitle': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']>
  'LazyMeta': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']>
  'LazyStyle': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']>
  'LazyHead': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']>
  'LazyHtml': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']>
  'LazyBody': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']>
  'LazyNuxtIsland': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export {}
