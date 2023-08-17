import Navbar from '@/components/navbar/Navbar';
import Sidebar from '@/components/sidebar/Sidebar';
import { apiLimitCount } from '@/lib/apiLimit';
import { checkSubscription } from '@/lib/subscription';
import { Suspense } from 'react';
import LoadingPage from './loading';

const DashboardLayout = async ({
    children
}: {
    children: React.ReactNode
}) => {

    const apiCounter = await apiLimitCount();
    const isPro = await checkSubscription();

    return (
        <div className='h-full relative'>
            <div className='hidden h-full bg-gray-900 md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 '>
                <div>
                    <Sidebar
                        apiLimitCount={apiCounter}
                        isPro={isPro}
                    />
                </div>
            </div>
            <main className='md:pl-72'>
                <Navbar />
                <Suspense fallback={<LoadingPage />}>
                    {children}
                </Suspense>
            </main>
        </div>
    );
}

export default DashboardLayout;