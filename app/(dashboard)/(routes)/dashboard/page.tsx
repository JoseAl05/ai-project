'use client'

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ArrowRight, Code, ImageIcon, Languages, MessageSquare, Music, Text, VideoIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

const tools = [
  {
    label: 'Conversation',
    icon: MessageSquare,
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
    href: '/conversation',
  },
  {
    label: 'Music Generation',
    icon: Music,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    href: '/music',
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    color: 'text-pink-700',
    bgColor: 'bg-pink-700/10',
    href: '/image',
  },
  {
    label: 'Video Generation',
    icon: VideoIcon,
    color: 'text-orange-700',
    bgColor: 'bg-orange-700/10',
    href: '/video',
  },
  {
    label: 'Code Generation',
    icon: Code,
    color: 'text-green-700',
    bgColor: 'bg-green-700/10',
    href: '/code',
  },
  {
    label: 'Text Converter',
    icon: Text,
    color: 'text-white',
    bgColor:'bg-black/80',
    href: '/text-converter',
  },
  {
    label: 'Translator',
    icon: Languages,
    color: 'text-cyan-500',
    bgColor:'bg-cyan-500/10',
    href: '/translator',
  },
]

export default function DashboardPage() {

  const router = useRouter();

  return (
    <div>
      <div className='mb-8 space-y-4'>
        <h2 className='text-2xl font-bold text-center md:text-4xl'>
          Explore the power of AI
        </h2>
        <p className='text-muted-foreground font-light text-sm text-center md:text-lg'>
          Chat with the smartes AI
        </p>
      </div>
      <div className='px-4 space-y-4 md:px-20 lg:px-32'>
        {tools.map(tool => (
          <Card
            key={tool.href}
            className='flex items-center justify-between p-4 border-black/5 cursor-pointer transition hover:shadow-md'
            onClick={() => router.push(tool.href)}
          >
            <div className='flex items-center gap-x-4'>
              <div className={cn('p-2 w-fit rounded-md', tool.bgColor)}>
                <tool.icon className={cn('w-8 h-8', tool.color)} />
              </div>
              <p className='font-smibold'>
                {tool.label}
              </p>
            </div>
            <ArrowRight className='w-5 h-5' />
          </Card>
        ))}
      </div>
    </div>

  )
}
