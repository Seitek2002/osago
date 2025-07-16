import { useState, type FC } from 'react';
import warning from '../assets/warning.svg';
import checked from '../assets/checked.svg';
import dropdownArrow from '../assets/dropdown-arrow.svg';

export interface CategoryOption {
  name: string;
  text: string;
}

interface CategorySelectProps {
  value: string;
  onChange: (val: CategoryOption) => void;
  label?: string;
}

const CATEGORY_OPTIONS: CategoryOption[] = [
  { name: "B", text: "Легковой" },
  { name: "C", text: "Грузовой" },
  { name: "D", text: "Автобус" },
  { name: "T", text: "Троллейбус" },
  { name: "A", text: "Мототранспорт" },
  { name: "E", text: "Прицепы (полуприцепы), трактора, самоходные дорожно-строительные машины, экскаваторы, бульдозеры" }
];

const CategorySelect: FC<CategorySelectProps> = ({ value, onChange, label = "Категория ТС" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [touched, setTouched] = useState(false);

  const selected = CATEGORY_OPTIONS.find((c) => c.name === value) || { name: '', text: 'Выберите категорию' };

  return (
    <div>
      <h3 className="text-suptitle">
        {label} <span className="required text-red-500">*</span>
      </h3>
      <div
        className={`relative w-full border rounded-[10px] transition-colors ${
          touched && !selected.name ? 'border-red-500' : 'border-[#E5E7EB]'
        }`}
      >
        <button
          type="button"
          className="w-full text-left bg-[#F5F5F5] rounded-[10px] py-3 px-[14px] text-[16px] text-[#201F1F] outline-none transition-colors flex items-center justify-between"
          onClick={() => {
            setIsOpen((prev) => !prev);
            setTouched(true);
          }}
        >
          {!selected.name ? (
            <img src={warning} alt="" className="size-[20px] absolute" />
          ) : (
            <img
              src={checked}
              alt=""
              className="size-[15px] absolute rounded-full"
            />
          )}
          <span className="font-semibold ml-[25px]">
            {selected.name
              ? `${selected.name} — ${selected.text}`
              : 'Выберите категорию'}
          </span>
          <span className="ml-2 transition-transform duration-200">
            <img src={dropdownArrow} alt="" />
          </span>
        </button>
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } w-full bg-white border border-[#E5E7EB] shadow-lg p-2`}
        >
          <ul className="space-y-2">
            {CATEGORY_OPTIONS.map((cat) => (
              <li
                key={cat.name}
                className="px-4 py-2 cursor-pointer hover:bg-[#F5F5F5] text-[16px] text-[#201F1F] rounded-[8px] transition-colors"
                onClick={() => {
                  onChange(cat);
                  setIsOpen(false);
                  setTouched(true);
                }}
              >
                {cat.name} — {cat.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CategorySelect;
