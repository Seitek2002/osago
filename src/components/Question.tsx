import { useState } from "react";

const questions = [
  {
    question: "Что такое ОСАГО?",
    answer: "ОСАГО — это обязательное страхование автогражданской ответственности.",
  },
  {
    question: "Кого покрывает ОСАГО?",
    answer: "ОСАГО покрывает вред, причинённый другим участникам ДТП.",
  },
  {
    question: "Как долго страховая рассматривает заявление?",
    answer: "Обычно страховая компания рассматривает заявление в течение 5-10 рабочих дней.",
  },
  {
    question: "Что делать, если страховая отказала в выплате?",
    answer: "Вы можете обжаловать отказ, подав жалобу в надзорный орган или обратиться в суд.",
  },
  {
    question: "Может ли ОСАГО покрыть ущерб на вашей машине?",
    answer: "Нет, ОСАГО покрывает только вред, причинённый другим, а не вашему авто.",
  },
  {
    question: "Что будет, если срок действия ОСАГО закончился?",
    answer: "Водить машину без ОСАГО запрещено и может привести к штрафу.",
  },
  {
    question: "Как проверить подлинность полиса ОСАГО?",
    answer: "Проверить можно на официальном сайте страховщика или через мобильное приложение.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-10 px-4">
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-6 text-[#000]">
        Остались вопросы?
      </h2>
      <div className="max-w-[1200px] mx-auto border border-[#cddef1] rounded-3xl p-5 md:p-10">
        {questions.map((item, index) => (
          <div key={index}>
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center p-4 text-left text-[#000] font-semibold text-[16px]"
            >
              <span>{item.question}</span>
              <span className="relative w-4 h-4 inline-block">
                <span
                  className={`absolute inset-0 transition-all duration-300 ${
                    openIndex === index ? "opacity-0 scale-75" : "opacity-100 scale-100"
                  }`}
                >
                  +
                </span>
                <span
                  className={`absolute inset-0 transition-all duration-300 ${
                    openIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-75"
                  }`}
                >
                  −
                </span>
              </span>
            </button>
            <div
              className={`px-4 pb-4 text-sm text-gray-600 transition-all duration-300 ${
                openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              {item.answer}
            </div>

            {/* Чёрная линия под вопросом (кроме последнего) */}
            {index !== questions.length - 1 && <div className="border-b border-[#dadee2]" />}
          </div>
        ))}
      </div>
    </section>
  );
}
