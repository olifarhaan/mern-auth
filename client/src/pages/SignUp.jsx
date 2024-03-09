import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { toast } from "react-toastify"
import { isValidEmail } from "../../../api/utils/validEmail"
import { FaEyeSlash, FaEye } from "react-icons/fa"

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.id]:
        e.target.id === "name" ? e.target.value : e.target.value.trim(),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.password === ""
    ) {
      toast.error("All fields are required")
      setLoading(false)
      return
    }

    if (!isValidEmail(formData.email)) {
      toast.error("Enter a valid email")
      setLoading(false)
      return
    }

    if (formData.password.includes(" ")) {
      toast.error("Whitespaces are not allowed in passwords")
      setLoading(false)
      return
    }

    try {
      const res = await fetch("/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const responseJSON = await res.json()
      if (res.ok && responseJSON.success) {
        navigate("/sign-in")
      } else {
        toast.error(responseJSON.message)
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-2">
      <div className="max-w-sm rounded-sm shadow-inner mx-auto p-3 my-16 flex flex-col gap-3 border bg-white">
        <h1 className="text-center">Sign Up</h1>
        <form
          className="w-full flex flex-col gap-3"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            id="name"
            placeholder="Full name"
            autoComplete="name"
            onChange={handleChange}
            value={formData.name}
          />
          <input
            type="text"
            id="email"
            placeholder="Email"
            autoComplete="email"
            onChange={handleChange}
            value={formData.email}
          />
          <div className="relative">
            <input
              className="w-full"
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {showPassword ? (
              <FaEyeSlash
                className="absolute right-3 top-3 text-2xl text-gray-700 cursor-pointer transition ease-in-out"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FaEye
                onClick={() => setShowPassword(true)}
                className="absolute right-3 top-3 text-2xl text-gray-700 cursor-pointer transition ease-in-out"
              />
            )}
          </div>
          <button
            className={`bg-accentRed border rounded-sm border-black text-white h-12 hover:bg-accentDarkRed transition duration-500 ease-in-out ${
              loading ? "opacity-50" : "opacity-100"
            }`}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="ml-2">Signing Up...</span>
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <div className="text-center">
          <div>
            Have an account?{" "}
            <Link
              to="/sign-in"
              className="text-accentRed hover:underline font-semibold"
            >
              Sign in
            </Link>
          </div>
          <Link
            to={"/forgot-password"}
            className="text-accentRed hover:underline font-semibold"
          >
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  )
}
