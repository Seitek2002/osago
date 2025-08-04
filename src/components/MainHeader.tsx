import { useTranslation } from 'react-i18next';
import Container from './Container';
import type { FC } from 'react';
import { useNavigate } from 'react-router';
import logo from '../assets/logo.svg';

interface IProps {
  type?: string;
}

const Header: FC<IProps> = ({ type }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleLangSwitch = () => {
    i18n.changeLanguage(i18n.language === 'kg' ? 'ru' : 'kg');
  };

  return (
    <header
      className={` bg-[#fff] ${
        type === 'services'
          ? 'text-[#191D23] bg-white fixed top-0 left-0 w-full py-[16px] z-20'
          : 'fixed top-0 left-0 w-full py-[16px] z-20 text-[#fff]'
      }`}
    >
      <Container>
        <div className='flex justify-between items-center'>
          <img
            src={logo}
            alt='Main Logo'
            className='md:w-[150px] cursor-pointer'
            onClick={() => navigate('/')}
          />
          <div className='flex items-center'>
            <a href='https://oa.kg/a/'>
              <button
                className='hidden md:block bg-[#1AA37F] py-[8px] px-[14px] rounded-[8px] cursor-pointer'
                onClick={() => navigate('/')}
              >
                {t('home.mainHeader.loginBtn')}
              </button>
            </a>
            <span
              className='lang-switch'
              style={{
                color: '#000',
                cursor: 'pointer',
                background: 'white',
                padding: '0 10px',
              }}
              onClick={handleLangSwitch}
            >
              {i18n.language === 'kg' ? t('home.mainHeader.langRu') : t('home.mainHeader.langKg')}
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
