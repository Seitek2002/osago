import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function FAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const questions = t('home.faq.questions', { returnObjects: true }) as { q: string; a: string }[];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-10 px-4">
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-6 text-[#000]">
        {t('home.faq.title')}
      </h2>
      <div className="max-w-[1200px] mx-auto border border-[#cddef1] rounded-3xl p-5 md:p-10">
        {questions.map((item, index) => (
          <div key={index}>
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center p-4 text-left text-[#000] font-semibold text-[16px]"
            >
              <span>{item.q}</span>
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
              {item.a}
            </div>

            {/* Чёрная линия под вопросом (кроме последнего) */}
            {index !== questions.length - 1 && <div className="border-b border-[#dadee2]" />}
          </div>
        ))}
      </div>
    </section>
  );
}
