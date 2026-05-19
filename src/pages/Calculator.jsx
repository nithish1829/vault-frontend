import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

function Calculator() {
  const [shake, setShake] = useState(false);

  const [time, setTime] = useState(new Date().toLocaleTimeString());

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  // 🔥 LIVE TIME
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 🔥 AUTO LOCK AFTER 2 MINUTES
  useEffect(() => {
    let timeout;

    const resetTimer = () => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        localStorage.removeItem("vaultUnlocked");

        Swal.fire({
          icon: "warning",
          title: "Vault Locked 🔒",
          text: "Inactive for too long",
          timer: 1500,
          showConfirmButton: false,
          background: "#1e1e1e",
          color: "white",
        });

        setTimeout(() => {
          navigate("/");
        }, 1500);
      }, 120000);
    };

    window.addEventListener("mousemove", resetTimer);

    window.addEventListener("keydown", resetTimer);

    resetTimer();

    return () => {
      clearTimeout(timeout);

      window.removeEventListener("mousemove", resetTimer);

      window.removeEventListener("keydown", resetTimer);
    };
  }, []);

  // 🔥 KEYBOARD SUPPORT
  useEffect(() => {
    const handleKeyPress = (e) => {
      const key = e.key;

      if (/^[0-9+\-*/.%]$/.test(key)) {
        setExpression((prev) => prev + key);
      } else if (key === "Enter") {
        calculate();
      } else if (key === "Backspace") {
        eraseOne();
      } else if (key === "Escape") {
        clear();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [expression]);

  // 🔥 KEYBOARD SUPPORT
  useEffect(() => {
    const handleKeyDown = (e) => {
      // 🔥 ALLOW NUMBERS
      if (/[0-9]/.test(e.key)) {
        setExpression((prev) => prev + e.key);
      }

      // 🔥 ALLOW OPERATORS
      else if (["+", "-", "*", "/", "%", "."].includes(e.key)) {
        setExpression((prev) => prev + e.key);
      }

      // 🔥 ENTER = CALCULATE
      else if (e.key === "Enter") {
        calculate();
      }

      // 🔥 BACKSPACE
      else if (e.key === "Backspace") {
        setExpression((prev) => prev.slice(0, -1));
      }

      // 🔥 ESC = CLEAR
      else if (e.key === "Escape") {
        clear();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [expression]);

  // 🔥 BUTTON CLICK
  const handleClick = (value) => {
    setExpression(expression + value);
  };

  // 🔥 CLEAR
  const clear = () => {
    setExpression("");
  };

  // 🔥 ERASE ONE
  const eraseOne = () => {
    setExpression(expression.slice(0, -1));
  };

  // 🔥 CALCULATE
  const calculate = async () => {
    try {
      // 🔥 Replace percentage
      let exp = expression.replace(/%/g, "/100");

      const result = eval(exp);

      const user = JSON.parse(localStorage.getItem("user"));

      const res = await axios.post(
        "https://vault-backend-i1fo.onrender.com/calc/check",
        {
          userId: user.id,
          result: result.toString(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // 🔓 OPEN VAULT
      if (res.data.vault) {
        localStorage.setItem("vaultUnlocked", "true");

        Swal.fire({
          icon: "success",
          title: "Vault Opened 🔓",
          text: "Access Granted",
          timer: 1200,
          showConfirmButton: false,
          background: "#1e1e1e",
          color: "white",
        });

        setTimeout(() => {
          navigate("/vault");
        }, 1200);
      } else {
        setExpression(result.toString());

        setShake(true);

        setTimeout(() => {
          setShake(false);
        }, 500);
      }
    } catch (err) {
      console.error(err);

      Swal.fire({
        icon: "error",
        title: "Invalid Input ❌",
        text: "Please enter valid calculation",
        background: "#1e1e1e",
        color: "white",
      });
    }
  };

  // 🔥 LOGOUT
  const logout = () => {
    Swal.fire({
      icon: "success",
      title: "Logged Out 🚪",
      timer: 1200,
      showConfirmButton: false,
      background: "#1e1e1e",
      color: "white",
    });

    setTimeout(() => {
      localStorage.removeItem("token");

      localStorage.removeItem("user");

      localStorage.removeItem("vaultUnlocked");

      window.location.href = "/";
    }, 1200);
  };

  const buttons = [
    "C",
    "⌫",
    "%",
    "/",
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "0",
    ".",
    "=",
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#101010",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Segoe UI",
        padding: "20px",
      }}
    >
      {/* 🔥 Calculator */}
      <div
        style={{
          width: "360px",
          background: "#1f1f1f",
          borderRadius: "22px",
          overflow: "hidden",
          boxShadow: "0 0 40px rgba(0,0,0,0.6)",
        }}
      >
        {/* 🔥 Top Bar */}
        <div
          style={{
            padding: "18px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h2
              style={{
                color: "white",
                margin: 0,
                fontSize: "22px",
                fontWeight: "600",
              }}
            >
              🧮 Calculator
            </h2>

            <p
              style={{
                color: "#9ca3af",
                fontSize: "13px",
                marginTop: "4px",
              }}
            >
              Secret Vault Mode • {time}
            </p>
          </div>

          <button
            onClick={logout}
            style={{
              background: "#ef4444",
              border: "none",
              color: "white",
              padding: "10px 14px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Logout
          </button>
        </div>

        {/* 🔥 Display */}
        <div
          style={{
            padding: "25px",
          }}
        >
          <input
            value={expression}
            readOnly
            className={shake ? "shake" : ""}
            placeholder="0"
            style={{
              width: "100%",
              height: "90px",
              background: "#101010",
              border: "none",
              outline: "none",
              borderRadius: "16px",
              color: "white",
              textAlign: "right",
              fontSize: "42px",
              paddingRight: "20px",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* 🔥 Buttons */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "10px",
            padding: "20px",
          }}
        >
          {buttons.map((btn) => (
            <button
              key={btn}
              onClick={() => {
                if (btn === "C") {
                  clear();
                } else if (btn === "⌫") {
                  eraseOne();
                } else if (btn === "=") {
                  calculate();
                } else {
                  handleClick(btn);
                }
              }}
              style={{
                height: "70px",
                border: "none",
                borderRadius: "18px",
                fontSize: "24px",
                cursor: "pointer",
                color: "white",
                transition: "0.2s",

                background:
                  btn === "="
                    ? "#2563eb"
                    : btn === "C"
                      ? "#dc2626"
                      : btn === "⌫"
                        ? "#374151"
                        : ["/", "*", "-", "+", "%"].includes(btn)
                          ? "#2d2d2d"
                          : "#3a3a3a",
              }}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

<style>
  {`
.shake {

  animation: shake 0.3s;

}

@keyframes shake {

  0% { transform: translateX(0); }

  25% { transform: translateX(-8px); }

  50% { transform: translateX(8px); }

  75% { transform: translateX(-8px); }

  100% { transform: translateX(0); }

}
`}
</style>;

export default Calculator;
