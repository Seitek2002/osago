import Container from '../components/Container';
import googlePlay from '../assets/google-play.svg';
import appStore from '../assets/app-store.svg';

const MainFooter = () => {
  return (
    <footer className='py-[40px] text-[#000] text-[14px]'>
      <Container>
        <div className='md:bg-[#E3EFFF] rounded-[16px] p-6 flex flex-col gap-[40px] gap-2xl lg:flex-row bg-[#dbe4f1] justify-between '>
          <div className='space-y-2 lg:max-w-[225px] order-2'>
            <a href='tel:+996777394080'>
              <p>Телефон:+996777394080</p>
            </a>
            <a href='mailto:office@insurancebakai.kg'>
              <p>Электронная почта: office@insurancebakai.kg</p>
            </a>
            <div className='flex gap-2 mt-2'>
              <a
                href='https://oa.kg/a/'
                className='h-[30px] bg-[#fff] rounded-[8px]'
              >
                <img
                  src={googlePlay}
                  alt='Google Play'
                  className='w-full h-full'
                />
              </a>
              <a href='https://oa.kg/a/' className='h-[30px]'>
                <img src={appStore} alt='App Store' className='w-full h-full' />
              </a>
            </div>
            <p className='text-[14px] text-[#000] pt-4'>
              © 2025 Авторское право. <br /> Все права защищены.
            </p>
          </div>

          <div className='space-y-2 lg:max-w-[274.33px]'>
            <p>
              Главной офис: г. Бишкек, <br /> ул. Турусбекова, 109/1, 1 этаж,
              офис 116 (БЦ Азия Трейд Компани)
            </p>
            <p>
              Адрес ОсОО «Агент Кей Джи»: г. Бишкек, ул. Фатьянова, д. 170/1 кв
              60
            </p>
            <p>ИНН 01802202510141</p>
          </div>

          <div className='space-y-2 lg:max-w-[274.33px]'>
            <p>
              Закрытое акционерное общество «Бакай Иншуренс» (ЗАО «Бакай
              Иншуренс»)
            </p>
            <p>
              Общество с ограниченной ответственностью «Агент Кей Джи» является
              авторизованным представителем (агентом) ЗАО «Бакай Иншуренс».
            </p>
          </div>

          <div className='space-y-2 w-full lg:max-w-[274.33px]'>
            <p>
              ЗАО «Бакай Иншуренс» обладает лицензией № 03, номер бланка № 0003
              серии «ОС» от 5 февраля 2024 года, выданной Службой регулирования
              и надзора за финансовым рынком при Министерстве экономики и
              коммерции Кыргызской Республики.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default MainFooter;
