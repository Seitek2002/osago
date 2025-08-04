import React from 'react';
import Container from '../components/Container';
import dollar from '../assets/dollar-logo.svg';
import add from '../assets/add-icon.svg';
import { useTranslation } from 'react-i18next';


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
  const { t } = useTranslation();
  const cards = t('home.referral.cards', { returnObjects: true }) as { title: string; text: string }[];

  return (
    <Container>
      <h2 className='text-center text-[32px] font-semibold text-[#000] mb-[30px]'>
        {t('home.referral.purposeTitle')}
      </h2>

      <div className='grid md:grid-cols-3 gap-6 mb-[60px] text-justify'>
        {cards.map((item, index) => (
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
          title={t('home.referral.earnStepsTitle')}
          steps={t('home.referral.earnSteps', { returnObjects: true }) as string[]}
          color='#0072DE'
          borderColor='#C0D2F9'
          bgColor='#F9FBFF'
          btnText={t('home.referral.earnBtn')}
          btnColor='bg-[#0072DE]'
          link='https://oa.kg/a/'
          icon={dollar}
        />
        <StepCard
          title={t('home.referral.passiveStepsTitle')}
          steps={t('home.referral.passiveSteps', { returnObjects: true }) as string[]}
          color='#1AA37F'
          borderColor='#8AD4A9'
          bgColor='#F9FFF9'
          btnText={t('home.referral.passiveBtn')}
          btnColor='bg-[#1AA37F]'
          link='https://oa.kg/a/'
          icon={add}
        />
      </div>
    </Container>
  );
};

export default Referral;
