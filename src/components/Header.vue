<template>
  <header class="header">
    <Container>
        <div class="header__content">
            <RouterLink to="/"><headerIcon /></RouterLink>
            <span>ОСАГО</span>
        </div>
    </Container>
  </header>
</template>

<script setup>
import Container from "./Container.vue";
import headerIcon from "@/assets/icons/headerIcon.vue"
</script>

<style lang="scss">
.header {
    @apply fixed top-0 left-0 w-full py-[16px] z-20;

    &__content {
        @apply relative flex justify-center;

        svg {
            @apply absolute top-0 left-0;
        }

        span {
            @apply text-[#191D23] text-[16px];
        }
    }
}
</style>