import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/DashBoard";
import Sidebar from "./compnents/SideBar";
import { useDispatch, useSelector } from "react-redux";
import SignIn from "./pages/LogIn";

function App() {

  const token = useSelector((state) => state.auth.token);
  // const token = localStorage.getItem("token");
// hello mayar
  return (
    <>
      <div className=" h-screen">
        {token && <Sidebar />}
        <Routes>
          <Route path="/" element={token ? <HomePage /> : <SignIn />} />
          {/* <Route path="login" element={<SignIn />} /> */}
          <Route path="/admin" element={token ? <Dashboard /> : <SignIn />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
