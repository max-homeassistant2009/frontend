import { type ChangeEvent, useState } from "react";
import scanDocument from "./scanDocument";
import { Box, Modal, Typography } from "@mui/material";

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
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style, p: 2 }}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ fontSize: { xs: "2rem", sm: "1.75rem" } }} // Increased font size for mobile and larger screens
        >
          Zur Einkaufsliste hinzufügen
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2, fontSize: { xs: "1.75rem", sm: "1.5rem" } }} // Increased font size for mobile and larger screens
        >
          Füge dein Bild hier ein
        </Typography>
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleImageUpload}
        />

        {image && (
          <div style={{ marginTop: "1rem" }}>
            <img
              src={image}
              alt="Uploaded"
              style={{ maxWidth: "100%", border: "1px solid #ccc" }}
            />
          </div>
        )}

        <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
          <button onClick={processImage}>Process Image</button>
          <button onClick={sendToBackend}>Send Image</button>
        </div>

        {response && (
          <div style={{ marginTop: "1rem" }}>
            <h3>Backend Response:</h3>
            <p>{response}</p>
          </div>
        )}

        {scanResult && (
          <div style={{ marginTop: "1rem" }}>
            <h3>OCR Result:</h3>
            <p>{JSON.stringify(scanResult, null, 2)}</p>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default OCRScanner;
