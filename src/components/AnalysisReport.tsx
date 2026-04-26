"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Lightbulb } from "lucide-react";

interface AnalysisData {
  overallScore: number;
  scores: { name: string; value: number }[];
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
  summary: string;
}

interface AnalysisReportProps {
  data: AnalysisData | null;
}

export function AnalysisReport({ data }: AnalysisReportProps) {
  if (!data) return null;

  const report = data;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 总体评分 */}
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="text-2xl">分析报告</CardTitle>
          <CardDescription>基于你的简历和目标岗位的匹配度分析</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-2">
          <div className="text-6xl font-bold text-primary">{report.overallScore}</div>
          <p className="text-muted-foreground">综合匹配度</p>
        </CardContent>
      </Card>

      {/* 详细评分 */}
      <div className="grid gap-4 md:grid-cols-2">
        {report.scores.map((item) => (
          <Card key={item.name}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Progress value={item.value} className="flex-1" />
                <span className="text-sm font-semibold w-10 text-right">{item.value}%</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 关键词匹配 */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              已匹配关键词
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {report.matchedKeywords.map((kw) => (
              <Badge key={kw} variant="default">
                {kw}
              </Badge>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              缺失关键词
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {report.missingKeywords.map((kw) => (
              <Badge key={kw} variant="outline" className="text-orange-500 border-orange-300">
                {kw}
              </Badge>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* 优化建议 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            优化建议
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-sm">
            {report.suggestions.map((suggestion, idx) => (
              <li key={idx}>{suggestion}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* 总结 */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <p className="text-sm leading-relaxed">{report.summary}</p>
        </CardContent>
      </Card>
    </div>
  );
}