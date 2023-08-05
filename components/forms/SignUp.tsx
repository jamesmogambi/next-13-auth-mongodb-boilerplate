"use client";

import api from "@/lib/api";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

function SignUp() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [submitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const { username, email, password, password2 } = user;

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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user.password !== user.password2) {
      setAlert("Passwords must match");
    } else {
      setIsSubmitting(true);

      try {
        const response = await api.post("/user", user);

        if (response.status === 200) {
          await signIn("credentials", {
            username,
            password,
            redirect: true,
            callbackUrl: "/home",
          });
        }
      } catch (error: any) {
        setAlert(error.response.data);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  return (
    <form className="bg-white" onSubmit={handleSubmit}>
      <h1 className="text-gray-800 font-bold text-2xl mb-1">Create Account</h1>
      <p className="text-sm font-normal text-gray-600 mb-7">Welcome to Hms </p>
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
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
          />
        </svg>
        <input
          className="pl-2 outline-none border-none"
          type="text"
          name="username"
          onChange={handleChange}
          value={username}
          placeholder="Username"
          required
        />
      </div>
      <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
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
        {submitting ? `Submitting...` : `Sign Up`}
      </button>
      <Link
        href="/"
        className="text-sm ml-2 hover:text-emerald-500 cursor-pointer"
      >
        Already have an account ?
      </Link>
    </form>
  );
}

export default SignUp;
