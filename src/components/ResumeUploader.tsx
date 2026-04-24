"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { FileUp, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

// 配置 pdf.js 的 worker，这里使用 CDN 上的 worker 文件
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface ResumeUploaderProps {
  onTextExtracted: (text: string) => void;
}

export function ResumeUploader({ onTextExtracted }: ResumeUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 从 PDF 文件中提取文本
  const extractTextFromPDF = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items
        .map((item: any) => item.str)
        .join(" ");
      fullText += pageText + "\n";
    }
    return fullText.trim();
  };

  const handleFile = async (file: File) => {
    // 目前仅处理 PDF
    if (file.type !== "application/pdf") {
      setError("目前仅支持 PDF 文件");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const extractedText = await extractTextFromPDF(file);
      if (!extractedText) {
        setError("未能提取到文本。请确认 PDF 包含文字而非扫描图片。");
        return;
      }
      onTextExtracted(extractedText);
    } catch (err) {
      console.error("PDF 解析错误：", err);
      setError("文件解析失败，请检查是否为有效的 PDF 文件");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <Card
      className={`cursor-pointer transition-all ${
        isDragging ? "border-primary border-2 border-solid" : "border-2 border-dashed"
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={handleClick}
    >
      <CardContent className="flex flex-col items-center justify-center py-12">
        <input
        type="file"
        ref={fileInputRef}
        onChange={handleInputChange}
        accept=".pdf"
        className="hidden"
        aria-label="上传简历文件"
        />
        {isLoading ? (
          <>
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <h3 className="font-semibold text-lg mb-2">正在解析简历...</h3>
            <p className="text-sm text-muted-foreground">请稍候</p>
          </>
        ) : (
          <>
            <FileUp className="h-12 w-12 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">
              {isDragging ? "松开以上传文件" : "上传简历文件"}
            </h3>
            <p className="text-sm text-muted-foreground">
              点击或拖拽 PDF 文件到此处
            </p>
            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          </>
        )}
      </CardContent>
    </Card>
  );
}