import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import AuthLayout from "../../../components/Layout/AuthLayout";
import { useChangePasswordMutation } from "../../../generated/graphql";
import { isChangePasswordInputValid } from "../../../utils/validation";

interface ChangePasswordProps {}

const ChangePasswordPage: NextPage<ChangePasswordProps> = ({}) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [changePasswordMutation, { loading }] = useChangePasswordMutation();
  const router = useRouter();

  useEffect(() => {
    let errorTimeout: NodeJS.Timeout;
    if (errorMsg) {
      errorTimeout = setTimeout(() => setErrorMsg(""), 5000);
    }
    return () => clearTimeout(errorTimeout);
  }, [errorMsg]);

  const [newPassword, setNewPassword] = useState("");
  const [showSentComp, setShowSentComp] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const validationResponse = isChangePasswordInputValid(newPassword);

    if (validationResponse !== true) {
      setErrorMsg(validationResponse);
      return;
    }

    const response = await changePasswordMutation({
      variables: {
        newPassword: newPassword,
        token: typeof router.query.token === "string" ? router.query.token : "",
      },
    });

    if (!response.data?.changePassword.error) {
      setShowSentComp(true);
    } else if (response.data?.changePassword.error) {
      setErrorMsg(response.data.changePassword.error);
    }
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
                      Reset with new password
                    </h6>
                  </div>
                </div>
                {showSentComp ? (
                  <div className="rounded-t px-6 py-0">
                    <div className="text-center mb-3">
                      <h6 className="text-gray-700 text-base font-bold">
                        Your have successfully reset your password
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
                        New Password
                      </label>
                      <input
                        type="password"
                        className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Password"
                        name="password"
                        value={newPassword}
                        onChange={(e: any) => setNewPassword(e.target.value)}
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

export default ChangePasswordPage;
