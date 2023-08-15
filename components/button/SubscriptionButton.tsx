'use client'

import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Zap } from 'lucide-react';
import { Button } from '../ui/button';

interface SubscriptionButtonProps {
    isPro: boolean;
}

const SubscriptionButton = ({ isPro = false }: SubscriptionButtonProps) => {

    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);

            const response = await axios.get('/api/stripe');

            window.location.href = response.data.url;
        } catch (error:any) {
            console.log('BILLING ERROR', error);
            toast.error(`Something went wrong. Error code: ${error?.response?.status}`);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Button
            variant={isPro ? 'default' : 'premium'}
            disabled={isLoading}
            onClick={onClick}
        >
            {isPro ? 'Manage Subscription' : 'Upgrade'}
            {!isPro && <Zap className='w-4 h-4 ml-2 fill-white' />}
        </Button>
    );
}

export default SubscriptionButton;