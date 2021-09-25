import {TIngredient} from "./types";

export const checkResponse = (res: Response) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

type TSetCookie = {
    [name: string]: string | number
};
export const setCookie = (name: string, value: string, options: TSetCookie) => {
    options = {
        path: '/',
        ...options
    };
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        updatedCookie += "=" + optionValue;
    }
    document.cookie = updatedCookie;
}

export const getCookie = (cname: string) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export const deleteCookie = (name: string) => {
    setCookie(name, "", {
        'max-age': -1
    })
}

export const deleteCookies = (cookies: string[] = []) => {
    cookies.forEach(el => {
        deleteCookie(el);
    })
}
type TProduct = {
    name: string;
    image_mobile: string;
    price: number;
};
type TOrderItem = {
    [key: string]: {
        amount: number,
        name: string,
        image: string,
        price: number,
        id: string
    }
};
type TOrderData = {
    metaData: TOrderItem,
    keys: Array<string>,
    orderTotal: number
};
export const generateOrderItems = (ingredients: string[], items: TIngredient[]) => {
    let products: (TOrderData | null) = null;
    ingredients.forEach(el => {
        const product: (TProduct | undefined) = items.find(item => item._id === el);
        if (typeof product === 'undefined') {
            return false;
        }
        if (products === null && typeof product !== undefined) {
            products = {
                metaData: {
                    [el]: {
                        amount: 1,
                        name: product.name,
                        image: product.image_mobile,
                        price: product.price,
                        id: el
                    }
                },
                keys: [el],
                orderTotal: product.price
            }
        } else if (products !== null && !(el in products.metaData)) {
            products.metaData[el] = {
                amount: 1,
                name: product.name,
                image: product.image_mobile,
                price: product.price,
                id: el
            }
            products['keys'].push(el);
            products['orderTotal'] += product.price;
        } else if (products !== null && el in products.metaData) {
            products.metaData[el].amount += 1;
            products['orderTotal'] += product.price;
        }
    });
    return products;
}