import Cookies from 'js-cookie';
import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';

import { httpService, TOKEN_COOKIE_NAME } from '../../services/httpService';

export const OAuthPage = () => {
    const navigate = useNavigate();

    const handleLogin = async (googleData: any) => {
        const res = await httpService.post<any>('/oauth-log-in', {
            token: googleData.tokenId,
        });

        Cookies.set(TOKEN_COOKIE_NAME, res.data.token);
        navigate('/flashcards-lists');
    };
    return (
        <>
            <textarea onChange={val => console.log(val.target.value.replace(/\s+/g, '-'))} />

            <GoogleLogin
                clientId={
                    '157216207997-ct2ng5l5f7qd4b269voeo3d3fvn3jeat.apps.googleusercontent.com'
                }
                buttonText="Log in with Google"
                onSuccess={handleLogin}
                onFailure={handleLogin}
            />
        </>
    );
};
