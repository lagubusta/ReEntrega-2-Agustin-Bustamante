import './ItemDetailContainer.css'
import { useState, useEffect } from 'react';
// import { getProductsById, getProductsByCategory } from '../../asyncMock'; // sacar esto
import ItemDetail from '../ItemDetail/ItemDetail'
import { useParams } from 'react-router-dom';

import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../services/firebase/firebaseConfig';
import Item from '../Item/Item';


function ItemDetailContainer() {
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const { productId } = useParams();

    const { itemId } = useParams()

    useEffect(() => {
        
        setLoading(true)

        const docRef = doc(db, 'products', itemId)

        getDoc(docRef)
        .then(response => {
            const data = response.data()
            const productAdapted = {id: response.id, ...data}
            setProduct(productAdapted)
        })
        .catch(error => {
            console.log(error)
        })
        .finally(()=>{
            setLoading(false)
        }, [itemId])



        // getProductsById(itemId)
        //     .then(response => {
        //         setProduct(response)
        //     })
        //     .catch(error => {
        //         console.error(error)
        //     })
    }, [])

    return (

        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                product && <ItemDetail {...product} />
            )}
        </div>
    )
}

export default ItemDetailContainer;