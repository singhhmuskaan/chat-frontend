import {useRouter} from "next/navigation";
import {useEffect} from "react";
import Cookies from 'js-cookie';

const urls = {
    login: 'http://localhost:1337/api/auth/local',
    register: 'http://localhost:1337/api/auth/local/register'
};

export const useAuth = (action?: 'login' | 'register') => {
    const { push } = useRouter();

    const loginOrSignup = (data: any) => {
        if (!action) {
            throw new Error('Action is required');
        }
        fetch(urls[action], {
            method: "POST", headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }).then(async (response) => {
            if (response.ok) {
                const data = await response.json();
                saveToken(data);
                push('dashboard');
            } else {
                alert("That didn't work!");
            }
        });
    };

    const getUser = () => {
        const user = Cookies.get('user');
        if (user) {
            return JSON.parse(user);
        }
        return null;
    }

    const getToken = () => {
        const token = Cookies.get('token');
        if (token) {
            return token;
        }
        return null;
    }

    return {loginOrSignup, getUser, getToken};
}

const saveToken = (data: { jwt: string, user: any }) => {
    Cookies.set('token', data.jwt, { expires: 7 }); // Expires in 7 days
    Cookies.set('user', JSON.stringify(data.user), { expires: 7 });
}