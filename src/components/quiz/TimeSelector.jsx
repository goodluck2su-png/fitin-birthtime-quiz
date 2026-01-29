import { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';

const TIME_OPTIONS = [
  { value: '자', label: '자시 (23:00 ~ 01:00)', emoji: '&#x1F319;' },
  { value: '축', label: '축시 (01:00 ~ 03:00)', emoji: '&#x1F42C;' },
  { value: '인', label: '인시 (03:00 ~ 05:00)', emoji: '&#x1F405;' },
  { value: '묘', label: '묘시 (05:00 ~ 07:00)', emoji: '&#x1F430;' },
  { value: '진', label: '진시 (07:00 ~ 09:00)', emoji: '&#x1F409;' },
  { value: '사', label: '사시 (09:00 ~ 11:00)', emoji: '&#x1F40D;' },
  { value: '오', label: '오시 (11:00 ~ 13:00)', emoji: '&#x1F434;' },
  { value: '미', label: '미시 (13:00 ~ 15:00)', emoji: '&#x1F411;' },
  { value: '신', label: '신시 (15:00 ~ 17:00)', emoji: '&#x1F435;' },
  { value: '유', label: '유시 (17:00 ~ 19:00)', emoji: '&#x1F414;' },
  { value: '술', label: '술시 (19:00 ~ 21:00)', emoji: '&#x1F415;' },
  { value: '해', label: '해시 (21:00 ~ 23:00)', emoji: '&#x1F437;' },
];

function TimeSelector({ onSelect }) {
  const [selected, setSelected] = useState(null);

  const handleSubmit = () => {
    if (selected) {
      onSelect(selected);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <Card className="w-full max-w-md">
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold text-fitin-dark">
            태어난 시간대를 선택해주세요
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4 max-h-80 overflow-y-auto">
          {TIME_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelected(option.value)}
              className={`p-3 text-left rounded-xl border-2 transition-all duration-200
                ${selected === option.value
                  ? 'border-fitin-primary bg-fitin-light'
                  : 'border-gray-200 hover:border-fitin-primary/50'}`}
            >
              <span
                className="text-lg"
                dangerouslySetInnerHTML={{ __html: option.emoji }}
              />
              <p className="text-sm font-medium text-fitin-dark mt-1">
                {option.label}
              </p>
            </button>
          ))}
        </div>

        <Button
          primary
          onClick={handleSubmit}
          className={`w-full ${!selected ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          확인
        </Button>
      </Card>
    </div>
  );
}

export default TimeSelector;
