import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import CountDuration from "../pages/CountDuration";
import MobileLegend from "../pages/MobileLegend";
import MemeGenerator from "../pages/MemeGenerator";
import CaesarCipher from "../pages/CaesarCipher";
import WordScramble from "../pages/WordScramble";

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
        <Route path="/meme-generator">
          <Route index element={<MemeGenerator />} />
        </Route>
        <Route path="/caesar-cipher">
          <Route index element={<CaesarCipher />} />
        </Route>
        <Route path="/word-scramble">
          <Route index element={<WordScramble />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
