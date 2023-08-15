'use client'

import * as z from 'zod';
import Header from '@/components/header/Header';
import { MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ChatCompletionRequestMessage } from 'openai';
import { useModal } from '@/hooks/useModal';
import toast from 'react-hot-toast';

import { formSchema } from './constants';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import EmptyState from '@/components/empty-state/EmptyState';
import LoadingState from '@/components/loading-state/LoadingState';
import { cn } from '@/lib/utils';
import UserAvatar from '@/components/user-avatar/UserAvatar';
import BotAvatar from '@/components/bot-avatar/BotAvatar';


const ConversationPage = () => {

    const router = useRouter();
    const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
    const modal = useModal();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ''
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage: ChatCompletionRequestMessage = {
                role: 'user',
                content: values.prompt
            };

            const newMessages = [...messages, userMessage];

            const response = await axios.post('/api/conversation', {
                messages: newMessages,
            })

            setMessages((current) => [...current, userMessage, response.data]);
            form.reset();
        } catch (error: any) {
            if(error?.response?.status === 403) {
                modal.onOpen();
            }
            toast.error(`Something went wrong. Error code: ${error?.response?.status}`);
        } finally {
            router.refresh();
        }
    }

    return (
        <div>
            <Header
                title='Conversation'
                description='Our most advanced conversation model.'
                icon={MessageSquare}
                iconColor='text-violet-500'
                bgColor='bg-violet-500/10'
            />
            <div className='px-4 lg:px-8'>
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='grid grid-cols-12 gap-2 rounded-lg border w-full p-4 px-3 focus-within:shadow-sm md:px-6'
                        >
                            <FormField
                                name='prompt'
                                render={({ field }) => (
                                    <FormItem className='col-span-12 lg:col-span-10'>
                                        <FormControl className='m-0 p-0'>
                                            <Input
                                                className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                                                disabled={isLoading}
                                                placeholder='Write your prompt right here!'
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button className='col-span-12 w-full lg:col-span-2' disabled={isLoading}>
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className='space-y-4 mt-4'>
                    {isLoading && (
                        <div className='flex justify-center items-center p-8 rounded-lg w-full bg-muted'>
                            <LoadingState />
                        </div>
                    )}
                    {messages.length === 0 && !isLoading && (
                        <EmptyState
                            label='No conversation started.'
                        />
                    )}
                    <div className='flex flex-col-reverse gap-y-4'>
                        {messages.map(message => (
                            <div
                                key={message.content}
                                className={
                                    cn(
                                        'flex items-start w-full p-8 gap-x-8 rounded-lg',
                                        message.role === 'user' ? 'bg-white border border-black/10' : 'bg-muted'
                                    )
                                }
                            >
                                {message.role === 'user' ? <UserAvatar /> : <BotAvatar />}
                                <p className='text-sm'>
                                    {message.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConversationPage;