// src/app/api/analyze/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { resumeText, jobDescription } = await request.json();

    if (!resumeText || !jobDescription) {
      return NextResponse.json(
        { error: "缺少简历文本或职位描述" },
        { status: 400 }
      );
    }

    // 构造提示词
    const prompt = `你是一位资深的简历优化专家。请根据以下简历内容和职位描述，生成一份详细的匹配度分析报告。

必须严格按照以下 JSON 格式返回，不要包含任何其他文字或 Markdown 标记：
{
  "overallScore": 78,
  "scores": [
    { "name": "关键词匹配", "value": 80 },
    { "name": "工作经验", "value": 70 },
    { "name": "教育背景", "value": 85 },
    { "name": "技能匹配", "value": 75 },
    { "name": "格式规范", "value": 90 }
  ],
  "matchedKeywords": ["关键词1", "关键词2"],
  "missingKeywords": ["缺失词1", "缺失词2"],
  "suggestions": ["具体优化建议1", "建议2", "建议3"],
  "summary": "一句话总结（50字以内）"
}

--- 简历内容 ---
${resumeText}

--- 职位描述 ---
${jobDescription}
`;

    // 调用 DeepSeek API（兼容 OpenAI 格式）
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "你是一个严谨的简历分析助手，始终严格按照 JSON 格式回复。" },
          { role: "user", content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("DeepSeek API 错误：", errorText);
      throw new Error(`API 请求失败：${response.status}`);
    }

    const completion = await response.json();
    const rawText = completion.choices[0].message.content;

    // 清理可能存在的 Markdown 代码块标记
    const cleanJson = rawText.replace(/```json|```/g, "").trim();
    const analysis = JSON.parse(cleanJson);

    return NextResponse.json(analysis);
  } catch (error: any) {
    console.error("分析失败：", error);
    return NextResponse.json(
      { error: "AI 分析服务暂时不可用，请稍后重试" },
      { status: 500 }
    );
  }
}