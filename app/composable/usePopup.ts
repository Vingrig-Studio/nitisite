export type popupType = 'form' | 'article' | 'history' | 'event' | ''

export interface IPopup {
    popupType: popupType,
    isOpen: boolean,
    historyYearIndex?: number
}

export function usePopup() {
    const popupState = useState<IPopup>('popup', () => ({
        popupType: '',
        isOpen: false,
        historyYearIndex: 0
    }))

    const setOpen = (type: popupType, open: boolean, yearIndex?: number) => {
        popupState.value.isOpen = open
        popupState.value.popupType = type
        if (type === 'history' && yearIndex !== undefined) {
            popupState.value.historyYearIndex = yearIndex
        }
    }

    return {
        popupState,
        setOpen
    }
}