import { useState, useEffect } from "react"
import Card from "./card"
import './products.scss'
import { useParams } from "react-router-dom"
import { getCategoryProducts } from "../../http/categoryAPI"

const CategoryProducts = () => {
    const [products, setProducts] = useState([])
    const params = useParams()
    useEffect(() => {
        getCategoryProducts(params.slug).then((data) => {
            setProducts(data)
        })
    }, [params])

    return (
        <div className="cards">
             {products.length ? products.map(product =><Card key={product.id} product={product} /> ) : <h1>Категория пуста</h1>}
        </div>
    )
}

export default CategoryProducts