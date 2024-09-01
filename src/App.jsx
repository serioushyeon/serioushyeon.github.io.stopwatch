import React, { useState, useEffect } from "react";

const App = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const handleKeyPress = (event) => {
    if (event.key === "Shift") {
      handleStartClick(); // Shift 키로 타이머 시작/정지 및 초기화
    } else if (event.key === "Escape") {
      setRunning(false);
      setTime(0);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [running]);

  // 타이머 시작 및 초기화 핸들러
  const handleStartClick = () => {
    if (!running) {
      setTime(0); // 타이머를 초기화
    }
    setRunning(!running); // 타이머 시작 또는 정지
  };

  const numberStyle = {
    fontSize: "600px",
    fontFamily: "Digit",
    width: "2ch", // 밀리초 숫자의 고정된 너비
    display: "inline-block",
    verticalAlign: "baseline", // 수직 정렬 조정
    lineHeight: "1", // 라인 높이 조정
  };

  const millisecondStyle = {
    fontSize: "600px",
    fontFamily: "Digit",
    display: "inline-block",
    width: "2ch", // 밀리초 숫자의 고정된 너비
    verticalAlign: "baseline", // 수직 정렬 조정
    lineHeight: "1", // 라인 높이 조정
  };

  // 배경색을 running 상태에 따라 변경
  const backgroundColor = running ? "red" : "LightGreen";

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          display: "inline-block",
        }}
      >
        <span style={numberStyle}>
          {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
        </span>
        <span style={{ fontSize: "160px" }}>.</span>
        <span style={millisecondStyle}>
          {("0" + ((time / 10) % 100)).slice(-2)}
        </span>
      </div>
      <div>
        <button
          onClick={handleStartClick} // 클릭 시 타이머 시작/정지 및 초기화
          style={{
            marginRight: "10px",
            backgroundColor: backgroundColor, // 동적으로 배경색 설정
            fontSize: "48px",
            width: "40%",
          }}
        >
          {running ? "일시정지" : "시작"}
        </button>
      </div>
    </div>
  );
};

export default App;
