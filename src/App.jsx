import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./Dashboard.jsx";
import RPS from "./RPS.jsx";
import Target from "./Target.jsx";
import Memory from "./Memory.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/rps" element={<RPS />} />
        <Route path="/target" element={<Target />} />
        <Route path="/memory" element={<Memory />} />
      </Routes>
    </Router>
  );
}
