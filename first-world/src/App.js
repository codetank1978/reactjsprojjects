import "./App.css";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";
import React, { useState } from "react";
import AppItem from "./components/AddItem";

function App() {
  let products = [
    {
      name: "IPhone 10S Max",
      price: 99999,
      quantity: 0,
    },
    {
      name: "Samsung Galaxy S10",
      price: 68999,
      quantity: 0,
    },
    {
      name: "Realme Pro 10",
      price: 48999,
      quantity: 0,
    },
  ];

  // Hook for updating Products
  let [productList, setProductList] = useState(products);
  let [totalAmount, setTotalAmount] = useState(0);

  const incrementQuantity = (index) => {
    // Copy the contents of the list using spread operator
    let newProducts = [...productList];
    newProducts[index].quantity++;
    calculateTotalAmount();
    setProductList(newProducts);
  };

  const decrementQuantity = (index) => {
    let newProducts = [...productList];
    if (newProducts[index].quantity > 0) {
      newProducts[index].quantity--;
    }
    calculateTotalAmount();
    setProductList(newProducts);
  };

  const calculateTotalAmount = () => {
    let total = 0;
    productList.map((product) => {
      total += product.quantity * product.price;
    });
    setTotalAmount(total);
  };

  const resetCart = () => {
    let newProducts = [...productList];
    newProducts.map((product) => {
      product.quantity = 0;
    });
    setProductList(newProducts);
    calculateTotalAmount();
  };

  const removeItem = (index) => {
    let newProducts = [...productList];
    newProducts.splice(index, 1);
    setProductList(newProducts);
    calculateTotalAmount();
  };

  const AddItem = (name, price) => {
    let newProducts = [...productList];
    newProducts.push({ name: name, price: price, quantity: 0 });
    setProductList(newProducts);
  };

  return (
    <>
      <Navbar></Navbar>
      <main className="container mt-5">
        <AppItem AddItem={AddItem}></AppItem>
        <ProductList
          productList={productList}
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
          removeItem={removeItem}
        ></ProductList>
      </main>
      <Footer totalAmount={totalAmount} resetCart={resetCart}></Footer>
    </>
  );
}

export default App;
