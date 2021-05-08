import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import AuthLayout from "../../components/Layout/AuthLayout";
import { useLoginMutation, useMeQuery } from "../../generated/graphql";
import { useRouter } from "next/dist/client/router";

interface LoginProps {}

const login: React.FC<LoginProps> = ({}) => {
  const [loginMutation] = useLoginMutation();
  const { data, loading, error } = useMeQuery({ variables: {} });
  const router = useRouter();

  console.log({ data, loading, error });

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleLoginSubmit = async (e: any) => {
    e.preventDefault();
    const response = await loginMutation({
      variables: { email: values.email, password: values.password },
    });
    if (response.data?.login.error) {
      setErrorMsg(response.data.login.error);
    } else if (response.data?.login.user) {
      if (typeof router.query.next === "string") {
        router.push(router.query.next);
      } else {
        //default redirect
        router.push("/");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blue-100 border-0 bg-opacity-80">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-gray-500 text-sm font-bold">
                    Sign in with
                  </h6>
                </div>
                <div className="text-center">
                  <button
                    className="bg-white w-28 text-gray-700 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center justify-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <div className="w-6 mr-2">
                      <Image
                        alt="google sign in"
                        src="/img/google.svg"
                        width={24}
                        height={24}
                      />
                    </div>
                    Google
                  </button>
                </div>
                <hr className="mt-6 border-b-1 border-gray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-gray-400 text-center mb-3 font-bold">
                  <small>Or sign in with credentials</small>
                </div>
                <form onSubmit={handleLoginSubmit}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-600 text-xs font-bold mb-2"
                      htmlFor="grid-email"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-gray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-gray-600">
                        Remember me
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    {loading ? (
                      <button
                        className="bg-gray-800 text-white hover:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Loading...
                      </button>
                    ) : (
                      <button
                        className="bg-gray-800 text-white hover:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Sign In
                      </button>
                    )}
                  </div>
                </form>
                <div className="flex flex-wrap mt-6 relative">
                  <div className="w-1/2">
                    <a
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      className="text-gray-600 hover:text-black"
                    >
                      <small>Forgot password?</small>
                    </a>
                  </div>
                  <div className="w-1/2 text-right">
                    <Link href="/auth/register">
                      <a
                        href="#pablo"
                        className="text-gray-600 hover:text-black"
                      >
                        <small>Create new account</small>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default login;
