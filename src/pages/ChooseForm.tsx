import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import logo from '../assets/images/logo.png'
import { setMetaTags } from '../utils/setMetaTags';

const ChooseForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [referalId, setReferalId] = useState('');

  useEffect(() => {
    setMetaTags({
      title: 'Оформи онлайн ОСАГО',
      metaTags: [
        { name: 'description', content: 'ОСАГО — ваша защита на дороге! Оформите полис онлайн за 1 минуту и получите уверенность в каждой поездке. Надежная страховка по выгодной цене!' },
        { property: 'og:url', content: 'https://oa.kg/bishkek-osago-online' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Зарабатывай онлайн оформляя ОСАГО. Премия 15%' },
        { property: 'og:description', content: 'Стань официальным агентом ОСАГО, зарабатывай онлайн из дома. ОсОО " Агент Кей Джи". Бакай Иншуренс' },
        { property: 'og:image', content: 'https://opengraph.b-cdn.net/production/images/20eb0cca-8f31-41d8-a6d7-0077ab4d12b2.png?token=Mdv4e_CfnkITY3MGKE-qqFVo2oKfBgvx-Z7Z_oOvdK0&height=348&width=601&expires=33288042538' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:domain', content: 'oa.kg' },
        { property: 'twitter:url', content: 'https://oa.kg/bishkek-osago-online' },
        { name: 'twitter:title', content: 'Зарабатывай онлайн оформляя ОСАГО. Премия 15%' },
        { name: 'twitter:description', content: 'Стань официальным агентом ОСАГО, зарабатывай онлайн из дома. ОсОО " Агент Кей Джи". Бакай Иншуренс' },
        { name: 'twitter:image', content: 'https://opengraph.b-cdn.net/production/images/20eb0cca-8f31-41d8-a6d7-0077ab4d12b2.png?token=Mdv4e_CfnkITY3MGKE-qqFVo2oKfBgvx-Z7Z_oOvdK0&height=348&width=601&expires=33288042538' },
      ],
    });
    if (id) {
      setReferalId(id);
    }
  }, [id]);

  return (
    <div className='min-h-[600px] flex flex-col items-center justify-center gap-[10px] px-4'>
      <h2 className='font-bold text-center text-[28px]'>
        Онлайн оформление ОСАГО
      </h2>
      <img className='max-w-[300px]' src={logo} alt='' />
      <p className='text-center'>
        ЗАО «Бакай Иншуренс» является дочерней компанией ОАО «Бакай Банк», что
        является гарантом надежности и финансовой устойчивости бренда.
      </p>

      <div className='font-bold text-center text-[20px]'>
        Сколько водителей будет управлять автомобилем?
      </div>

      <Link
        to={`/documents-form/${referalId}`}
        className='button flex justify-center w-full py-[14px] bg-[#005CAA] rounded-[6px] text-[#fff] text-[16px] disabled:opacity-50 disabled:cursor-not-allowed'
      >
        Один водитель
      </Link>

      <Link
        to={`/documents-form-2/${referalId}`}
        className='button flex justify-center w-full py-[14px] bg-[#005CAA] rounded-[6px] text-[#fff] text-[16px] disabled:opacity-50 disabled:cursor-not-allowed'
      >
        Без ограничений по водителям
      </Link>
    </div>
  );
};

export default ChooseForm;
