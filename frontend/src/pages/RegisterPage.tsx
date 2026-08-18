import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";

const RegisterPage = () => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState("");

  const { login } = useAuth();

  const onSubmit = async () => {
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    console.log(firstName, lastName, email, password);


    //* Validate the user data
    if(!firstName || !lastName || !email || !password) {
      return setError("Check submitted data");
    }

    const response = await fetch(`${BASE_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });

    if (!response.ok) {
      setError("User already exist");
      console.log(error);
      return;
    }

    const token = await response.json();

    if (!token) {
      setError("Incorrect token");
      return;
    }

    login(email, token);

    console.log(token);
  };

  return (
    <main className="w-full h-[90vh] flex justify-center items-center">
      <section className="w-1/3 h-fit px-3 py-4 container mx-auto bg-white text-second-text rounded-xl shadow-md mt-10 font-medium">
        <h2 className="text-xl text-center mb-4">Register new account</h2>
        <div className="flex flex-col gap-2.5">
          <div>
            <label className="block">First Name</label>
            <input
              ref={firstNameRef}
              className="block border border-gray-500 rounded-md w-full font-normal p-1.5"
              type="text"
              name="firstName"
              id="firstName"
            />
          </div>
          <div>
            <label className="block">Last Name</label>
            <input
              ref={lastNameRef}
              className="block border border-gray-500 rounded-md w-full font-normal p-1.5"
              type="text"
              name="lastName"
              id="lastName"
            />
          </div>
          <div>
            <label className="block">Email</label>
            <input
              ref={emailRef}
              className="block border border-gray-500 rounded-md w-full font-normal p-1.5"
              type="email"
              name="email"
              id="email"
            />
          </div>
          <div>
            <label className="block">Password</label>
            <input
              ref={passwordRef}
              className="block border border-gray-500 rounded-md w-full font-normal p-1.5"
              type="password"
              name="password"
              id="password"
            />
          </div>
          <button
            className="mt-4 py-2 bg-primary hover:bg-secondary active:scale-98 text-white rounded-md transition-all duration-300 cursor-pointer"
            type="submit"
            onClick={onSubmit}
          >
            Register
          </button>
          {error && (
            <div className="mt-2 text-red-500 text-center">{error}</div>
          )}
        </div>
      </section>
    </main>
  );
};

export default RegisterPage;
