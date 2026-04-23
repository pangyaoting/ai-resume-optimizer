import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { FileUp, ClipboardPaste, Sparkles } from "lucide-react"

export default function Home() {
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

      {/* 主内容区 */}
      <main className="container mx-auto max-w-6xl px-4 py-12">
        {/* 欢迎语 */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            让你的简历脱颖而出
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            上传你的简历，AI 将根据目标岗位提供专业的分析与优化建议，助你拿下理想 offer。
          </p>
        </div>

        {/* 核心操作区 */}
        <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto mb-12">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-dashed">
            <CardContent className="pt-6 text-center">
              <FileUp className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold text-lg mb-2">上传简历文件</h3>
              <p className="text-sm text-muted-foreground">支持 PDF、Word、图片格式</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="pt-6 text-center">
              <ClipboardPaste className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold text-lg mb-2">粘贴职位描述</h3>
              <p className="text-sm text-muted-foreground">让 AI 分析岗位匹配度</p>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8" />

        {/* 功能预览 */}
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
      </main>
    </div>
  )
}