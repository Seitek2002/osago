import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Reviews() {
  const reviews = [
    {
      name: "Асан Максат",
      date: "Биик 1 июля 2025",
      text: "Удобный сервис. Оформление полиса заняло около 5 минут. Ввёл только номер телефона, номер машины и ПИН-код, остальные данные подтянулись автоматически. Полис пришёл в WhatsApp сразу после оплаты. Также прицепил бонус за использование друга. В целом доволен, процесс простой и понятный.",
      image: "https://via.placeholder.com/50",
    },
    {
      name: "Асан Максат",
      date: "Биик 1 июля 2025",
      text: "Удобный сервис. Оформление полиса заняло около 5 минут. Ввёл только номер телефона, номер машины и ПИН-код, остальные данные подтянулись автоматически. Полис пришёл в WhatsApp сразу после оплаты. Также прицепил бонус за использование друга. В целом доволен, процесс простой и понятный.",
      image: "https://via.placeholder.com/50",
    },
    {
      name: "Асан Максат",
      date: "Биик 1 июля 2025",
      text: "Удобный сервис. Оформление полиса заняло около 5 минут. Ввёл только номер телефона, номер машины и ПИН-код, остальные данные подтянулись автоматически. Полис пришёл в WhatsApp сразу после оплаты. Также прицепил бонус за использование друга. В целом доволен, процесс простой и понятный.",
      image: "https://via.placeholder.com/50",
    },
  ];

  return (
    <section className="py-10">
      <h2 className="text-center text-2xl font-bold mb-6">Отзывы</h2>
      <Swiper
        modules={[Pagination, Navigation]}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: ".next-btn",
          prevEl: ".prev-btn",
        }}
        spaceBetween={20}
        className="max-w-5xl mx-auto"
      >
        {reviews.map((item, index) => (
          <SwiperSlide
            key={index}
            className="bg-white p-4 rounded-xl shadow-md"
          >
            <div className="flex items-center mb-2">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.date}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">{item.text}</p>
          </SwiperSlide>
        ))}
        <div className="hidden md:block absolute left-0 top-1/2 z-10 prev-btn bg-gray-300 px-2 py-1 rounded-full cursor-pointer">
          ‹
        </div>
        <div className="hidden md:block absolute right-0 top-1/2 z-10 next-btn bg-gray-300 px-2 py-1 rounded-full cursor-pointer">
          ›
        </div>
      </Swiper>
    </section>
  );
}
