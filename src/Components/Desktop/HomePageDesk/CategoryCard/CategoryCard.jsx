import { Link } from "react-router-dom";

import './CategoryCard.css';

function CategoryCard({ tittle, image, to }) {
    return (
        <div className="categoryCard">
            <div className="imgCategoryContainer">
                <img src={image} alt={tittle} className="categoryImg" />
            </div>
            <div className="nameLink">
                <h3>{tittle}</h3>
                <Link to={to} className="seeAllBtn">VER TODO</Link>
            </div>
        </div>
    );
}

export default CategoryCard;