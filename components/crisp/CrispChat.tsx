'use client'

import { useEffect } from 'react';
import { Crisp } from 'crisp-sdk-web';

const CrispChat = () => {

    useEffect(() => {
        Crisp.configure('f178edfc-a791-4f9b-a3c8-6ba2a1ae929c');
    },[])

    return null;
}

export default CrispChat;