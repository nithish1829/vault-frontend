import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Calculator from "./pages/Calculator";
import Vault from "./pages/Vault";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/calc" element={<Calculator />} />

        <Route
  path="/register"
  element={<Register />}
/>

        <Route
          path="/vault"
          element={
            <ProtectedRoute>
              <Vault />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;