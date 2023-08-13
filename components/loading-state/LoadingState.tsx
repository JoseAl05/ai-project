import Image from 'next/image';

const LoadingState = () => {
    return (
        <div className='flex flex-col gap-y-2 justify-center items-center h-full'>
            <div className='w-16 h-16 relative animate-pulse'>
                <Image
                    fill
                    alt='logo'
                    src='/logo.png'
                />
            </div>
            <p className='text-sm text-muted-foreground'>
                Aetherial is thinking...
            </p>
        </div>
    );
}

export default LoadingState;