// import "./App.css";
// import Home from "./pages/Home";


// function App() {
//   return (
//     <>
//       <Home />
//     </>
//   );
// }

// export default App;


import { BrowserRouter, Routes, Route,} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Sign-Up";
import Navbar from "./components/Navbar";


function App() {
  return (
    <>
     <BrowserRouter>
     <Navbar/>
     <Routes>
       <Route path="/" element={<Home />}/>
       <Route path="/auth/login" element={<Login />}/>
       <Route path="/auth/signup" element={<Signup />}/>
     </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;