<script setup lang="ts">
    import { usePopup } from '~/composable/usePopup';
    import { watch, onMounted } from 'vue';

    const { popupState } = usePopup()

    const updateBodyOverflow = (isOpen: boolean) => {
        if (import.meta.client && document?.body) {
            document.body.style.overflow = isOpen ? 'hidden' : '';
        }
    }

    watch(() => popupState.value.isOpen, (newValue) => {
        updateBodyOverflow(newValue);
    });

    onMounted(() => {
        updateBodyOverflow(popupState.value.isOpen);
    });

</script>

<template>
    <Header />
    <main>
        <slot />
    </main>
    <Footer />
</template>

