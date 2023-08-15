'use client'

import * as z from 'zod';
import Header from '@/components/header/Header';
import { VideoIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/useModal';
import toast from 'react-hot-toast';

import { formSchema } from './constants';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import EmptyState from '@/components/empty-state/EmptyState';
import LoadingState from '@/components/loading-state/LoadingState';
import { cn } from '@/lib/utils';


const VideoPage = () => {

    const router = useRouter();
    const [video, setVideo] = useState<string>();
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
            setVideo(undefined);

            const response = await axios.post('/api/video', values);

            setVideo(response.data[0]);

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
                title='Video Generation'
                description='Turn your prompt into a video.'
                icon={VideoIcon}
                iconColor='text-orange-700'
                bgColor='bg-orange-7 00/10'
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
                                                placeholder='Write your prompt and I make the video!'
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
                    {!video && !isLoading && (
                        <EmptyState
                            label='No video generated.'
                        />
                    )}
                    {video && (
                        <video
                            controls
                            className='w-full aspect-video mt-8 rounded-lg border bg-black'
                        >
                            <source
                                src={video}
                            />
                        </video>
                    )}
                </div>
            </div>
        </div>
    );
}

export default VideoPage;