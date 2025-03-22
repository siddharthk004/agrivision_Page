import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Axios from "../../Axios";
import Navbar from "../Header/Navbar";

function AddProduct() {
  const [loading, setLoading] = useState(false); // Track loading state
  const [formData, setFormData] = useState({
    productname: "",
    productcompanyname: "",
    productimage: null,
    category: "",
    discount: "",
    beforediscount: "",
    afterdiscount: "",
    quantity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, productimage: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    const data = new FormData();
    data.append("productname", formData.productname);
    data.append("productcompanyname", formData.productcompanyname);
    data.append("productimage", formData.productimage);
    data.append("category", formData.category);
    data.append("discount", formData.discount);
    data.append("beforediscount", formData.beforediscount);
    data.append("afterdiscount", formData.afterdiscount);
    data.append("quantity", formData.quantity);

    try {
      const response = await Axios().post("/admin/addproduct", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Product added successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } catch (error) {
      toast.error("Failed to add product.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };
  return (
    <div style={{ height: "98vh" }}>
      <Navbar />
      <ToastContainer />
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
            <small>Add</small>
          </h6>
        </div>
      </div>

      <div className="container">
        <div className="card shadow-lg p-4">
          <h2 className="text-center text-success fw-bold">Add New Product</h2>
          <form onSubmit={handleSubmit}>
            {/* Product Name */}
            <div className="mb-3">
              <label className="form-label fw-bold d-flex">
                Product Name<h6 className="text-danger">*</h6>
              </label>
              <input
                type="text"
                className="form-control"
                name="productname"
                onChange={handleChange}
                required
                placeholder="Enter product name"
              />
            </div>

            {/* Product Company Name */}
            <div className="mb-3">
              <label className="form-label fw-bold d-flex">
                Company Name<h6 className="text-danger">*</h6>
              </label>
              <input
                type="text"
                name="productcompanyname"
                onChange={handleChange}
                required
                className="form-control"
                placeholder="Enter company name"
              />
            </div>

            {/* Product Image Upload */}
            <div className="mb-3">
              <label className="form-label fw-bold d-flex">
                Product Image<h6 className="text-danger">*</h6>
              </label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                name="productimage"
                onChange={handleFileChange}
                required
              />
            </div>

            {/* Product Prices */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold d-flex">
                  Before Discount Price<h6 className="text-danger">*</h6>
                </label>
                <input
                  type="number"
                  name="beforediscount"
                  onChange={handleChange}
                  required
                  className="form-control"
                  placeholder="Enter price before discount"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold d-flex">
                  After Discount Price <h6 className="text-danger">*</h6>
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="afterdiscount"
                  onChange={handleChange}
                  required
                  placeholder="Enter price after discount"
                />
              </div>
            </div>

            {/* Product Quantity & Discount */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label d-flex fw-bold">
                  Quantity<h6 className="text-danger">*</h6>
                </label>
                <input
                  type="number"
                  name="quantity"
                  onChange={handleChange}
                  required
                  className="form-control"
                  placeholder="Enter product quantity"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold d-flex">
                  Discount (%)<h6 className="text-danger">*</h6>
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="discount"
                  onChange={handleChange}
                  required
                  placeholder="Enter discount percentage"
                />
              </div>
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
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
