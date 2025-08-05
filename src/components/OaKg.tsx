import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

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
      </div>
    </section>
  );
}
