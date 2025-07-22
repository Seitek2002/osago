import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useRef, useEffect, useState } from "react";
import Container from "../components/Container";
import human from "../assets/images/human.png";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Reviews() {
  const prevDesktopRef = useRef(null);
  const nextDesktopRef = useRef(null);
  const prevMobileRef = useRef(null);
  const nextMobileRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const reviews = [...Array(6)].map((_) => ({
    name: "Асан Максат",
    date: "Биик 1 июля 2025",
    text:
      "Решил оформить полис через этот сервис и остался доволен. Всё прошло быстро: ввёл минимальные данные, оплатил и получил полис по WhatsApp. Но самое приятное — это возможность заработать. Поделился своей реферальной ссылкой с друзьями, и после их оформления мне пришли деньги. Отличный способ совместить полезное с выгодным!",
    image: human,
  }));

  return (
    <section className="py-10 relative">
      <h2 className="text-center text-2xl font-bold mb-6 text-[#000] lg:text-[32px]">Отзывы</h2>
      <Container>
        <div className="relative">
          <button
            ref={prevDesktopRef}
            className="hidden md:flex absolute top-1/2 -left-6 z-10 -translate-y-1/2 text-[#9cb6ce] border border-[#9cb6ce] bg-white w-9 h-9 justify-center items-center py-2 rounded-full hover:text-[#0072DE] hover:border-[#0072DE] transition"
          >
            <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 1L1.5 7.5L8 14" stroke="#C0D2F9" stroke-linecap="round"/>
            </svg>
          </button>
          <button
            ref={nextDesktopRef}
            className="hidden md:flex absolute top-1/2 -right-6 z-10 -translate-y-1/2 text-[#9cb6ce] border border-[#9cb6ce] bg-white w-9 h-9 justify-center items-center py-2 rounded-full hover:text-[#0072DE] hover:border-[#0072DE] transition"
          >
            <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L7.5 7.5L1 14" stroke="#C0D2F9" stroke-linecap="round"/>
            </svg>
          </button>

          <Swiper
            modules={[Pagination, Navigation]}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
            }}
            spaceBetween={40}
            pagination={{
              el: ".swiper-pagination",
              clickable: true,
            }}
            navigation={{
              prevEl: isMobile ? prevMobileRef.current : prevDesktopRef.current,
              nextEl: isMobile ? nextMobileRef.current : nextDesktopRef.current,
            }}
            onBeforeInit={(swiper) => {
              if (
                swiper.params.navigation &&
                typeof swiper.params.navigation === "object"
              ) {
                (swiper.params.navigation as any).prevEl = isMobile
                  ? prevMobileRef.current
                  : prevDesktopRef.current;
                (swiper.params.navigation as any).nextEl = isMobile
                  ? nextMobileRef.current
                  : nextDesktopRef.current;
              }
            }}
            className="mx-auto"
          >
            {reviews.map((item, index) => (
              <SwiperSlide
                key={index}
                className="bg-white p-4 rounded-xl shadow-md border border-[#abbccf]"
              >
                <div className="flex items-center mb-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 mr-4"
                  />
                  <div>
                    <h3 className="font-normal text-[#000] text-xl">{item.name}</h3>
                    <p className="text-sm text-[#6b6b6b]">{item.date}</p>
                  </div>
                </div>
                <p className="text-base text-[#000] mt-2">{item.text}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Кнопки снизу — только для mobile */}
        <div className="flex justify-center items-center gap-4 mt-6 md:hidden">
          <button
            ref={prevMobileRef}
            className="text-[#9cb6ce] border border-[#9cb6ce] w-9 h-9 flex justify-center items-center py-2 rounded-full hover:text-[#0072DE] hover:border-[#0072DE] transition"
          >
            <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 1.00146L1.5 7.50146L8 14.0015" stroke="#C0D2F9" stroke-linecap="round"/>
            </svg>
          </button>
          <button
            ref={nextMobileRef}
            className="text-[#9cb6ce] border border-[#9cb6ce] w-9 h-9 flex justify-center items-center py-2 rounded-full hover:text-[#0072DE] hover:border-[#0072DE] transition"
          >
            <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1.00146L7.5 7.50146L1 14.0015" stroke="#0072DE" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      </Container>
    </section>
  );
}
