import MainHeader from "../components/MainHeader";
import Container from "../components/Container";
import AboutStats from "../components/AboutStats";
import Question from "../components/Question";
import OaKg from "../components/OaKg";
// import Reviews from "../components/Reviews";
// import MobileApp from "../components/MobileApp";
import Mainfooter from "../components/MainFooter";
import Referral from "../components/Referral";
import referral from "../assets/images/logo.png";
import dollar from "../assets/som.svg";
import add from "../assets/add-icon.svg";
import hrs from "../assets/images/earnings-hrs.png";
import reg from "../assets/images/earnings-reg.png";
import rules from "../assets/rules.svg";

import { useEffect } from "react";
import { setMetaTags } from "../utils/setMetaTags";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  useEffect(() => {
    setMetaTags({
      title: "Зарабатывай онлайн оформляя ОСАГО. Премия 15%",
      metaTags: [
        {
          name: "description",
          content:
            "ОСАГО — ваша защита на дороге! Оформите полис онлайн за 1 минуту и получите уверенность в каждой поездке. Надежная страховка по выгодной цене!",
        },
        { property: "og:url", content: "https://oa.kg/a/" },
        { property: "og:type", content: "website" },
        { property: "og:title", content: "Оформи онлайн ОСАГО" },
        {
          property: "og:description",
          content:
            "ОСАГО — ваша защита на дороге! Оформите полис онлайн за 1 минуту и получите уверенность в каждой поездке. Надежная страховка по выгодной цене!",
        },
        {
          property: "og:image",
          content:
            "https://opengraph.b-cdn.net/production/images/20eb0cca-8f31-41d8-a6d7-0077ab4d12b2.png?token=Mdv4e_CfnkITY3MGKE-qqFVo2oKfBgvx-Z7Z_oOvdK0&height=348&width=601&expires=33288042538",
        },
        { name: "twitter:card", content: "summary_large_image" },
        { property: "twitter:domain", content: "oa.kg" },
        { property: "twitter:url", content: "https://oa.kg/a/" },
        { name: "twitter:title", content: "Оформи онлайн ОСАГО" },
        {
          name: "twitter:description",
          content:
            "ОСАГО — ваша защита на дороге! Оформите полис онлайн за 1 минуту и получите уверенность в каждой поездке. Надежная страховка по выгодной цене!",
        },
        {
          name: "twitter:image",
          content:
            "https://opengraph.b-cdn.net/production/images/20eb0cca-8f31-41d8-a6d7-0077ab4d12b2.png?token=Mdv4e_CfnkITY3MGKE-qqFVo2oKfBgvx-Z7Z_oOvdK0&height=348&width=601&expires=33288042538",
        },
      ],
    });
  }, []);

  return (
    <section className="home min-h-screen text-white bg-gradient-to-b from-[#c9dcf1]/30 to-[#fff]/10 box-border">
      <MainHeader />
      <Container>
        <div className="home__content text-center">
          <div className="home__top pt-[100px] lg:pt-[140px] max-w-[766px] mx-auto">
            <div className="home__title text-center leading-[41px]">
              <span className="text-[36px] font-medium text-[#000]">
                {t("home.title.main")}
              </span>{" "}
              <span className="text-[36px] font-medium text-[#0072DE]">
                {t("home.title.highlight")}
              </span>
            </div>
            <p className="text-[#000] mt-[30px]">{t("home.subtitle")}</p>
          </div>
          <div className="home__btns mt-[30px]">
            <a
              href="https://oa.kg/a/"
              className="button rounded-xl max-w-[305px] mx-auto py-[14px] bg-[#0072DE] text-[#fff] text-[16px] mb-[16px] flex text-center items-center justify-center gap-4"
            >
              <img src={dollar} alt="" width={16} />
              <span className="text-[20px]">{t("home.cta.earnBtn")}</span>
            </a>
          </div>
          <div className="home__earnings mt-[60px]">
            <span className="font-semibold text-[32px] text-[#000]">
              {t("home.earnings.title")}
            </span>
            <div className="earnings__content md:flex gap-[40px] md:justify-center">
              <div className="bg-[#fff] rounded-3xl p-5 border border-[#C0D2F9] mt-[30px] md:flex  md:items-center md:flex-col md:py-[20px] md:px-[40px]">
                <img src={hrs} className="mb-[12px] m-auto" />
                <span className="text-[#000] text-lg md:text-2xl">
                  {t("home.earnings.helpOthers.desc")}
                </span>
                <p className="text-[#1AA37F] mt-[12px] text-sm md:text-lg">
                  {t("home.earnings.helpOthers.reward")}
                </p>
              </div>
              <div className="bg-[#fff] rounded-3xl p-5 border border-[#C0D2F9] mt-[30px] md:flex md:items-center md:flex-col md:p-[20px] md:px-[40px]">
                <img src={reg} className="mb-[12px] m-auto" />
                <span className="text-[#000] text-lg md:text-2xl">
                  {t("home.earnings.teachFriends.desc")}
                </span>
                <p className="text-[#1AA37F] mt-[12px] text-sm md:text-lg">
                  {t("home.earnings.teachFriends.reward")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <div className="home__referral bg-[#E3EFFF] py-[40px] flex justify-center items-center mt-[60px] mb-[60px]">
        <Container>
          <div className="md:flex justify-evenly items-center">
            <img src={referral} alt="" className="w-[60%] mx-auto lg:w-[27%]" />
            <div className="text-center lg:text-center mx-auto lg:max-w-[55%]">
              <p className="text-[#000] text-[36px] leading-[41px] mt-[30px] lg:text-[32px]">
                <span className="text-[#0072DE] font-medium">
                  {t("home.referral.title")}
                </span>
              </p>
              <p className="text-[#000] my-4 text-2xl max-w-[80%] mx-auto">
                {t("home.referral.desc")}
              </p>
              <a
                href="https://oa.kg/a/"
                className="button text-[16px] py-[18px] mx-auto mt-[25px] px-[35px] bg-[#1AA37F] rounded-[12px] text-[#fff] flex text-center items-center justify-center w-full lg:w-[70%]"
              >
                <img src={add} alt="" />
                <span className="text-[20px] md:text-[20px]">
                  {t("home.referral.joinBtn")}
                </span>
              </a>
            </div>
          </div>
        </Container>
      </div>
      <Referral />
      <OaKg />
      <div className="home__referral bg-[#EAF4FF] py-[40px] flex justify-center items-center pt-[60px] pb-[60px]">
        <Container>
          <div className="md:flex justify-evenly items-center">
            <img src={rules} alt="" className="w-[60%] mx-auto lg:w-[27%]" />
            <div className="text-center lg:text-center mx-auto lg:max-w-[55%]">
              <p className="text-[#000] text-[36px] leading-[41px] mt-[30px] lg:text-[32px]">
                <span className="text-[#0072DE] font-medium">
                  {t("home.referralRules.title")}
                </span>
              </p>
              <p className="text-[#000] my-4 text-2xl max-w-[80%] mx-auto">
                {t("home.referralRules.desc")}
              </p>
              <a
                href="https://oa.kg/a/"
                className="button text-[16px] py-[18px] mx-auto mt-[25px] px-[35px] bg-[#0072DE] rounded-[12px] text-[#fff] flex text-center items-center justify-center w-full lg:w-[70%]"
              >
                <span className="text-[20px] md:text-[20px]">
                  {t("home.referralRules.moreBtn")}
                </span>
              </a>
            </div>
          </div>
        </Container>
      </div>
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
