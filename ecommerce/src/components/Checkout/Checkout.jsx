import './Checkout.css';
import { useState, useContext } from 'react';
import { db } from '../../services/firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const Checkout = () => {
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { cart, totalPrice, clearCart } = useContext(CartContext);

    const handleCreateOrder = async (e) => {
        e.preventDefault();

        if (cart.length === 0) {
            setErrorMessage("Agregar productos al carrito.");
            return;
        }

        setLoading(true);

        try {
            const order = {
                buyer: { name, phone, email },
                items: cart,
                total: totalPrice,
                date: new Date()
            };

            const docRef = await addDoc(collection(db, "orders"), order);
            setOrderId(docRef.id);
            clearCart();
        } catch (error) {
            console.error("Error al crear la orden: ", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <h2>Generando su orden...</h2>;
    }

    if (orderId) {
        return (
            <div>
                <h3>¡Compra realizada con éxito!</h3>
                <p>El ID de su orden es: <strong>{orderId}</strong></p>
                <Link to='/'>Volver a la tienda</Link>
            </div>
        );
    }

    return (
        <div className='checkout-form'>
            <h2>Checkout</h2>
            <form onSubmit={handleCreateOrder}>
                <div>
                    <label htmlFor='name'>Nombre</label>
                    <input 
                        type='text' 
                        id='name' 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor='phone'>Teléfono</label>
                    <input 
                        type='text' 
                        id='phone' 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input 
                        type='email' 
                        id='email' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <button type='submit' className='Button' disabled={cart.length === 0}>
                    Finalizar Compra
                </button>
            </form>
            
            {cart.length === 0 && (
                <h3 className='error-message'>Agregar productos al carrito.</h3>
            )}

            {errorMessage && (
                <h3 className='error-message'>{errorMessage}</h3>
            )}
            
            <Link to='/' className='Button'>Volver a la tienda</Link>
        </div>
    );
}

export default Checkout;

