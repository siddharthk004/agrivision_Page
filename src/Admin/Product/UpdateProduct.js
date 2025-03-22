import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Axios from "../../Axios";
import Navbar from "../Header/Navbar";

function UpdateProduct() {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [productSuggestions, setProductSuggestions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    productname: "",
    productcompanyname: "",
    category: "",
    discount: "",
    beforediscount: "",
    afterdiscount: "",
    quantity: "",
    productimage: null,
  });

  // Handle product search
  useEffect(() => {
    if (searchQuery.length > 1) {
      Axios()
        .get(`/user/search/${searchQuery}`)
        .then((res) => setProductSuggestions(res.data))
        .catch();
    } else {
      setProductSuggestions([]);
    }
  }, [searchQuery]);

  // Handle product selection & auto-fill fields using search data
  const handleProductSelect = (product) => {
    setSearchQuery(product.productname);
    setProductSuggestions([]);
    setSelectedProduct(product.id);

    // Use the data directly from search results to auto-fill form
    setFormData({
      productname: product.productname,
      productcompanyname: product.productcompanyname,
      category: product.category,
      discount: product.discount,
      beforediscount: product.beforediscount,
      afterdiscount: product.afterdiscount,
      quantity: product.quantity,
      productimage: null, // Image should be manually re-uploaded
    });
  };
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, productimage: e.target.files[0] }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();

    // Append only non-empty text fields as key-value pairs
    for (const key in formData) {
      if (key !== "productimage" && formData[key]) {
        data.append(key, formData[key]);
      }
    }

    // Append image file if selected
    if (formData.productimage) {
      data.append("productimage", formData.productimage);
    }

    try {
      await Axios().post(`/admin/updateproduct/${selectedProduct}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Product Updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } catch (error) {
      
      toast.error("Failed to update product.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      <Navbar />
      {/* Main Content */}
      <div className="p-2">
        <div className="w-10 d-flex start-0 gap-1 justify-content-start">
          <i class="fa-solid fa-house mr-2"></i>
          <h6 className="">
            <small>Product</small>
          </h6>
          <h6 className="">
            <small>/</small>
          </h6>
          <h6 className="">
            <small>Update</small>
          </h6>
        </div>
      </div>
      <div className="container p-1 pt-4">
        <div className="card shadow-lg p-4">
          <h2 className="text-center text-primary fw-bold">Update Product</h2>
          <form onSubmit={handleSubmit}>
            {/* Product Search & Dropdown */}
            <div className="mb-3">
              <label className="form-label fw-bold d-flex">Search Product<h6 className="text-danger">*</h6></label>
              <input
                type="text"
                className="form-control"
                placeholder="Type product name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {productSuggestions.length > 0 && (
                <ul className="list-group p-1 mt-1">
                  {productSuggestions.map((product) => (
                    <li
                      key={product.id}
                      className="list-group-item list-group-item-action bg-body-secondary "
                      onClick={() => handleProductSelect(product)}
                    >
                      {product.productname}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Auto-filled & Editable Fields */}
            <div className="mb-3">
              <label className="form-label fw-bold">Product Name</label>
              <input
                type="text"
                className="form-control"
                name="productname"
                value={formData.productname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Company Name:</label>
              <input
                type="text"
                className="form-control"
                name="productcompanyname"
                value={formData.productcompanyname}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Product Image:</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">New Price:</label>
                <input
                  type="number"
                  className="form-control"
                  name="afterdiscount"
                  value={formData.afterdiscount}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Product Quantity:</label>
                <input
                  type="number"
                  className="form-control"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Discount (%):</label>
              <input
                type="number"
                className="form-control"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
              />
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-between mt-3">
              <button type="reset" className="btn btn-secondary">
                Clear
              </button>
              <button
                type="submit"
                className="btn btn-success"
                disabled={loading}
              >
                {loading ? (
                  <span className="spinner-border spinner-border-sm"></span>
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
