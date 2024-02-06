import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import SettingDashboard from "./Dashboard";

const Settings = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:id" element={<SettingDashboard />} />
    </Routes>
  );
};

export default Settings;
