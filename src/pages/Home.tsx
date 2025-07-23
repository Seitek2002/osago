import { useTranslation } from "react-i18next";
import MainHeader from "../components/MainHeader";
import Container from "../components/Container";
import AboutStats from "../components/AboutStats";
import Question from "../components/Question";
// import Reviews from "../components/Reviews";
// import MobileApp from "../components/MobileApp";
import Mainfooter from "../components/MainFooter";
import Referral from "../components/Referral";
import { Link } from "react-router";
import referral from "../assets/images/logo.png";
import dollar from "../assets/dollar-logo.svg";
import add from "../assets/add-icon.svg";
import hrs from "../assets/images/earnings-hrs.png";
import reg from "../assets/images/earnings-reg.png";

const Home = () => {
  const { t } = useTranslation();

  return (
    <section className="home min-h-screen text-white bg-gradient-to-b from-[#c9dcf1]/30 to-[#fff]/10 box-border">
      <MainHeader />
      <Container>
        <div className="home__content text-center">
          <div className="home__top pt-[140px] max-w-[766px] mx-auto">
            <div className="home__title text-center">
              <span className="text-[40px] font-medium text-[#0072DE]">
                {t("home.title.span")}
              </span>{" "}
              <span className="text-[40px] font-medium text-[#000]">
                {t("home.title.title")}
              </span>
            </div>
            <p className="text-[#000] mt-[30px]">Вознаграждение 15% от ОСАГО</p>
          </div>
          <div className="home__btns mt-[30px]">
            <Link
              to="https://oa.kg/a/"
              className="button rounded-xl max-w-[305px] mx-auto py-[14px] bg-[#0072DE] text-[#fff] text-[16px] mb-[16px] flex text-center items-center justify-center gap-4"
            >
              <img src={dollar} alt="" />
              <span className="text-[20px]">Начать зарабатывать</span>
              <br />
            </Link>
          </div>
          <div className="home__earnings mt-[140px]">
            <span className="font-semibold text-[32px] text-[#000]">
              Начни зарабатывать уже сейчас
            </span>
            <div className="earnings__content md:flex gap-[40px] md:justify-center">
              <div className="bg-[#fff] rounded-3xl p-5 border border-[#C0D2F9] mt-[30px] md:flex  md:items-center md:flex-col md:py-[20px] md:px-[40px]">
                <img src={hrs} className="mb-[12px] m-auto" />
                <span className="text-[#000] text-lg md:text-2xl">
                  Помоги другим оформить ОСАГО <br /> и заработай до 100 000 сом
                </span>
                <p className="text-[#1AA37F] mt-[12px] text-sm md:text-lg">
                  Вознаграждение 15% от ОСАГО
                </p>
              </div>
              <div className="bg-[#fff] rounded-3xl p-5 border border-[#C0D2F9] mt-[30px] md:flex md:items-center md:flex-col md:p-[20px] md:px-[40px]">
                <img src={reg} className="mb-[12px] m-auto" />
                <span className="text-[#000] text-lg md:text-2xl">
                  Научи регистрировать друзей <br /> и зарабатывай пассивно
                  от их продаж
                </span>
                <p className="text-[#1AA37F] mt-[12px] text-sm md:text-lg">
                  Вознаграждение 5% от ОСАГО друзей
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <div className="home__referral bg-[#E3EFFF] py-[40px] flex justify-center items-center mt-[60px] mb-[60px]">
        <Container>
          <div className="md:flex gap-[60px] justify-center ">
            <img src={referral} alt="" />
            <div className="">
              <p className="text-[#000] text-[24px] mt-[40px] lg:text-[32px]">
                Все легально! <br className="md:hidden"/> Стань агентом <br className="hidden md:block"/> по продаже ОСАГО за 2 минуты
              </p>
              <p className="text-[#000] my-4 text-[13px] md:text-[15px]">
                ОсОО «Агент КейДжи» является официальным партнёром
                ЗАО «Бакай Иншуренс»
              </p>
              <Link
                to="https://oa.kg/a/"
                className="button py-[18px] px-[35px] bg-[#1AA37F] rounded-[12px] text-[#fff] flex text-center items-center justify-center w-full lg:w-[70%]"
              >
                <img src={add} alt="" />
                <span className="text-base md:text-[20px]">Пригласить друга в команду</span>
                <br />
              </Link>
            </div>
          </div>
        </Container>
      </div>
      <Referral />
      <AboutStats />
      {/* <Reviews /> */}
      {/* <MobileApp /> */}
      <Question />
      <Mainfooter />
      {/* <footer className="footer bg-[#2C2C2C] text-[#fff] py-8 text-sm leading-relaxed">
        <Container>
          <div className="footer__content space-y-2 text-center">
            <p className="footer__text">{t("footer.GSO")}</p>
            <p>
              {t("footer.phoneNumber")}:
              <a
                href="tel:+996777394080"
                className="footer__link text-[#00A6FF] hover:underline"
              >
                +996 777 39 40 80
              </a>
            </p>
            <p>
              {t("footer.email")}:
              <a
                href="mailto:office@insurancebakai.kg"
                className="footer__link text-[#00A6FF] hover:underline"
              >
                office@insurancebakai.kg
              </a>
            </p>
            <p>{t("footer.address")}</p>
            <p>{t("footer.agentAddress")}</p>
            <p>{t("footer.agentInn")}</p>
            <p>{t("footer.OAO")}</p>
            <p>{t("footer.naming")}</p>
            <div className="footer__socials flex justify-center space-x-4 mt-4">
              <a
                href="https://wa.me/996777394080"
                target="_blank"
                className="footer__social-link inline-block transition-transform transform hover:scale-110"
                aria-label="WhatsApp"
              >
                <svg
                  className="w-[35px]"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="WhatsApp"
                  role="img"
                  viewBox="0 0 512 512"
                >
                  <rect width="512" height="512" rx="15%" fill="#25d366" />
                  <path
                    fill="#25d366"
                    stroke="#ffffff"
                    strokeWidth="26"
                    d="M123 393l14-65a138 138 0 1150 47z"
                  />
                  <path
                    fill="#ffffff"
                    d="M308 273c-3-2-6-3-9 1l-12 16c-3 2-5 3-9 1-15-8-36-17-54-47-1-4 1-6 3-8l9-14c2-2 1-4 0-6l-12-29c-3-8-6-7-9-7h-8c-2 0-6 1-10 5-22 22-13 53 3 73 3 4 23 40 66 59 32 14 39 12 48 10 11-1 22-10 27-19 1-3 6-16 2-18"
                  />
                </svg>
              </a>
              <a
                href="https://t.me/yourTelegramUsername"
                target="_blank"
                className="footer__social-link inline-block transition-transform transform hover:scale-110"
                aria-label="Telegram"
              >
                <svg
                  className="w-[35px]"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Telegram"
                  role="img"
                  viewBox="0 0 512 512"
                >
                  <rect width="512" height="512" rx="15%" fill="#37aee2" />
                  <path
                    fill="#c8daea"
                    d="M199 404c-11 0-10-4-13-14l-32-105 245-144"
                  />
                  <path fill="#a9c9dd" d="M199 404c7 0 11-4 16-8l45-43-56-34" />
                  <path
                    fill="#f6fbfe"
                    d="M204 319l135 99c14 9 26 4 30-14l55-258c5-22-9-32-24-25L79 245c-21 8-21 21-4 26l83 26 190-121c9-5 17-3 11 4"
                  />
                </svg>
              </a>
            </div>
            <p className="footer__copyright mt-4 text-xs text-[#AFAFAF]">
              {t("footer.roots")}
            </p>
          </div>
        </Container>
      </footer> */}
    </section>
  );
};

export default Home;
