import { useState } from 'react';
import Button from '../common/Button';
import Header from '../common/Header';

function BirthDateInput({ onNext, onBack }) {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleSubmit = () => {
    if (year && month && day) {
      onNext({ year: parseInt(year), month: parseInt(month), day: parseInt(day) });
    }
  };

  const isValid = year && month && day;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-fitin-light to-white">
      <Header title="생년월일" onBack={onBack} />

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md animate-fadeIn">
          <div className="text-center mb-8">
            <span className="text-5xl">📅</span>
            <h2 className="text-2xl font-bold text-fitin-dark mt-4 mb-2">
              생년월일을 알려주세요
            </h2>
            <p className="text-gray-500 text-sm">
              정확한 분석을 위해 필요해요
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex gap-3 mb-6">
              <div className="flex-1">
                <label className="text-xs text-gray-500 mb-1 block">년도</label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-fitin-primary focus:outline-none bg-white"
                >
                  <option value="">선택</option>
                  {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label className="text-xs text-gray-500 mb-1 block">월</label>
                <select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-fitin-primary focus:outline-none bg-white"
                >
                  <option value="">선택</option>
                  {months.map((m) => (
                    <option key={m} value={m}>{m}월</option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label className="text-xs text-gray-500 mb-1 block">일</label>
                <select
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-fitin-primary focus:outline-none bg-white"
                >
                  <option value="">선택</option>
                  {days.map((d) => (
                    <option key={d} value={d}>{d}일</option>
                  ))}
                </select>
              </div>
            </div>

            <Button
              primary
              onClick={handleSubmit}
              disabled={!isValid}
              className="w-full"
            >
              다음
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BirthDateInput;
