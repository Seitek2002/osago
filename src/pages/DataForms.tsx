import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import PurposeDropdown from '../components/PurposeDropdown';
import PassportDropdown from '../components/PassportDropdown';
import VehicleSertDropdown from '../components/VehicleSertDropdown';
import DriverLicenceDropdown from '../components/DriverLicenceDropdown';

export interface IDriverLicense {
  surname?: string;
  name?: string;
  birthDate?: string;
  birthPlace?: string;
  licenceNumber?: string;
  personalNumber?: string;
  residence?: string;
  authority?: string;
  issueDate?: string;
  expiryDate?: string;
  categories?: {
    [key: string]: string;
  };
  category?: {
    category: string;
    issuingDate: string;
  };
}

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
  driverLicense?: IDriverLicense;
  purpose: { id?: number; name: string };
  unlimitedDrivers: boolean;
  referralCode?: number;
}

import { useTranslation } from 'react-i18next';

const DataForms: React.FC = () => {
  const { t } = useTranslation();
  const [confirmChecked, setConfirmChecked] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
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
    driverLicense: localData.driverLicense ?? {},
  };

  const [userFormData, setUserFormData] = useState<IFormData>(initialFormState);

  const isEmpty = (val?: string | null) => !val || val.trim() === '';

  const isLicenseValid = !Object.values({
    surname: userFormData?.driverLicense?.surname,
    name: userFormData?.driverLicense?.name,
    birthDate: userFormData?.driverLicense?.birthDate,
    licenceNumber: userFormData?.driverLicense?.licenceNumber,
    personalNumber: userFormData?.driverLicense?.personalNumber,
    issueDate: userFormData?.driverLicense?.issueDate,
    expiryDate: userFormData?.driverLicense?.expiryDate,
  }).some(isEmpty);

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

  // Водительское удостоверение не обязательно
  // (isDriverLicenseValid больше не используется)

  const isFormValid =
    !!userFormData?.phoneNumber &&
    !!userFormData?.purpose.id &&
    userFormData?.unlimitedDrivers === true &&
    isPassportValid &&
    isVehicleCertValid &&
    isLicenseValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
    return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      driverLicense: {
        ...userFormData.driverLicense,
        category: {
          category: userFormData.driverLicense?.category?.category,
          issuingDate: userFormData.driverLicense?.category?.issuingDate,
        },
      },
      unlimitedDrivers: false,
      purpose: userFormData.purpose.id,
      endDate: '',
      phoneNumber: userFormData.phoneNumber,
      technicalInspection: false,
    };
    if (params.id) {
      data.referralCode = params.id;
    }

    localStorage.setItem('ocrData', JSON.stringify(userFormData));
    localStorage.setItem('calculateData', JSON.stringify(data));
    if (params.id) {
      navigate(`/calculator/${params.id}`);
    } else {
      navigate('/calculator');
    }
  };

  const handleConfirmContinue = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      driverLicense: {
        ...userFormData.driverLicense,
        category: {
          category: userFormData.driverLicense?.category?.category,
          issuingDate: userFormData.driverLicense?.category?.issuingDate,
        },
      },
      unlimitedDrivers: false,
      purpose: userFormData.purpose.id,
      endDate: '',
      phoneNumber: userFormData.phoneNumber,
      technicalInspection: false,
    };
    if (params.id) {
      data.referralCode = params.id;
    }

    localStorage.setItem('ocrData', JSON.stringify(userFormData));
    localStorage.setItem('calculateData', JSON.stringify(data));
    if (params.id) {
      navigate(`/calculator/${params.id}`);
    } else {
      navigate('/calculator');
    }
  };

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
              {t('dataFormsPage.phone')}{' '}
              <span className='required text-red-500'>*</span>
            </label>
            <input
              required
              type='tel'
              inputMode='tel'
              autoComplete='tel'
              pattern='[0-9+ ()-]*'
              id='phoneNumber'
              placeholder='+996 (502) 235-509'
              className='form-input mt-[12px] w-full bg-[#F7F8FA] rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 border'
              style={getInputStyle(userFormData.phoneNumber)}
              defaultValue={'+996'}
              value={userFormData.phoneNumber}
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
            <span className='text-[14px] block text-[grey]'>
              {t('dataFormsPage.phoneHint')}
            </span>
          </div>

          {/* Использование авто */}
          <PurposeDropdown
            userFormData={userFormData}
            setUserFormData={setUserFormData}
          />

          <h3 className='text-suptitle'>
            {t('dataFormsPage.checkData')}{' '}
            <span className='required text-red-500'>*</span>
          </h3>

          {/* Блок паспорта */}
          <PassportDropdown
            userFormData={userFormData}
            setUserFormData={setUserFormData}
            isPassportValid={isPassportValid}
          />

          {/* Блок водительских прав */}
          <DriverLicenceDropdown
            userFormData={userFormData}
            setUserFormData={setUserFormData}
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
              onChange={(e) => setConfirmChecked(e.target.checked)}
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
      {showConfirm && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50' onClick={() => setShowConfirm(false)}>
          <div className='bg-white rounded-lg shadow-lg max-w-sm w-[90%] p-4 relative' onClick={(e) => e.stopPropagation()}>
            <button
              type='button'
              aria-label='Закрыть'
              className='absolute top-2 right-2 text-gray-400 hover:text-gray-600'
              onClick={() => setShowConfirm(false)}
            >
              ✕
            </button>
            <div className='text-[16px] text-[#201F1F] text-center'>
              На данный номер:{' '}
              <span className='block font-bold text-[26px] text-[#005CAA]'>
                {userFormData.phoneNumber}
              </span>{' '}
              будет отправлена ссылка для скачивания вашего полис ОСАГО после оплаты
            </div>
            <div className='mt-4 flex flex-col justify-center gap-2'>
              <button
                type='button'
                className='px-4 py-2 rounded bg-[#005CAA] text-white'
                onClick={handleConfirmContinue}
              >
                Далее
              </button>
              <button
                type='button'
                className='px-4 py-2 rounded bg-gray-200'
                onClick={() => setShowConfirm(false)}
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DataForms;
