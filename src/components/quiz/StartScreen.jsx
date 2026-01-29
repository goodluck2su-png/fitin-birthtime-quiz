import Button from '../common/Button';

function StartScreen({ onNext }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-fitin-light to-white">
      <div className="text-center">
        <div className="text-6xl mb-6">
          <span role="img" aria-label="crystal ball">&#x1F52E;</span>
        </div>

        <h1 className="text-3xl font-bold text-fitin-dark mb-2">
          FIT IN
        </h1>

        <p className="text-fitin-primary font-medium mb-6">
          운명처럼 딱 맞는 옷
        </p>

        <p className="text-gray-600 mb-8 max-w-xs">
          태어난 시간으로 알아보는<br />
          나의 패션 운명
        </p>

        <Button primary onClick={onNext}>
          시작하기
        </Button>
      </div>
    </div>
  );
}

export default StartScreen;
