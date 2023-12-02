import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Countdown from "./app/Countdown";

const UNITS = [
  ["DAYS", 24 * 60 * 60 * 1000],
  ["HOURS", 60 * 60 * 1000],
  ["MINUTES", 60 * 1000],
  ["SECONDS", 1000]
];

const COUNTDOWN_TIMESTAMP = 1703462400000;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="b-app">
      <div className="b-header"></div>
      <Countdown className="loader" units={UNITS} countdownTimestamp={COUNTDOWN_TIMESTAMP} />
    </div>
  </React.StrictMode>
);