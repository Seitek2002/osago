import { defineStore } from 'pinia'

export const useCalcApiStore = defineStore('calcApi', {
  state: () => ({
    coefficients: null,
    loading: false,
    error: null
  }),
  actions: {
    async fetchCoefficients() {
      this.loading = true
      this.error = null
      try {
        const res = await fetch('https://oa.kg/api/coefficients/')
        if (!res.ok) throw new Error('Ошибка загрузки коэффициентов')
        this.coefficients = await res.json()
      } catch (e) {
        this.error = e.message
      } finally {
        this.loading = false
      }
    }
  }
})
