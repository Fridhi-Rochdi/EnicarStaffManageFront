import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HOME } from "../routes";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    // Add login logic here
  };

  return (
    <React.Fragment>
      <div className="flex flex-col justify-center font-[sans-serif] h-screen p-4">
        <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
          <div className="text-center mb-12">
            <div className="flex flex-col items-center ">
              <span className="text-orange-500 text-3xl font-sans font-bold my-auto">
                ENI<span className="text-blue-400">CARTHAGE</span>
              </span>
              <div className="text-gray-500 text-sm relative -top-2 left-14">
                STAFF-Manage
              </div>
            </div>
          </div>

          <form onSubmit={handleLogin}>
            <div className="space-y-6">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Email{" "}
                </label>
                <input
                  name="email"
                  type="email"
                  value={email}
                  autoComplete="username"
                  onChange={(event) => { setEmail(event.target.value); }}
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  value={password}
                  autoComplete="password"
                  onChange={(event) => { setPassword(event.target.value); }}
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter password"
                />
              </div>
            </div>

            <div className="mt-12 flex text-center justify-center ">
              <Link to={HOME}
                type="submit"
                className="w-full py-3 px-4 text-md tracking-widest font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-800 focus:outline-none"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;
