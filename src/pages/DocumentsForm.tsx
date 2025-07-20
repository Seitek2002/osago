import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { useRecognizeDocumentMutation } from '../store/ocrApi';

import passportFrontSide from '../assets/images/passport-front-side.png';
import passportBackSide from '../assets/images/passport-back-side.png';
import tp_front from '../assets/images/tp_front.png';
import tp_back from '../assets/images/tp_back.png';
import prava_front from '../assets/images/prava_front.png';
import prava_back from '../assets/images/prava_back.png';
import loader from '../assets/loader.svg';
import ReferralIdInput from './ReferralIdInput';

const RemoveIcon = ({ onClick }: { onClick: React.MouseEventHandler }) => (
  <svg
    width='20'
    height='21'
    viewBox='0 0 20 21'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className='absolute top-0 right-0 z-[1] bg-white rounded cursor-pointer'
    onClick={onClick}
    style={{ boxShadow: '0 0 2px #0002' }}
  >
    <path
      d='M16.5 4L3.5 17'
      stroke='#E54335'
      strokeWidth='1.3'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M3.5 4L16.5 17'
      stroke='#E54335'
      strokeWidth='1.3'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const UploadIcon = () => (
  <svg
    id='Layer_2'
    height='25'
    viewBox='0 0 512 512'
    width='25'
    xmlns='http://www.w3.org/2000/svg'
    data-name='Layer 2'
    className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]'
  >
    <defs>
      <linearGradient
        id='linear-gradient'
        gradientTransform='matrix(-1 0 0 -1 512 512)'
        gradientUnits='userSpaceOnUse'
        x1='43.93'
        x2='468.07'
        y1='43.93'
        y2='468.07'
      >
        <stop offset='0' stopColor='#2492ff' />
        <stop offset='1' stopColor='#0043ae' />
      </linearGradient>
    </defs>
    <g id='Icon'>
      <g id='_70' data-name='70'>
        <rect
          id='Background'
          fill='url(#linear-gradient)'
          height='512'
          rx='150'
          transform='matrix(-1 0 0 -1 512 512)'
          width='512'
        />
        <g fill='#fff'>
          <path d='m183.47 197.72 47.53 47.53v-129.52c0-13.81 11.19-25 25-25 13.81 0 25 11.19 25 25v129.52l47.53-47.53c9.76-9.76 25.59-9.76 35.36 0 9.76 9.76 9.76 25.59 0 35.36l-90.21 90.21c-9.76 9.76-25.59 9.76-35.36 0l-90.21-90.21c-9.76-9.76-9.76-25.59 0-35.36 9.76-9.76 25.59-9.76 35.36 0z' />
          <rect height='50' rx='25' width='250' x='131' y='371.27' />
        </g>
      </g>
    </g>
  </svg>
);

const DocumentsForm: React.FC = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = React.useState<string | undefined>(
    params.id
  );
  const [recognizeDocument, { isLoading }] = useRecognizeDocumentMutation();

  const [passportFront, setPassportFront] = React.useState<File | null>(null);
  const [passportBack, setPassportBack] = React.useState<File | null>(null);
  const [tpFront, setTpFront] = React.useState<File | null>(null);
  const [tpBack, setTpBack] = React.useState<File | null>(null);
  const [pravaFront, setPravaFront] = React.useState<File | null>(null);
  const [pravaBack, setPravaBack] = React.useState<File | null>(null);

  const [personalDataChecked, setPersonalDataChecked] = React.useState(false);
  // Глобальная ошибка больше не нужна
  // const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  // Состояния ошибок для каждого документа
  const [passportError, setPassportError] = React.useState<string | null>(null);
  const [pravaError, setPravaError] = React.useState<string | null>(null);
  const [vehicleError, setVehicleError] = React.useState<string | null>(null);

  // Состояние для таймера
  const [timer, setTimer] = React.useState(30);

  React.useEffect(() => {
    let interval: number | null = null;
    if (isLoading) {
      setTimer(30); // сброс при каждом новом isLoading
      interval = window.setInterval(() => {
        setTimer((prev) => (prev === 1 ? 30 : prev - 1));
      }, 1000);
    } else {
      setTimer(30);
    }
    return () => {
      if (interval !== null) window.clearInterval(interval);
    };
  }, [isLoading]);

  const isValid = Boolean(
    passportFront &&
      passportBack &&
      tpFront &&
      tpBack &&
      personalDataChecked &&
      pravaFront &&
      pravaBack
  );

  const handleSend = async () => {
    // Сброс ошибок перед отправкой
    setPassportError(null);
    setPravaError(null);
    setVehicleError(null);

    if (
      !passportFront ||
      !passportBack ||
      !tpFront ||
      !tpBack ||
      !personalDataChecked ||
      !pravaFront ||
      !pravaBack
    )
      return;

    let passportRes, vehicleRes, driverRes;

    // Паспорт
    try {
      passportRes = await recognizeDocument({
        documentType: 'passport',
        front: passportFront,
        back: passportBack,
      }).unwrap();
    } catch (err: unknown) {
      const errorObj = err as any;
      setPassportError(
        errorObj?.data?.error ||
          errorObj?.error ||
          (typeof errorObj === 'string'
            ? errorObj
            : 'Ошибка при загрузке или сканировании документов')
      );
      return;
    }

    // Свидетельство
    try {
      vehicleRes = await recognizeDocument({
        documentType: 'vehicle_cert',
        front: tpFront,
        back: tpBack,
      }).unwrap();
    } catch (err: unknown) {
      const errorObj = err as any;
      setVehicleError(
        errorObj?.data?.error ||
          errorObj?.error ||
          (typeof errorObj === 'string'
            ? errorObj
            : 'Ошибка при загрузке или сканировании документов')
      );
      return;
    }

    // Права
    try {
      driverRes = await recognizeDocument({
        documentType: 'driver_license',
        front: pravaFront,
        back: pravaBack,
      }).unwrap();
    } catch (err: unknown) {
      const errorObj = err as any;
      setPravaError(
        errorObj?.data?.error ||
          errorObj?.error ||
          (typeof errorObj === 'string'
            ? errorObj
            : 'Ошибка при загрузке или сканировании документов')
      );
      return;
    }

    localStorage.setItem('ocrData', '{}');

    localStorage.setItem(
      'ocrData',
      JSON.stringify({
        passport: passportRes.data,
        vehicle_cert: vehicleRes.data,
        driverLicense: driverRes.data,
      })
    );

    if (!driverRes.data?.categories) {
      setPravaError('Не удалось отсканировать права');
      return;
    }
    if (!vehicleRes.data?.vehicleCategory) {
      setVehicleError('Не удалось отсканировать права');
      return;
    }

    if (selectedId) {
      navigate(`/data-forms/${selectedId}`);
    } else {
      navigate('/data-forms');
    }
  };

  return (
    <section className='passport py-14 pb-[100px]'>
      <div className='mx-auto px-4 max-w-[1200px]'>
        <h2 className='text-[#000B16] text-[20px] font-semibold mb-4'>
          Загрузка документов
        </h2>

        <div className='referral-hint'>
          <img
            alt='warning'
            src="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M12%206.75C12.4142%206.75%2012.75%207.08579%2012.75%207.5V12.5C12.75%2012.9142%2012.4142%2013.25%2012%2013.25C11.5858%2013.25%2011.25%2012.9142%2011.25%2012.5V7.5C11.25%207.08579%2011.5858%206.75%2012%206.75Z'%20fill='%230072DE'%20/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M12%2015.25C12.4142%2015.25%2012.75%2015.5858%2012.75%2016V16.5C12.75%2016.9142%2012.4142%2017.25%2012%2017.25C11.5858%2017.25%2011.25%2016.9142%2011.25%2016.5V16C11.25%2015.5858%2011.5858%2015.25%2012%2015.25Z'%20fill='%230072DE'%20/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M12%202.75C6.89137%202.75%202.75%206.89137%202.75%2012C2.75%2017.1086%206.89137%2021.25%2012%2021.25C17.1086%2021.25%2021.25%2017.1086%2021.25%2012C21.25%206.89137%2017.1086%202.75%2012%202.75ZM1.25%2012C1.25%206.06294%206.06294%201.25%2012%201.25C17.9371%201.25%2022.75%206.06294%2022.75%2012C22.75%2017.9371%2017.9371%2022.75%2012%2022.75C6.06294%2022.75%201.25%2017.9371%201.25%2012Z'%20fill='%230072DE'%20/%3e%3c/svg%3e"
          />
          <span>
            Допускается загрузка фотографии оригиналов документов либо скриншота
            из сервиса госуслуг "Түндүк"
          </span>
        </div>

        {/* Блок загрузки паспорта */}
        <div className='mb-[30px]'>
          <h2 className='mb-[12px] text-[16px] font-medium'>Паспорт</h2>
          <div className='grid grid-cols-2 gap-[12px]'>
            {/* Лицевая сторона */}
            <label className='relative flex flex-col cursor-pointer'>
              <div className='relative w-full h-[150px] border border-dashed border-gray-300 rounded overflow-hidden flex items-center justify-center'>
                {passportFront ? (
                  <div className='relative h-full w-full flex items-center justify-center'>
                    <RemoveIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        setPassportFront(null);
                      }}
                    />
                    <img
                      src={URL.createObjectURL(passportFront)}
                      alt=''
                      className='object-contain max-h-full max-w-full'
                    />
                  </div>
                ) : (
                  <div className='relative h-full w-full flex justify-center items-center'>
                    <UploadIcon />
                    <img
                      className='file-upload-image blur-sm object-contain'
                      src={passportFrontSide}
                      alt='Изображение'
                    />
                  </div>
                )}
              </div>
              <div className='text-center mt-2 text-[14px]'>
                Лицевая сторона
              </div>
              <input
                type='file'
                className='hidden'
                onChange={(e) => setPassportFront(e.target.files![0])}
              />
            </label>

            {/* Обратная сторона */}
            <label className='relative flex flex-col cursor-pointer'>
              <div className='relative w-full h-[150px] border border-dashed border-gray-300 rounded overflow-hidden flex items-center justify-center'>
                {passportBack ? (
                  <div className='relative h-full w-full flex items-center justify-center'>
                    <RemoveIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        setPassportBack(null);
                      }}
                    />
                    <img
                      src={URL.createObjectURL(passportBack)}
                      alt=''
                      className='object-contain max-h-full max-w-full'
                    />
                  </div>
                ) : (
                  <div className='relative h-full w-full flex justify-center items-center'>
                    <UploadIcon />
                    <img
                      className='file-upload-image blur-sm object-contain'
                      src={passportBackSide}
                      alt='Изображение'
                    />
                  </div>
                )}
              </div>
              <div className='text-center mt-2 text-[14px]'>
                Обратная сторона
              </div>
              <input
                type='file'
                className='hidden'
                onChange={(e) => setPassportBack(e.target.files![0])}
              />
            </label>
          </div>
          {passportError && (
            <div className='text-red-500 text-center text-[13px] -mt-2 mb-[20px]'>
              {passportError}
            </div>
          )}
        </div>

        {/* Блок загрузки водительских прав */}
        <div className='mb-[30px]'>
          <h2 className='mb-[12px] text-[16px] font-medium'>
            Водительские права
          </h2>
          <div className='grid grid-cols-2 gap-[12px]'>
            {/* Лицевая сторона */}
            <label className='relative flex flex-col cursor-pointer'>
              <div className='relative w-full h-[150px] border border-dashed border-gray-300 rounded overflow-hidden flex items-center justify-center'>
                {pravaFront ? (
                  <div className='relative h-full w-full flex items-center justify-center'>
                    <RemoveIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        setPravaFront(null);
                      }}
                    />
                    <img
                      src={URL.createObjectURL(pravaFront)}
                      alt=''
                      className='object-contain max-h-full max-w-full'
                    />
                  </div>
                ) : (
                  <div className='relative h-full w-full flex justify-center items-center'>
                    <UploadIcon />
                    <img
                      className='file-upload-image blur-sm object-contain'
                      src={prava_front}
                      alt='Изображение'
                    />
                  </div>
                )}
              </div>
              <div className='text-center mt-2 text-[14px]'>
                Лицевая сторона
              </div>
              <input
                type='file'
                className='hidden'
                onChange={(e) => setPravaFront(e.target.files![0])}
              />
            </label>

            {/* Обратная сторона */}
            <label className='relative flex flex-col cursor-pointer'>
              <div className='relative w-full h-[150px] border border-dashed border-gray-300 rounded overflow-hidden flex items-center justify-center'>
                {pravaBack ? (
                  <div className='relative h-full w-full flex items-center justify-center'>
                    <RemoveIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        setPravaBack(null);
                      }}
                    />
                    <img
                      src={URL.createObjectURL(pravaBack)}
                      alt=''
                      className='object-contain max-h-full max-w-full'
                    />
                  </div>
                ) : (
                  <div className='relative h-full w-full flex justify-center items-center'>
                    <UploadIcon />
                    <img
                      className='file-upload-image blur-sm object-contain'
                      src={prava_back}
                      alt='Изображение'
                    />
                  </div>
                )}
              </div>
              <div className='text-center mt-2 text-[14px]'>
                Обратная сторона
              </div>
              <input
                type='file'
                className='hidden'
                onChange={(e) => setPravaBack(e.target.files![0])}
              />
            </label>
          </div>
          {/* Блок ошибки */}
          {pravaError && (
            <div className='text-red-500 text-center text-[13px] mt-2 mb-[20px]'>
              {pravaError}
            </div>
          )}
        </div>

        {/* Блок загрузки свидетельства */}
        <div className='mb-[30px]'>
          <h2 className='mb-[12px] text-[16px] font-medium'>
            Свидетельство о регистрации ТС
          </h2>
          <div className='grid grid-cols-2 gap-[12px]'>
            {/* Лицевая сторона */}
            <label className='relative flex flex-col cursor-pointer'>
              <div className='relative w-full h-[150px] border border-dashed border-gray-300 rounded overflow-hidden flex items-center justify-center'>
                {tpFront ? (
                  <div className='relative h-full w-full flex items-center justify-center'>
                    <RemoveIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        setTpFront(null);
                      }}
                    />
                    <img
                      src={URL.createObjectURL(tpFront)}
                      alt=''
                      className='object-contain max-h-full max-w-full'
                    />
                  </div>
                ) : (
                  <div className='relative h-full w-full flex justify-center items-center'>
                    <UploadIcon />
                    <img
                      className='file-upload-image blur-sm object-contain'
                      src={tp_front}
                      alt='Изображение'
                    />
                  </div>
                )}
              </div>
              <div className='text-center mt-2 text-[14px]'>
                Лицевая сторона
              </div>
              <input
                type='file'
                className='hidden'
                onChange={(e) => setTpFront(e.target.files![0])}
              />
            </label>

            {/* Обратная сторона */}
            <label className='relative flex flex-col cursor-pointer'>
              <div className='relative w-full h-[150px] border border-dashed border-gray-300 rounded overflow-hidden flex items-center justify-center'>
                {tpBack ? (
                  <div className='relative h-full w-full flex items-center justify-center'>
                    <RemoveIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        setTpBack(null);
                      }}
                    />
                    <img
                      src={URL.createObjectURL(tpBack)}
                      alt=''
                      className='object-contain max-h-full max-w-full'
                    />
                  </div>
                ) : (
                  <div className='relative h-full w-full flex justify-center items-center'>
                    <UploadIcon />
                    <img
                      className='file-upload-image blur-sm object-contain'
                      src={tp_back}
                      alt='Изображение'
                    />
                  </div>
                )}
              </div>
              <div className='text-center mt-2 text-[14px]'>
                Обратная сторона
              </div>
              <input
                type='file'
                className='hidden'
                onChange={(e) => setTpBack(e.target.files![0])}
              />
            </label>
          </div>
          {/* Блок ошибки */}
          {vehicleError && (
            <div className='text-red-500 text-center text-[13px] mt-2 mb-[20px]'>
              {vehicleError}
            </div>
          )}
        </div>

        {/* Блок ввода реферального ID */}
        <ReferralIdInput paramsId={params.id} onIdChange={setSelectedId} />
        {/* Чекбокс согласия */}
        <div className='passport__bottom flex flex-col gap-[20px] mt-[20px]'>
          <label className='flex items-center gap-[14px] text-[13px]'>
            <input
              type='checkbox'
              className='appearance-none border-2 border-[#005CAA] w-5 h-5 rounded-[3px] personal-checkbox'
              checked={personalDataChecked}
              onChange={(e) => setPersonalDataChecked(e.target.checked)}
            />
            <span>
              Согласие на
              <a
                href='/ПУБЛИЧНАЯ ОФЕРТА для субагентов.pdf'
                target='_blank'
                rel='noopener noreferrer'
                className='underline text-blue-600 ml-[6px]'
              >
                обработку персональных данных
              </a>
            </span>
          </label>
        </div>
        {/* Кнопка "Далее" */}
        <div className='w-full mt-[20px]'>
          <button
            type='button'
            disabled={!isValid || isLoading}
            className='flex justify-center w-full py-[14px] bg-[#005CAA] rounded-[6px] text-white text-[16px] mb-[16px] disabled:opacity-50 disabled:cursor-not-allowed'
            onClick={handleSend}
          >
            Далее
          </button>
        </div>
        {/* Модальное окно загрузки */}
        {isLoading && (
          <div className='fixed z-[10000] top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.5)]'>
            <div className='w-[50%] h-[40%] bg-white flex flex-col items-center justify-center rounded'>
              <img src={loader} alt='' />
              <p className='text-center text-[16px] mb-2'>
                Идет сканирование документов
              </p>
              <div className='text-center text-[24px] font-bold text-blue-600'>
                {timer} сек
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DocumentsForm;
