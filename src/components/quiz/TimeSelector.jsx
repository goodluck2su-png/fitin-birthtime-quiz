import { useState } from 'react';
import Button from '../common/Button';
import Header from '../common/Header';

const TIME_OPTIONS = [
  { value: '자', label: '자시', time: '23:00~01:00', emoji: '🌙', period: '밤' },
  { value: '축', label: '축시', time: '01:00~03:00', emoji: '🐂', period: '새벽' },
  { value: '인', label: '인시', time: '03:00~05:00', emoji: '🐅', period: '새벽' },
  { value: '묘', label: '묘시', time: '05:00~07:00', emoji: '🐰', period: '아침' },
  { value: '진', label: '진시', time: '07:00~09:00', emoji: '🐉', period: '아침' },
  { value: '사', label: '사시', time: '09:00~11:00', emoji: '🐍', period: '오전' },
  { value: '오', label: '오시', time: '11:00~13:00', emoji: '🐴', period: '낮' },
  { value: '미', label: '미시', time: '13:00~15:00', emoji: '🐑', period: '오후' },
  { value: '신', label: '신시', time: '15:00~17:00', emoji: '🐵', period: '오후' },
  { value: '유', label: '유시', time: '17:00~19:00', emoji: '🐔', period: '저녁' },
  { value: '술', label: '술시', time: '19:00~21:00', emoji: '🐕', period: '저녁' },
  { value: '해', label: '해시', time: '21:00~23:00', emoji: '🐷', period: '밤' },
];

function TimeSelector({ onSelect, onBack }) {
  const [selected, setSelected] = useState(null);

  const handleSubmit = () => {
    if (selected) {
      onSelect(selected);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-fitin-light to-white">
      <Header title="시간 선택" onBack={onBack} />

      <div className="flex-1 flex flex-col p-6">
        <div className="text-center mb-6 animate-fadeIn">
          <span className="text-4xl">⏰</span>
          <h2 className="text-xl font-bold text-fitin-dark mt-3 mb-1">
            태어난 시간대를 선택해주세요
          </h2>
          <p className="text-sm text-gray-500">12시진 중 해당하는 시간을 선택하세요</p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6 flex-1 overflow-y-auto hide-scrollbar">
          {TIME_OPTIONS.map((option, index) => (
            <button
              key={option.value}
              onClick={() => setSelected(option.value)}
              className={`p-3 rounded-xl border-2 transition-all duration-200 text-center animate-fadeInUp ${
                selected === option.value
                  ? 'border-fitin-primary bg-fitin-light shadow-md scale-[1.02]'
                  : 'border-gray-200 bg-white hover:border-fitin-primary/50 hover:shadow-sm'
              }`}
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <span className="text-2xl block">{option.emoji}</span>
              <p className="font-bold text-fitin-dark text-sm mt-1">{option.label}</p>
              <p className="text-xs text-gray-500">{option.time}</p>
              <span className="text-[10px] text-gray-400">{option.period}</span>
            </button>
          ))}
        </div>

        <div className="mt-auto">
          <Button
            primary
            onClick={handleSubmit}
            disabled={!selected}
            className="w-full"
          >
            {selected ? `${TIME_OPTIONS.find(o => o.value === selected)?.label}로 확인` : '시간을 선택해주세요'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TimeSelector;
