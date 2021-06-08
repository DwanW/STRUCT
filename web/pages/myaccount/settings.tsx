import { useRouter } from "next/router";
import React from "react";
import SideNav from "../../components/Navbars/SideNav";
import {
  useDeleteAccountMutation,
  useLogoutMutation,
  useMeQuery,
} from "../../generated/graphql";

interface settingsProps {}

const settings: React.FC<settingsProps> = ({}) => {
  const router = useRouter();
  const { data, loading } = useMeQuery({
    onCompleted: (data) => {
      if (!data.me?.id) {
        router.push("/auth/login");
      }
    },
  });

  const [logoutMutation] = useLogoutMutation();

  const [deleteAccountMutation] = useDeleteAccountMutation({
    onCompleted: (data) => {
      if (data.deleteAccount) {
        logoutMutation();
        router.push("/auth/login");
      }
    },
  });

  if (loading || !data?.me) {
    return <div>loading settings</div>;
  }
  return (
    <div className="flex flex-row">
      <SideNav />
      <main className="profile-page min-h-screen bg-blue-100 flex-1">
        <button
          onClick={() => deleteAccountMutation()}
          className="bg-red-500 flex text-white font-bold uppercase text-base px-8 py-3 rounded-full shadow-md hover:shadow-lg outline-none focus:outline-none mt-4 mr-1 mb-1 ease-linear transition-all duration-150"
        >
          Permanently Delete this account
        </button>
      </main>
    </div>
  );
};

export default settings;
