import React from 'react';
import Container from '../components/Container';
import dollar from '../assets/dollar-logo.svg';
import add from '../assets/add-icon.svg';

const cardData = [
  {
    title: '❗ У каждого должен быть ОСАГО!',
    text: 'Каждый автомобиль в стране обязан иметь оформленный полис ОСАГО согласно закону Кыргызсзкой Республики №192  "Об обязательном страховании гражданско-правовой ответственности владельцев автотранспортных средств"',
  },
  {
    title: '❗Штрафы за отсутствие ОСАГО',
    text: 'Введен штраф 3000 сомов за отсутствие полиса ОСАГО с 01.07.2025 при каждой проверке сотрудниками ГУОБДД КР. Помогите близким оформить ОСАГО и защитите их от лишних затрат.',
  },
  {
    title: 'Что такое ОСАГО?',
    text: 'ОСАГО - это Обязательное Страхование Автогражданской Ответственности, который обязателен для всех. В случае ДТП страховая компания покрывает расходы на ремонт чужого автомобиля и лечение пострадавших.',
  },
];

const earnSteps = [
  'Зарегистрируйся',
  'Получи свой личный код',
  'Делись ссылкой для регистрации ОСАГО с личным кодом',
  'Помогай и зарабатывай 15% с каждого ОСАГО',
];

const passiveSteps = [
  'Зарегистрируйся и получи свой личный код',
  'Приглашай друзей в свою команду',
  'Научи их оформлять полис ОСАГО',
  'Получай 5% со всех продаж твоей команды',
];

type StepCardProps = {
  title: string;
  steps: string[];
  color: string;
  borderColor: string;
  bgColor: string;
  btnText: string;
  btnColor: string;
  link: string;
  icon: string;
};

const StepCard: React.FC<StepCardProps> = ({
  title,
  steps,
  color,
  borderColor,
  bgColor,
  btnText,
  btnColor,
  link,
  icon,
}) => {
  return (
    <div
      className={`rounded-[20px] p-[30px] border-[1px]`}
      style={{
        borderColor: borderColor,
        backgroundColor: bgColor,
      }}
    >
      <h3 className='text-[#000] text-[24px] font-medium mb-6 lg:text-2xl'>
        {title}
      </h3>
      <ol className='flex flex-col gap-[20px] relative'>
        {steps.map((step, i) => (
          <div key={i}>
            <div className='text-[#000] text-lg list-none flex items-center gap-5'>
              <span
                className={`border py-[2px] px-[9px] rounded-full`}
                style={{ borderColor: color }}
              >
                {i + 1}
              </span>
              <li>{step}</li>
            </div>
          </div>
        ))}
      </ol>
      <a
        href={link}
        className={`h-[60px] rounded-xl mt-6 inline-flex items-center justify-center gap-2 ${btnColor} text-white text-[20px] py-[12px] px-[24px] w-full`}
      >
        <img src={icon} alt='' />
        {btnText}
      </a>
    </div>
  );
};

const Referral = () => {
  return (
    <Container>
      <h2 className='text-center text-[32px] font-semibold text-[#000] mb-[30px]'>
        Для чего нужен ОСАГО?
      </h2>

      <div className='grid md:grid-cols-3 gap-6 mb-[60px] text-justify'>
        {cardData.map((item, index) => (
          <div
            key={index}
            className='bg-white rounded-[12px] p-[20px] border border-[#CCE3FF]'
          >
            <h3 className='text-[#000] font-semibold mb-2 lg:text-xl'>
              {item.title}
            </h3>
            <p className='text-[#000] text-[15px] leading-[22px]'>
              {item.text}
            </p>
          </div>
        ))}
      </div>

      <div className='grid md:grid-cols-2 gap-6 mb-[60px]'>
        <StepCard
          title='Как начать зарабатывать?'
          steps={earnSteps}
          color='#0072DE'
          borderColor='#C0D2F9'
          bgColor='#F9FBFF'
          btnText='Зарегистрироваться'
          btnColor='bg-[#0072DE]'
          link='https://oa.kg/a/'
          icon={dollar}
        />
        <StepCard
          title='Как зарабатывать пассивно с OA.KG?'
          steps={passiveSteps}
          color='#1AA37F'
          borderColor='#8AD4A9'
          bgColor='#F9FFF9'
          btnText='Создать команду'
          btnColor='bg-[#1AA37F]'
          link='https://oa.kg/a/'
          icon={add}
        />
      </div>
    </Container>
  );
};

export default Referral;
