<script setup lang="ts">
    import { usePopup } from '~/composable/usePopup';
    import { useAccessibility } from '~/composable/useAccessibility';
    import AccessibilityPanel from '~/components/items/AccessibilityPanel.vue';
    import PopupGallery from '~/components/popup/Gallery.vue';
    import ScrollToTop from '~/components/items/ScrollToTop.vue';

    const { popupState } = usePopup()
    const { loadSettings } = useAccessibility()

    const updateBodyOverflow = (isOpen: boolean) => {
        if (import.meta.client && document?.body && document?.documentElement) {
            if (isOpen) {
                document.body.style.overflow = 'hidden'
                document.documentElement.style.overflow = 'hidden'
            } else {
                document.body.style.overflow = ''
                document.documentElement.style.overflow = ''
            }
        }
    }

    watch(() => popupState.value.isOpen, (newValue: boolean) => {
        updateBodyOverflow(newValue);
    });

    onMounted(() => {
        updateBodyOverflow(popupState.value.isOpen);
        loadSettings();
    });

</script>

<template>
    <Header />
    <AccessibilityPanel />
    <main>
        <slot />
    </main>
    <Footer />
    <PopupGallery />
    <ScrollToTop />
</template>

