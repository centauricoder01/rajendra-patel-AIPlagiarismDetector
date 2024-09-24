import { NextResponse } from "next/server";
import mammoth from "mammoth";
import PDFParser from "pdf2json";

export async function POST(req: Request) {
  try {
    const { fileBase64, filename } = await req.json();

    // Validate input
    if (!fileBase64 || !filename) {
      return NextResponse.json(
        { success: false, message: "File or filename not provided correctly." },
        { status: 400 }
      );
    }

    // Extract text based on file type
    const extractedText = await extractTextFromFile(fileBase64, filename);

    // Return error if text extraction failed
    if (!extractedText) {
      return NextResponse.json(
        { success: false, message: "Failed to extract text from the file." },
        { status: 500 }
      );
    }

    // Perform plagiarism check
    const result = await checkForPlagiarism(extractedText);
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: "Plagiarism check failed.", result },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Plagiarism check successful.", result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing the request:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Extract text based on file type
async function extractTextFromFile(
  fileBase64: string,
  filename: string
): Promise<string> {
  if (filename.endsWith(".pdf")) {
    return await processPDF(fileBase64);
  } else if (filename.endsWith(".docx")) {
    return await processDocx(fileBase64);
  } else {
    throw new Error("Unsupported file type.");
  }
}

// Process DOCX file
async function processDocx(base64Data: string): Promise<string> {
  try {
    const buffer = Buffer.from(base64Data, "base64");
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } catch (error) {
    console.error("Error processing DOCX:", error);
    throw new Error("Error processing DOCX");
  }
}

// Process PDF file
async function processPDF(base64Data: string): Promise<string> {
  let parsedText = "";
  const fileBuffer = Buffer.from(base64Data, "base64");
  const pdfParser = new PDFParser(null, true);

  return new Promise((resolve, reject) => {
    pdfParser.on("pdfParser_dataReady", () => {
      parsedText = pdfParser.getRawTextContent();
      resolve(parsedText);
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pdfParser.on("pdfParser_dataError", (errData: any) => {
      console.error("Error parsing PDF:", errData.parserError);
      reject(new Error("Failed to parse PDF"));
    });

    new Promise((resolve, reject) => {
      pdfParser.parseBuffer(fileBuffer);
      pdfParser.on("pdfParser_dataReady", resolve);
      pdfParser.on("pdfParser_dataError", reject);
    });
  });
}

// Perform plagiarism check using OpenAI API
async function checkForPlagiarism(text: string) {
  try {
    const openaiResponse = await fetch(`${process.env.OPENAI_URL}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a plagiarism detection assistant.",
          },
          {
            role: "user",
            content: `Check for plagiarism in this text: ${text}`,
          },
        ],
      }),
    });

    const result = await openaiResponse.json();
    if (!openaiResponse.ok) {
      console.error("OpenAI API Error:", result);
      return { success: false, result };
    }

    return { success: true, result };
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    throw new Error("Plagiarism check failed");
  }
}
