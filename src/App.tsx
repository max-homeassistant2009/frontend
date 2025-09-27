import { useState } from "react";
import { Box, Button, Card, Typography } from "@mui/material";
import { IoIosAddCircleOutline } from "react-icons/io";
import { testbackend } from "./data";
import { CustomTable } from "./components/CustomTable";
import OCRScanner from "./components/OCRScanner";
import { formatDate } from "./data";

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "32px 16px",
        fontFamily: "sans-serif",
      }}
    >
      <Box sx={{ textAlign: "center", margin: "64px 0" }}>
        <Typography
          variant="h2"
          component="h1"
          style={{
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: "24px",
          }}
        >
          Einkaufs-Analyse
        </Typography>
      </Box>
      <div style={{ textAlign: "right", marginBottom: 32 }}>
        <Button
          size="large"
          variant="outlined"
          onClick={() => setModalIsOpen(true)}
          style={{ display: "inline-flex", alignItems: "center" }}
        >
          <IoIosAddCircleOutline />
          <span style={{ marginLeft: 9 }}>Neuen Kassenbon scannen</span>
        </Button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          alignItems: "start",
        }}
      >
        <div>
          <Typography variant="h5" component="h2" style={{ marginBottom: 16 }}>
            Letzte Kassenbons:
          </Typography>
          {testbackend.map((receipt) => (
            <Card
              variant="outlined"
              style={{ margin: "16px 0", padding: 16 }}
              key={receipt.id}
            >
              <Box
                style={{
                  marginBottom: 16,
                  fontWeight: "bold",
                  fontSize: "1.2em",
                }}
              >
                Einkauf am {formatDate(receipt.date)} - {receipt.amount}€
              </Box>
              <CustomTable data={testbackend} />
            </Card>
          ))}
        </div>
        <div>
          <Typography variant="h5" component="h2" style={{ marginBottom: 16 }}>
            Analyse:
          </Typography>
          <Card variant="outlined" sx={{ p: 2 }}>
            analyse
          </Card>
          {/* Analyse-Komponente hier */}
        </div>
      </div>
      <OCRScanner
        handleClose={() => setModalIsOpen(false)}
        isOpen={modalIsOpen}
      />
    </div>
  );
}
export default App;
