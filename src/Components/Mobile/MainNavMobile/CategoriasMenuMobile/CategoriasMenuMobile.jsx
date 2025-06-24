import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Desplegar from '../../../Desktop/Iconos/Desplegar';
import Ocultar from '../../../Desktop/Iconos/Ocultar';

import './CategoriasMenuMobile.css';

function CategoriasMenuMobile({ onClose }) {
    const [categories, setCategories] = useState([]);
    const [openCategory, setOpenCategory] = useState(null);

    useEffect(() => {
        const apiUrl =
            window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
                ? "http://localhost:5000"
                : import.meta.env.VITE_API_MOBILE;

        fetch(`${apiUrl}/products`)
            .then((response) => response.json())
            .then((data) => {
                const categoryMap = new Map();
                data.forEach(({ category, subCategory }) => {
                    if (!categoryMap.has(category)) {
                        categoryMap.set(category, new Set());
                    }
                    if (subCategory) {
                        categoryMap.get(category).add(subCategory);
                    }
                });
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
        <nav className="categoriesMenuMobile">
            {categories.length > 0 ? (
                categories.map((category) => (
                    <div key={category.name} className="categoryMobile" style={{ display: "flex", flexDirection: "column" }}>
                        <div className="categoryMobileContainer" style={{ display: "flex", alignItems: "center" }}>
                            <Link
                                className="categoryLinkMobile"
                                to={`/category/${category.name}`}
                                onClick={onClose}
                            >
                                {category.name}
                            </Link>
                            {category.subcategories.length > 0 && (
                                <button
                                    className="btnSubCategoriasMobile"
                                    style={{ marginLeft: 8 }}
                                    onClick={e => {
                                        e.preventDefault();
                                        setOpenCategory(openCategory === category.name ? null : category.name);
                                    }}
                                >
                                    {openCategory === category.name ? <Ocultar /> : <Desplegar />}
                                </button>
                            )}
                        </div>
                        {openCategory === category.name && category.subcategories.length > 0 && (
                            <div className="subcategoriesMobile" style={{ marginLeft: 20 }}>
                                {category.subcategories.map((sub) => (
                                    <div key={sub} className="subcategoryMobile">
                                        <Link
                                            className="categoryLinkMobile"
                                            to={`/category/${category.name}/subcategoria/${sub}`}
                                            onClick={onClose}
                                        >
                                            {sub}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p>Cargando categorías...</p>
            )}
        </nav>
    );
}

export default CategoriasMenuMobile;