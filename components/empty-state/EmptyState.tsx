import Image from 'next/image';

interface EmptyStateProps {
    label: string;
}

const EmptyState = ({ label }: EmptyStateProps) => {
    return (
        <div className='flex flex-col justify-center items-center h-full p-20 gap-5'>
            <div className='relative h-72 w-72'>
                <Image
                    fill
                    alt='Empty'
                    src='/empty.png'
                />
            </div>
            <p className='text-muted-foreground text-sm text-center'>
                {label}
            </p>
        </div>
    )
}

export default EmptyState;