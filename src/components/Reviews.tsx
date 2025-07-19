import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Container from "../components/Container";
import human from "../assets/images/human.png";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Reviews() {
  const reviews = [
    {
      name: "Асан Максат",
      date: "Биик 1 июля 2025",
      text: "Удобный сервис. Оформление полиса заняло около 5 минут. Ввёл только номер телефона, номер машины и ПИН-код, остальные данные подтянулись автоматически. Полис пришёл в WhatsApp сразу после оплаты. Также прицепил бонус за использование друга. В целом доволен, процесс простой и понятный.",
      image: human,
    },
    {
      name: "Асан Максат",
      date: "Биик 1 июля 2025",
      text: "Удобный сервис. Оформление полиса заняло около 5 минут. Ввёл только номер телефона, номер машины и ПИН-код, остальные данные подтянулись автоматически. Полис пришёл в WhatsApp сразу после оплаты. Также прицепил бонус за использование друга. В целом доволен, процесс простой и понятный.",
      image: human,
    },
    {
      name: "Асан Максат",
      date: "Биик 1 июля 2025",
      text: "Удобный сервис. Оформление полиса заняло около 5 минут. Ввёл только номер телефона, номер машины и ПИН-код, остальные данные подтянулись автоматически. Полис пришёл в WhatsApp сразу после оплаты. Также прицепил бонус за использование друга. В целом доволен, процесс простой и понятный.",
      image: human,
    },
    {
      name: "Асан Максат",
      date: "Биик 1 июля 2025",
      text: "Удобный сервис. Оформление полиса заняло около 5 минут. Ввёл только номер телефона, номер машины и ПИН-код, остальные данные подтянулись автоматически. Полис пришёл в WhatsApp сразу после оплаты. Также прицепил бонус за использование друга. В целом доволен, процесс простой и понятный.",
      image: human,
    },
    {
      name: "Асан Максат",
      date: "Биик 1 июля 2025",
      text: "Удобный сервис. Оформление полиса заняло около 5 минут. Ввёл только номер телефона, номер машины и ПИН-код, остальные данные подтянулись автоматически. Полис пришёл в WhatsApp сразу после оплаты. Также прицепил бонус за использование друга. В целом доволен, процесс простой и понятный.",
      image: human,
    },
    {
      name: "Асан Максат",
      date: "Биик 1 июля 2025",
      text: "Удобный сервис. Оформление полиса заняло около 5 минут. Ввёл только номер телефона, номер машины и ПИН-код, остальные данные подтянулись автоматически. Полис пришёл в WhatsApp сразу после оплаты. Также прицепил бонус за использование друга. В целом доволен, процесс простой и понятный.",
      image: human,
    },
  ];

  return (
    <section className="py-10">
      <h2 className="text-center text-2xl font-bold mb-6 text-[#000]">
        Отзывы
      </h2>
      <Container>
        <Swiper
          modules={[Pagination, Navigation]}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
          }}
          navigation={{
            nextEl: ".next-btn",
            prevEl: ".prev-btn",
          }}
          spaceBetween={40}
          className="max-w-5xl mx-auto"
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
                  className="w-12 h-12  mr-4"
                />
                <div>
                  <h3 className="font-semibold text-[#000]">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.date}</p>
                </div>
              </div>
              <p className="text-sm text-[#000] mt-2">{item.text}</p>
            </SwiperSlide>
          ))}
          {/* <div className="hidden md:block absolute left-0 top-1/2 z-10 prev-btn bg-gray-300 px-2 py-1 rounded-full cursor-pointer">
            ‹
          </div>
          <div className="hidden md:block absolute right-0 top-1/2 z-10 next-btn bg-gray-300 px-2 py-1 rounded-full cursor-pointer">
            ›
          </div> */}
        </Swiper>
      </Container>
    </section>
  );
}
