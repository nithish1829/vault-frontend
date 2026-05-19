import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Vault() {
  const [files, setFiles] = useState([]);

  const [selectedFile, setSelectedFile] = useState(null);

  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔥 AUTH HEADER
  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    // 🔥 NO LOGIN
    if (!token || !user) {
      window.location.href = "/";

      return;
    }

    fetchFiles();
  }, []);

  // 🔥 FETCH FILES
  const fetchFiles = async () => {
    try {
      const res = await axios.get(
        `https://vault-backend-i1fo.onrender.com/files/${user.id}`,
        authHeader,
      );

      setFiles(res.data);
    } catch (err) {
      console.error(err);

      logoutUser();
    }
  };

  // 🔥 LOGOUT
  const logoutUser = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    localStorage.removeItem("vaultUnlocked");

    Swal.fire({
      icon: "success",
      title: "Logged Out 🚪",
      text: "Vault locked successfully",
      timer: 1500,
      showConfirmButton: false,
      background: "#0f172a",
      color: "white",
    });

    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

  // 🔥 UPLOAD FILE
  const uploadFile = async () => {
    if (!selectedFile) {
      Swal.fire({
        icon: "warning",
        title: "Select File ⚠️",
        text: "Please choose a file",
        background: "#0f172a",
        color: "white",
      });

      return;
    }

    const formData = new FormData();

    formData.append("file", selectedFile);

    formData.append("userId", user.id);

    try {
      await axios.post(
        "https://vault-backend-i1fo.onrender.com/files/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      Swal.fire({
        icon: "success",
        title: "Uploaded 🔐",
        text: "File hidden successfully",
        background: "#0f172a",
        color: "white",
      });

      setSelectedFile(null);

      fetchFiles();
    } catch (err) {
      console.error(err);

      Swal.fire({
        icon: "error",
        title: "Upload Failed ❌",
        text: "Something went wrong",
        background: "#0f172a",
        color: "white",
      });
    }
  };

  // 🔥 FILE TYPE CHECK
  const renderFilePreview = (file) => {
    const fileUrl = `https://vault-backend-i1fo.onrender.com/uploads/${file.fileUrl}`;

    // 🔥 IMAGE
    if (file.fileUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      return (
        <img
          src={fileUrl}
          alt="vault"
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
            display: "block",
          }}
        />
      );
    }

    // 🔥 VIDEO
    if (file.fileUrl.match(/\.(mp4|webm|ogg)$/i)) {
      return (
        <video
          controls
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
            background: "black",
          }}
        >
          <source src={fileUrl} />
        </video>
      );
    }

    // 🔥 AUDIO
    if (file.fileUrl.match(/\.(mp3|wav|ogg)$/i)) {
      return (
        <div
          style={{
            height: "300px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            background: "linear-gradient(135deg,#111827,#1e293b)",
          }}
        >
          <div
            style={{
              fontSize: "70px",
            }}
          >
            🎵
          </div>

          <audio controls>
            <source src={fileUrl} />
          </audio>
        </div>
      );
    }

    // 🔥 OTHER FILES
    return (
      <div
        style={{
          height: "300px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg,#111827,#1e293b)",
          gap: "15px",
        }}
      >
        <div
          style={{
            fontSize: "70px",
          }}
        >
          📄
        </div>

        <p
          style={{
            color: "white",
            padding: "0 15px",
            textAlign: "center",
            wordBreak: "break-word",
          }}
        >
          {file.fileUrl}
        </p>
      </div>
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#020617,#111827,#0f172a)",
        padding: "30px",
        color: "white",
        fontFamily: "Arial",
      }}
    >
      {/* 🔥 HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "34px",
            }}
          >
            🔐 Secret Vault
          </h1>

          <p
            style={{
              color: "#94a3b8",
            }}
          >
            Hidden Secure Gallery
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
          }}
        >
          {/* 🔥 LOCK */}
          <button
            onClick={() => {
              localStorage.removeItem("vaultUnlocked");

              window.location.href = "/calc";
            }}
            style={{
              padding: "12px 18px",
              border: "none",
              borderRadius: "12px",
              background: "#ef4444",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Lock Vault
          </button>

          {/* 🔥 LOGOUT */}
          <button
            onClick={logoutUser}
            style={{
              padding: "12px 18px",
              border: "none",
              borderRadius: "12px",
              background: "#2563eb",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* 🔥 UPLOAD BOX */}
      <div
        style={{
          background: "rgba(255,255,255,0.05)",
          padding: "25px",
          borderRadius: "22px",
          marginBottom: "35px",
        }}
      >
        <h2
          style={{
            color: "white",
            marginBottom: "18px",
            fontSize: "28px",
            fontWeight: "bold",
          }}
        >
          🔐 Add To Secure Vault
        </h2>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: "20px",
          }}
        >
          Hide photos, videos, audio and private files securely
        </p>

        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <input
            type="file"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />

          <button
            onClick={uploadFile}
            style={{
              padding: "12px 22px",
              border: "none",
              borderRadius: "12px",
              background: "#f97316",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Upload
          </button>
        </div>
      </div>

      {/* 🔥 EMPTY */}
      {files.length === 0 && (
        <div
          style={{
            textAlign: "center",
            color: "#94a3b8",
            marginTop: "100px",
            fontSize: "20px",
          }}
        >
          No Files Hidden Yet 🔒
        </div>
      )}

      {/* 🔥 GALLERY */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: "25px",
        }}
      >
        {files.map((file) => (
          <div
            key={file.id}
            style={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: "22px",
              overflow: "hidden",
              boxShadow: "0 0 20px rgba(0,0,0,0.4)",
            }}
          >
            {/* 🔥 PREVIEW */}
            {renderFilePreview(file)}

            {/* 🔥 BUTTONS */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "15px",
              }}
            >
              {/* 🔓 OPEN */}
              <a
                href={`https://vault-backend-i1fo.onrender.com/uploads/${file.fileUrl}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: "none",
                  background: "#2563eb",
                  padding: "10px 16px",
                  borderRadius: "10px",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Open
              </a>

              {/* 🔥 RESTORE */}
              <button
                onClick={async () => {
                  try {
                    const response = await fetch(
                      `https://vault-backend-i1fo.onrender.com/uploads/${file.fileUrl}`,
                    );

                    const blob = await response.blob();

                    const url = window.URL.createObjectURL(blob);

                    const link = document.createElement("a");

                    link.href = url;

                    link.download = file.fileUrl;

                    document.body.appendChild(link);

                    // 🔥 DOWNLOAD
                    link.click();

                    document.body.removeChild(link);

                    window.URL.revokeObjectURL(url);

                    // 🔥 DELETE FROM VAULT
                    await axios.delete(
                      `https://vault-backend-i1fo.onrender.com/files/delete/${file.id}`,
                      authHeader,
                    );

                    // 🔥 REFRESH
                    fetchFiles();

                    Swal.fire({
                      icon: "success",
                      title: "File Restored ✅",
                      text: "Downloaded to your device",
                      background: "#0f172a",
                      color: "white",
                      confirmButtonColor: "#22c55e",
                    });
                  } catch (err) {
                    console.error(err);

                    Swal.fire({
                      icon: "error",
                      title: "Restore Failed ❌",
                      text: "Something went wrong",
                      background: "#0f172a",
                      color: "white",
                    });
                  }
                }}
                style={{
                  border: "none",
                  background: "linear-gradient(135deg,#22c55e,#16a34a)",
                  color: "white",
                  padding: "10px 16px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Restore
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Vault;
