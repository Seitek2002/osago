import { defineStore } from 'pinia'

export const useOcrStore = defineStore('ocrStore', {
  state: () => ({
    passport: null,
    driver_license: null,
    vehicle_cert: null,
    loading: false,
    error: null,
  }),
  actions: {
    async recognizeAllDocuments(documentStore) {
      this.loading = true
      this.error = null

      const typeMap = {
        passport: 'passport',
        license: 'driver_license',
        certificate: 'vehicle_cert',
      }

      const requests = Object.entries(typeMap).map(async ([localType, apiType]) => {
        const front = documentStore.uploadedDocuments[`${localType}-front-side`]?.file
        const back = documentStore.uploadedDocuments[`${localType}-back-side`]?.file

        if (!front || !back) {
          throw new Error(`Не загружены обе стороны для документа: ${localType}`)
        }

        const formData = new FormData()
        formData.append('documentType', apiType)
        formData.append('frontImage', front)
        formData.append('backImage', back)

        console.log('Отправка документа:', apiType, { front, back })
        const response = await fetch(`https://oa.kg/api/ocr/?documentType=${apiType}`, {
          method: 'POST',
          body: formData,
        })
        console.log('Ответ сервера:', response)

        if (!response.ok) {
          const text = await response.text()
          console.error('Ошибка ответа:', text)
          throw new Error(`Ошибка при распознавании ${apiType}: ${text}`)
        }

        const data = await response.json()
        this[apiType] = data.data || null
      })

      try {
        await Promise.all(requests)
      } catch (e) {
        this.error = e.message
      } finally {
        this.loading = false
      }
    },
    clear() {
      this.passport = null
      this.driver_license = null
      this.vehicle_cert = null
      this.error = null
      this.loading = false
      localStorage.removeItem('ocrData')
    },
    saveToLocalStorage() {
      const data = {
        passport: this.passport,
        driver_license: this.driver_license,
        vehicle_cert: this.vehicle_cert,
      }
      localStorage.setItem('ocrData', JSON.stringify(data))
    },
    loadFromLocalStorage() {
      const data = localStorage.getItem('ocrData')
      if (data) {
        const parsed = JSON.parse(data)
        this.passport = parsed.passport || null
        this.driver_license = parsed.driver_license || null
        this.vehicle_cert = parsed.vehicle_cert || null
      }
    }
  }
})
