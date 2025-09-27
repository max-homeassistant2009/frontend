import { type ChangeEvent, useState } from "react";
import scanDocument from "./scanDocument.ts";

/**
 * Component: Runs OCR on an uploaded image.
 */
const OCRScanner = () => {
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

  return (
    <div className="p-4 flex flex-col items-center justify-center m-10">
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
    </div>
  );
};

export default OCRScanner;
