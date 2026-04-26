"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sparkles, Loader2 } from "lucide-react";
import { JobDescriptionInput } from "@/components/JobDescriptionInput";
import { AnalysisReport } from "@/components/AnalysisReport";

// 动态导入 PDF 上传组件，关闭 SSR
const ResumeUploader = dynamic(
  () => import("@/components/ResumeUploader").then((mod) => mod.ResumeUploader),
  { ssr: false }
);

export default function Home() {
  const [resumeText, setResumeText] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState("");

  const fetchAnalysis = async (resume: string, jd: string) => {
    setIsAnalyzing(true);
    setAnalysisError("");
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText: resume, jobDescription: jd }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "请求失败");
      }
      const data = await res.json();
      setAnalysisData(data);
    } catch (err: any) {
      console.error("分析失败：", err);
      setAnalysisError(err.message || "分析失败，请稍后重试");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleResumeText = (text: string) => {
    setResumeText(text);
    if (jobDescription) {
      fetchAnalysis(text, jobDescription);
    }
  };

  const handleJdSubmit = (jd: string) => {
    setJobDescription(jd);
    if (resumeText) {
      fetchAnalysis(resumeText, jd);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* 顶部导航 */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-slate-950/80 sticky top-0 z-50">
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">AI简历优化助手</span>
          </div>
          <Button variant="outline">登录</Button>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl px-4 py-12">
        {/* 欢迎语 */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            让你的简历脱颖而出
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            上传你的简历，粘贴目标岗位描述，AI 将为你生成专业的匹配度分析报告。
          </p>
        </div>

        {/* 核心操作区 */}
        <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto mb-12">
          <ResumeUploader onTextExtracted={handleResumeText} />
          <JobDescriptionInput onJdSubmit={handleJdSubmit} />
        </div>

        {/* 简历文本预览 */}
        {resumeText && (
          <div className="max-w-3xl mx-auto mb-8 p-4 bg-white dark:bg-slate-900 rounded-lg border">
            <h3 className="font-semibold text-sm mb-2">📄 已提取的简历文本</h3>
            <p className="text-xs text-muted-foreground line-clamp-3">
              {resumeText.length > 150 ? resumeText.slice(0, 150) + "..." : resumeText}
            </p>
          </div>
        )}

        <Separator className="my-8" />

        {/* 加载状态 */}
        {isAnalyzing && (
          <div className="text-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="mt-2 text-muted-foreground">AI 正在深度分析你的简历...</p>
          </div>
        )}

        {/* 错误提示 */}
        {analysisError && (
          <div className="max-w-4xl mx-auto bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
            {analysisError}
          </div>
        )}

        {/* 分析报告 */}
        {analysisData && !isAnalyzing && (
          <AnalysisReport data={analysisData} />
        )}

        {/* 未操作时显示功能预览 */}
        {!resumeText && !jobDescription && (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold">AI 智能分析</h2>
              <p className="text-muted-foreground">全方位解析简历，精准定位提升方向</p>
            </div>
            <div className="grid gap-6 md:grid-cols-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">匹配度评分</CardTitle>
                  <CardDescription>简历与岗位匹配度</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-primary">85%</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">内容优化</CardTitle>
                  <CardDescription>STAR 法则改写</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">将经历转化为专业表述</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">关键词提取</CardTitle>
                  <CardDescription>JD 核心技能</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">ATS 筛选友好</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">多格式导出</CardTitle>
                  <CardDescription>PDF / Word</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">排版专业</p>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </main>
    </div>
  );
}