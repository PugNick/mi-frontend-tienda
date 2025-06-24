import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import './CategoriasMenuDesk.css';

function CategoriesMenu() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const apiUrl =
            window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
                ? "http://localhost:5000"
                : import.meta.env.VITE_API_MOBILE;

        fetch(`${apiUrl}/products`)
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);

                // Extraer categorías únicas
                const categoryMap = new Map();

                data.forEach(({ category, subCategory }) => {
                    if (!categoryMap.has(category)) {
                        categoryMap.set(category, new Set());
                    }
                    if (subCategory) {
                        categoryMap.get(category).add(subCategory);
                    }
                });

                // Convertir a un array con categorías y subcategorías
                const formattedCategories = Array.from(categoryMap.entries()).map(
                    ([category, subcategories]) => ({
                        name: category,
                        subcategories: Array.from(subcategories),
                    })
                );

                setCategories(formattedCategories);
            })
            .catch((error) => console.error("Error al obtener productos:", error));
    }, []);

    return (
        <div className="menuCategWidth">
            <nav className="categoriesMenuDesk">
                <div className="categoriesDesk">
                    {categories.length > 0 ? (
                        categories.map((category) => (
                            <div key={category.name} className="categoryDesk">
                                <Link to={`/category/${category.name}`}>{category.name}</Link>
                                {category.subcategories.length > 0 && (
                                    <div className="subcategoriesDesk">
                                        {category.subcategories.map((sub) => (
                                            <div key={sub} className="subcategoryDesk">
                                                <Link to={`/category/${category.name}/subcategoria/${sub}`}>{sub}</Link>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>Cargando categorías...</p>
                    )}
                </div>
            </nav>
        </div>
    );
}

export default CategoriesMenu;
