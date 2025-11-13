<script setup lang="ts">
</script>

<template>
    <div class="can-scroll mobile">
        <p class="can-scroll__text">Листайте фото пальцем влево/вправо</p>
        <img class="can-scroll__gif" src="/img/helper.gif" alt="">
    </div>
</template>

<style lang="scss" scoped>
    .can-scroll {
        width: 100%;
        height: 3.8125rem;

        display: flex;
        align-items: center;

        padding-left: 1.4375rem;

        border: 0.0625rem solid #E5E5E5;
        border-radius: 0.625rem;
        background-color: #EFEFEF;

        position: relative;
        &__text {
            font-size: 0.75rem;
            color: #ACACAC;
        }
        &__gif {
            width: 3.8125rem;
            height: 3.8125rem;

            position: absolute;
            top: -0.125rem;
            right: 0.375rem;
        }
    }
</style>    