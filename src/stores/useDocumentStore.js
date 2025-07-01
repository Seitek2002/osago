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
      'passport-front-side': { file: null, url: passportFrontSide },
      'passport-back-side': { file: null, url: passportBackSide },
      'license-front-side': { file: null, url: prava_front },
      'license-back-side': { file: null, url: prava_back },
      'certificate-front-side': { file: null, url: tp_front },
      'certificate-back-side': { file: null, url: tp_back },
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
    areMandatoryDocumentsUploaded2: (state) => {
      const mandatoryFields = [
        'passport-front-side',
        'passport-back-side',
        'certificate-front-side',
        'certificate-back-side',
      ]
      return mandatoryFields.every((field) => state.uploadedDocuments[field].file)
    },
  },
})
