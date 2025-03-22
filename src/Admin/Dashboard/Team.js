import React from "react";
import Navbar from "../Header/Navbar";

function Team() {
  return (
    <div className="">
      <Navbar />

      {/* Main Content */}
      <div className="p-2">
        <div className="w-10 d-flex start-0 gap-1 justify-content-start">
          <i class="fa-solid fa-house mr-2"></i>
          <h6 className="">Dashboard</h6>
          <h6 className="">/</h6>
          <h6 className="">
            <small>Team</small>
          </h6>
        </div>

        {/* Team Members */}
        <div className="row justify-content-center">
          {/* Team Member 1 */}
          <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="card shadow-sm p-3">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLKQtr9KpLhx5tt0KgRpSqiz3IC79mwxt-io1IJa2qwxVwJp_Rx49n-pOsMEBiZwRS0fA&usqp=CAU"
                className="img-fluid rounded-circle mx-auto d-block"
                style={{ width: "100px", height: "100px" }}
                alt="Profile"
              />
              <div className="card-body text-center">
                <h5 className="fw-bold">Siddharth Kardile</h5>
                <p className="text-muted">Full Stack Developer</p>
                <p className="text-justify">
                  I am a Full Stack Developer passionate about building scalable
                  and efficient web applications. With expertise in{" "}
                  <b>Spring Boot, React, and MySQL</b>, I create seamless
                  backend and frontend solutions.
                </p>
              </div>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="card shadow-sm p-3">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4b1WaNo11P1XY5KRRfHu1OJSbuVJ0SjK-DrAklnuLEuvZ2BdQ5J74FmifNIftkKhzZbQ&usqp=CAU"
                className="img-fluid rounded-circle mx-auto d-block"
                style={{ width: "100px", height: "100px" }}
                alt="Profile"
              />
              <div className="card-body text-center">
                <h5 className="fw-bold">Sakshi Ladkat</h5>
                <p className="text-muted">Backend Developer</p>
                <p className="text-justify">
                  I am a Backend Developer focused on building scalable APIs and
                  microservices using <b>Spring Boot</b>. I am pursuing an MSc
                  in Scientific Computing, which enhances my analytical skills.
                  Always eager to learn and adapt.
                </p>
              </div>
            </div>
          </div>

          {/* Team Member 3 */}
          <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="card shadow-sm p-3">
              <img
                src="https://content.wepik.com/statics/20247451/preview-page4.jpg"
                className="img-fluid rounded-circle mx-auto d-block"
                style={{ width: "100px", height: "100px" }}
                alt="Profile"
              />
              <div className="card-body text-center">
                <h5 className="fw-bold">Atharva Khaladkar</h5>
                <p className="text-muted">Frontend Developer</p>
                <p className="text-justify">
                  I specialize in building modern UI/UX experiences using{" "}
                  <b>React.js</b> and responsive design techniques. I am
                  pursuing an MSc in Scientific Computing, which enhances my
                  analytical skills.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Helper Team */}
      <div className="row justify-content-center mt-4">
        <h4 className="text-center fw-bold mb-3">Helper Team</h4>

        {/* Helper Member 1 */}
        <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
          <div className="card shadow-sm p-3">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm8jHa9C40p1JpTDW4A7vacUzMJbKKkJG0NQ&s"
              className="img-fluid rounded-circle mx-auto d-block"
              style={{ width: "80px", height: "80px" }}
              alt="Profile"
            />
            <div className="card-body text-center">
              <h6 className="fw-bold">Rahul Sharma</h6>
              <p className="text-muted">Field Coordinator</p>
            </div>
          </div>
        </div>

        {/* Helper Member 2 */}
        <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
          <div className="card shadow-sm p-3">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7yeTsAtKrMp8uAdgkEcdpt7zCa5CONrricQ&s"
              className="img-fluid rounded-circle mx-auto d-block"
              style={{ width: "80px", height: "80px" }}
              alt="Profile"
            />
            <div className="card-body text-center">
              <h6 className="fw-bold">Priya Joshi</h6>
              <p className="text-muted">Agriculture Expert</p>
            </div>
          </div>
        </div>

        {/* Helper Member 3 */}
        <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
          <div className="card shadow-sm p-3">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuZ8dJ4eHBjO8e_sUP6nVwsQXlmC4k8-fsMQ&s"
              className="img-fluid rounded-circle mx-auto d-block"
              style={{ width: "80px", height: "80px" }}
              alt="Profile"
            />
            <div className="card-body text-center">
              <h6 className="fw-bold">Vikas Patil</h6>
              <p className="text-muted">Logistics Manager</p>
            </div>
          </div>
        </div>

        {/* Helper Member 4 */}
        <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
          <div className="card shadow-sm p-3">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9Dm5LX900Mttdr3wwhR6GqjZmMn1hsmEXTQ&s"
              className="img-fluid rounded-circle mx-auto d-block"
              style={{ width: "80px", height: "80px" }}
              alt="Profile"
            />
            <div className="card-body text-center">
              <h6 className="fw-bold">Sneha Deshmukh</h6>
              <p className="text-muted">Customer Support</p>
            </div>
          </div>
        </div>

        {/* Helper Member 5 */}
        <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
          <div className="card shadow-sm p-3">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZzixRXWtOUUW5hbDE09HBtG1fURpI2yFdQw&s"
              className="img-fluid rounded-circle mx-auto d-block"
              style={{ width: "80px", height: "80px" }}
              alt="Profile"
            />
            <div className="card-body text-center">
              <h6 className="fw-bold">Amit Goyal</h6>
              <p className="text-muted">Operations Executive</p>
            </div>
          </div>
        </div>
        {/* Helper Member 6 */}
        <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
          <div className="card shadow-sm p-3">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH5sFjZPx1Yzi1b9_FpQzrxqgsjv2DPAp81Q&s"
              className="img-fluid rounded-circle mx-auto d-block"
              style={{ width: "80px", height: "80px" }}
              alt="Profile"
            />
            <div className="card-body text-center">
              <h6 className="fw-bold">Neha Verma</h6>
              <p className="text-muted">Finance Assistant</p>
            </div>
          </div>
        </div>

        {/* Helper Member 7 */}
        <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
          <div className="card shadow-sm p-3">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVQESaKXUs1TS_lGe3HWrXR1CC2iZTupXXtQ&s"
              className="img-fluid rounded-circle mx-auto d-block"
              style={{ width: "80px", height: "80px" }}
              alt="Profile"
            />
            <div className="card-body text-center">
              <h6 className="fw-bold">Rohan Kulkarni</h6>
              <p className="text-muted">IT Support</p>
            </div>
          </div>
        </div>

        {/* Helper Member 8 */}
        <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
          <div className="card shadow-sm p-3">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP9mPGPoE25haZZUIzyem1bIsjMlYSWd-RLw&s"
              className="img-fluid rounded-circle mx-auto d-block"
              style={{ width: "80px", height: "80px" }}
              alt="Profile"
            />
            <div className="card-body text-center">
              <h6 className="fw-bold">Pooja Nair</h6>
              <p className="text-muted">Community Manager</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;
