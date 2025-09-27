import { useState } from "react";
import { Box, Button, Card, Grid, Slider, Typography } from "@mui/material";
import { testbackend, testData } from "./data";
import { CustomTable } from "./components/CustomTable";
import OCRScanner from "./components/OCRScanner";
import { formatDate } from "./data";
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
  const [modalisOpen, setModalisOpen] = useState(false);

  return (
    <Box>
      <OCRScanner
        handleClose={() => setModalisOpen(false)}
        isOpen={modalisOpen}
      />
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h2" component="h1">
          Einkaufs-Analyse
        </Typography>
      </Box>
      <Grid container spacing={2} justifyContent="center">
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Button onClick={() => setModalisOpen(true)}>
            Neuen Kassenbon scannen
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid size={{ xs: 12 }}>
          <Card variant="outlined" sx={{ p: 2 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
              Letzte Kassenbons:
            </Typography>
            {testbackend.map((receipt) => (
              <Card variant="outlined" sx={{ m: 2, p: 2 }} key={receipt.id}>
                <Box sx={{ mb: 2, fontWeight: "bold", fontSize: "1.2em" }}>
                  Einkauf am {formatDate(receipt.date)} für {receipt.amount}€
                </Box>
                <CustomTable data={testbackend} />
              </Card>
            ))}
          </Card>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Card variant="outlined" sx={{ p: 2 }}>
            <Typography variant="h5" component="h2">
              Analyse:
            </Typography>
            <Analytics data01={data01} data02={data02} />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
