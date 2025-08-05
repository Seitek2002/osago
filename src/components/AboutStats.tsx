import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import bag from "../assets/bag.svg";
import friends from "../assets/friends.svg";
import percent from "../assets/percent.svg";
import noexp from "../assets/noexp.svg";
import legal from "../assets/legal.svg";
import money from "../assets/money.svg";

import { useTranslation } from "react-i18next";
export default function AboutStats() {
  const { ref, inView } = useInView({ triggerOnce: true });
  const { t } = useTranslation();

  return (
    <section className="bg-[#EAF4FF] py-4 md:py-4 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-[24px] font-semibold mb-4 text-[#000] lg:text-[32px]">{t('home.aboutStats.achievementsTitle')}</h2>
        <div className="flex flex-col md:flex-row justify-center gap-8 mb-10 lg:justify-around">
          <div className="text-[#0072DE] text-[55px] font-bold flex flex-col lg:text-7xl">
            {inView && <CountUp end={600} duration={2} suffix="K+" />}
            <span className="text-[25px] leading-[5px] lg:leading-[35px] font-normal text-[#000]">{t('home.aboutStats.paid.amount')}</span>
          </div>
          <div className="text-[#FF5E42] text-[55px] font-bold flex flex-col lg:text-7xl">
            {inView && <CountUp end={1500} duration={2} suffix="+" />}
            <span className="text-[25px] leading-[5px] lg:leading-[35px] font-normal text-[#000]">{t('home.aboutStats.issued.amount')}</span>
          </div>
          <div className="text-[#1AA37F] text-[55px] font-bold flex flex-col lg:text-7xl">
            {inView && <CountUp end={750} duration={2} suffix="+" />}
            <span className="text-[25px] leading-[5px] lg:leading-[35px] font-normal text-[#000]">{t('home.aboutStats.agents.amount')}</span>
          </div>
        </div>
        <h3 className="text-[24px] font-semibold mb-4 text-[#000] lg:text-[32px] mt-[20px] lg:mt-[0]">{t('home.aboutStats.advantagesTitle')}</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {(t('home.aboutStats.advantages', { returnObjects: true }) as { title: string; desc: string }[]).map((item, index) => (
            <div
              key={index}
              className=" border border-[#b1c6df] rounded-[16px] p-4 md:flex md:items-center md:gap-4 text-center md:text-left"
            >
              <img src={advantagesIcons[index]} alt={item.title} className="w-10 h-10 m-auto md:m-0" />
              <div>
                <p className="font-normal mb-1 text-[#000] text-xl">{item.title}</p>
                <p className="text-[15px] text-[#000] leading-[1.4]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const advantagesIcons = [bag, friends, percent, noexp, legal, money];
