import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useOcrStore = defineStore('ocrStore', {
  state: () => {
    return {
      passport: null,
      driver_license: null,
      vehicle_cert: null,
      loading: false,
      passportError: null,
      driverLicenseError: null,
      vehicleCertError: null,
    }
  },
  actions: {
    async recognizeAllDocuments(documentStore) {
      this.loading = true
      this.passportError = null
      this.driverLicenseError = null
      this.vehicleCertError = null

      const typeMap = {
        passport: 'passport',
        license: 'driver_license',
        certificate: 'vehicle_cert',
      }

      const requests = Object.entries(typeMap).map(async ([localType, apiType]) => {
        const front = documentStore.uploadedDocuments[`${localType}-front-side`]?.file
        const back = documentStore.uploadedDocuments[`${localType}-back-side`]?.file

        if (!front || !back) {
          if (apiType === 'passport') this.passportError = 'Не загружены обе стороны документа'
          if (apiType === 'driver_license') this.driverLicenseError = 'Не загружены обе стороны документа'
          if (apiType === 'vehicle_cert') this.vehicleCertError = 'Не загружены обе стороны документа'
          return
        }

        const formData = new FormData()
        formData.append('documentType', apiType)
        formData.append('frontImage', front)
        formData.append('backImage', back)

        try {
          const response = await fetch(`https://oa.kg/api/ocr/?documentType=${apiType}`, {
            method: 'POST',
            body: formData,
          })
          if (!response.ok) {
            let errorMsg = `Ошибка при распознавании ${apiType}`
            try {
              const json = await response.clone().json()
              if (json && json.error) errorMsg = json.error
              else errorMsg = JSON.stringify(json)
            } catch {
              const text = await response.text()
              if (text) errorMsg = text
            }
            if (apiType === 'passport') this.passportError = errorMsg
            if (apiType === 'driver_license') this.driverLicenseError = errorMsg
            if (apiType === 'vehicle_cert') this.vehicleCertError = errorMsg
            return
          }
          const data = await response.json()
          this[apiType] = data.data || null
        } catch (e) {
          if (apiType === 'passport') this.passportError = e.message || `Ошибка при распознавании ${apiType}`
          if (apiType === 'driver_license') this.driverLicenseError = e.message || `Ошибка при распознавании ${apiType}`
          if (apiType === 'vehicle_cert') this.vehicleCertError = e.message || `Ошибка при распознавании ${apiType}`
        }
      })

      await Promise.all(requests)
      this.loading = false
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
