import "bootstrap/dist/css/bootstrap.min.css";
import { default as React, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import Navbar from "../Header/Navbar";

function HomeAdmin() {
  const [tasks, setTasks] = useState([
    { text: "Review User Activity", completed: false },
    { text: "Manage User Permissions", completed: false },
    { text: "Monitor System Logs", completed: false },
    { text: "Update Dashboard Analytics", completed: false },
  ]);
  const [input, setInput] = useState("");
  const userDATA = [
    {
      page: "/Admin/Home",
      visitors: 510,
      uniqueUsers: 127,
      bounceRate: "5.14%",
    },
    {
      page: "/Admin/Board",
      visitors: 432,
      uniqueUsers: 98,
      bounceRate: "6.20%",
    },
    {
      page: "/Admin/Setting",
      visitors: 289,
      uniqueUsers: 76,
      bounceRate: "4.85%",
    },
    {
      page: "/Admin/Reports",
      visitors: 315,
      uniqueUsers: 85,
      bounceRate: "5.67%",
    },
    {
      page: "/Admin/Analytic",
      visitors: 256,
      uniqueUsers: 62,
      bounceRate: "6.10%",
    },
    {
      page: "/Admin/Setting",
      visitors: 289,
      uniqueUsers: 76,
      bounceRate: "4.85%",
    },
  ];
  const addTask = () => {
    
    if (input.trim()) {
      setTasks([...tasks, { text: input, completed: false }]);
      toast.success("Success", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      setInput("");
    }
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
    toast.warn("Deleted", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });

  };

  const data = [
    { name: "Jan", sales: 4000, profit: 2400 },
    { name: "Feb", sales: 3000, profit: 1398 },
    { name: "Mar", sales: 5000, profit: 9800 },
    { name: "Apr", sales: 2080, profit: 3908 },
    { name: "May", sales: 1890, profit: 4800 },
    { name: "Jun", sales: 2390, profit: 3800 },
    { name: "Jul", sales: 3490, profit: 4300 },
  ];

  const dataX = [
    { name: "Pesticide", value: 400 },
    { name: "BioFertilizer", value: 300 },
    { name: "Insecticide", value: 200 },
    { name: "Fertilizer", value: 100 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]; // Custom Colors

  return (
    <div>
      <Navbar />
      <ToastContainer />
      
      {/* Main Content */}
      <div className="p-2">
        <div className="w-10 d-flex start-0 gap-1 justify-content-start">
          <i class="fa-solid fa-house mr-2"></i>
          <h6 className="">Dashboard</h6>
          <h6 className="">/</h6>
          <h6 className="">
            <small>Home</small>
          </h6>
        </div>
        {/* Stats Cards */}
        <div className="row">
          {[
            {
              title1: "Weekly Sales",
              title3: "Since Last Month",
              title2: "50238",
              value: "8.24%",
              color: "linear-gradient(90deg, #d5e5f5, #93c8fa)",
              imageURL:
                "https://png.pngitem.com/pimgs/s/520-5201007_circle-hd-png-download.png",
            },
            {
              title1: "New Users",
              title3: "Since Last Month",
              title2: "2743",
              value: "2.57%",
              color: "linear-gradient(90deg, #f0d4ff,#da9dfa)",
              imageURL:
                "https://i.pinimg.com/736x/6b/4f/d2/6b4fd241ab4046ff41ca5ace665f44a7.jpg",
            },
            {
              title1: "Purchase Order",
              title3: "Since Last Month",
              title2: "2038",
              value: "5.14%",
              color: "linear-gradient(90deg, #e2faca, #c3f590)",
              imageURL:
                "https://i.pinimg.com/736x/fb/17/e7/fb17e706bf3eef73396e7db08585468f.jpg",
            },
            {
              title1: "Messages",
              title3: "Since Last Month",
              title2: "3438",
              value: "9.58%",
              color: "linear-gradient(90deg, #fad7dc, #fca9b6)",
              imageURL:
                "https://i.pinimg.com/736x/30/19/5b/30195bd92a700b31793c915f07e3c926.jpg",
            },
          ].map((item, index) => (
            <div className="col-md-3 " key={index}>
              <div
                style={{ background: item.color }}
                className="card border-0 text-dark p-3"
              >
                <div className="d-flex">
                  <div className="w-50">
                    <h6 className=" text-body-tertiary">{item.title1}</h6>
                    <h4>{item.title2}</h4>
                  </div>
                  <div className="w-50">
                    <img
                      src={item.imageURL}
                      className="rounded-circle float-end"
                      style={{ width: "50px", height: "auto" }}
                    ></img>
                  </div>
                </div>
                <br />
                <div className="d-flex align-baseline gap-4">
                  <h6 className="text-success">
                    <i class="fa-solid fa-arrow-up"></i>
                    {item.value}
                  </h6>
                  <h6>{item.title3}</h6>
                  <h6></h6>
                  <h6> </h6>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex gap-2" style={{ paddingTop: "20px" }}>
          {/* Line Chart: Sales & Profit Analysis */}
          <div
            className="bg-white p-4 rounded shadow "
            style={{ width: "800px" }}
          >
            <h4 className="text-center text-primary mb-3">
              Sales & Profit Analysis
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#82ca9d"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div
            className="bg-white p-4 rounded shadow "
            style={{ width: "450px" }}
          >
            <h4 className="text-center text-primary mb-3">
              Product Sale Analysis
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dataX} // ✅ Use dataX instead of data
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {dataX.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="d-flex gap-2" style={{ paddingTop: "20px" }}>
          <div className=" w-50 bg-white rounded border-2 p-2">
            <div className="d-flex justify-content-between border-bottom">
              <h4 className="m-2">Page Visits</h4>
              <button className="p-1 m-1 rounded bg-primary text-white  border-0">
                See all
              </button>
            </div>
            <div className="d-flex bg-body-secondary text-secondary border-bottom text-center">
              <h6 className="flex-grow-1">
                <small>Page Name</small>
              </h6>
              <h6 className="flex-grow-1">
                <small>Visitors</small>
              </h6>
              <h6 className="flex-grow-1">
                <small>Unique Users</small>
              </h6>
              <h6 className="flex-grow-1">
                <small>Bounce Rate</small>
              </h6>
            </div>
            {userDATA.map((data, index) => (
              <div className="d-flex bg-white p-2 border-bottom text-center">
                <h6 className="w-23">{data.page}</h6>
                <h6 className="w-25">{data.visitors}</h6>
                <h6 className="w-25">{data.uniqueUsers}</h6>
                <h6
                  className={`w-25 ${
                    index % 2 === 0 ? "text-success" : "text-danger"
                  }`}
                >
                  <i
                    className={`fa-solid ${
                      index % 2 === 0 ? "fa-arrow-up" : "fa-arrow-down"
                    } me-2`}
                  ></i>
                  {data.bounceRate}
                </h6>
              </div>
            ))}
          </div>
          <div className="bg-white p-4 rounded shadow w-50">
            <h4 className="text-center text-primary mb-3">🎯 To-Do List</h4>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Add a new task..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button className="btn btn-success" onClick={addTask}>
                Add
              </button>
            </div>

            <ul className="list-group">
              {tasks.map((task, index) => (
                <li
                  key={index}
                  className={`list-group-item d-flex justify-content-between align-items-center ${
                    task.completed ? "bg-success text-white" : "bg-light"
                  }`}
                >
                  <span
                    style={{
                      textDecoration: task.completed ? "line-through" : "none",
                      cursor: "pointer",
                    }}
                    onClick={() => toggleTask(index)}
                  >
                    {task.text}
                  </span>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteTask(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Balance Card */}
        <div
          className="w-25 p-4 m-4 rounded-4 shadow text-white"
          style={{
            background: "linear-gradient(135deg, #1e2a78, #0f172a)",
          }}
        >
          <h3 className="mb-2">2,30,000 RS</h3>
          <p className="mb-2">Your current balance</p>
          <p className="text-success fw-bold">+ 15% (2,50,000 RS) </p>
          <button className="btn btn-light w-100">Add Credit</button>
          <div className="mt-3"></div>
        </div>
      </div>
      <h6>
        <small>@2025 AgriVision Team</small>
      </h6>
    </div>
  );
}

export default HomeAdmin;
