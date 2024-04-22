// pages/product-table.js
"use client";

import CustomTable from "../Table";

const ProductTablePage = () => {
  const productColumns = [
    { key: "productId", label: "Product ID" },
    { key: "productName", label: "Product Name" },
    { key: "price", label: "Price" },
    { key: "team", label: "team" },
  ];

  const productData = [
    { productId: 101, productName: "Widget", price: "$25", team: "arsenal" },
    { productId: 102, productName: "Gadget", price: "$50", team: "arsenal" },
  ];

  return (
    <div>
      <h2 className="uppercase">Team</h2>
      <CustomTable columns={productColumns} data={productData} />
    </div>
  );
};

export default ProductTablePage;
