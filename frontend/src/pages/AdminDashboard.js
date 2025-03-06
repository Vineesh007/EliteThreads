import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './AdminDashboard.css'; // Import CSS for better styling

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    description: '',
    stock: '',
    image: null,
    seller: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/v1/products');
      setProducts(data.products);
    } catch (error) {
      toast.error('Failed to fetch products');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/product/${id}`);
      toast.success('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', productForm.name);
    formData.append('price', productForm.price);
    formData.append('description', productForm.description);
    formData.append('stock', productForm.stock);
    formData.append('seller', productForm.seller);
    if (productForm.image) {
      formData.append('image', productForm.image);
    }

    try {
      if (editingProduct) {
        await axios.put(`http://localhost:5000/api/v1/product/${editingProduct._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Product updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/v1/product', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Product added successfully');
      }
      setEditingProduct(null);
      setProductForm({ name: '', price: '', description: '', stock: '', image: null, seller: '' });
      fetchProducts();
    } catch (error) {
      toast.error('Failed to save product');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setProductForm({ ...product, image: null });
  };

  return (
    <div className="admin-dashboard">
      <h1 className="title">Admin Dashboard</h1>

      {/* Add/Edit Product Form */}
      <div className="form-container">
        <h2>{editingProduct ? "Edit Product" : "Add New Product"}</h2>
        <form onSubmit={handleSaveProduct} className="product-form">
          <div className="form-group">
            <label>Product Name</label>
            <input type="text" value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} required />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input type="number" value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: e.target.value })} required />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea value={productForm.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} required />
          </div>

          <div className="form-group">
            <label>Stock</label>
            <input type="number" value={productForm.stock} onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })} required />
          </div>

          <div className="form-group">
            <label>Seller</label>
            <input type="text" value={productForm.seller} onChange={(e) => setProductForm({ ...productForm, seller: e.target.value })} required />
          </div>

          <div className="form-group">
            <label>Product Image</label>
            <input type="file" accept="image/*" onChange={(e) => setProductForm({ ...productForm, image: e.target.files[0] })} required={!editingProduct} />
          </div>

          <button type="submit" className="btn-submit">{editingProduct ? "Update Product" : "Add Product"}</button>
        </form>
      </div>

      {/* Product List */}
      <div className="product-list">
        <h2>Product List</h2>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td><img src={`http://localhost:5000${product.images[0]?.image}`} alt={product.name} className="product-image" /></td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <button onClick={() => handleEdit(product)} className="btn-edit">Edit</button>
                  <button onClick={() => handleDelete(product._id)} className="btn-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
