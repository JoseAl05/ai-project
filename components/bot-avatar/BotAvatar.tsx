import { Avatar, AvatarImage } from '../ui/avatar';

const BotAvatar = () => {
    return (
        <Avatar className='h-12 w-12'>
            <AvatarImage
                className=''
                src='/logo.png'
            />
        </Avatar>
    );
}

export default BotAvatar;