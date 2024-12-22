<template>
    <footer class="footer">
        <Container>
            <div class="footer__content">
                <button @click="handleClick" :disabled="isValid">
                    {{title || t('btn') }}
                </button>
            </div>
        </Container>
    </footer>
</template>

<script setup>
import Container from "./Container.vue";
import { useButtonState } from "@/composables/useButtonState";
import { useRouter } from "vue-router";
import { useI18n } from 'vue-i18n'
const { locale, t } = useI18n()
const props = defineProps(['isValid', 'navigateTo', 'title'])

const router = useRouter();

const handleClick = () => {
    router.push(props.navigateTo)
}
</script>

<style lang="scss" scoped>
.footer {
    @apply fixed bottom-0 left-0 w-full;

    &__content {
        @apply w-full;

        button {
            @apply flex justify-center w-full py-[14px] bg-[#005CAA] rounded-[6px] text-[#fff] text-[16px] mb-[16px];

            &:disabled {
                @apply opacity-50 cursor-not-allowed;
            }
        }
    }
}
</style>