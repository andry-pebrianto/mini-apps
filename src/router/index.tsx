import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import CountDuration from "../pages/CountDuration";
import MobileLegend from "../pages/MobileLegend";

export default function router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
        </Route>
        <Route path="/count-duration">
          <Route index element={<CountDuration />} />
        </Route>
        <Route path="/mobile-legend">
          <Route index element={<MobileLegend />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
