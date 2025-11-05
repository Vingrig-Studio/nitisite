import { useShare } from '~/composable/useShare'

export default defineNuxtPlugin({
    name: 'share-init',
    setup() {
        // Обрабатываем query параметры при загрузке страницы
        if (import.meta.client) {
            const { handleQueryParams } = useShare()
            
            // Используем nextTick для обработки после монтирования компонентов
            nextTick(() => {
                handleQueryParams()
            })
        }
    }
})

