import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Swal from "sweetalert2";

Swal.mixin({
  background: "#0f172a",
  color: "white",
  confirmButtonColor: "#f97316"
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
