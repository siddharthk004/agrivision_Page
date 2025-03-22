import React from "react";
import { Route, Routes } from "react-router-dom";
import AboutUs from "./components/aboutUs/about";
import Contact from "./components/contact/contact";
import LoginPage from "./components/Login/Login";
import SignUpPage from "./components/Login/Register";
import Details from "./components/product/Details";
import Product from "./components/product/index";
import ProfilePage from "./components/userProfile/profile";
import Home from "./pages/Home/index";
import SearchResults from "./pages/searchResult";

import ManageAdd from "./Admin/AdManageMent/ManageAdd";
import ManageLogo from "./Admin/AdManageMent/ManageLogo";
import HomeAdmin from "./Admin/Dashboard/Home";
import Setting from "./Admin/Dashboard/Setting";
import Team from "./Admin/Dashboard/Team";
import SupportRequest from "./Admin/HelpDesk/SupportRequest";
import HomePage from "./Admin/HomePage";
import AdminDashboard from "./Admin/Layout/AdminDashboard";
import AdminLoginPage from "./Admin/Login/AdminLoginPage";
import AddProduct from "./Admin/Product/AddProduct";
import StockView from "./Admin/Product/StockView";
import UpdateProduct from "./Admin/Product/UpdateProduct";
import ViewProduct from "./Admin/Product/ViewProduct";
import OrderHistory from "./Admin/Order/OrderHistory";
import OrderManagement from "./Admin/Order/OrderManagement";

const App = () => {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="Details" element={<Details />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="contact" element={<Contact />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/profile" element={<ProfilePage />} />

        <Route path="AdminLogin" element={<AdminLoginPage />} />
        <Route path="AdminHome" element={<HomePage />} />
        {/* <Route path="/admin" element={<AdminDashboard />}> */}
          
        <Route path="/admin/*" element={<AdminDashboard />}>
          <Route path="home" element={<HomeAdmin />} />
          <Route path="team" element={<Team />} />
          <Route path="setting" element={<Setting />} />

          <Route path="Product/add" element={<AddProduct />} />
          <Route path="Product/update" element={<UpdateProduct />} />
          <Route path="Product/view" element={<ViewProduct />} />
          <Route path="Product/stock" element={<StockView />} />

          <Route path="AddManagement/Add" element={<ManageAdd />} />
          <Route path="AddManagement/Logo" element={<ManageLogo />} />
          <Route path="HelpDesk/OrderManagement" element={<OrderManagement />} />
          <Route path="HelpDesk/Orderhistory" element={<OrderHistory />} />
          <Route path="HelpDesk/SupportRequest" element={<SupportRequest />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
