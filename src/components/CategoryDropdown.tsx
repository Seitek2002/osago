import { useState, type FC } from 'react';
import dropdownArrow from '../assets/dropdown-arrow.svg';
import checked from '../assets/checked.svg';
import warning from '../assets/warning.svg';
import type { IFormData } from '../pages/DataForms';

export interface CategoryOption {
  code: string;
  label: string;
  date?: string;
}

interface CategoryDropdownProps {
  value: string;
  onChange: (option: CategoryOption) => void;
  options: CategoryOption[];
  label?: string;
  setUserFormData: React.Dispatch<React.SetStateAction<IFormData>>;
  userFormData: IFormData;
}

const CATEGORY_OPTIONS: CategoryOption[] = [
  { code: 'B', label: 'B', date: '' },
  { code: 'C', label: 'C', date: '' },
  { code: 'D', label: 'D', date: '' },
  { code: 'T', label: 'T', date: '' },
  { code: 'A', label: 'A', date: '' },
];

const CategoryDropdown: FC<CategoryDropdownProps> = ({
  value,
  options,
  label = 'Категория',
  setUserFormData,
  userFormData
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [touched, setTouched] = useState(false);

  const variants = CATEGORY_OPTIONS.map((o) => {
    if (options.find((option) => option.code === o.code)) {
      return {
        ...o,
        date: options.find((option) => option.code === o.code)?.date,
      };
    } else {
      return o;
    }
  });

  const selected = variants.find((o) => o.code === value);

  return (
    <div>
      <h3 className='text-suptitle'>
        {label} <span className='required text-red-500'>*</span>
      </h3>
      <div
        className={`relative w-full border rounded-[10px] transition-colors ${
          touched && !selected ? 'border-red-500' : 'border-[#E5E7EB]'
        }`}
      >
        <button
          type='button'
          className='w-full text-left bg-[#F5F5F5] rounded-[10px] py-3 px-[14px] text-[16px] text-[#201F1F] outline-none transition-colors flex items-center justify-between'
          onClick={() => setIsOpen(!isOpen)}
          onBlur={() => setTouched(true)}
        >
          {!selected ? (
            <img src={warning} alt='' className='size-[20px] absolute' />
          ) : (
            <img
              src={checked}
              alt=''
              className='size-[15px] absolute rounded-full'
            />
          )}
          <span className='font-semibold ml-[25px]'>
            {selected ? selected.code : 'Выберите категорию'}
          </span>
          <span className='ml-2 transition-transform duration-200'>
            <img src={dropdownArrow} alt='' />
          </span>
        </button>
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } w-full bg-white border border-[#E5E7EB] shadow-lg p-2 z-10`}
        >
          <ul className='space-y-2 max-h-60 overflow-y-auto'>
            {variants.map((option) => (
              <li
                key={option.code}
                className={`px-4 py-2 cursor-pointer hover:bg-[#F5F5F5] text-[16px] text-[#201F1F] rounded-[8px] transition-colors ${
                  value === option.code ? 'bg-[#F5F5F5]' : ''
                }`}
                onClick={() => {
                  setUserFormData((prev) => {
                    return {
                      ...prev,
                      driverLicense: {
                        ...prev.driverLicense,
                        category: {
                          category: option.code,
                          issuingDate: option.date || '',
                        },
                      },
                    };
                  });
                  setIsOpen(false);
                  setTouched(true);
                }}
              >
                {option.code}
                {option.date && (
                  <span className='ml-2 text-xs text-gray-500'>
                    ({option.date})
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Дата выдачи для выбранной категории */}
      <div className='mt-2'>
        <label className='text-[13px] text-[#6B7280]'>
          Дата выдачи данной категории:
        </label>
        <input
          type='date'
          onChange={(e) => {
            setUserFormData((prev) => {
              return {
                ...prev,
                driverLicense: {
                  ...prev.driverLicense,
                  category: {
                    category: prev?.driverLicense?.category?.category || '', // provide a default value
                    issuingDate: e.target.value || '',
                  },
                },
              };
            });
          }}
          value={userFormData.driverLicense?.category?.issuingDate || ''}
          className={
            userFormData.driverLicense?.category?.issuingDate
              ? 'w-full bg-[#F5F5F5] rounded-[10px] py-3 px-[14px] text-[16px] text-[#201F1F] outline-none transition-colors'
              : 'w-full bg-[#F5F5F5] border-[red] border-[1px] rounded-[10px] py-3 px-[14px] text-[16px] text-[#201F1F] outline-none transition-colors'
          }
        />
      </div>
    </div>
  );
};

export default CategoryDropdown;
