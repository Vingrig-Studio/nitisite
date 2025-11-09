export const useAccessibility = () => {
    const fontSize = useState<'small' | 'medium' | 'large'>('fontSize', () => 'medium')
    const theme = useState<'normal' | 'dark' | 'brown'>('theme', () => 'normal')
    const imagesVisible = useState<boolean>('imagesVisible', () => true)

    const fontSizeValues = {
        small: 100,
        medium: 120,
        large: 150
    }

    const setFontSize = (size: 'small' | 'medium' | 'large') => {
        fontSize.value = size
        saveFontSize()
        applyFontSize()
    }

    const setTheme = (newTheme: 'normal' | 'dark' | 'brown') => {
        theme.value = newTheme
        saveTheme()
        applyTheme()
    }

    const toggleImages = () => {
        imagesVisible.value = !imagesVisible.value
        saveImagesVisible()
        applyImagesVisible()
    }

    const applyFontSize = () => {
        if (import.meta.client) {
            const scale = fontSizeValues[fontSize.value] / 100
            document.documentElement.style.setProperty('--font-scale', `${scale}`)
        }
    }

    const applyTheme = () => {
        if (import.meta.client) {
            document.body.className = theme.value === 'normal' ? '' : `theme-${theme.value}`
        }
    }

    const applyImagesVisible = () => {
        if (import.meta.client) {
            if (imagesVisible.value) {
                document.body.classList.remove('hide-images')
            } else {
                document.body.classList.add('hide-images')
            }
        }
    }

    const saveFontSize = () => {
        if (import.meta.client) {
            localStorage.setItem('accessibility-font-size', fontSize.value)
        }
    }

    const saveTheme = () => {
        if (import.meta.client) {
            localStorage.setItem('accessibility-theme', theme.value)
        }
    }

    const saveImagesVisible = () => {
        if (import.meta.client) {
            localStorage.setItem('accessibility-images-visible', imagesVisible.value.toString())
        }
    }

    const loadSettings = () => {
        if (import.meta.client) {
            const savedFontSize = localStorage.getItem('accessibility-font-size') as 'small' | 'medium' | 'large' | null
            if (savedFontSize && ['small', 'medium', 'large'].includes(savedFontSize)) {
                fontSize.value = savedFontSize
            }

            const savedTheme = localStorage.getItem('accessibility-theme') as 'normal' | 'dark' | 'brown' | null
            if (savedTheme && ['normal', 'dark', 'brown'].includes(savedTheme)) {
                theme.value = savedTheme
            }

            const savedImagesVisible = localStorage.getItem('accessibility-images-visible')
            if (savedImagesVisible !== null) {
                imagesVisible.value = savedImagesVisible === 'true'
            }

            applyFontSize()
            applyTheme()
            applyImagesVisible()
        }
    }

    return {
        fontSize,
        theme,
        imagesVisible,
        setFontSize,
        setTheme,
        toggleImages,
        loadSettings
    }
}

