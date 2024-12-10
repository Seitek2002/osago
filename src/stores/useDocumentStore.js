import { defineStore } from 'pinia'

export const useDocumentStore = defineStore('documentStore', {
  state: () => ({
    isDisabled: true,
    uploadedDocuments: {
      'passport-front-side': { file: null, url: null },
      'passport-back-side': { file: null, url: null },
      'license-front-side': { file: null, url: null },
      'license-back-side': { file: null, url: null },
      'certificate-front-side': { file: null, url: null },
      'certificate-back-side': { file: null, url: null },
    },
  }),
  actions: {
    updateDocument(fieldName, data) {
      this.uploadedDocuments[fieldName] = data
    },
  },
  getters: {
    isDataComplete: (state) => {
      return Object.values(state.uploadedDocuments).every((doc) => doc.file)
    },
    areMandatoryDocumentsUploaded: (state) => {
      const mandatoryFields = [
        'passport-front-side',
        'passport-back-side',
        'license-front-side',
        'license-back-side',
        'certificate-front-side',
        'certificate-back-side',
      ]
      return mandatoryFields.every((field) => state.uploadedDocuments[field].file)
    },
  },
})
