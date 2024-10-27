import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/home";
import Onboard from "./pages/onboard";
import Vote from "./pages/vote"
import AdvertDash from "./pages/adverDashboard";
import PublisherDash from "./pages/publDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onboard" element={<Onboard />} />
		<Route path="/vote" element={<Vote />} />
        <Route path="/advert-dash" element={<AdvertDash />} />
        <Route path="/publ-dash" element={<PublisherDash />} />
      </Routes>
    </Router>
  );
}

export default App;
