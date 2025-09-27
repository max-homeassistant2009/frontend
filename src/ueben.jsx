import * as React from "react";
import Button from "@mui/material/Button";

export default function Ueben() {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <Button
        variant="contained"
        sx={{
          background: "linear-gradient(black)",
          color: "#fff",
          fontSize: "1.1rem",
          padding: "5px 15px",
          borderRadius: "5px",
          boxShadow: 3,
          overflow: "hidden",
          position: "relative",
          zIndex: 1,
          animation: "glitter-move 3s linear infinite",
          "&:hover": {
            background: "linear-gradient(gray)",
            filter: "brightness(1.2)",
          },
        }}
      >
        Neuen Kassenbon scannen
      </Button>
      <div
        style={{
          pointerEvents: "none",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 2,
        }}
      >
        {[...Array(20)].map((_, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.8)",
              boxShadow: "0 0 8px 2px #fff",
              animation: `glitter-blink ${Math.random() * 2 + 1}s infinite`,
            }}
          />
        ))}
      </div>
      <style>
        {`
          @keyframes glitter-blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
          @keyframes glitter-move {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }
        `}
      </style>
    </div>
  );
}
