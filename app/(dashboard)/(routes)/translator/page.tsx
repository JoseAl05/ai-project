'use client'

import * as z from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { formSchema, languages } from './constants';
import { cn } from '@/lib/utils';
import EmptyState from '@/components/empty-state/EmptyState';
import Header from '@/components/header/Header';
import LoadingState from '@/components/loading-state/LoadingState';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Languages, Text } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import TextConverterResults from '@/components/text-converter-results/TextConverterResults';
import { Badge } from '@/components/ui/badge';
import TranslateResults from '@/components/translate-results/TranslateResults';

const TranslatorPage = () => {

    const router = useRouter();
    const [message, setMessage] = useState<string>('');
    const [originalString, setOriginalString] = useState('');
    const [language, setLanguage] = useState('Spanish');

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            message: '',
            language: 'Spanish'
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setMessage('');

            const response = await axios.post('/api/translate', values);

            setMessage(response.data);

        } catch (error: any) {
            toast.error(`Something went wrong. Error code: ${error?.response?.status}`);
        } finally {
            router.refresh();
        }
    }


    return (
        <div>
            <Header
                title='Translator'
                description='Our most advanced translation model.'
                icon={Languages}
                iconColor='text-cyan-500'
                bgColor='bg-cyan-500/10'
            />
            <div className='px-4 lg:px-8'>
                {/* <Badge
                    variant='destructive'
                    className='my-5 text-base'
                >
                    After selecting a correct option, re-check the text to verify if the selected option is correct.
                </Badge> */}
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='grid grid-cols-12 gap-2 rounded-lg border w-full p-4 px-3 focus-within:shadow-sm md:px-6'
                        >
                            <FormField
                                name='message'
                                render={({ field }) => (
                                    <FormItem className='col-span-12 lg:col-span-10'>
                                        <FormControl className='m-0 p-0'>
                                            <Textarea
                                                className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                                                disabled={isLoading}
                                                placeholder='Paste your text and I translate it.'
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='language'
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
                                                {languages.map(language => (
                                                    <SelectItem
                                                        key={language.value}
                                                        value={language.value}
                                                    >
                                                        {language.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <Button className='col-span-12 w-full lg:col-span-2' disabled={isLoading}>
                                Translate
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
                    {message.length === 0 && !isLoading && (
                        <EmptyState
                            label='No translations.'
                        />
                    )}
                    <TranslateResults
                        message={message}
                    />
                    {/* <TextConverterResults
                        form={form}
                        errors={errors}
                    /> */}
                </div>
            </div>
        </div>
    );
}

export default TranslatorPage;