import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const StoreValue = (key, value) => {
    cookies.set(key, value, { path: '/' });
};

export const GetValue = (key) => {
    return cookies.get(key, { path: '/' });
};