import { type ChangeEvent, useState } from "react";
import scanDocument from "./scanDocument";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { IoCloseSharp } from "react-icons/io5";

interface Props {
  handleClose: () => void;
  isOpen: boolean;
}

/**
 * Component: Runs OCR on an uploaded image.
 */
const OCRScanner = ({ handleClose, isOpen }: Props) => {
  const [image, setImage] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<string>();
  const [response, setResponse] = useState<string>();

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const processImage = async () => {
    if (!image) return;

    const response = await fetch(image);
    const blob = await response.blob();
    const file = new File([blob], "uploaded-image.png", { type: blob.type });

    // Run OCR pipeline
    const result = await scanDocument(file);
    setScanResult(result);
  };

  const sendToBackend = async () => {
    if (!scanResult) return;

    const res = await fetch("http://172.16.0.194:8080/api/groceries/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(scanResult),
    });

    const data = await res.text();
    setResponse(data);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "95%", sm: 450 }, // Increased width for mobile
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 3,
    px: { xs: 3, sm: 5 }, // Increased padding for mobile
    pb: 4,
  };

  return (
    <Dialog fullWidth maxWidth="md" open={isOpen} onClose={handleClose}>
      <DialogTitle sx={{ fontSize: 22 }}>
        Zur Einkaufsliste hinzufügen
      </DialogTitle>
      <IconButton
        onClick={handleClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <IoCloseSharp />
      </IconButton>
      <DialogContent>
        <Typography>Füge dein Bild hier ein</Typography>
        <Button
          variant="outlined"
          component="label"
          color="primary"
          sx={{ textTransform: "none", mt: 3 }}
        >
          Bild hochladen
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImageUpload}
            hidden
          />
        </Button>

        {image && (
          <div style={{ marginTop: "1rem" }}>
            <img
              src={image}
              alt="Uploaded"
              style={{ maxWidth: "100%", border: "1px solid #ccc" }}
            />
          </div>
        )}

        {scanResult && (
          <div style={{ marginTop: "1rem" }}>
            <h3>OCR Result:</h3>
            <Typography>{JSON.stringify(scanResult, null, 2)}</Typography>
          </div>
        )}

        {response && (
          <div style={{ marginTop: "1rem" }}>
            <h3>Backend Response:</h3>
            <Typography>{response}</Typography>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={processImage}>Process Image</Button>
        <Button onClick={sendToBackend}>Send Image</Button>
      </DialogActions>
    </Dialog>
  );
};

export default OCRScanner;
