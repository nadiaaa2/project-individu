"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

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

    setProducts([...products, newProduct]);
    setTotalPrice(totalPrice + hargaAkhir);
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
        </>
      ) : (
        <p className={styles.text}>Belum ada produk yang ditambahkan.</p>
      )}
    </div>
  );
}
