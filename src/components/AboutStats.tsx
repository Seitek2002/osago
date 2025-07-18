import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import bag from "../assets/bag.svg";
import friends from "../assets/friends.svg";
import percent from "../assets/percent.svg";
import noexp from "../assets/noexp.svg";
import legal from "../assets/legal.svg";
import money from "../assets/money.svg";

export default function AboutStats() {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <section className="bg-[#EAF4FF] py-16 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-[24px] font-semibold mb-10 text-[#000]">OA.KG это:</h2>
        <div className="flex flex-col md:flex-row justify-center gap-8 mb-14">
          <div className="text-[#0072DE] text-[55px] font-bold">
            {inView && <CountUp end={38} duration={2} suffix="K+" />} <br />
            <span className="text-[22px] font-semibold text-[#000]">сом выплачено</span>
          </div>
          <div className="text-[#FF5E42] text-[55px] font-bold">
            {inView && <CountUp end={1500} duration={2} suffix="+" />} <br />
            <span className="text-[22px] font-semibold text-[#000]">оформленных ОСАГО</span>
          </div>
          <div className="text-[#1AA37F] text-[55px] font-bold">
            {inView && <CountUp end={750} duration={2} suffix="+" />} <br />
            <span className="text-[22px] font-semibold text-[#000]">агентов по всей стране</span>
          </div>
        </div>
        <h3 className="text-[20px] font-semibold mb-8 text-[#000]">Почему OA.KG?</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {advantages.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-[#b1c6df] rounded-[16px] p-4 text-center md:flex md:items-center md:gap-4"
            >
              <img src={item.icon} alt={item.title} className="w-10 h-10 m-auto" />
              <div>
                <p className="font-semibold mb-1 text-[#000]">{item.title}</p>
                <p className="text-[15px] text-[#4a4a4a] leading-[1.4]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const advantages = [
  {
    icon: bag,
    title: "Лёгкий онлайн заработок",
    desc: "Работай не выходя из дома, договор заключаем онлайн",
  },
  {
    icon: friends,
    title: "Пассивный доход",
    desc: "Позови друзей 1 раз, каждая их продажа — твой заработок",
  },
  {
    icon: percent,
    title: "Высокие проценты",
    desc: "Лучшие условия на рынке",
  },
  {
    icon: noexp,
    title: "Опыт не требуется",
    desc: "Возраст старше 18+ и гражданство КР",
  },
  {
    icon: legal,
    title: "Всё легально",
    desc: "ОСАГО оформляется у ЗАО «БакАй Иншуранс»",
  },
  {
    icon: money,
    title: "Лёгкий вывод денег",
    desc: "Вывод 24/7 на Bakai и MBANK",
  },
];
