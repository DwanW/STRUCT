import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AuthLayout from "../../components/Layout/AuthLayout";
import { useRegisterMutation } from "../../generated/graphql";
import { useRouter } from "next/dist/client/router";
import { isRegisterInputValid } from "../../utils/validation";
import { NextPage } from "next";

interface RegisterProps {}

const RegisterPage: NextPage<RegisterProps> = ({}) => {
  const [registerMutation, { loading }] = useRegisterMutation();
  const router = useRouter();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [agree, setAgree] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let errorTimeout: NodeJS.Timeout;
    if (errorMsg) {
      errorTimeout = setTimeout(() => setErrorMsg(""), 5000);
    }
    return () => clearTimeout(errorTimeout);
  }, [errorMsg]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleLoginSubmit = async (e: any) => {
    e.preventDefault();
    const validationResponse = isRegisterInputValid(values);
    if (validationResponse !== true) {
      setErrorMsg(validationResponse);
      return;
    }
    if (!agree) {
      setErrorMsg("Agree with our privacy policy to continue");
      return;
    }

    const response = await registerMutation({
      variables: {
        options: {
          username: values.username,
          email: values.email,
          password: values.password,
        },
      },
    });
    if (response.data?.register.error) {
      setErrorMsg(response.data.register.error);
      setValues({
        username: "",
        email: "",
        password: "",
      });
    } else if (response.data?.register.user) {
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
              <div className="rounded-t px-6 py-6">
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
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-gray-500 text-center mb-3 font-bold">
                  <small>Or sign in with credentials</small>
                </div>
                <form onSubmit={handleLoginSubmit}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-600 text-xs font-bold mb-2"
                      htmlFor="grid-username"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Username"
                      name="username"
                      value={values.username}
                      onChange={handleChange}
                    />
                  </div>
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
                        checked={agree}
                        onChange={() => setAgree(!agree)}
                      />
                      <span className="ml-2 text-sm font-semibold text-gray-600">
                        I agree with the{" "}
                        <Link href="/privacy-policy">
                          <a
                            href="#pablo"
                            className="text-blue-500"
                            onClick={(e) => {
                              e.preventDefault();
                              router.push("/privacy-policy");
                            }}
                          >
                            Privacy Policy
                          </a>
                        </Link>
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6 relative">
                    {errorMsg ? (
                      <div className="absolute bottom-full w-full py-1 font-bold text-xs text-center text-red-600">
                        {errorMsg}
                      </div>
                    ) : null}
                    <button
                      className="bg-gray-800 text-white hover:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                      disabled={loading}
                    >
                      Create Account
                    </button>
                  </div>
                </form>
                <div className="flex flex-wrap mt-6 relative">
                  <div className="w-full text-center text-gray-500">
                    already have an account?
                  </div>
                  <div className="w-full text-center">
                    <Link href="/auth/login">
                      <a
                        href="#pablo"
                        className="text-gray-700 hover:text-black"
                      >
                        <small>Log In here</small>
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

export default RegisterPage;
