import React from "react";
import Container from "../components/Container";
import googlePlay from "../assets/google-play.svg";
import appStore from "../assets/app-store.svg";

const MainFooter = () => {
  return (
    <footer className="py-[40px] text-[#000] text-[14px]">
      <Container>
        <div className="md:bg-[#E3EFFF] rounded-[16px] p-6 flex flex-col-reverse gap-[40px] md:gap-[102px] lg:flex-row bg-[#dbe4f1] ">
          <div className="space-y-2">
            <p>Телефон:+996777394080</p>
            <p>Электронная почта: office@insurancebakai.kg</p>
            <div className="flex gap-2 mt-2">
              <img src={googlePlay} alt="Google Play" className="h-[40px] bg-[#fff] rounded-[8px]" />
              <img src={appStore} alt="App Store" className="h-[40px]" />
            </div>
            <p className="text-[14px] text-[#000] pt-4">© 2025 Авторское право. <br /> Все права защищены.</p>
          </div>

          <div className="space-y-2">
            <p>
              Главной офис: г. Бишкек, ул. Турусбекова, 109/1, 1 этаж, офис 116 (БЦ Азия Трейд Компани)
            </p>
            <p>
              Адрес ОсОО «Агент Кей Джи»: г. Бишкек, ул. Фатьянова, д. 170/1 кв 60
            </p>
            <p>ИНН 01802202510141</p>
          </div>

          <div className="space-y-2">
            <p>
              Закрытое акционерное общество  «Бакай Иншуренс» (ЗАО «Бакай Иншуренс»)
            </p>
            <p>
              Общество с ограниченной ответственностью  «Агент Кей Джи» является авторизованным представителем (агентом) ЗАО «Бакай Иншуренс».
            </p>
          </div>

          <div className="space-y-2 w-1/2">
            <p>
              ЗАО «Бакай Иншуренс» обладает лицензией № 03, номер бланка № 0003 серии «ОС» от 5 февраля 2024 года, выданной Службой регулирования и надзора  за финансовым рынком при Министерстве экономики и коммерции Кыргызской Республики.
            </p>
          </div>
        </div>
      </Container>
    </footer> 
  );
};

export default MainFooter;