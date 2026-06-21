import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Award,
  Briefcase,
  GraduationCap,
  Sparkles,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

const projects = [
  {
    title: '2026 全國大專國際經貿專題競賽',
    tag: '全國第二名',
    desc: '結合供應鏈研究與實地考察，剖析半導體產業鏈重組趨勢。',
    link: '#',
  },
  {
    title: '《蓋亞造界：GaiaCraft》',
    tag: 'AI 跨域雙提案 · 競賽佳作',
    desc: '首創虛實整合 RPG 永續生態圈，透過日常淨灘與回收行動解鎖遊戲任務。',
    link: 'https://gd.games/games/4e33e1ea-67c3-49f9-a7be-c8b9da6a7c8a',
  },
  {
    title: '互動敘事遊戲：台灣地方創生應用',
    tag: '大專生研究計畫',
    desc: '以像素藝術為媒介，結合在地文史，探索遊戲化敘事在社區實踐的潛力。',
    link: '#',
  },
  {
    title: '政治大學游泳隊管理系統',
    tag: '數位轉型',
    desc: '整合 Google Apps Script 與 Sheets，打造自動化簽到、請假與訓練日誌平台。',
    link: '#',
  },
]

const experiences = [
  {
    title: '創辦人暨社長',
    org: '政大金融科技創新實驗室',
    time: '2024 — Present',
  },
  {
    title: '社群編輯 (OIC)',
    org: '政大國際合作處',
    time: '2024 — Present',
  },
  {
    title: '商學院何麗梅校友獎學金得主',
    org: '國立政治大學 · 全校僅四位',
    time: '2025',
  },
  {
    title: '全大運游泳項目代表選手',
    org: '國立政治大學',
    time: '2024 — 2026',
  },
]

const skills = {
  開發技術: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind', 'Java', 'SQL'],
  數據分析: ['R', 'SPSS'],
  軟實力: ['專案管理', '社群行銷', '影音企劃'],
  語言能力: ['中文 (母語)', '英文 (ETP)', '日文 (輔系)'],
}

function SectionHeader({ icon: Icon, title, kicker }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="size-4" />
        <span className="text-xs font-medium tracking-widest uppercase">
          {kicker}
        </span>
      </div>
      <h2 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
        {title}
      </h2>
      <Separator className="mt-2" />
    </div>
  )
}

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20">
      <nav className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Avatar size="sm">
              <AvatarFallback>ZF</AvatarFallback>
            </Avatar>
            <span className="font-heading text-base font-semibold tracking-tight">
              Ze-Xiang Fang
            </span>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <a href="mailto:113306052@g.nccu.edu.tw">
              <Mail data-icon="inline-start" />
              Contact
            </a>
          </Button>
        </div>
      </nav>

      <main className="mx-auto flex max-w-4xl flex-col gap-32 px-6 py-20 md:py-28">
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col gap-8"
        >
          <motion.div variants={fadeIn}>
            <Badge variant="secondary" className="gap-1.5">
              <Sparkles data-icon="inline-start" />
              Open to internships · Summer 2026
            </Badge>
          </motion.div>

          <motion.div variants={fadeIn} className="flex flex-col gap-5">
            <h1 className="font-heading text-4xl font-bold tracking-tighter md:text-6xl">
              跨域探索
              <br className="hidden md:block" />
              <span className="text-muted-foreground">
                數據思維與創新實踐
              </span>
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              我是方澤享，目前就讀於政大資管系二年級。致力於結合程式數據、金融科技與商業邏輯，
              打造解決真實問題的數位方案。
            </p>
          </motion.div>

          <motion.div variants={fadeIn} className="flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <a href="mailto:113306052@g.nccu.edu.tw">
                <Mail data-icon="inline-start" />
                聯絡我
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#projects">
                查看作品
                <ArrowUpRight data-icon="inline-end" />
              </a>
            </Button>
            <Badge
              variant="outline"
              className="h-9 gap-1.5 px-3 text-sm font-normal"
            >
              <MapPin data-icon="inline-start" />
              NCCU, Taipei
            </Badge>
          </motion.div>
        </motion.section>

        <motion.section
          id="projects"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="flex flex-col gap-10 scroll-mt-20"
        >
          <motion.div variants={fadeIn}>
            <SectionHeader
              icon={Briefcase}
              kicker="Projects"
              title="精選專案與研究"
            />
          </motion.div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {projects.map((project) => (
              <motion.a
                key={project.title}
                href={project.link}
                target={project.link.startsWith('http') ? '_blank' : undefined}
                rel={
                  project.link.startsWith('http')
                    ? 'noreferrer'
                    : undefined
                }
                variants={fadeIn}
                whileHover={{ y: -4 }}
                className="group block focus-visible:outline-none"
              >
                <Card className="h-full transition-all group-hover:ring-2 group-hover:ring-primary/30">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <Badge variant="secondary">{project.tag}</Badge>
                      <ArrowUpRight className="size-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                    </div>
                    <CardTitle className="text-lg leading-snug">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="leading-relaxed">
                      {project.desc}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.a>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="flex flex-col gap-10"
        >
          <motion.div variants={fadeIn}>
            <SectionHeader
              icon={Award}
              kicker="Experience"
              title="經歷與榮譽"
            />
          </motion.div>

          <div className="flex flex-col gap-3">
            {experiences.map((exp) => (
              <motion.div key={exp.title} variants={fadeIn}>
                <Card size="sm">
                  <CardContent className="flex flex-col gap-2 py-2 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-heading font-medium">
                        {exp.title}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {exp.org}
                      </span>
                    </div>
                    <Badge variant="outline" className="font-mono">
                      {exp.time}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="flex flex-col gap-10"
        >
          <motion.div variants={fadeIn}>
            <SectionHeader
              icon={GraduationCap}
              kicker="Skills"
              title="技術與語言"
            />
          </motion.div>

          <motion.div
            variants={fadeIn}
            className="grid grid-cols-1 gap-5 md:grid-cols-2"
          >
            {Object.entries(skills).map(([category, items]) => (
              <Card key={category} size="sm">
                <CardHeader>
                  <CardTitle className="text-sm">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((item) => (
                      <Badge key={item} variant="outline">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </motion.section>

        <footer className="flex flex-col items-center gap-4 border-t border-border pt-10 pb-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Ze-Xiang Fang · Built with shadcn/ui</p>
          <Button variant="link" size="sm" asChild>
            <a href="mailto:113306052@g.nccu.edu.tw">
              113306052@g.nccu.edu.tw
              <ArrowUpRight data-icon="inline-end" />
            </a>
          </Button>
        </footer>
      </main>
    </div>
  )
}
