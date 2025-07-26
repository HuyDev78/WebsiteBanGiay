import { createContext, useEffect, useState, useRef } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartLoaded, setIsCartLoaded] = useState(false);
    const userId = localStorage.getItem('userId');
    const firstLoad = useRef(true);

   
    useEffect(() => {
        const fetchCart = async () => {
            if (!userId) return;

            try {
                const res = await fetch(`http://localhost:5000/api/cart/${userId}`);
                const data = await res.json();
                setCartItems(data.items || []);
                setIsCartLoaded(true);
                console.log(' Cart loaded from DB:', data.items || []);
            } catch (err) {
                console.error(' Lỗi khi tải giỏ hàng:', err);
            }
        };

        fetchCart();
    }, [userId]);

   
    useEffect(() => {
        if (!isCartLoaded || !userId) return;

       
        if (firstLoad.current) {
            firstLoad.current = false;
            return;
        }

        const saveCart = async () => {
            try {
                await fetch('http://localhost:5000/api/cart', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId, items: cartItems }),
                });
                console.log(' Cart saved to DB');
            } catch (err) {
                console.error(' Lỗi khi lưu giỏ hàng:', err);
            }
        };

        saveCart();
    }, [cartItems, userId, isCartLoaded]);

   
    const addItem = (item) => {
        const id = item.productId || item.id;

        const exists = cartItems.find((i) => i.productId === id);
        if (exists) {
            setCartItems(cartItems.map((i) =>
                i.productId === id ? { ...i, quantity: i.quantity + 1 } : i
            ));
        } else {
            const newItem = {
                productId: id,
                name: item.name,
                image: item.image,
                price: item.price,
                quantity: 1,
            };
            setCartItems([...cartItems, newItem]);
        }
    };

    const removeItem = (id) => {
        setCartItems(cartItems.filter((item) => item.productId !== id));
    };

    const increaseQuantity = (id) => {
        setCartItems(cartItems.map((item) =>
            item.productId === id ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    const decreaseQuantity = (id) => {
        setCartItems(cartItems.map((item) =>
            item.productId === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
        ));
    };

    const clearCart = () => {
        setCartItems([]);
        if (userId) {
            fetch(`http://localhost:5000/api/cart/${userId}`, {
                method: 'DELETE',
            }).then(() => {
                console.log(' Cart cleared from DB');
            }).catch(err => {
                console.error(' Lỗi khi xóa cart:', err);
            });
        }
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addItem,
            removeItem,
            increaseQuantity,
            decreaseQuantity,
            clearCart,
            setCartItems,
        }}>
            {children}
        </CartContext.Provider>
    );
};

export { CartProvider, CartContext };
