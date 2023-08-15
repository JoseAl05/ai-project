'use client'

import axios from 'axios';
import { useState } from 'react';
import { useModal } from '@/hooks/useModal';
import toast from 'react-hot-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { ArrowRight, Code, ImageIcon, MessageSquare, Music, VideoIcon } from 'lucide-react'
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { cn } from '@/lib/utils';
import { Check, Zap } from 'lucide-react';
import { Button } from '../ui/button';

const tools = [
    {
      label:'Conversation',
      icon:MessageSquare,
      color:'text-violet-500',
      bgColor:'bg-violet-500/10',
      href:'/conversation',
    },
    {
      label:'Music Generation',
      icon:Music,
      color:'text-emerald-500',
      bgColor:'bg-emerald-500/10',
      href:'/music',
    },
    {
      label:'Image Generation',
      icon:ImageIcon,
      color:'text-pink-700',
      bgColor:'bg-pink-700/10',
      href:'/image',
    },
    {
      label:'Video Generation',
      icon:VideoIcon,
      color:'text-orange-700',
      bgColor:'bg-orange-700/10',
      href:'/video',
    },
      {
      label:'Code Generation',
      icon:Code,
      color:'text-green-700',
      bgColor:'bg-green-700/10',
      href:'/code',
    },
  ]

const Modal = () => {

    const modal = useModal();
    const [isLoading, setIsLoading] = useState(false);

    const onSubscribe = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('/api/stripe');

            window.location.href = response.data.url;
        } catch (error: any) {
            console.log(error, 'STRIPE CLIENT ERROR');
            toast.error(`Something went wrong. Error code: ${error?.response?.status}`);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog
            open={modal.isOpen}
            onOpenChange={modal.onClose}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='flex flex-col justify-center items-center gap-y-4 pb-2'>
                        <div className='flex items-center gap-x-2 font-bold py-1'>
                            Upgrade your account
                            <Badge className='uppercase text-sm py-1' variant='premium'>
                                pro
                            </Badge>
                        </div>
                    </DialogTitle>
                    <DialogDescription className='text-center text-zinc-900 font-medium pt-2 space-y-2'>
                        {tools.map(tool => (
                            <Card
                                key={tool.label}
                                className='flex justify-between items-center p-3 border-black/5'
                            >
                                <div className='flex items-center gap-x-4'>
                                    <div className={cn('w-fit p-2 rounded-md', tool.bgColor)}>
                                        <tool.icon
                                            className={cn('w-6 h-6', tool.color)}
                                        />
                                    </div>
                                    <p className='text-sm font-semibold'>
                                        {tool.label}
                                    </p>
                                </div>
                                <Check
                                    className='text-primary w-5 h-5'
                                />
                            </Card>
                        ))}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        size='lg'
                        variant='premium'
                        className='w-full'
                        onClick={onSubscribe}
                        disabled={isLoading}
                    >
                        Upgrade
                        <Zap
                            className='w-4 h-4 ml-2 fill-white'
                        />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default Modal;