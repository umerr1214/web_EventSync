import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "", role: "student" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(form.email, form.password, form.role);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-200">

      <h1 className="text-4xl md:text-5xl font-brand tracking-widest uppercase bg-emerald-500 bg-clip-text text-transparent mb-8">
        Register
      </h1>

      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-700">

        {error && (
          <p className="text-red-400 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <select
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="student">Student</option>
            <option value="society">Society Head</option>
          </select>

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-700 text-white p-3 rounded-lg transition"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-400 hover:underline">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Register;
