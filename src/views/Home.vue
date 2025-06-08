<template>
  <section class="home">
    <Header :title="t('home.title')" />
    <Container>
      <div class="home__content">
        <div class="home__top">
          <img src="../assets/images/home-img.png" alt="shield" />
        </div>
        <!-- <p class="text-center">ОСАГО</p>
        <p class="text-center"></p> -->
        <div class="home__btns">
          <router-link to="/documents-form" class="button"
            ><span class="text-[20px]">{{ t('title') }}</span> <br />
            <span class="text-[14px]">{{ t('home.OSAGO') }}</span></router-link
          >
          <router-link to="/" class="button">{{ t('home.KASKO') }}</router-link>
          <router-link to="/" class="button">{{ t('home.findPolicy') }}</router-link>
        </div>
      </div>
    </Container>
    <footer class="footer">
      <Container>
        <div class="footer__content">
          <p class="footer__text">
            {{ t('footer.GSO') }}
          </p>
          <p>
            {{ t('footer.phoneNumber') }}:
            <a href="tel:+996553545452" class="footer__link">+996 553 545 452</a>
          </p>
          <p>
            {{ t('footer.email') }}: <a href="mailto:info@gso.kg" class="footer__link">info@gso.kg</a>
          </p>
          <p>{{ t('footer.address') }}</p>
          <p>
            {{ t('footer.OAO') }}
          </p>
          <p>
            {{ t('footer.naming') }}
          </p>
          <div class="footer__socials">
            <a
              href="https://wa.me/996553545452"
              target="_blank"
              class="footer__social-link"
              aria-label="WhatsApp"
            >
              <Whatsapp class="w-[35px]" />
            </a>
            <a
              href="https://t.me/yourTelegramUsername"
              target="_blank"
              class="footer__social-link"
              aria-label="Telegram"
            >
              <Telegram class="w-[35px]" />
            </a>
          </div>
          <p class="footer__copyright">{{ t('footer.roots') }}</p>
        </div>
      </Container>
    </footer>
  </section>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Container from '@/components/Container.vue'
import Telegram from '@/assets/icons/telegram.vue'
import Whatsapp from '@/assets/icons/whatsapp.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped lang="scss">
.home {
  @apply h-screen text-white;

  &__top {
    @apply flex justify-center pt-[35px];

    img {
      @apply w-[105px];
    }
  }

  &__btns {
    @apply mt-[100px];

    .button {
      @apply block py-[14px] bg-[#005CAA] rounded-[6px] text-[#fff] text-[16px] mb-[16px] text-center;

      &:disabled {
        @apply opacity-50 cursor-not-allowed;
      }
    }
  }

  .footer {
    @apply bg-[#2C2C2C] text-[#fff] py-8 text-sm leading-relaxed;

    &__content {
      @apply space-y-2 text-center;
    }

    &__link {
      @apply text-[#00A6FF] hover:underline;
    }

    &__socials {
      @apply flex justify-center space-x-4 mt-4;

      &-link {
        @apply inline-block transition-transform transform hover:scale-110;
      }
    }

    &__copyright {
      @apply mt-4 text-xs text-[#AFAFAF];
    }
  }
}
</style>
