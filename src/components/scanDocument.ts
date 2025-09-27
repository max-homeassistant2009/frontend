import Tesseract from "tesseract.js";

const scanDocument = async (file: File) => {
  let text = null;

  // Step 1: Try to use built-in OCR
  if (file.type === "text/plain") {
    text = await file.text(); // iOS Live Text may return actual text
  }

  // Step 2: Fallback to Tesseract.js if only an image was returned
  if (!text) {
    const { data } = await Tesseract.recognize(file, "deu");
    text = data.text;
  }

  // Build final JSON
  return { text: text };
};

export default scanDocument;
