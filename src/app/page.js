"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const saveDataToLocalStorage = (products, totalPrice) => {
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
  };

  const loadDataFromLocalStorage = () => {
    const storedProducts = localStorage.getItem("products");
    const storedTotalPrice = localStorage.getItem("totalPrice");
    return {
      products: storedProducts ? JSON.parse(storedProducts) : [],
      totalPrice: storedTotalPrice ? JSON.parse(storedTotalPrice) : 0,
    };
  };

  const { products: initialProducts, totalPrice: initialTotalPrice } = loadDataFromLocalStorage();
  const [products, setProducts] = useState(initialProducts);
  const [productName, setProductName] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [totalPrice, setTotalPrice] = useState(initialTotalPrice);

  const addProduct = () => {
    if (!productName || isNaN(originalPrice) || isNaN(discount)) {
      alert("Input tidak valid! Harap isi semua field dengan benar.");
      return;
    }

    const hargaAkhir = calculateDiscountPrice(parseFloat(originalPrice), parseFloat(discount));

    const newProduct = {
      name: productName,
      hargaAwal: parseFloat(originalPrice),
      diskon: parseFloat(discount),
      hargaAkhir: hargaAkhir,
    };

    const updatedProducts = [...products, newProduct];
    const updatedTotalPrice = totalPrice + hargaAkhir;

    setProducts(updatedProducts);
    setTotalPrice(updatedTotalPrice);

    saveDataToLocalStorage(updatedProducts, updatedTotalPrice);

    setProductName("");
    setOriginalPrice("");
    setDiscount("");
  };

  const calculateDiscountPrice = (hargaAwal, diskon) => {
    if (diskon < 0 || diskon > 100) {
      alert("Persentase diskon harus antara 0% - 100%");
      return hargaAwal;
    }
    return hargaAwal - (hargaAwal * (diskon / 100));
  };

  const clearAllData = () => {
    setProducts([]);
    setTotalPrice(0);
    localStorage.removeItem("products");
    localStorage.removeItem("totalPrice");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Aplikasi Penghitung Diskon</h1>

      <div className={styles.inputContainer}>
        <input
          className={styles.inputField}
          type="text"
          placeholder="Nama Produk"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          className={styles.inputField}
          type="number"
          placeholder="Harga Awal"
          value={originalPrice}
          onChange={(e) => setOriginalPrice(e.target.value)}
        />
        <input
          className={styles.inputField}
          type="number"
          placeholder="Diskon (%)"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />
        <button className={styles.button} onClick={addProduct}>
          Tambah Produk
        </button>
      </div>

      {products.length > 0 ? (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Produk</th>
                <th>Harga Awal</th>
                <th>Diskon (%)</th>
                <th>Harga Akhir</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>Rp {product.hargaAwal}</td>
                  <td>{product.diskon}%</td>
                  <td>Rp {product.hargaAkhir}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.totalPrice}>Total Harga Keseluruhan: Rp {totalPrice}</div>
          <button className={styles.button} onClick={clearAllData}>
            Hapus Semua Data
          </button>
        </>
      ) : (
        <p className={styles.text}>Belum ada produk yang ditambahkan.</p>
      )}
    </div>
  );
}
