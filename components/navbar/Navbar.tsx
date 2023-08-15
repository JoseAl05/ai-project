
import { apiLimitCount } from '@/lib/apiLimit';
import MobileSidebar from '../sidebar/MobileSidebar';
import { Button } from '../ui/button';
import { UserButton } from '@clerk/nextjs';
import { checkSubscription } from '@/lib/subscription';

const Navbar = async() => {

    const apiCounter = await apiLimitCount();
    const isPro = await checkSubscription();

    return (
        <div className='flex items-center p-4'>
            <MobileSidebar
                apiLimitCount={apiCounter}
                isPro={isPro}
            />
            <div className='flex justify-end w-full'>
                <UserButton afterSignOutUrl='/' />
            </div>
        </div>
    );
}

export default Navbar;