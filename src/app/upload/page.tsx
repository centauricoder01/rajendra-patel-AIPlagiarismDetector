"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Upload, FileText, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface IResult {
  success: boolean;
  message: string;
  result: object;
}

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<IResult>();
  const [isDragOver, setIsDragOver] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (selectedFile: File | null) => {
    if (
      selectedFile &&
      (selectedFile.type === "application/pdf" ||
        selectedFile.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      setFile(selectedFile);
      setIsDialogOpen(false);
      console.log("File selected:", selectedFile.name);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please upload a PDF or Word document.",
      });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFileChange(droppedFile);
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const analyzeDocument = async () => {
    if (!file) return;
    setIsAnalyzing(true);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const fileBase64 = reader.result?.toString().split(",")[1]; 

      const response = await fetch("/api/extract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileBase64,
          filename: file.name,
        }),
      });

      const result = await response.json();
      setResult(result);
      toast({
        variant: "destructive",
        title: "Error",
        description: `${result.message}`,
      });

      console.log("Submission Result:", result);
      setIsAnalyzing(false);
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <Navbar />
      <div className="mt-[5rem] bg-gray-100 flex flex-col items-center justify-center p-4 overflow-hidden">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Upload Your Document
        </h1>
        <div className="relative w-64 h-64">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <div
                className={`w-full h-full rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer transition-all duration-300 ${
                  isDragOver ? "bg-blue-100" : "hover:bg-gray-50"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {file ? (
                  <div className="flex flex-col items-center">
                    <FileText className="w-16 h-16 text-blue-500 mb-2" />
                    <span className="text-sm text-gray-600 text-center px-4">
                      {file.name}
                    </span>
                  </div>
                ) : (
                  <Plus className="w-16 h-16 text-blue-500" />
                )}
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Document</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col items-center justify-center space-y-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx"
                  onChange={(e) =>
                    handleFileChange(e.target.files ? e.target.files[0] : null)
                  }
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="w-full py-4 px-6 bg-blue-500 text-white rounded-lg text-center cursor-pointer hover:bg-blue-600 transition-colors flex items-center justify-center"
                >
                  <Upload className="mr-2" /> Choose File
                </label>
                <p className="text-sm text-gray-500">
                  Supported formats: PDF, DOCX
                </p>
              </div>
            </DialogContent>
          </Dialog>
          {isAnalyzing && (
            <>
              <div className="absolute inset-0 rounded-full border-2 border-blue-300 animate-ping"></div>
              <div
                className="absolute -inset-4 rounded-full border-2 border-blue-200 animate-ping"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="absolute -inset-8 rounded-full border-2 border-blue-100 animate-ping"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </>
          )}
        </div>
        {file && (
          <div className="mt-8 bg-white p-4 rounded-lg shadow-md flex items-center">
            <FileText className="w-6 h-6 text-blue-500 mr-2" />
            <span className="text-gray-700">{file.name}</span>
            <Button
              variant="ghost"
              size="icon"
              className="ml-2"
              onClick={removeFile}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}
        {file && (
          <Button
            className="mt-4"
            onClick={analyzeDocument}
            disabled={isAnalyzing || result?.success}
          >
            {isAnalyzing ? "Analyzing..." : "Analyze Document"}
          </Button>
        )}
      </div>
      <div className="m-auto bg-gray-100 pt-6">
        <p className="text-center font-semibold text-2xl underline">Report</p>
        {result?.success ? null : (
          <p className="mt-6 text-center pb-10">No Report to show...</p>
        )}
      </div>
      {result?.success ? (
        <>
          <p className="m-auto p-10 font-extrabold bg-gray-100">
            Here is your report after a successful observation...
          </p>
        </>
      ) : null}
      <Footer />
    </>
  );
}
