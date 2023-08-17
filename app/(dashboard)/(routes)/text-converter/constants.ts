import * as z from 'zod';

export const formSchema = z.object({
    text: z.string().min(1,{
        message: 'Text is required'
    }),
    language:z.string().min(1),
})

export const languages = [
    {
        value:'en-US',
        label:'English'
    },
    {
        value:'es-ES',
        label:'Español'
    },
]