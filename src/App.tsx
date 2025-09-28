import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Typography,
  Collapse,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IoIosAddCircleOutline } from "react-icons/io";
import { testbackend, formatDate } from "./data";
import { CustomTable } from "./components/CustomTable";
import OCRScanner from "./components/OCRScanner";
import Analytics from "./components/Analytics";

const data01 = [
  { name: "Obst", value: 30 },
  { name: "Gemüse", value: 10 },
  { name: "Backwaren", value: 15 },
  { name: "Wurst und Fleisch", value: 35 },
  { name: "Milchprodukte", value: 5 },
  { name: "Sonstiges", value: 5 },
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
  const [openIdx, setOpenIdx] = useState(-1);

  useEffect(() => {
    fetch("http://172.16.0.194:8080/api/groceries/receipts")
      .then((response) => response.json())
      .then((data) => setReceipts(data))
      .catch((error) => console.error("Error fetching receipts:", error));
  }, []);

  return (
    <div
      style={{
        maxWidth: 1200,
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
          gridTemplateColumns: "5fr 5fr",
          gap: 24,
          alignItems: "start",
        }}
      >
        <div>
          <Typography variant="h5" component="h2" style={{ marginBottom: 16 }}>
            Letzte Kassenbons:
          </Typography>
          {receipts.map((receipt, idx) => (
            <Card key={receipt.id} variant="outlined" sx={{ mb: 2, p: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
              >
                <Typography
                  sx={{ m: 2, fontWeight: "bold", fontSize: "1.6em" }}
                >
                  Einkauf am {new Date(receipt.date).toLocaleString()} für{" "}
                  {receipt.amount.toFixed(2)}€
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                  aria-label="expand"
                >
                  <ExpandMoreIcon
                    sx={{
                      transform:
                        openIdx === idx ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "0.2s",
                    }}
                  />
                </IconButton>
              </Box>
              <Collapse in={openIdx === idx} timeout="auto" unmountOnExit>
                <CustomTable data={[receipt]} />
              </Collapse>
            </Card>
          ))}
        </div>
        <div>
          <Typography variant="h5" component="h2" style={{ marginBottom: 16 }}>
            Analyse:
          </Typography>
          <Card
            variant="outlined"
            style={{ margin: "16px 0", padding: 32, minHeight: 400 }}
          >
            <Box
              style={{
                marginBottom: 16,
                fontWeight: "bold",
                fontSize: "1.6em",
              }}
            >
              Anteile verschiedener Kategorien am Gesamteinkauf (in %):
            </Box>
            <Analytics data01={data01} />
          </Card>
          <Card variant="outlined" sx={{ p: 2 }}>
            <Box
              style={{
                marginBottom: 16,
                fontWeight: "bold",
                fontSize: "1.6em",
              }}
            ></Box>
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
