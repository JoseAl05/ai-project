import LandingContent from '@/components/content/LandingContent';
import LandingHero from '@/components/hero/LandingHero';
import LandingNavbar from '@/components/navbar/LandingNavbar';

const LandingPage = () => {
    return (
        <div className='h-full'>
            <LandingNavbar />
            <LandingHero />
            <LandingContent />
        </div>
    );
}

export default LandingPage;