import { useState, useEffect } from "react"
import Card from "./card"
import './products.scss'
import { getProducts } from "../../http/productAPI"


const Products = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getProducts().then(({data}) => {
            setProducts(data)
        })
    }, [])

    return (
        <div className="cards">
             {products.length && products.map(product =><Card product={product} /> ) }
        </div>
    )
}

export default Products