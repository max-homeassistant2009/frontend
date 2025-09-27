import { useState } from "react";
import Button from "./components/Button";
import { Box, Card, Slider } from "@mui/material";
import { testbackend, testData } from "./data";
import { CustomTable } from "./components/CustomTable";
import OCRScanner from "./components/OCRScanner";

function App() {
  return (
    <div style={{ margin: 0, padding: 0 }}>
      <OCRScanner />
      <Box>
        <h1>Einkaufs-Analyse</h1>
      </Box>
      <Button>Neuen Kassenbon scannen</Button>
      <Card variant="outlined">
        <Box>
          <h2>Letzte Kassenbons:</h2>
        </Box>
        {testbackend.map((receipt) => (
          <Card variant="outlined" sx={{ m: 2, p: 2 }} key={receipt.id}>
            <div key={receipt.id}>
              <Box sx={{ mb: 2, fontWeight: "bold", fontSize: "1.2em" }}>
                Einkauf am {receipt.date} - {receipt.amount}€
              </Box>
              <CustomTable data={testbackend} />
            </div>
          </Card>
        ))}
      </Card>
      <Card variant="outlined">
        <h2>Analyse:</h2>
      </Card>
    </div>
  );
}

export default App;
