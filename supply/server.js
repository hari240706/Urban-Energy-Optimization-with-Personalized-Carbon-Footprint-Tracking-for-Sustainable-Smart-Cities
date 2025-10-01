const express = require("express");
const cors = require("cors");
const SerialPort = require("serialport").SerialPort;
const ReadlineParser = require("@serialport/parser-readline").ReadlineParser;

const app = express();
app.use(cors());

let latestData = {
  temperature: null,
  humidity: null,
  air: null,
};

// ✅ Adjust this to match your Arduino port
const port = new SerialPort({ path: "COM3", baudRate: 9600 }); 
const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

parser.on("data", (line) => {
  try {
    // Expect: T:25.3,H:56.2,Air:312
    const parts = line.trim().split(",");
    let t, h, air;
    parts.forEach((p) => {
      if (p.startsWith("T:")) t = parseFloat(p.slice(2));
      if (p.startsWith("H:")) h = parseFloat(p.slice(2));
      if (p.startsWith("Air:")) air = parseInt(p.slice(4));
    });

    latestData = {
      temperature: t ?? latestData.temperature,
      humidity: h ?? latestData.humidity,
      air: air ?? latestData.air,
    };

    console.log("Updated sensors:", latestData);
  } catch (err) {
    console.error("Parse error:", line, err);
  }
});

app.get("/sensors", (req, res) => {
  res.json(latestData);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ Sensor server running at http://localhost:${PORT}`);
});
