import React, { useContext, useEffect, useMemo, useState } from 'react';
import { listPageUrl } from '../baseUrl';
import { AppContext } from '../ContextApp/AppContext';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Card } from '../components/Card';
import '../components/Collections.css';
import { Pagination } from '../components/Pagination';
import { ProductSkeleton } from '../components/ProductSkeleton';
import { Filter } from '../components/Filter';

export const Collections = () => {

  const { products, loading, fetchProducts, page, setPages } = useContext(AppContext);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // ✅ SAFE PRODUCTS (MAIN FIX)
  const safeProducts = Array.isArray(products) ? products : [];

  // ✅ FILTER STATE (ARRAY BASED)
  const [filters, setFilters] = useState({
    category: [],
    brand: [],
    minPrice: 0,
    maxPrice: 2000
  });

  // ✅ UNIQUE VALUES
  const categories = [...new Set(safeProducts.map(p => p.category))];
  const brands = [...new Set(safeProducts.map(p => p.brand))];

  // ✅ FILTER LOGIC
  const filteredProducts = useMemo(() => {
    return safeProducts.filter((product) => {
      return (
        (filters.category.length
          ? filters.category.includes(product.category)
          : true) &&

        (filters.brand.length
          ? filters.brand.includes(product.brand)
          : true) &&

        product.price >= filters.minPrice &&
        product.price <= filters.maxPrice
      );
    });
  }, [safeProducts, filters]);

  // ✅ PAGINATION
  const itemPerPage = 20;
  const lastIndexPage = page * itemPerPage;
  const startIndexPage = lastIndexPage - itemPerPage;
  const totalPage = Math.ceil(filteredProducts.length / itemPerPage);

  const currentProducts = filteredProducts.slice(startIndexPage, lastIndexPage);

  // ✅ FETCH DATA
  useEffect(() => {
    if (location.pathname.includes("products")) {
      fetchProducts(`${listPageUrl}`);
      setSearchParams({ page: page });
    }
  }, [location.pathname, page]);

  return (
    <div className='product-ltp'>
      <div className='page-width'>
        <h2 className='title'>All Products</h2>

        <div className='main-wrapper'>

          {/* FILTER */}
          <div className='filter-wrapper-main'>
            <Filter
              setFilters={setFilters}
              brands={brands}
              filters={filters}
              categories={categories}
            />
          </div>

          {/* PRODUCTS */}
          <div className='grid grid-four-item'>
            {
              loading
                ? Array.from({ length: itemPerPage }).map((_, index) => (
                    <ProductSkeleton key={index} />
                  ))
                : currentProducts.map((product) => (
                    <Card key={product.id} product={product} />
                  ))
            }
          </div>

        </div>

        {/* PAGINATION */}
        <Pagination
          page={page}
          setPages={setPages}
          totalPage={totalPage}
        />

      </div>
    </div>
  );
};