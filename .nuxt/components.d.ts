
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


export const Footer: typeof import("../app/components/footer/index.vue")['default']
export const HeaderMobileSidebar: typeof import("../app/components/header/MobileSidebar.vue")['default']
export const Header: typeof import("../app/components/header/index.vue")['default']
export const ItemsCanScroll: typeof import("../app/components/items/CanScroll.vue")['default']
export const PopupArticle: typeof import("../app/components/popup/Article.vue")['default']
export const PopupEvent: typeof import("../app/components/popup/Event.vue")['default']
export const PopupForm: typeof import("../app/components/popup/Form.vue")['default']
export const PopupHistoryYear: typeof import("../app/components/popup/HistoryYear.vue")['default']
export const SectionsAboutProject: typeof import("../app/components/sections/AboutProject.vue")['default']
export const SectionsCategory: typeof import("../app/components/sections/Category.vue")['default']
export const SectionsForm: typeof import("../app/components/sections/Form.vue")['default']
export const SectionsHeroBlock: typeof import("../app/components/sections/HeroBlock.vue")['default']
export const SectionsHistory: typeof import("../app/components/sections/History.vue")['default']
export const SectionsNews: typeof import("../app/components/sections/News.vue")['default']
export const SectionsPhotoSet: typeof import("../app/components/sections/PhotoSet.vue")['default']
export const SectionsQuestions: typeof import("../app/components/sections/Questions.vue")['default']
export const SectionsSyconcart: typeof import("../app/components/sections/Syconcart.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const LazyFooter: LazyComponent<typeof import("../app/components/footer/index.vue")['default']>
export const LazyHeaderMobileSidebar: LazyComponent<typeof import("../app/components/header/MobileSidebar.vue")['default']>
export const LazyHeader: LazyComponent<typeof import("../app/components/header/index.vue")['default']>
export const LazyItemsCanScroll: LazyComponent<typeof import("../app/components/items/CanScroll.vue")['default']>
export const LazyPopupArticle: LazyComponent<typeof import("../app/components/popup/Article.vue")['default']>
export const LazyPopupEvent: LazyComponent<typeof import("../app/components/popup/Event.vue")['default']>
export const LazyPopupForm: LazyComponent<typeof import("../app/components/popup/Form.vue")['default']>
export const LazyPopupHistoryYear: LazyComponent<typeof import("../app/components/popup/HistoryYear.vue")['default']>
export const LazySectionsAboutProject: LazyComponent<typeof import("../app/components/sections/AboutProject.vue")['default']>
export const LazySectionsCategory: LazyComponent<typeof import("../app/components/sections/Category.vue")['default']>
export const LazySectionsForm: LazyComponent<typeof import("../app/components/sections/Form.vue")['default']>
export const LazySectionsHeroBlock: LazyComponent<typeof import("../app/components/sections/HeroBlock.vue")['default']>
export const LazySectionsHistory: LazyComponent<typeof import("../app/components/sections/History.vue")['default']>
export const LazySectionsNews: LazyComponent<typeof import("../app/components/sections/News.vue")['default']>
export const LazySectionsPhotoSet: LazyComponent<typeof import("../app/components/sections/PhotoSet.vue")['default']>
export const LazySectionsQuestions: LazyComponent<typeof import("../app/components/sections/Questions.vue")['default']>
export const LazySectionsSyconcart: LazyComponent<typeof import("../app/components/sections/Syconcart.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>

export const componentNames: string[]
