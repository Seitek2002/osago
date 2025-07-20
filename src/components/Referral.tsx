import React from 'react';
import { Link } from 'react-router';
import Container from '../components/Container';
import dollar from '../assets/dollar-logo.svg';
import add from '../assets/add-icon.svg';

const cardData = [
  {
    title: 'Что такое ОСАГО?',
    text: 'ОСАГО — это обязательная страховка для всех водителей. В случае ДТП страховая компания покрывает расходы на ремонт чужого автомобиля и лечение пострадавших.',
  },
  {
    title: 'Не переживайте о расходах',
    text: 'Если вы стали виновником аварии, страховая возьмёт на себя оплату ремонта чужого транспорта и компенсацию за причинённый вред здоровью.',
  },
  {
    title: 'Штрафы за отсутствие ОСАГО',
    text: 'Отсутствие полиса ОСАГО влечёт за собой штраф в размере 3000 сомов. Не рискуйте — оформите ОСАГО и защитите себя от лишних затрат.',
  },
];

const earnSteps = [
  'Регистрируешься на OA.KG',
  'Получаешь личную ссылку на ОСАГО',
  'Делишься ссылкой и помогаешь оформить ОСАГО',
  'Получаешь 15% с каждой продажи',
];

const passiveSteps = [
  'Регистрируешься на OA.KG',
  'Получаешь личную ссылку на OA.KG',
  'Делишься ссылкой и приглашаешь друзей в свою команду',
  'Получаешь 5% с каждой продажи твоей команды',
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
      <h3 className='text-[#000] text-[22px] font-semibold mb-6'>{title}</h3>
      <ol className='flex flex-col gap-[20px] relative'>
        {steps.map((step, i) => (
          <div key={i}>
            <div className='text-[#000] text-[16px] list-none flex items-center gap-2'>
              <span
                className={`border py-[2px] px-[9px] rounded-full`}
                style={{ borderColor: color }}
              >
                {i + 1}
              </span>
              <li>{step}</li>
            </div>
            {i !== steps.length - 1 && (
              <div
                className={`m-0 border-l-[3px] border-dotted w-0 h-5 absolute hidden lg:block`}
                style={{ top: `${30 + i * 50}px`, left: '12px', borderColor: borderColor }}
              ></div>
            )}
          </div>
        ))}
      </ol>
      <Link
        to={link}
        className={`mt-6 inline-flex items-center justify-center gap-2 ${btnColor} text-white text-[16px] rounded-[10px] py-[12px] px-[24px] w-full`}
      >
        <img src={icon} alt='' />
        {btnText}
      </Link>
    </div>
  );
};

const Referral = () => {
  return (
    <Container>
      <h2 className='text-center text-[32px] font-semibold text-[#000] mb-[30px]'>
        Для чего нужен ОСАГО?
      </h2>

      <div className='grid md:grid-cols-3 gap-6 mb-[60px]'>
        {cardData.map((item, index) => (
          <div
            key={index}
            className='bg-white rounded-[12px] p-[20px] border border-[#CCE3FF]'
          >
            <h3 className='text-[#000] font-semibold text-[18px] mb-2'>
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
          btnText='Начать зарабатывать'
          btnColor='bg-[#0072DE]'
          link='/choose-form'
          icon={dollar}
        />
        <StepCard
          title='Как пассивно зарабатывать?'
          steps={passiveSteps}
          color='#1AA37F'
          borderColor='#8AD4A9'
          bgColor='#F9FFF9'
          btnText='Пригласить друга в команду'
          btnColor='bg-[#1AA37F]'
          link='/referral'
          icon={add}
        />
      </div>
    </Container>
  );
};

export default Referral;
