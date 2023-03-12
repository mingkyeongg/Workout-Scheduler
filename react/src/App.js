import MyCalendar from "./calendar.js";
import MyComponent from "./chart.js";
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Navi from "./nav";

function App() {
  return (
    <>
    <BrowserRouter>
      <Navi />
      <Routes>
        <Route exact path="/home" element={<MyCalendar />} />
        <Route path="hello" element={<MyComponent/>} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
