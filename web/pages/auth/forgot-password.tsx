import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AuthLayout from "../../components/Layout/AuthLayout";
import { useForgotPasswordMutation } from "../../generated/graphql";
import { isForgotPasswordInputValid } from "../../utils/validation";

interface ForgotPasswordProps {}

const ForgotPasswordPage: NextPage<ForgotPasswordProps> = ({}) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [forgotPasswordMutation, { loading }] = useForgotPasswordMutation();

  useEffect(() => {
    let errorTimeout: NodeJS.Timeout;
    if (errorMsg) {
      errorTimeout = setTimeout(() => setErrorMsg(""), 5000);
    }
    return () => clearTimeout(errorTimeout);
  }, [errorMsg]);

  const [resetEmail, setResetEmail] = useState("");
  const [showSentComp, setShowSentComp] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const validationResponse = isForgotPasswordInputValid(resetEmail);

    if (validationResponse !== true) {
      setErrorMsg(validationResponse);
      return;
    }

    await forgotPasswordMutation({
      variables: {
        email: resetEmail,
      },
    });
    setShowSentComp(true);
  };
  return (
    <AuthLayout>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blue-100 border-0 bg-opacity-80">
              <div className="flex-auto px-4 lg:px-10 py-10 pt-8">
                <div className="rounded-t px-6 py-6">
                  <div className="text-center mb-3">
                    <h6 className="text-gray-500 text-sm font-bold">
                      Recover password
                    </h6>
                  </div>
                </div>
                {showSentComp ? (
                  <div className="rounded-t px-6 py-0">
                    <div className="text-center mb-3">
                      <h6 className="text-gray-700 text-base font-bold">
                        If there's an account associated with that email, an
                        reset link will be sent, please check your email.
                      </h6>
                    </div>
                    <div className="w-full text-center mt-6">
                      <Link href="/auth/login">
                        <a className="text-gray-600 hover:text-black">
                          <small>Return to Sign In</small>
                        </a>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
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
                        value={resetEmail}
                        onChange={(e: any) => setResetEmail(e.target.value)}
                      />
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
                        Reset Password
                      </button>
                    </div>
                    <div className="flex flex-wrap mt-6 relative">
                      <div className="w-1/2">
                        <Link href="/auth/login">
                          <a className="text-gray-600 hover:text-black">
                            <small>Return to Sign In</small>
                          </a>
                        </Link>
                      </div>
                      <div className="w-1/2 text-right">
                        <Link href="/auth/register">
                          <a className="text-gray-600 hover:text-black">
                            <small>Create new account</small>
                          </a>
                        </Link>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
