import './ItemDetail.css';
import { useContext, useState } from 'react';
import ItemCount from '../ItemCount/ItemCount'
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';


const ItemDetail = ({ id, name, img, category, price, stock }) => {
    
    const [quantityAdded, setQuatityAdded] = useState(0)

    const { addItem } = useContext(CartContext);

    const handleOnAdd = (quantity) => {
        setQuatityAdded(quantity)

        const item = {
            id, name, price, category, img
        }
        addItem(item, quantity)
    }
    return (
        <main className='main-detail'>
            <article className="d-CardItem">
                <picture className='img-box'>
                    <img src={img} alt={name} className="d-ItemImg" />
                </picture>
                <header className="d-Header">
                    <h2 className="d-ItemHeader"> {name} </h2>
                </header>
                <section className='d-Description'>
                    <p className="d-Info">
                        Categoria: {category}
                    </p>
                    <p className="d-Info">
                        Price: ${price}
                    </p>
                </section>
                
                <footer className="d-ItemFooter">
                    {
                        quantityAdded > 0 ? (
                            <Link to='/cart' className='Option'>Terminar Compra </Link>
                        ) : (
                            <ItemCount initial={1} stock={stock} onAdd={handleOnAdd} />
                        )
                    }
                </footer>
            </article>
        </main>
    )
}

export default ItemDetail;