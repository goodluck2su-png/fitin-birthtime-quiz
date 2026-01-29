import { useState } from 'react';
import Button from '../common/Button';
import Card from '../common/Card';

function BirthDateInput({ onNext }) {
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
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <Card className="w-full max-w-md">
        <div className="text-center mb-6">
          <span className="text-4xl">&#x1F4C5;</span>
          <h2 className="text-xl font-bold text-fitin-dark mt-4">
            생년월일을 알려주세요
          </h2>
        </div>

        <div className="flex gap-3 mb-6">
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-fitin-primary focus:outline-none"
          >
            <option value="">년도</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-fitin-primary focus:outline-none"
          >
            <option value="">월</option>
            {months.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-fitin-primary focus:outline-none"
          >
            <option value="">일</option>
            {days.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <Button
          primary
          onClick={handleSubmit}
          className={`w-full ${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          다음
        </Button>
      </Card>
    </div>
  );
}

export default BirthDateInput;
