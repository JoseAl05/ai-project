import * as z from 'zod';

export const formSchema = z.object({
    message: z.string().min(1,{
        message: 'Text is required'
    }),
    language:z.string().min(1),
})

export const languages = [
    {
        value:'English',
        label:'English'
    },
    {
        value:'Spanish',
        label:'Spanish'
    },
    {
        value:'French',
        label:'French'
    },
    {
        value:'Portuguese',
        label:'Portuguese'
    },
    {
        value:'Italian',
        label:'Italian'
    }
]