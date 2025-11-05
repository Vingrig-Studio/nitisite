import { usePopup } from '~/composable/usePopup'

export function useShare() {
    const route = useRoute()
    const router = useRouter()

    const getShareUrl = (type: 'article' | 'event' | 'history', id?: string | number) => {
        if (import.meta.client) {
            const baseUrl = window.location.origin + window.location.pathname
            const params = new URLSearchParams()
            
            if (type === 'history' && id !== undefined) {
                params.set('history', String(id))
            } else if (type === 'article' && id !== undefined) {
                params.set('article', String(id))
            } else if (type === 'event' && id !== undefined) {
                params.set('event', String(id))
            }
            
            return `${baseUrl}?${params.toString()}`
        }
        return ''
    }

    const shareLink = async (type: 'article' | 'event' | 'history', id?: string | number) => {
        const url = getShareUrl(type, id)
        
        if (import.meta.client && navigator.share) {
            try {
                await navigator.share({
                    title: type === 'article' ? 'Статья' : type === 'event' ? 'Мероприятие' : 'История проекта',
                    url: url
                })
            } catch (err) {
                // Пользователь отменил шаринг или произошла ошибка
                if (err instanceof Error && err.name !== 'AbortError') {
                    // Копируем в буфер обмена, если шаринг не удался
                    await copyToClipboard(url)
                }
            }
        } else {
            // Копируем в буфер обмена, если Web Share API не поддерживается
            await copyToClipboard(url)
        }
    }

    const copyToClipboard = async (text: string) => {
        if (import.meta.client && navigator.clipboard) {
            try {
                await navigator.clipboard.writeText(text)
                // Можно добавить уведомление об успешном копировании
            } catch (err) {
                console.error('Failed to copy:', err)
            }
        }
    }

    const handleQueryParams = () => {
        if (import.meta.client) {
            const { setOpen } = usePopup()
            
            const query = route.query
            
            if (query.article) {
                setOpen('article', true)
            } else if (query.event) {
                setOpen('event', true)
            } else if (query.history) {
                const yearIndex = parseInt(query.history as string)
                if (!isNaN(yearIndex) && yearIndex >= 0) {
                    setOpen('history', true, yearIndex)
                }
            }
        }
    }

    return {
        getShareUrl,
        shareLink,
        handleQueryParams
    }
}

