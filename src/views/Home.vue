<template>
  <section class="home">
    <Header title="ОПЕРАТОР СТРАХОВАНИЯ" />
    <Container>
      <div class="home__content">
        <div class="home__top">
          <img src="../assets/images/home-img.png" alt="shield" />
        </div>
        <!-- <p class="text-center">ОСАГО</p>
        <p class="text-center"></p> -->
        <div class="home__btns">
          <router-link to="/documents-form" class="button"><span class="text-[20px]">ОСАГО</span> <br> <span class="text-[14px]">Обязательное страхование автогражданской ответственности</span></router-link>
          <router-link to="/" class="button">КАСКО</router-link>
          <router-link to="/" class="button">Найти полис</router-link>
        </div>
      </div>
    </Container>
    <footer class="footer">
      <Container>
        <div class="footer__content">
          <p class="footer__text">
            Открытое акционерное общество «Государственная страховая организация» (ОАО «ГСО»)
            Кыргызской Республики
          </p>
          <p>Телефон: <a href="tel:+996553545452" class="footer__link">+996 553 545 452</a></p>
          <p>
            Электронная почта: <a href="mailto:info@gso.kg" class="footer__link">info@gso.kg</a>
          </p>
          <p>Головной офис: г. Бишкек, пр. Ч. Айтматова 1, строение 2, 4 этаж</p>
          <p>
            ОАО «ГСО» обладает лицензией № 09, номер бланка № 0017 серии «С» от 5 февраля 2016 года,
            выданной Службой регулирования и надзора за финансовым рынком при Министерстве экономики
            и коммерции Кыргызской Республики.
          </p>
          <p>
            Общество с ограниченной ответственностью «Оператор КГ» является авторизованным
            представителем (агентом) ОАО «ГСО».
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
          <p class="footer__copyright">© 2024 Авторское право. Все права защищены.</p>
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
