
// import './App.css';
// import Homepage from "./components/homepage/homepage";
// import Login from "./components/login/login";
// import Register from "./components/register/register";

// function App() {
//   return (
//     <div className="App">
//       <Register/>
      
      
//     </div>
//   );
// }

// export default App;










import './App.css';
import Homepage from "./components/homepage/homepage";
import Login from "./components/login/login";
import Register from "./components/register/register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/homepage" element={<Homepage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
