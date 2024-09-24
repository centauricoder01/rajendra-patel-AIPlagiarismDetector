import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { fileBase64, filename } = await req.json();

    if (!fileBase64 || !filename) {
      return NextResponse.json(
        { success: false, message: "File or filename not provided correctly." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(fileBase64, "base64");

    const apiFormData = new FormData();
    apiFormData.append("file", new Blob([buffer]), filename);

    const response = await fetch("https://api.openai.com/v1/files", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: apiFormData,
    });

    console.log(
      response,
      "This is Reponse, that we have got from the OPENAI response.."
    );

    if (!response.ok) {
      throw new Error(`Failed to send file: ${response.statusText}`);
    }

    const uploadResult = await response.json();
    const fileId = uploadResult.id; // Capture file_id

    // Proceed to send instructions after the file upload
    return handleFileInstructions(fileId);
  } catch (error) {
    console.log("Error occurred", error);
    return NextResponse.json({ message: "Failed to send file", status: 500 });
  }
};

async function handleFileInstructions(fileId: string) {
  try {
    const instructionResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
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
              content: `Check for plagiarism in the file with ID: ${fileId}.`,
            },
          ],
        }),
      }
    );

    if (!instructionResponse.ok) {
      throw new Error(
        `Failed to send instructions: ${instructionResponse.statusText}`
      );
    }

    const result = await instructionResponse.json();
    console.log(result); // Log or handle the API response

    return NextResponse.json({
      message: "File processed successfully",
      result,
    });
  } catch (error) {
    console.log("Error occurred while sending instructions", error);
    return NextResponse.json({
      message: "Failed to process file",
      status: 500,
    });
  }
}
