import React, { useEffect, useState } from 'react';

interface Props {
  paramsId?: string;
  onIdChange?: (id: string) => void;
}

const fetchUserName = async (id: string) => {
  try {
    const res = await fetch(`https://oa.kg/api/users/${id}/name/`, {
      headers: { accept: 'application/json' },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
};

const ReferralIdInput: React.FC<Props> = ({ paramsId, onIdChange }) => {
  const [showInput, setShowInput] = useState(!!paramsId);
  const [id, setId] = useState(paramsId || '');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (onIdChange) onIdChange(id);
    if (id) {
      setLoading(true);
      fetchUserName(id).then((data) => {
        setLoading(false);
        if (data) {
          setName(data.fullName || '');
          setPhone(data.phoneNumber || '');
        } else {
          setName('');
          setPhone('');
        }
      });
    } else {
      setName('');
      setPhone('');
    }
  }, [id, onIdChange]);

  return (
    <div className='form-group'>
      {!showInput && (
        <div
          className='text-blue-500 py-2 rounded underline text-[13px]'
          role='button'
          onClick={() => setShowInput(true)}
        >
          Указать ID участника (необязательно)
        </div>
      )}
      {showInput && (
        <>
          <label htmlFor='referal-id' className='text-[14px] block'>
            ID участника команды (необязательно)
          </label>
          <input
            type='text'
            id='referal-id'
            placeholder='Введите ID'
            className='w-full mt-[12px] bg-[#F7F8FA] border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none'
            value={id}
            onChange={e => setId(e.target.value)}
          />
          {loading && <div className='text-[13px] text-gray-500 mt-1'>Загрузка...</div>}
          {!loading && (name || phone) && (
            <div className='text-[13px] text-gray-700 mt-1'>
              {name ? name : phone}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ReferralIdInput;
