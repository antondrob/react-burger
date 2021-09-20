export const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

export const setCookie = (name, value, options = {}) => {
    options = {
        path: '/',
        ...options
    };
    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }
    document.cookie = updatedCookie;
}

export const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
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

export const deleteCookie = (name) => {
    setCookie(name, "", {
        'max-age': -1
    })
}

export const deleteCookies = (cookies = []) => {
    cookies.forEach(el => {
        deleteCookie(el);
    })
}

export const generateOrderItems = (ingredients, items) => {
    // console.log(ingredients);
    let products = null;
    ingredients.forEach(el => {
        const product = items.find(item => item._id === el);
        if (products === null) {
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
        } else if (!(el in products.metaData)) {
            products.metaData[el] = {
                amount: 1,
                name: product.name,
                image: product.image_mobile,
                price: product.price,
                id: el
            }
            products['keys'].push(el);
            products['orderTotal'] += product.price;
        } else if (el in products.metaData) {
            products.metaData[el].amount += 1;
            products['orderTotal'] += product.price;
        }
    });
    return products;
}