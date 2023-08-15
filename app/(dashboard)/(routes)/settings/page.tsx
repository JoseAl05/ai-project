import SubscriptionButton from '@/components/button/SubscriptionButton';
import Header from '@/components/header/Header';
import { checkSubscription } from '@/lib/subscription';
import { Settings } from 'lucide-react';

const SettingsPage = async() => {

    const isProSubscription = await checkSubscription();

    return (
        <div>
            <Header
                title='Settings'
                description='Manage account settings.'
                icon={Settings}
                iconColor='text-gray-700'
                bgColor='bg-gray-700/10'
            />
            <div className='px-4 space-y-4 lg:px-8'>
                <p className='text-muted-foreground text-sm'>
                    {isProSubscription ? 'You are currently on a pro plan' : 'You are currently on a free plan.'}
                </p>
                <SubscriptionButton isPro={isProSubscription}/>
            </div>
        </div>
    );
}

export default SettingsPage;