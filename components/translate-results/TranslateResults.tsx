'use client'

import { Copy } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import toast from 'react-hot-toast';

interface TranslateResultsProps {
    message: string;
}

const TranslateResults = ({ message }: TranslateResultsProps) => {

    const onCopy = (message:string) => {
        const indexOfTranslation = message.indexOf(`Translation:`);
        const formattedMessage = message.slice(indexOfTranslation).slice(13);
        const copyMessage = navigator.clipboard.writeText(formattedMessage);
        toast.promise(copyMessage,{
            success:'Message copied to the clipboard',
            loading:'Copying...',
            error:'Error to copy into clipboard'
        })
    };

    return (
        <>
            {message.length !== 0 && (
                <>
                    <h1 className='text-start text-2xl font-bold mt-5'>Translation</h1>
                    <div className='flex justify-center items-center w-full p-8 gap-x-8 border-black/10 bg-muted rounded-lg'>
                        <p className='text-sm'>{message}</p>
                        <span className='p-2 rounded-lg transition hover:bg-black/60 hover:text-white' onClick={() => onCopy(message)}>
                            <Copy size={20} className='' />
                        </span>
                    </div>
                </>
            )}
        </>
    );
}

export default TranslateResults;