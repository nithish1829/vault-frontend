import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();

  // 🔥 AUTO REDIRECT IF ALREADY LOGGED IN
  useEffect(() => {

    const token =
      localStorage.getItem("token");

    if (token) {

      navigate("/calc");

    }

  }, []);

  // 🔥 LOGIN FUNCTION
  const handleLogin = async () => {

    if (!username || !password) {

      Swal.fire({
        icon: "warning",
        title: "Missing Fields ⚠️",
        text:
          "Please enter username and password",
        background: "#0f172a",
        color: "white",
        confirmButtonColor: "#f97316"
      });

      return;

    }

    try {

      const res = await axios.post(

        "https://vault-backend-i1fo.onrender.com/auth/login",

        {
          username,
          password
        }

      );

      // 🔥 SAVE JWT TOKEN
      localStorage.setItem(
        "token",
        res.data.token
      );

      // 🔥 SAVE USER
      localStorage.setItem(

        "user",

        JSON.stringify({

          id: res.data.id,
          username:
            res.data.username

        })

      );

      Swal.fire({
        icon: "success",
        title: "Welcome Back 🔐",
        text:
          "Vault unlocked successfully",
        timer: 1500,
        showConfirmButton: false,
        background: "#0f172a",
        color: "white"
      });

      setTimeout(() => {

        navigate("/calc");

      }, 1500);

    } catch (err) {

      console.error(err);

      Swal.fire({
        icon: "error",
        title: "Login Failed ❌",
        text:
          "Invalid username or password",
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

      {/* 🔥 Background Glow */}
      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          background:
            "rgba(249,115,22,0.15)",
          borderRadius: "50%",
          top: "-80px",
          left: "-80px",
          filter: "blur(80px)"
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          background:
            "rgba(59,130,246,0.12)",
          borderRadius: "50%",
          bottom: "-100px",
          right: "-80px",
          filter: "blur(90px)"
        }}
      />

      {/* 🔥 Login Card */}
      <div
        style={{
          width: "390px",
          background:
            "rgba(255,255,255,0.06)",
          backdropFilter: "blur(18px)",
          border:
            "1px solid rgba(255,255,255,0.08)",
          borderRadius: "32px",
          padding: "38px",
          boxShadow:
            "0 0 40px rgba(0,0,0,0.45)",
          zIndex: 2
        }}
      >

        {/* 🔥 Logo */}
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
            Secret Vault
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "14px"
            }}
          >
            Hidden Calculator Locker
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
            borderRadius: "16px",
            border: "none",
            outline: "none",
            marginBottom: "18px",
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
            borderRadius: "16px",
            border: "none",
            outline: "none",
            marginBottom: "26px",
            paddingLeft: "18px",
            background:
              "rgba(255,255,255,0.08)",
            color: "white",
            fontSize: "16px",
            boxSizing: "border-box"
          }}
        />

        {/* 🔥 Login Button */}
        <button
          onClick={handleLogin}
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
          Login
        </button>

        {/* 🔥 Register */}
        <p
          style={{
            marginTop: "24px",
            textAlign: "center",
            color: "#94a3b8",
            fontSize: "14px"
          }}
        >
          Don’t have an account?

          <span
            onClick={() =>
              navigate("/register")
            }
            style={{
              color: "#38bdf8",
              cursor: "pointer",
              marginLeft: "7px",
              fontWeight: "bold"
            }}
          >
            Register
          </span>

        </p>

      </div>

    </div>

  );
}

export default Login;