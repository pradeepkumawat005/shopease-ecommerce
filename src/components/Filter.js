import React from 'react';
import { useState } from 'react';


export const Filter = ({
  categories,
  brands,
  filters,
  setFilters
}) => {

    const [activeSection, setActiveSection] = useState("category");

    const toggleSection = (section) => {
        setActiveSection(prev => (prev === section ? null : section));
    };

    const [showAllCategory, setShowAllCategory] = useState(false);
    const [showAllBrand, setShowAllBrand] = useState(false);
   
    const visibleCategories = showAllCategory
  ? categories
  : categories.slice(0, 10);

    const visibleBrands = showAllBrand
    ? brands
    : brands.slice(0, 10);
    // ✅ Checkbox handler
    const handleCheckbox = (type, value) => {
        setFilters((prev) => {
        const exists = prev[type].includes(value);

        return {
            ...prev,
            [type]: exists
            ? prev[type].filter((item) => item !== value)
            : [...prev[type], value]
        };
        });
    };

  // ✅ Price handlers
  const handleMinPrice = (e) => {
    const val = Number(e.target.value);
    if (val <= filters.maxPrice) {
      setFilters(prev => ({ ...prev, minPrice: val }));
    }
  };

  const handleMaxPrice = (e) => {
    const val = Number(e.target.value);
    if (val >= filters.minPrice) {
      setFilters(prev => ({ ...prev, maxPrice: val }));
    }
  };

  // ✅ Range %
  const minPercent = (filters.minPrice / 2000) * 100;
  const maxPercent = (filters.maxPrice / 2000) * 100;

  return (
    <div className='filter-wrapper'>

      {/* CATEGORY */}
  
<div className='accordion-item'>
      <div className='accordion-header' onClick={() => toggleSection("category")}>

  <h4>Category</h4>
      </div>
   <div className={`accordion-content ${activeSection === "category" ? "open" : ""}`}>
  <ul>
    {visibleCategories.map((cat, i) => (
      <li key={i}>
        <label>
          <input
            type="checkbox"
            checked={filters.category.includes(cat)}
            onChange={() => handleCheckbox("category", cat)}
          />
          {cat}
        </label>
      </li>
    ))}
  </ul>

  {/* 🔥 SHOW MORE BUTTON */}
  {categories.length > 10 && (
    <button
      className="show-more-btn"
      onClick={() => setShowAllCategory(prev => !prev)}
    >
      {showAllCategory ? "Show Less" : "Show More"}
    </button>
  )}
  </div>
</div>

<div className='accordion-item'>

 
      <div className='accordion-header' onClick={() => toggleSection("brand")}>


  <h4>Brand</h4>
  </div>
 

  <div className={`accordion-content ${activeSection === "brand" ? "open" : ""}`}>
  <ul>
    {visibleBrands.map((brand, i) => (
      <li key={i}>
        <label>
          <input
            type="checkbox"
            checked={filters.brand.includes(brand)}
            onChange={() => handleCheckbox("brand", brand)}
          />
          {brand}
        </label>
      </li>
    ))}
  </ul>


  {/* 🔥 SHOW MORE BUTTON */}
  {brands.length > 10 && (
    <button
      className="show-more-btn"
      onClick={() => setShowAllBrand(prev => !prev)}
    >
      {showAllBrand ? "Show Less" : "Show More"}
    </button>
  )}
  </div>
</div>

      {/* PRICE RANGE */}
      <div className='filter-group'>
  <h4>Price Range</h4>
    <div className="price-values">
    <span>${filters.minPrice}</span>
    <span>${filters.maxPrice}</span>   
  </div>
  <div className="range-wrapper">

    {/* Track */}
    <div className="range-track"></div>

    {/* Active Range */}
    <div
      className="range-active"
      style={{
        left: `${minPercent}%`,
        width: `${maxPercent - minPercent}%`
      }}
    ></div>

    <input
      type="range"
      min="0"
      max="2000"
      value={filters.minPrice}
      onChange={handleMinPrice}
      className="range-input"
    />

    <input
      type="range"
      min="0"
      max="2000"
      value={filters.maxPrice}
      onChange={handleMaxPrice}
      className="range-input"
    />

  </div>
</div>
    </div>
  );
};