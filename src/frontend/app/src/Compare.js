import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import image from './graphics-card.png';
import { FaHome } from 'react-icons/fa';
import SearchBar from "./SearchBar";

function Compare() {
    const { id1, id2 } = useParams(); // Obtener los IDs desde la URL
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();
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
            <div className="text-center p-4">
                <h1 className="text-2xl font-semibold text-red-500">Error</h1>
                <p className="mt-2 text-gray-600">{error}</p>
            </div>
        );
    }

    if (products.length !== 2) {
        return (
            <div className="text-center p-4">
                <h1 className="text-2xl font-semibold text-gray-800">Cargando...</h1>
                <p className="mt-2 text-gray-600">Esperando la información de los productos.</p>
            </div>
        );
    }

    const handleSearch = (term) => {
        setSearchTerm(term);
        navigate({ pathname: '/', search: `?name=${term}` });
    };

    const [product1, product2] = products;

    const isProduct1Cheaper = product1.price < product2.price;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-8xl font-bold text-left text-gray-800 mb-8">
                <span className="text-primary">PC</span>
                <span className="text-gray-800">Forge</span>
                <span className="text-primary mb-4 text-xl">
                    Comparador de precios de componentes de PC
                </span>
            </h1>
            
            <SearchBar onSearch={handleSearch} />
            
            <Link to="/" className="back-link">
                <FaHome size={16} /> Volver
            </Link>


            <h2 className="text-2xl font-semibold mb-4">Comparación de Productos</h2>
            
            <div className="flex justify-around items-center mb-8">
                <div className="text-center">
                    <img src={image} alt={product1.name} className="w-32 h-32 object-contain mx-auto" />
                    <h3 className="mt-2 text-lg font-semibold">{product1.name}</h3>
                </div>
                <div className="text-center">
                    <img src={image} alt={product2.name} className="w-32 h-32 object-contain mx-auto" />
                    <h3 className="mt-2 text-lg font-semibold">{product2.name}</h3>
                </div>
            </div>

            <table className="min-w-full table-auto border-collapse border border-gray-200 mb-8">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-2 px-4 text-left font-medium text-gray-700">Atributo</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-700">{product1.name}</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-700">{product2.name}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-t border-gray-200">
                        <td className="py-2 px-4">Precio</td>
                        <td className="py-2 px-4">${product1.price}</td>
                        <td className="py-2 px-4">${product2.price}</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                        <td className="py-2 px-4">Marca</td>
                        <td className="py-2 px-4">{product1.brandName}</td>
                        <td className="py-2 px-4">{product2.brandName}</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                        <td className="py-2 px-4">Tienda</td>
                        <td className="py-2 px-4">{product1.shopName}</td>
                        <td className="py-2 px-4">{product2.shopName}</td>
                    </tr>
                </tbody>
            </table>

            <p className="text-center font-semibold text-lg mt-4">
                {isProduct1Cheaper
                ? `${product1.name} tiene el mejor precio.`
                : `${product2.name} tiene el mejor precio.`}
            </p>
        </div>
    );
}

export default Compare;
