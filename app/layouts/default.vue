<script setup lang="ts">
    import { usePopup } from '~/composable/usePopup';
    import { useAccessibility } from '~/composable/useAccessibility';
    import AccessibilityPanel from '~/components/items/AccessibilityPanel.vue';

    const { popupState } = usePopup()
    const { loadSettings } = useAccessibility()

    const updateBodyOverflow = (isOpen: boolean) => {
        if (import.meta.client && document?.body) {
            document.body.style.overflow = isOpen ? 'hidden' : '';
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
</template>

