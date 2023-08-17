'use client'

import { Dispatch, SetStateAction } from 'react';
import { UseFormReturn } from 'react-hook-form';

type Errors = {
    id: string;
    offset: number;
    length: number;
    description: {
        en: string;
    };
    bad: string;
    better: [];
    type: string;
}

interface TextConverterResultsProps {
    form: UseFormReturn<{
        text: string;
        language: string;
    }, any, undefined>
    errors: Errors[];
}

const TextConverterResults = ({
    form,
    errors = []
}: TextConverterResultsProps) => {

    const replaceBadWord = (e: any, badWord: string) => {
        e.preventDefault();
        form.setValue('text', form.getValues('text').replace(badWord, e.target.textContent));
        console.log(badWord);
    }

    return (
        <>
            <div className='grid grid-cols-1 gap-4 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {
                    errors.map(error => (
                        <div className='p-2 space-y-4 text-base border border-black rounded-lg md:text-base lg:text-lg' key={error.id}>
                            <span className='text-red-600 text-sm font-bold p-2 md:text-base'>
                                {error.bad}
                            </span>
                            <span className='text-black text-sm p-2 md:text-base '>
                                {error.description.en}
                            </span>
                            <h1 className='text-black text-xl text-center font-bold'>Do you mean?</h1>
                            <div className='grid grid-cols-2 gap-2 max-w-md'>
                                {error.better.map((betterOption, index) => (
                                    <span
                                        onClick={(e) => replaceBadWord(e, error.bad)}
                                        key={index}
                                        className={
                                            `text-center text-sm whitespace-pre-wrap text-green-400 font-bold p-1 cursor-pointer bg-white
                                                        mx-3 transition-all ease-in-out
                                                        hover:bg-gray-900 hover:text-white`
                                        }
                                    >
                                        {betterOption}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    );
}

export default TextConverterResults;