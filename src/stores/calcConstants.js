export const calcConstants = {
  BASE_RATE: 3500, // базовая ставка ОСАГО, пример

  DRIVER_COEFFICIENTS: {
    unlimited: 1.6,
    limited: 2
  },

  EXPERIENCE_COEFFICIENTS_UI: {
    ru: [
      { label: 'до 25-ти лет и стажем до 3-х лет', value: 1.4 },
      { label: 'до 25-ти лет и стажем от 4-х лет', value: 1.3 },
      { label: 'от 26-ти лет и стажем до 3-х лет', value: 1.2 },
      { label: 'от 26-ти лет и стажем от 4-х лет', value: 1 }
    ],
    en: [
      { label: 'Under 25 years old and up to 3 years of experience', value: 1.4 },
      { label: 'Under 25 years old and 4 years or more of experience', value: 1.3 },
      { label: 'Over 26 years old and up to 3 years of experience', value: 1.2 },
      { label: 'Over 26 years old and 4 years or more of experience', value: 1 }
    ],
    kg: [
      { label: '25 жашка чейин жана 3 жылдан аз тажрыйба', value: 1.4 },
      { label: '25 жашка чейин жана 4 жана андан көп жыл тажрыйба', value: 1.3 },
      { label: '26 жаштан жогору жана 3 жылга чейин тажрыйба', value: 1.2 },
      { label: '26 жаштан жогору жана 4 жана андан көп жыл тажрыйба', value: 1 }
    ]
  },

  INSURANCE_DURATIONS_UI: {
    ru: [
      { label: '15 дней', value: 0.2 },
      { label: '1 месяц', value: 0.3 },
      { label: '3 месяца', value: 0.5 },
      { label: '6 месяцев', value: 0.7 },
      { label: '9 месяцев', value: 0.9 },
      { label: '12 месяцев', value: 1 }
    ],
    en: [
      { label: '15 days', value: 0.2 },
      { label: '1 month', value: 0.3 },
      { label: '3 months', value: 0.5 },
      { label: '6 months', value: 0.7 },
      { label: '9 months', value: 0.9 },
      { label: '12 months', value: 1 }
    ],
    kg: [
      { label: '15 күн', value: 0.2 },
      { label: '1 ай', value: 0.3 },
      { label: '3 ай', value: 0.5 },
      { label: '6 ай', value: 0.7 },
      { label: '9 ай', value: 0.9 },
      { label: '12 ай', value: 1 }
    ]
  },

  REGION_COEFFICIENTS: {
    bishkek: 1.2,
    osh: 1.1,
    naryn: 1.0,
    // ... другие регионы
  },
  AGE_COEFFICIENTS: [
    { min: 16, max: 21, value: 1.8 },
    { min: 22, max: 24, value: 1.6 },
    { min: 25, max: 29, value: 1.3 },
    { min: 30, max: 100, value: 1.0 }
  ],
  EXPERIENCE_COEFFICIENTS: [
    { min: 0, max: 2, value: 1.7 },
    { min: 3, max: 5, value: 1.3 },
    { min: 6, max: 100, value: 1.0 }
  ],
  VEHICLE_TYPE_COEFFICIENTS: {
    легковой: 1.0,
    грузовой: 1.5,
    автобус: 2.0,
    // ... другие типы
  },
  POWER_COEFFICIENTS: [
    { min: 0, max: 70, value: 1.0 },
    { min: 71, max: 100, value: 1.1 },
    { min: 101, max: 120, value: 1.2 },
    { min: 121, max: 150, value: 1.4 },
    { min: 151, max: 1000, value: 1.6 }
  ],
  PERIOD_COEFFICIENTS: {
    '3m': 0.5,
    '6m': 0.7,
    '12m': 1.0
  },
  TAX: 0.03 // 3% налог
}
