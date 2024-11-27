import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import image from './graphics-card.png';
import { FaHome } from 'react-icons/fa';

function Compare() {
    const { id1, id2 } = useParams(); // Obtener los IDs desde la URL
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchProducts = async () => {
        try {
            // Fetch para el primer producto
            const response1 = await fetch(`${API_URL}/components/${id1}`);
            if (!response1.ok) throw new Error("Error al cargar el primer producto");
            const product1 = await response1.json();

            // Fetch para el segundo producto
            const response2 = await fetch(`${API_URL}/components/${id2}`);
            if (!response2.ok) throw new Error("Error al cargar el segundo producto");
            const product2 = await response2.json();

            product1.price = parseFloat(product1.price);
            product2.price = parseFloat(product2.price);

            setProducts([product1, product2]); // Actualizar ambos productos
        } catch (err) {
            setError(err.message);
        }
        };

        fetchProducts();
    }, [id1, id2]);

    if (error) {
        return (
        <div>
            <h1>Error</h1>
            <p>{error}</p>
        </div>
        );
    }

    if (products.length !== 2) {
        return (
        <div>
            <h1>Cargando...</h1>
            <p>Esperando la información de los productos.</p>
        </div>
        );
    }

    const [product1, product2] = products;

    const isProduct1Cheaper = product1.price < product2.price;

    return (
        <div>
            <Link to="/" className="back-link">
                <FaHome size={16} /> Volver
            </Link>
            <h1>Comparación de Productos</h1>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div>
                <img src={image} alt={product1.name} style={{ width: "150px" }} />
                <h3>{product1.name}</h3>
                </div>
                <div>
                <img src={image} alt={product2.name} style={{ width: "150px" }} />
                <h3>{product2.name}</h3>
                </div>
            </div>
            <table border="1" style={{ marginTop: "20px", width: "100%" }}>
                <thead>
                <tr>
                    <th>Atributo</th>
                    <th>{product1.name}</th>
                    <th>{product2.name}</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Precio</td>
                    <td>${product1.price}</td>
                    <td>${product2.price}</td>
                </tr>
                <tr>
                    <td>Marca</td>
                    <td>{product1.brandName}</td>
                    <td>{product2.brandName}</td>
                </tr>
                <tr>
                    <td>Tienda</td>
                    <td>{product1.shopName}</td>
                    <td>{product2.shopName}</td>
                </tr>
                </tbody>
            </table>
            <p style={{ textAlign: "center", marginTop: "10px", fontSize: "16px", fontWeight: "bold" }}>
                {isProduct1Cheaper
                ? `${product1.name} tiene el mejor precio.`
                : `${product2.name} tiene el mejor precio.`}
            </p>
        </div>
  );
}

export default Compare;
