import axios from '../api/axios';
import useAuth from './useAuth';

function useRefreshToken() {
    const { setAuth } = useAuth();

    const refresh = async () => {
        try {
            const response = await axios.get('/refresh', {
                withCredentials: true
            });
            
            setAuth(() => {
                return {
                    user: response.data.name,
                    pwd: response.data.password,
                    accessToken: response.data.access_token,
                    email: response.data.email,
                    plan: response.data.plan,
                    favourites: response.data.favourites,
                    recentSearches: response.data.recentSearches
                }
            });
            return response.data.access_token;
        } catch (error) {
            console.error('Error refreshing token:', error);
            throw error;
        }
    }
    return refresh;
}

export default useRefreshToken;
