import { useEffect, useState, type FC } from 'react';
import { useGetCountriesQuery, type ICountry } from '../store/countriesApi';

import warning from '../assets/warning.svg';
import checked from '../assets/checked.svg';
import dropdownArrow from '../assets/dropdown-arrow.svg';

interface IProps {
  value: number;
  onChange: (country: ICountry) => void;
  label?: string;
}

const CountryDropdown: FC<IProps> = ({ value, onChange, label = 'Страна' }) => {
  const { data: countries } = useGetCountriesQuery();
  const [isOpen, setIsOpen] = useState(false);
  const [touched, setTouched] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const selectedCountry = countries?.find((c) => c.id === value) || { id: 0, name: 'Выберите страну' };

  useEffect(() => {
    // Если value задан, выставить touched
    if (value && value !== 0) setTouched(true);
  }, [value]);

  const handleCountryClick = (country: ICountry) => {
    onChange(country);
    setIsOpen(false);
    setTouched(true);
  };

  return (
    <div>
      <h3 className="text-suptitle">
        {label} <span className="required text-red-500">*</span>
      </h3>
      <div
        className={`relative w-full border rounded-[10px] overflow-hidden transition-colors ${
          touched && selectedCountry.name === 'Выберите страну'
            ? 'border-red-500'
            : 'border-[#E5E7EB]'
        }`}
      >
        <button
          type="button"
          className="w-full text-left bg-[#F5F5F5] rounded-[10px] py-3 px-[14px] text-[16px] text-[#201F1F] outline-none transition-colors flex items-center justify-between"
          onClick={() => setIsOpen(!isOpen)}
          onBlur={() => setTouched(true)}
        >
          {selectedCountry.name === 'Выберите страну' ? (
            <img src={warning} alt="" className="size-[20px] absolute" />
          ) : (
            <img
              src={checked}
              alt=""
              className="size-[15px] absolute rounded-full"
            />
          )}
          <span className="font-semibold ml-[25px]">
            {selectedCountry.name}
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
            <li>
              <input
                type='text'
                placeholder='Поиск бренда'
                className='w-full border rounded-[10px] py-3 px-[14px] text-[16px] text-[#201F1F] outline-none transition-colors'
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
              />
            </li>
            {countries?.filter((item) => {
                if (inputValue.trim()) {
                  return item.name.toLowerCase().includes(inputValue.trim());
                } else {
                  return item;
                }
              })
              ?.map((country) => (
              <li
                key={country.id}
                className="px-4 py-2 cursor-pointer hover:bg-[#F5F5F5] text-[16px] text-[#201F1F] rounded-[8px] transition-colors"
                onClick={() => handleCountryClick(country)}
              >
                {country?.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CountryDropdown;
