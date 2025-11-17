import type { NewsItem } from './useNews'
import type { HistoryItem } from './useHistory'

export type popupType = 'form' | 'article' | 'history' | 'event' | 'gallery' | ''

export interface IPopup {
    popupType: popupType,
    isOpen: boolean,
    historyYearIndex?: number,
    newsItem?: NewsItem | null,
    historyItem?: HistoryItem | null
}

export function usePopup() {
    const popupState = useState<IPopup>('popup', () => ({
        popupType: '',
        isOpen: false,
        historyYearIndex: 0,
        newsItem: null,
        historyItem: null
    }))

    const setOpen = (type: popupType, open: boolean, yearIndex?: number, newsItem?: NewsItem | null, historyItem?: HistoryItem | null) => {
        popupState.value.isOpen = open
        popupState.value.popupType = type
        if (type === 'history' && yearIndex !== undefined) {
            popupState.value.historyYearIndex = yearIndex
        }
        if (newsItem !== undefined) {
            popupState.value.newsItem = newsItem
        }
        if (historyItem !== undefined) {
            popupState.value.historyItem = historyItem
        }
        if (!open) {
            popupState.value.newsItem = null
            popupState.value.historyItem = null
        }
    }

    return {
        popupState,
        setOpen
    }
}