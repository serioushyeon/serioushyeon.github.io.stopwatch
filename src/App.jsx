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
    if (event.key === " ") {
      setRunning(!running);
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

  const numberStyle = {
    fontSize: "200px",
    fontFamily: "Digit",
    width: "2ch", // 숫자 하나의 고정된 너비
    display: "inline-block",
    textAlign: "right",
  };

  const millisecondStyle = {
    fontSize: "160px",
    fontFamily: "Digit",
    width: "2ch", // 밀리초 숫자의 고정된 너비
    display: "inline-block",
    textAlign: "right",
  };

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
        <span style={{ fontSize: "160px", verticalAlign: "top" }}>.</span>
        <span style={millisecondStyle}>
          {("0" + ((time / 10) % 100)).slice(-2)}
        </span>
      </div>
      <div>
        <button
          onClick={() => setRunning(!running)}
          style={{
            marginRight: "10px",
            backgroundColor: "LightGreen",
            fontSize: "24px",
          }}
        >
          {running ? "일시정지" : "시작"}
        </button>
        <button
          style={{
            marginRight: "10px",
            backgroundColor: "Orange",
            fontSize: "24px",
          }}
          onClick={() => {
            setRunning(false);
            setTime(0);
          }}
        >
          재설정
        </button>
      </div>
    </div>
  );
};

export default App;
