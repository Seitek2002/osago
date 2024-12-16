<template>
  <section class="home">
    <Header title="БАКАЙ ИНШУРЕНС" />
    <Container>
      <div class="home__content">
        <div class="home__top">
          <img src="../assets/images/home-img.png" alt="car-shield" />
        </div>
        <div class="home__btns">
          <button>ОСАГО</button>
          <button>Найти полис</button>
          <button>КАСКО</button>
        </div>
        <div class="home__bottom">
          <label>
            <input type="checkbox" />
            Я ознакомлен с <span>Тарифами</span>
          </label>
          <label>
            <input type="checkbox" />
            Я согласен с <span>Правилами</span>
          </label>
        </div>
      </div>
    </Container>
  </section>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Container from '@/components/Container.vue'
</script>

<style scoped lang="scss">
.home {
  @apply h-screen text-white;

  &__top {
    @apply flex justify-center mt-[35px];

    img {
      @apply w-[175px];
    }
  }

  &__btns {
    @apply mt-[100px];

    button {
      @apply flex justify-center w-full py-[14px] bg-[#005CAA] rounded-[6px] text-[#fff] text-[16px] mb-[16px];

      &:disabled {
        @apply opacity-50 cursor-not-allowed;
      }
    }
  }

  &__bottom {
    @apply flex flex-col gap-[20px];

    label {
        display: flex;
        align-items: center;
        gap: 14px
    }

    span {
        @apply text-[#3D9CEC] underline;
    }

    input {
        appearance: none;
        border: 2px solid #005CAA;
        width: 20px;
        height: 20px;
        border-radius: 3px;

        &:checked {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23005CAA' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e");
        }
    }
  }
}
</style>
