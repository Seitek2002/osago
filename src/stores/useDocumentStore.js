import { defineStore } from 'pinia'

import passportFrontSide from '../assets/images/passport-front-side.png'
import passportBackSide from '../assets/images/passport-back-side.png'
import prava_front from '../assets/images/prava_front.png'
import prava_back from '../assets/images/prava_back.png'
import tp_front from '../assets/images/tp_front.png'
import tp_back from '../assets/images/tp_back.png'

export const useDocumentStore = defineStore('documentStore', {
  state: () => ({
    isDisabled: true,
    uploadedDocuments: {
      'passport-front-side': { file: passportFrontSide, url: passportFrontSide },
      'passport-back-side': { file: passportBackSide, url: passportBackSide },
      'license-front-side': { file: prava_front, url: prava_front },
      'license-back-side': { file: prava_back, url: prava_back },
      'certificate-front-side': { file: tp_front, url: tp_back },
      'certificate-back-side': { file: tp_front, url: tp_back },
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
