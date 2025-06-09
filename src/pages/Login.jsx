import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(false);
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [btnDisable, setBtnDisable] = useState(false);

  const login = async (e) => {
    e.preventDefault();

    if (!phone || !password || !role) {
      toast.error("Please enter all details!");
      return;
    }

    setBtnDisable(true);

    try {
      const response = await fetch("https://banquet-seven.vercel.app/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
          role: role.toLowerCase(), // ensure lowercase to match backend
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Login successful!");
        localStorage.setItem("currentUser", true);
        localStorage.setItem("phone", phone);
        localStorage.setItem("role", role);
        navigate("/");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error("Server error. Please try again.");
    }

    setBtnDisable(false);
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/", { replace: true });
    }
  }, [currentUser, navigate]);

  return (
    <>
      <Toaster />
      <div
        style={{
          backgroundImage:
            "url(https://dinner-bell-dp.vercel.app/assets/dinnerbell-Bsbo5yuD.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="bg-white bg-opacity-90 rounded-xl shadow-lg max-w-md w-full p-8 mx-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-red-800">
            Banquet Hall Booking
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Login to book or manage your events
          </p>
          <form onSubmit={login} className="space-y-4">
            <div>
              <label className="block mb-1 text-gray-700">Phone Number</label>
              <input
                type="tel"
                placeholder="+91XXXXXXXXXX"
                className="input input-bordered w-full"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Role</label>
              <select
                className="select select-bordered w-full"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="subadmin">SubAdmin</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={btnDisable}
              className="btn w-full bg-red-700 hover:bg-red-800 text-white"
            >
              {btnDisable ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
