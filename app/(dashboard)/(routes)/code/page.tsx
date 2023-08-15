'use client'

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Code } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ChatCompletionRequestMessage } from 'openai';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { useModal } from '@/hooks/useModal';
import toast from 'react-hot-toast';

import BotAvatar from '@/components/bot-avatar/BotAvatar';
import EmptyState from '@/components/empty-state/EmptyState';
import Header from '@/components/header/Header';
import LoadingState from '@/components/loading-state/LoadingState';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import UserAvatar from '@/components/user-avatar/UserAvatar';
import { formSchema } from './constants';

const CodePage = () => {

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

            const response = await axios.post('/api/code', {
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
                title='Code'
                description='Generate code using descriptive text.'
                icon={Code}
                iconColor='text-green-700'
                bgColor='bg-green-700/10'
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
                                                placeholder='Write what you want to code!.'
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
                                <ReactMarkdown
                                    components={{
                                        pre:({node, ...props}) => (
                                            <div className='overflow-auto w-full my-2 p-3 bg-black/10 rounded-lg'>
                                                <pre {...props}/>
                                            </div>
                                        ),
                                        code:({node,...props}) => (
                                             <code className='bg-black/10 rounded-lg p-1' {...props}/>
                                        )
                                    }}
                                    className='text-sm overflow-hidden leading-7'
                                >
                                    {message.content || ''}
                                </ReactMarkdown>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CodePage;