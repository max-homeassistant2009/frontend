import { useEffect, useState } from "react";
import { Box, Button, Card, Typography } from "@mui/material";
import { IoIosAddCircleOutline } from "react-icons/io";
import { testbackend, formatDate } from "./data";
import { CustomTable } from "./components/CustomTable";
import OCRScanner from "./components/OCRScanner";
import Analytics from "./components/Analytics";

const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 278 },
  { name: "Group F", value: 189 },
];

const data02 = [
  { name: "Group A", value: 2400 },
  { name: "Group B", value: 4567 },
  { name: "Group C", value: 1398 },
  { name: "Group D", value: 9800 },
  { name: "Group E", value: 3908 },
  { name: "Group F", value: 4800 },
];

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [receipts, setReceipts] = useState(testbackend);

  useEffect(() => {
    fetch("http://172.16.0.194:8080/api/groceries/receipts")
      .then((response) => response.json())
      .then((data) => setReceipts(data))
      .catch((error) => console.error("Error fetching receipts:", error));
  }, []);

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
          {receipts.map((receipt) => (
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
                Einkauf am {new Date(receipt.date).toLocaleString()} für{" "}
                {receipt.amount.toFixed(2)}€
              </Box>
              <CustomTable data={[receipt]} />
            </Card>
          ))}
        </div>
        <div>
          <Typography variant="h5" component="h2" style={{ marginBottom: 16 }}>
            Analyse:
          </Typography>
          <Card variant="outlined" style={{ margin: "16px 0", padding: 16 }}>
            <Analytics data01={data01} />
          </Card>
          <Card variant="outlined" sx={{ p: 2 }}>
            <Analytics data01={data02} />
          </Card>
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
