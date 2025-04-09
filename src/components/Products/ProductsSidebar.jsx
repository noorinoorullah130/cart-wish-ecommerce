import React from "react";

import "./ProductsSidebar.css";
import rocket from "../../assets/rocket.png";
import LinkWithIcon from "../Navbar/LinkWithIcon";

const ProductsSidebar = () => {
    return (
        <aside className="products_sidebar">
            <h2>Category</h2>

            <div className="categroy_links">
                <LinkWithIcon
                    title="Electronic"
                    link="products?category=electronics"
                    emoji={rocket}
                    sidebar={true}
                />
            </div>
        </aside>
    );
};

export default ProductsSidebar;
