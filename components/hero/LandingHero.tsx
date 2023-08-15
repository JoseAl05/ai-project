'use client'

import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import TypewriterComponent from 'typewriter-effect';
import { Button } from '../ui/button';

const LandingHero = () => {

    const { isSignedIn } = useAuth();

    return (
        <div className='text-white text-center font-bold py-36 space-y-5'>
            <div className='text-4xl space-y-5 font-extrabold sm:text-5xl md:text-6xl lg:text-7xl'>
                <h1>
                    The Best AI Tool for
                </h1>
                <div className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
                    <TypewriterComponent
                        options={{
                            strings: [
                                'Chatbot.',
                                'Code Generation.',
                                'Photo Generation.',
                                'Video Generation.',
                                'Music Generation.',
                            ],
                            autoStart: true,
                            loop: true
                        }}
                    />
                </div>
            </div>
            <p className='text-sm text-zinc-400 font-light md:text-xl'>
                Create content faster using AI.
            </p>
            <div>
                <Link
                    href={isSignedIn ? '/dashboard' : '/sign-up'}
                >
                    <Button
                        variant='premium'
                        className='p-4 font-semibold rounded-full md:text-lg md:p-6'
                    >
                        Start for Free
                    </Button>
                </Link>
            </div>
            <p className='text-zinc-400 text-xs font-normal md:text-sm'>
                No credit card required.
            </p>
        </div>
    );
}

export default LandingHero;