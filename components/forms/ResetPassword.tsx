"use client";
import api from "@/lib/api";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [user, setUser] = useState({
    password: "",
    password2: "",
  });
  const [submitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const { password, password2 } = user;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const checkHandler = () => {
    setIsChecked(!isChecked);
  };

  const setAlert = (msg: any, timeout = 5000) => {
    setError(msg);
    setTimeout(() => {
      setError("");
    }, timeout);
  };

  const userId = searchParams.get("userId");
  const token = searchParams.get("token");

  console.log("passord params", { userId, token });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (password !== password2) {
      setAlert("Passwords must match");
    } else {
      try {
        const response = await api.patch(
          `resetPassword/${userId}/?token=${token}`,
          user
        );
        console.log("password reset successfuly", response.data);
        toast.success(response.data, {
          duration: 10000,
          position: "top-right",
        });

        router.push("/auth/login");
      } catch (error: any) {
        console.log("error from reset password", error);
        setAlert(error.response.data);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form className="bg-white" onSubmit={handleSubmit}>
      <h1 className="text-gray-800 font-bold text-2xl mb-1">Reset Password</h1>
      <p className="text-sm font-normal text-gray-600 mb-7">
        Welcome Back to Hms{" "}
      </p>
      {error && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {error}
        </div>
      )}

      <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clipRule="evenodd"
          />
        </svg>
        <input
          className="pl-2 outline-none border-none"
          type={isChecked ? "text" : "password"}
          onChange={handleChange}
          name="password"
          value={password}
          placeholder="Password"
          required
        />
      </div>
      <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clipRule="evenodd"
          />
        </svg>
        <input
          className="pl-2 outline-none border-none"
          type={isChecked ? "text" : "password"}
          name="password2"
          onChange={handleChange}
          value={password2}
          placeholder="Confirm Password"
          required
        />
      </div>
      <div className="flex items-center">
        <input
          className="mr-2 w-4 h-4 leading-tight"
          checked={isChecked}
          onChange={checkHandler}
          type="checkbox"
        />
        <label
          htmlFor="link-checkbox"
          className="  text-sm text-gray-900 dark:text-gray-300"
        >
          Show Password
        </label>
      </div>
      <button
        type="submit"
        className="block w-full bg-emerald-400 hover:bg-cyan-300  mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
      >
        {submitting ? `Submitting...` : `Reset Password`}
      </button>
    </form>
  );
}

export default ResetPassword;
