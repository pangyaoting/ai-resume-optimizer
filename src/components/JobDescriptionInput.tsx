"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ClipboardPaste } from "lucide-react";

interface JobDescriptionInputProps {
  onJdSubmit: (jd: string) => void;
}

export function JobDescriptionInput({ onJdSubmit }: JobDescriptionInputProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      onJdSubmit(text);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // 按 Ctrl+Enter 提交
    if (e.ctrlKey && e.key === "Enter") {
      handleSubmit();
    }
  };

  if (isEditing) {
    return (
      <Card className="border-2 border-primary/50">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-lg mb-2">📋 请粘贴职位描述</h3>
          <textarea
            className="w-full h-48 p-4 border rounded-lg resize-none text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="将目标岗位的 JD 粘贴到这里...&#10;例如：要求掌握 React、TypeScript，3 年以上经验..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <div className="flex justify-end gap-2 mt-3">
            <button
              className="px-4 py-2 text-sm rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80"
              onClick={() => {
                setIsEditing(false);
                setText("");
              }}
            >
              取消
            </button>
            <button
              className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleSubmit}
              disabled={!text.trim()}
            >
              开始分析
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">提示：按 Ctrl+Enter 快速提交</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => setIsEditing(true)}
    >
      <CardContent className="pt-6 text-center">
        <ClipboardPaste className="h-12 w-12 mx-auto mb-4 text-primary" />
        <h3 className="font-semibold text-lg mb-2">粘贴职位描述</h3>
        <p className="text-sm text-muted-foreground">
          让 AI 分析岗位匹配度
        </p>
        {text && (
          <p className="text-xs text-muted-foreground mt-2">
            已粘贴 JD（{text.length} 字符）
          </p>
        )}
      </CardContent>
    </Card>
  );
}