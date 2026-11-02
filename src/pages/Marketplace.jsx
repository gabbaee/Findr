
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { LayoutGrid, PlusCircle, Search } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Organic Chemistry (Wade, 8th Ed)",
    category: "Textbooks",
    price: 350,
    campus: "Talamban Campus",
    condition: "Like New",
    posted: "Posted 10m ago",
    image: "/images/chemistry.jpg"
  },
  {
    id: 2,
    name: "TI-84 Plus CE Calculator",
    category: "Electronics",
    price: 750,
    campus: "Downtown Campus",
    condition: "Like New",
    posted: "Posted 1h ago",
    image: "/images/calculator.jpg"
  },
  {
    id: 3,
    name: "USC Chemistry Lab Coat (Medium)",
    category: "Supplies",
    price: 120,
    campus: "Talamban Campus",
    condition: "Used",
    posted: "Posted 3h ago",
    image: "/images/labcoat.jpg"
  },
  {
    id: 4,
    name: "Drawing Board & T-Square Ruler",
    category: "Supplies",
    price: 150,
    campus: "Downtown Campus",
    condition: "New",
    posted: "Posted 5h ago",
    image: "/images/drawingboard.jpg"
  },
  {
    id: 5,
    name: "iPad Air 4 (64GB, Green)",
    category: "Electronics",
    price: 2900,
    campus: "Downtown Campus",
    condition: "Used",
    posted: "Posted 1d ago",
    image: "/images/ipad.jpg"
  },
  {
    id: 6,
    name: "USC Hayden-McNeil Lab Notebook",
    category: "Textbooks",
    price: 180,
    campus: "Downtown Campus",
    condition: "New",
    posted: "Posted 1d ago",
    image: "/images/notebook.jpg"
  },
  {
    id: 7,
    name: "Copic Ciao Marker Set (24 Colors)",
    category: "Supplies",
    price: 720,
    campus: "Talamban Campus",
    condition: "Like New",
    posted: "Posted 2d ago",
    image: "/images/markers.jpg"
  },
  {
    id: 8,
    name: "USC Hoodie (L)",
    category: "Supplies",
    price: 1500,
    campus: "Downtown Campus",
    condition: "Used",
    posted: "Posted 3d ago",
    image: "/images/hoodie.jpg"
  }
];

const categories = [
  "All Items",
  "Textbooks",
  "Electronics",
  "Supplies"
];

export default function Marketplace() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Items");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All Items" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  function handleSearch(e) {
    e.preventDefault();
    setSearch(searchInput);
  }

  return (
    <main className="marketplace">
        <section className="hero marketplace-hero">
        <h1>
            Buy & Sell <span>Academic Essentials.</span>
        </h1>

        <div className="marketplace-switch">
            <Link to="/marketplace" className="selected">
            <LayoutGrid size={15} />
            View Listings
            </Link>

            <Link to="/marketplace/create">
            <PlusCircle size={15} />
            Create Listing
            </Link>
        </div>

        <form className="search-bar" onSubmit={handleSearch}>
            <Search className="search-icon" size={20} />

            <input
            type="text"
            placeholder="Search textbooks, lab gear, calculators, notes..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            />

            <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            >
            <option value="All Items">All Categories</option>
            <option value="Textbooks">Textbooks</option>
            <option value="Electronics">Electronics</option>
            <option value="Supplies">Supplies</option>
            </select>

            <button type="submit">Search</button>
        </form>
        </section>

      <section className="listings">
        <div className="listings-header">
          <div className="listing-title">
            <h2>Active Listings</h2>
            <span>
              • {filteredProducts.length} items available
            </span>
          </div>

          <div className="category-tabs">
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? "selected" : ""}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="empty-message">
            No items found. Try another search.
          </p>
        )}
      </section>
    </main>
  );
}
