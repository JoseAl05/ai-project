'use client'

import { cn } from '@/lib/utils';
import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, MessageSquare, ImageIcon, VideoIcon, Music, Code, Settings, Text, Languages } from 'lucide-react';
import FreeCounter from '../counter/FreeCounter';

const monsterrat = Montserrat({ weight: '600', subsets: ['latin'] });

const routes = [
    {
        label: 'Dashboard',
        icon: LayoutDashboard,
        href: '/dashboard',
        color: 'text-sky-500',
    },
    {
        label: 'Conversation',
        icon: MessageSquare,
        href: '/conversation',
        color: 'text-violet-500',
    },
    {
        label: 'Image Generation',
        icon: ImageIcon,
        href: '/image',
        color: 'text-pink-500',
    },
    {
        label: 'Video Generation',
        icon: VideoIcon,
        href: '/video',
        color: 'text-orange-700',
    },
    {
        label: 'Music Generation',
        icon: Music,
        href: '/music',
        color: 'text-emerald-500',
    },
    {
        label: 'Code Generation',
        icon: Code,
        href: '/code',
        color: 'text-green-700',
    },
    {
        label: 'Settings',
        icon: Settings,
        href: '/settings',
    }
]

const freeRoutes = [
    {
        label: 'Text Converter',
        icon: Text,
        href: '/text-converter',
        color: 'text-white',
    },
    {
        label: 'Translator',
        icon: Languages,
        href: '/translator',
        color: 'text-cyan-500',
    },
]

interface SidebarProps {
    apiLimitCount: number;
    isPro: boolean;
}

const Sidebar = ({ apiLimitCount = 0, isPro = false }: SidebarProps) => {

    const pathname = usePathname();

    return (
        <div className='flex flex-col h-full p-4 space-y-4 bg-[#111827] text-white'>
            <div className='px-3 py-2 flex-1'>
                <Link href='/dashboard' className='flex items-center pl-3 mb-14'>
                    <div className='relative w-16 h-16 mr-2 mt-3'>
                        <Image
                            fill
                            alt='Logo'
                            src='/logo.png'
                        />
                    </div>
                    <h1 className={cn('text-2xl font-bold', monsterrat.className)}>Aetherial</h1>
                </Link>
                <div className='space-y-1'>
                    {routes.map(route => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(`
                                flex
                                justify-start
                                p-3
                                w-full
                                text-sm
                                font-medium
                                rounded-lg
                                cursor-pointer
                                group
                                transition
                                hover:text-white
                                hover:bg-white/10
                            `,
                                pathname === route.href ? 'text-white bg-white/10' : 'text-zinc-400'
                            )}
                        >
                            <div className='flex items-center flex-1'>
                                <route.icon className={cn('h-5 w-5 mr-3', route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                    <div className='flex items-center justify-center gap-5'>
                        <hr className='h-2 w-full text-zinc-400' />
                        <h1 className='text-lg whitespace-nowrap text-center mb-3'>Free Tools</h1>
                        <hr className='h-2 w-full text-zinc-400' />
                    </div>
                    {
                        freeRoutes.map(route => (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn(`
                                flex
                                justify-start
                                p-3
                                w-full
                                text-sm
                                font-medium
                                rounded-lg
                                cursor-pointer
                                group
                                transition
                                hover:text-white
                                hover:bg-white/10
                            `,
                                    pathname === route.href ? 'text-white bg-white/10' : 'text-zinc-400'
                                )}
                            >
                                <div className='flex items-center flex-1'>
                                    <route.icon className={cn('h-5 w-5 mr-3', route.color)} />
                                    {route.label}
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
            <FreeCounter
                apiLimitCount={apiLimitCount}
                isPro={isPro}
            />
        </div>
    );
}

export default Sidebar;