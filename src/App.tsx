import { useState } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Slider,
  Typography,
} from "@mui/material";
import { IoIosAddCircleOutline } from "react-icons/io";
import { testbackend, testData } from "./data";
import { CustomTable } from "./components/CustomTable";
import OCRScanner from "./components/OCRScanner";

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: "center", my: 8 }}>
        <Typography
          variant="h2"
          component="h1"
          textAlign="center"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Einkaufs-Analyse
        </Typography>
      </Box>
      <Box sx={{ textAlign: "right", mb: 4 }}>
        <Button
          size="large"
          variant="outlined"
          onClick={() => setModalIsOpen(true)}
        >
          <IoIosAddCircleOutline />
          <span style={{ marginLeft: 9 }}>Neuen Kassenbon scannen</span>
        </Button>
      </Box>
      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        Letzte Kassenbons:
      </Typography>
      {testbackend.map((receipt) => (
        <Card variant="outlined" sx={{ my: 2, p: 2 }} key={receipt.id}>
          <Box sx={{ mb: 2, fontWeight: "bold", fontSize: "1.2em" }}>
            Einkauf am {receipt.date} - {receipt.amount}€
          </Box>
          <CustomTable data={testbackend} />
        </Card>
      ))}
      <Card variant="outlined" sx={{ p: 2 }}>
        <Typography variant="h5" component="h2">
          Analyse:
        </Typography>
      </Card>
      <OCRScanner
        handleClose={() => setModalIsOpen(false)}
        isOpen={modalIsOpen}
      />
    </Container>
  );
}

export default App;
