import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import * as tf from "@tensorflow/tfjs";

// Register Chart.js modules
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function App() {
  const [latest, setLatest] = useState({ temperature: 0, humidity: 0, air: 0 });
  const [history, setHistory] = useState([]);
  const [prediction, setPrediction] = useState("Calculating...");
  const [model, setModel] = useState(null);

  // Train a small ML model on startup
  useEffect(() => {
    async function createModel() {
      const model = tf.sequential();
      model.add(tf.layers.dense({ units: 8, activation: "relu", inputShape: [3] }));
      model.add(tf.layers.dense({ units: 3, activation: "softmax" }));

      model.compile({
        optimizer: "adam",
        loss: "categoricalCrossentropy",
        metrics: ["accuracy"],
      });

      // Fake training dataset (temperature, humidity, air → demand class)
      const xs = tf.tensor2d(
        [
          [25, 40, 50], // low
          [30, 70, 120], // medium
          [35, 80, 180], // high
          [28, 55, 90], // low
          [32, 65, 140], // medium
          [38, 75, 200], // high
        ]
      );

      const ys = tf.tensor2d([
        [1, 0, 0], // low
        [0, 1, 0], // medium
        [0, 0, 1], // high
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
      ]);

      await model.fit(xs, ys, { epochs: 50 });
      setModel(model);
    }

    createModel();
  }, []);

  // Fetch sensor data from backend
  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://localhost:5000/api/data")
        .then((res) => res.json())
        .then((data) => {
          setLatest(data);
          setHistory((prev) => [
            ...prev.slice(-19),
            { ...data, time: new Date().toLocaleTimeString() },
          ]);
        })
        .catch((err) => console.error(err));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // ML Prediction
  useEffect(() => {
    if (model) {
      const input = tf.tensor2d([[latest.temperature, latest.humidity, latest.air]]);
      const output = model.predict(input);
      const result = output.argMax(-1).dataSync()[0];

      if (result === 2) {
        setPrediction("⚡ High Demand (More power needed)");
      } else if (result === 1) {
        setPrediction("🔆 Medium Demand");
      } else {
        setPrediction("🌙 Low Demand");
      }
    }
  }, [latest, model]);

  // Chart.js dataset
  const chartData = {
    labels: history.map((h) => h.time),
    datasets: [
      {
        label: "Temperature (°C)",
        data: history.map((h) => h.temperature),
        borderColor: "orange",
        backgroundColor: "rgba(255,165,0,0.3)",
      },
      {
        label: "Humidity (%)",
        data: history.map((h) => h.humidity),
        borderColor: "green",
        backgroundColor: "rgba(0,255,0,0.3)",
      },
      {
        label: "Air Quality",
        data: history.map((h) => h.air),
        borderColor: "purple",
        backgroundColor: "rgba(160,32,240,0.3)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top", labels: { color: "white" } },
      title: { display: true, text: "Live Sensor Data", color: "white" },
    },
    scales: {
      x: { ticks: { color: "white" } },
      y: { ticks: { color: "white" } },
    },
  };

  return (
    <div style={{ background: "#1e1e1e", minHeight: "100vh", color: "white", padding: "20px" }}>
      <h1 style={{ display: "flex", alignItems: "center", fontSize: "2rem" }}>
        🌐 Smart Power Dashboard
      </h1>

      {/* Sensor + Prediction Cards */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <div style={{ flex: 1, padding: "20px", background: "#333", borderRadius: "10px" }}>
          <h2>🌡 Temperature</h2>
          <p>{latest.temperature} °C</p>
        </div>
        <div style={{ flex: 1, padding: "20px", background: "#333", borderRadius: "10px" }}>
          <h2>💧 Humidity</h2>
          <p>{latest.humidity} %</p>
        </div>
        <div style={{ flex: 1, padding: "20px", background: "#333", borderRadius: "10px" }}>
          <h2>🟢 Air Quality</h2>
          <p>{latest.air}</p>
        </div>
        <div style={{ flex: 1, padding: "20px", background: "#444", borderRadius: "10px" }}>
          <h2>🔮 Predicted Load (ML)</h2>
          <p style={{ fontSize: "18px", fontWeight: "bold" }}>{prediction}</p>
        </div>
      </div>

      {/* Chart.js Line Chart */}
      <div style={{ background: "#222", padding: "20px", borderRadius: "10px" }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default App;
