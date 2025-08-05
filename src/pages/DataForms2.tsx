import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import PurposeDropdown from '../components/PurposeDropdown';
import PassportDropdown from '../components/PassportDropdown';
import VehicleSertDropdown from '../components/VehicleSertDropdown';

export interface IPassport {
  surname?: string;
  name?: string;
  patronymic?: string;
  gender?: string;
  birthDate?: string;
  personalNumber?: string;
  series?: string;
  number?: string;
  issueDate?: string;
  expiryDate?: string;
  birthPlace?: string;
  authority?: string;
  ethnicity?: string;
  citizenshipCountryId: number;
}

export interface IVehicleCert {
  number?: string;
  vin?: string;
  ownerFullName?: string;
  personalNumber?: string;
  ownerAddress?: string;
  steeringLocation?: string;
  engineType?: string;
  yearOfManufacture?: string;
  color?: string;
  carBodyChassisNumber?: string;
  carBodyType?: string;
  vehicleCategory?: string;
  engineCapacity?: string | null;
  enginePower?: string | null;
  unladenMass?: string | null;
  maxPermissibleMass?: number | null;
  authority?: string;
  registrationDate?: string;
  brandId?: number | null;
  carModelId?: number | null;
  brandName?: string | null;
  carModelName?: string | null;
  fuelType?: string | null;
  registrationCountryId: number;
  registrationCountry: string;
}

export interface IFormData {
  phoneNumber: string;
  passport: IPassport;
  vehicle_cert: IVehicleCert;
  purpose: { id?: number; name: string };
  unlimitedDrivers: boolean;
  referralCode?: number;
}

import { useTranslation } from 'react-i18next';

const DataForms2: React.FC = () => {
  const { t } = useTranslation();
  const [confirmChecked, setConfirmChecked] = useState(false);
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const localData = JSON.parse(localStorage.getItem('ocrData') || '{}');

  const initialFormState: IFormData = {
    phoneNumber: localData.phoneNumber ?? '',
    passport: localData.passport ?? {},
    vehicle_cert: localData.vehicle_cert ?? {},
    purpose: { name: 'Личная', id: 2 },
    unlimitedDrivers: true,
    referralCode: undefined,
  };

  const [userFormData, setUserFormData] = useState<IFormData>(initialFormState);

  // Валидация паспорта по требованиям пользователя (только required из JSON)
  const isPassportValid =
    !!userFormData?.passport?.surname &&
    !!userFormData?.passport?.name &&
    !!userFormData?.passport?.birthDate &&
    !!userFormData?.passport?.series &&
    !!userFormData?.passport?.number &&
    !!userFormData?.passport?.issueDate &&
    !!userFormData?.passport?.personalNumber;

  // Валидация техпаспорта по требованиям пользователя (только required из JSON)
  const isVehicleCertValid =
    !!userFormData?.vehicle_cert?.number &&
    !!userFormData?.vehicle_cert?.vin &&
    !!userFormData?.vehicle_cert?.ownerFullName &&
    !!userFormData?.vehicle_cert?.personalNumber &&
    !!userFormData?.vehicle_cert?.brandId &&
    !!userFormData?.vehicle_cert?.carModelId &&
    !!userFormData?.vehicle_cert?.steeringLocation &&
    !!userFormData?.vehicle_cert?.engineType &&
    !!userFormData?.vehicle_cert?.yearOfManufacture &&
    !!userFormData?.vehicle_cert?.registrationDate &&
    !!userFormData?.vehicle_cert?.vehicleCategory;

  const isFormValid =
    !!userFormData?.phoneNumber &&
    !!userFormData?.purpose.id &&
    userFormData?.unlimitedDrivers === true &&
    isPassportValid &&
    isVehicleCertValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: any = {
      passport: {
        ...userFormData.passport,
        citizenshipCountry: userFormData.passport.citizenshipCountryId,
      },
      vehicleRegistrationCertificate: {
        ...userFormData.vehicle_cert,
        number: userFormData.vehicle_cert.number,
        vin: userFormData.vehicle_cert.vin,
        ownerFullName: userFormData.vehicle_cert.ownerFullName,
        personalNumber: userFormData.vehicle_cert.personalNumber,
        ownerAddress: userFormData.vehicle_cert.ownerAddress,
        brand: userFormData.vehicle_cert.brandId,
        car_model: userFormData.vehicle_cert.carModelId,
        steeringLocation: userFormData.vehicle_cert.steeringLocation,
        engineType: userFormData.vehicle_cert.engineType,
        yearOfManufacture: userFormData.vehicle_cert.yearOfManufacture,
        color: userFormData.vehicle_cert.color,
        carBodyChassisNumber: userFormData.vehicle_cert.carBodyChassisNumber,
        carBodyType: userFormData.vehicle_cert.carBodyType,
        vehicleCategory: userFormData.vehicle_cert.vehicleCategory,
        engineCapacity: userFormData.vehicle_cert.engineCapacity,
        enginePower: userFormData.vehicle_cert.enginePower,
        unladenMass: userFormData.vehicle_cert.unladenMass,
        maxPermissibleMass: userFormData.vehicle_cert.maxPermissibleMass,
        authority: userFormData.vehicle_cert.authority,
        registrationDate: userFormData.vehicle_cert.registrationDate,
        registrationCountry: userFormData.vehicle_cert.registrationCountryId,
      },
      unlimitedDrivers: true,
      purpose: userFormData.purpose.id,
      endDate: '',
      phoneNumber: userFormData.phoneNumber,
      technicalInspection: false,
    };
    if (params.id) {
      data.referralCode = params.id;
    }

    localStorage.setItem('calculateData', JSON.stringify(data));
    localStorage.setItem('ocrData', JSON.stringify(userFormData));
    if (params.id) {
      navigate(`/calculator-2/${params.id}`);
    } else {
      navigate('/calculator-2');
    }
  };

  const isEmpty = (val?: string | null) => !val || val.trim() === '';

  const getInputStyle = (value?: string | null) => ({
    borderColor: isEmpty(value) ? '#ef4444' : '#d1d5db',
  });

  return (
    <section className='form-section pt-14 pb-[100px]'>
      <form onSubmit={handleSubmit} className='mx-auto px-4 max-w-[1200px]'>
        <div className='form-section__content space-y-4'>
          <h2 className='text-title text-2xl font-semibold'>
            {t('dataFormsPage.title')}
          </h2>

          {/* Номер телефона */}
          <div className='form-group mt-4'>
            <label className='text-suptitle block' htmlFor='phoneNumber'>
              {t('dataFormsPage.phone')} <span className='required text-red-500'>*</span>
            </label>
            <input
              required
              type='text'
              id='phoneNumber'
              placeholder='+996502235509'
              className='form-input mt-[12px] w-full bg-[#F7F8FA] rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 border'
              style={getInputStyle(userFormData.phoneNumber)}
              value={userFormData.phoneNumber}
              defaultValue={'+996'}
              onFocus={() => {
                setUserFormData((prev) => {
                  if (!prev.phoneNumber.startsWith('+996')) {
                    return {
                      ...prev,
                      phoneNumber:
                        '+996' +
                        prev.phoneNumber
                          .replace(/^\+*/, '')
                          .replace(/^996/, ''),
                    };
                  }
                  return prev;
                });
              }}
              onChange={(e) =>
                setUserFormData((prev) => {
                  const val = e.target.value;
                  // Не даём удалить +996
                  // if (!val.startsWith('+996')) {
                  //   val = '+996' + val.replace(/^\+*/, '').replace(/^996/, '');
                  // }
                  return { ...prev, phoneNumber: val };
                })
              }
            />
            <span className='text-[14px] block text-[grey]'>{t('dataFormsPage.phoneHint')}</span>
          </div>


          {/* Использование авто */}
          <PurposeDropdown
            userFormData={userFormData}
            setUserFormData={setUserFormData}
          />

          <h3 className='text-suptitle'>
            {t('dataFormsPage.checkData')} <span className='required text-red-500'>*</span>
          </h3>

          {/* Блок паспорта */}
          <PassportDropdown
            userFormData={userFormData}
            setUserFormData={setUserFormData}
            isPassportValid={isPassportValid}
          />

          {/* Блок техпаспорта */}
          <VehicleSertDropdown
            userFormData={userFormData}
            setUserFormData={setUserFormData}
            isVehicleCertValid={isVehicleCertValid}
          />
        </div>

        <div className='form-group mt-8 mb-4'>
          <label className='flex items-center gap-[14px]'>
            <input
              type='checkbox'
              required
              checked={confirmChecked}
              onChange={e => setConfirmChecked(e.target.checked)}
              className='appearance-none border-2 border-[#005CAA] w-5 h-5 rounded-[3px] personal-checkbox'
            />
            <span className='w-[90%] text-[14px]'>
              {t('dataFormsPage.confirm')}
            </span>
          </label>
        </div>
        <div className='mt-8'>
          <button
            className='flex justify-center w-full py-[14px] bg-[#005CAA] rounded-[6px] text-white text-[16px] disabled:opacity-50 disabled:cursor-not-allowed'
            type='submit'
            disabled={!isFormValid || !confirmChecked}
          >
            {t('dataFormsPage.next')}
          </button>
        </div>
      </form>
    </section>
  );
};

export default DataForms2;
