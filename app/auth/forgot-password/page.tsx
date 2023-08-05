"use client";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

function page() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
  });
  const [alert, setAlertMessage] = useState({
    msg: "",
    type: "",
  });
  const [submitting, setIsSubmitting] = useState(false);

  const setAlert = (msg: any, type: string, timeout = 7000) => {
    setAlertMessage({ ...alert, msg, type });
    setTimeout(() => {
      setAlertMessage({ ...alert, msg: "", type: "" });
    }, timeout);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await api.post("/resetPassword", user);
      setAlert(response.data, "success");
    } catch (error: any) {
      setAlert(error.response.data, "danger");
    } finally {
      setIsSubmitting(false);
    }
  };

  const { email } = user;
  return (
    <div className="h-screen md:flex bg-white ">
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-sky-500 i justify-around items-center hidden">
        <div>
          <h1 className="text-white font-bold text-4xl font-sans">Full auth</h1>
          <p className="text-white mt-1">
            The most popular peer to peer lending at SEA
          </p>
          <button
            type="submit"
            className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
          >
            Read More
          </button>
        </div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      </div>
      <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
        <form className="bg-white" onSubmit={handleSubmit}>
          <h1 className="text-gray-800 font-bold text-2xl mb-1">
            Forgot Password?
          </h1>
          <p className="text-sm font-normal text-gray-600 mb-7">
            Enter your email to get a password reset link
          </p>
          {alert.msg && alert.type === "danger" && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {alert.msg}
            </div>
          )}
          {alert.msg && alert.type === "success" && (
            <div
              className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
              role="alert"
            >
              {alert.msg}
            </div>
          )}

          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-7">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="email"
              name="email"
              onChange={handleChange}
              value={email}
              placeholder="Email Address"
              required
            />
          </div>

          <button
            type="submit"
            className="block w-full bg-emerald-400 hover:bg-cyan-300  mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
          >
            {submitting ? `Submitting...` : `Reset Password`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default page;
