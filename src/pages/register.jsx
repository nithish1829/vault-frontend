import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Register() {

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [pin, setPin] =
    useState("");

  const navigate = useNavigate();

  // 🔥 AUTO REDIRECT IF LOGGED IN
  useEffect(() => {

    const token =
      localStorage.getItem("token");

    if (token) {

      navigate("/calc");

    }

  }, []);

  // 🔥 REGISTER
  const register = async () => {

    if (!username || !password || !pin) {

      Swal.fire({
        icon: "warning",
        title: "Missing Fields ⚠️",
        text: "Please fill all fields",
        background: "#0f172a",
        color: "white",
        confirmButtonColor: "#f97316"
      });

      return;

    }

    // 🔥 PIN VALIDATION
    if (pin.length < 4) {

      Swal.fire({
        icon: "warning",
        title: "Weak PIN ⚠️",
        text:
          "Secret PIN must be at least 4 digits",
        background: "#0f172a",
        color: "white",
        confirmButtonColor: "#f97316"
      });

      return;

    }

    try {

      await axios.post(

        "http://localhost:8080/auth/register",

        {
          username,
          password,
          pin
        }

      );

      Swal.fire({
        icon: "success",
        title: "Vault Created 🔐",
        text:
          "Your secret vault is now secured",
        background: "#0f172a",
        color: "white",
        confirmButtonColor: "#22c55e"
      });

      setTimeout(() => {

        navigate("/");

      }, 1200);

    } catch (err) {

      console.error(err);

      Swal.fire({
        icon: "error",
        title: "Registration Failed ❌",
        text:
          "Username may already exist",
        background: "#0f172a",
        color: "white",
        confirmButtonColor: "#ef4444"
      });

    }

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#020617,#111827,#0f172a)",
        fontFamily: "Arial",
        overflow: "hidden",
        position: "relative"
      }}
    >

      {/* 🔥 Glow Effects */}
      <div
        style={{
          position: "absolute",
          width: "320px",
          height: "320px",
          background:
            "rgba(249,115,22,0.14)",
          borderRadius: "50%",
          top: "-80px",
          left: "-80px",
          filter: "blur(90px)"
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "320px",
          height: "320px",
          background:
            "rgba(56,189,248,0.12)",
          borderRadius: "50%",
          bottom: "-100px",
          right: "-80px",
          filter: "blur(90px)"
        }}
      />

      {/* 🔥 Register Card */}
      <div
        style={{
          width: "400px",
          background:
            "rgba(255,255,255,0.06)",
          backdropFilter: "blur(18px)",
          padding: "38px",
          borderRadius: "32px",
          border:
            "1px solid rgba(255,255,255,0.08)",
          boxShadow:
            "0 0 40px rgba(0,0,0,0.45)",
          zIndex: 2
        }}
      >

        {/* 🔥 Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px"
          }}
        >

          <div
            style={{
              fontSize: "60px",
              marginBottom: "10px"
            }}
          >
            🔐
          </div>

          <h1
            style={{
              color: "white",
              marginBottom: "8px",
              fontSize: "32px"
            }}
          >
            Create Vault
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "14px"
            }}
          >
            Secure your hidden gallery
          </p>

        </div>

        {/* 🔥 Username */}
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          style={{
            width: "100%",
            height: "58px",
            marginBottom: "18px",
            borderRadius: "16px",
            border: "none",
            outline: "none",
            paddingLeft: "18px",
            background:
              "rgba(255,255,255,0.08)",
            color: "white",
            fontSize: "16px",
            boxSizing: "border-box"
          }}
        />

        {/* 🔥 Password */}
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            width: "100%",
            height: "58px",
            marginBottom: "18px",
            borderRadius: "16px",
            border: "none",
            outline: "none",
            paddingLeft: "18px",
            background:
              "rgba(255,255,255,0.08)",
            color: "white",
            fontSize: "16px",
            boxSizing: "border-box"
          }}
        />

        {/* 🔥 Secret PIN */}
        <input
          type="password"
          placeholder="Secret Vault PIN"
          value={pin}
          onChange={(e) =>
            setPin(e.target.value)
          }
          style={{
            width: "100%",
            height: "58px",
            marginBottom: "25px",
            borderRadius: "16px",
            border: "none",
            outline: "none",
            paddingLeft: "18px",
            background:
              "rgba(255,255,255,0.08)",
            color: "white",
            fontSize: "16px",
            boxSizing: "border-box"
          }}
        />

        {/* 🔥 Create Vault */}
        <button
          onClick={register}
          style={{
            width: "100%",
            height: "58px",
            borderRadius: "16px",
            border: "none",
            background:
              "linear-gradient(135deg,#f97316,#fb923c)",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow:
              "0 0 25px rgba(249,115,22,0.35)"
          }}
        >
          Create Secure Vault
        </button>

        {/* 🔥 Login */}
        <p
          style={{
            marginTop: "24px",
            textAlign: "center",
            color: "#94a3b8",
            fontSize: "14px"
          }}
        >
          Already have an account?

          <span
            onClick={() =>
              navigate("/")
            }
            style={{
              color: "#38bdf8",
              cursor: "pointer",
              marginLeft: "7px",
              fontWeight: "bold"
            }}
          >
            Login
          </span>

        </p>

      </div>

    </div>

  );
}

export default Register;