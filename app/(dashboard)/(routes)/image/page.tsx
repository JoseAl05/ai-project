'use client'

import * as z from 'zod';
import Header from '@/components/header/Header';
import { Download, ImageIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { amounts, formSchema, resolutions } from './constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useModal } from '@/hooks/useModal';
import toast from 'react-hot-toast';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import EmptyState from '@/components/empty-state/EmptyState';
import LoadingState from '@/components/loading-state/LoadingState';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardFooter } from '@/components/ui/card';


const ImagePage = () => {

    const router = useRouter();
    const [images, setImages] = useState<string[]>([]);
    const modal = useModal();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: '',
            amount: '1',
            resolution: '512x512'
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setImages([]);

            const response = await axios.post('/api/image', values);

            const imageUrls = response.data.map((image: { url: string }) => image.url);

            setImages(imageUrls);

            form.reset();
        } catch (error: any) {
            if(error?.response?.status === 403) {
                modal.onOpen();
            }
        } finally {
            router.refresh();
        }
    }

    return (
        <div>
            <Header
                title='Image Generation'
                description='Turn your prompt into an image.'
                icon={ImageIcon}
                iconColor='text-pink-700'
                bgColor='bg-pink-700/10'
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
                                    <FormItem className='col-span-12 lg:col-span-6'>
                                        <FormControl className='m-0 p-0'>
                                            <Input
                                                className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                                                disabled={isLoading}
                                                placeholder='Write what picture do you want me to draw :)'
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='amount'
                                render={({ field }) => (
                                    <FormItem className='col-span-12 lg:col-span-2'>
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        defaultValue={field.value}
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {amounts.map(amount => (
                                                    <SelectItem
                                                        key={amount.value}
                                                        value={amount.value}
                                                    >
                                                        {amount.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='resolution'
                                render={({ field }) => (
                                    <FormItem className='col-span-12 lg:col-span-2'>
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        defaultValue={field.value}
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {resolutions.map(resolution => (
                                                    <SelectItem
                                                        key={resolution.value}
                                                        value={resolution.value}
                                                    >
                                                        {resolution.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
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
                        <div className='p-20'>
                            <LoadingState />
                        </div>
                    )}
                    {images.length === 0 && !isLoading && (
                        <EmptyState
                            label='No images generated.'
                        />
                    )}
                    <div className='grid grid-cols-1 gap-4 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                        {images.map(image => (
                            <Card
                                key={image}
                                className='rounded-lg overflow-hidden'
                            >
                                <div className='relative aspect-square'>
                                    <Image
                                        fill
                                        alt='Image'
                                        src={image}
                                    />
                                </div>
                                <CardFooter className='p-2'>
                                    <Button
                                        variant='secondary'
                                        className='w-full'
                                        onClick={() => window.open(image)}
                                    >
                                        <Download
                                            className='h-4 w-4 mr-2'
                                        />
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImagePage;