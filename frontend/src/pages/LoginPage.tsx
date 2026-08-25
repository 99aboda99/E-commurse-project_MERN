import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState("");

  const { login } = useAuth();

  const navigate = useNavigate();

  const onSubmit = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    console.log(email, password);

    //* Validate the user data
    if (!email || !password) {
      return setError("Check submitted data");
    }

    const response = await fetch(`${BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      setError("Unable to login, please check your credentials!");
      console.log(error);
      return;
    }

    const token = await response.json();

    if (!token) {
      setError("Incorrect token");
      return;
    }

    login(email, token);

    navigate('/')

    console.log(token);
  };

  return (
    <main className="w-full min-h-[calc(100vh-4.5rem)] flex justify-center items-center p-4 sm:p-6">
      <section className="w-full max-w-md bg-white text-second-text rounded-2xl shadow-md p-6 font-medium">
        <h2 className="text-xl sm:text-2xl text-center font-semibold mb-6">Login to your account</h2>
        <div className="flex flex-col gap-3">
          <fieldset className="border border-gray-300 rounded-lg p-3 w-full focus-within:border-blue-500 transition-colors">
            <legend className="px-2 text-sm text-gray-500 font-medium">
              Email
            </legend>
            <input
              ref={emailRef}
              type="email"
              name="email"
              id="email"
              placeholder="Enter email address"
              className="w-full px-2 py-1 outline-none text-gray-800 text-base font-normal"
            />
          </fieldset>
          <fieldset className="border border-gray-300 rounded-lg p-3 w-full focus-within:border-blue-500 transition-colors">
            <legend className="px-2 text-sm text-gray-500 font-medium">
              Password
            </legend>
            <input
              ref={passwordRef}
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              className="w-full px-2 py-1 outline-none text-gray-800 text-base font-normal"
            />
          </fieldset>
          <button
            className="mt-4 py-2.5 bg-primary hover:bg-secondary active:scale-98 text-white rounded-xl transition-all duration-300 cursor-pointer font-semibold shadow-sm hover:shadow-md"
            type="submit"
            onClick={onSubmit}
          >
            Login
          </button>
          {error && (
            <div className="mt-2 text-red-500 text-center text-sm font-normal">{error}</div>
          )}
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
