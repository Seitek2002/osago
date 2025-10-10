import { useEffect } from 'react';
import { setMetaTags } from '../utils/setMetaTags';

const ChooseForm2 = () => {
  useEffect(() => {
    setMetaTags({
      title: 'Оформи онлайн ОСАГО',
      metaTags: [
        {
          name: 'description',
          content:
            'ОСАГО — ваша защита на дороге! Оформите полис онлайн за 1 минуту и получите уверенность в каждой поездке. Надежная страховка по выгодной цене!',
        },
        { property: 'og:url', content: 'https://oa.kg/bishkek-osago-online' },
        { property: 'og:type', content: 'website' },
        {
          property: 'og:title',
          content: 'Зарабатывай онлайн оформляя ОСАГО. Премия 15%',
        },
        {
          property: 'og:description',
          content:
            'Стань официальным агентом ОСАГО, зарабатывай онлайн из дома. ОсОО " Агент Кей Джи". Бакай Страхование',
        },
        {
          property: 'og:image',
          content:
            'https://opengraph.b-cdn.net/production/images/20eb0cca-8f31-41d8-a6d7-0077ab4d12b2.png?token=Mdv4e_CfnkITY3MGKE-qqFVo2oKfBgvx-Z7Z_oOvdK0&height=348&width=601&expires=33288042538',
        },
        { name: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:domain', content: 'oa.kg' },
        {
          property: 'twitter:url',
          content: 'https://oa.kg/bishkek-osago-online',
        },
        {
          name: 'twitter:title',
          content: 'Зарабатывай онлайн оформляя ОСАГО. Премия 15%',
        },
        {
          name: 'twitter:description',
          content:
            'Стань официальным агентом ОСАГО, зарабатывай онлайн из дома. ОсОО " Агент Кей Джи". Бакай Страхование',
        },
        {
          name: 'twitter:image',
          content:
            'https://opengraph.b-cdn.net/production/images/20eb0cca-8f31-41d8-a6d7-0077ab4d12b2.png?token=Mdv4e_CfnkITY3MGKE-qqFVo2oKfBgvx-Z7Z_oOvdK0&height=348&width=601&expires=33288042538',
        },
      ],
    });
  }, []);

  return <div>ChooseForm</div>;
};

export default ChooseForm2;
