import { NextPage } from "next";
import React from "react";
import {
  useMeQuery,
  useUpdateUserAboutMutation,
} from "../../generated/graphql";
import { useRouter } from "next/router";
import SideNav from "../../components/Navbars/SideNav";
import Image from "next/image";
import FormTextArea from "../../components/Forms/FormTextArea";
import UserAvatarUpload from "../../components/Uploads/UserAvatarUpload";

interface ProfilePageProps {}

const ProfilePage: NextPage<ProfilePageProps> = ({}) => {
  const router = useRouter();
  const { data, loading } = useMeQuery({
    onCompleted: (data) => {
      if (!data.me?.id) {
        router.push("/auth/login");
      }
    },
  });

  const [updateUserAbout, { loading: aboutLoading }] =
    useUpdateUserAboutMutation();

  const updateAbout = async (value: string) => {
    await updateUserAbout({ variables: { about: value } });
  };

  if (loading || !data?.me) {
    return <div>loading profile</div>;
  }

  return (
    <div className="flex flex-row">
      <SideNav />
      <main className="profile-page min-h-screen flex-1 bg-blue-100 dark:bg-gray-800">
        <section className="relative block h-96">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black dark:opacity-70 "
            ></span>
          </div>
          <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16">
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blue-100 dark:text-gray-800 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-blue-100 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-gray-700 w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 lg:order-2 flex justify-center">
                    <div className="relative group w-full flex flex-row justify-center items-start -mt-20">
                      <Image
                        alt="..."
                        src={
                          data.me.avatar_url
                            ? data.me.avatar_url
                            : "/img/user-default.svg"
                        }
                        height={144}
                        width={144}
                        className="shadow-xl rounded-full align-middle border-none bg-white dark:bg-gray-600"
                      />
                      <div className="absolute opacity-0 top-0 mx-auto rounded-full group-hover:opacity-100 w-36 h-36">
                        <UserAvatarUpload userId={data.me?.id} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blue-700 dark:text-white">
                    {data.me.username}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blue-400 dark:text-blue-200 font-bold uppercase">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-2 inline text-lg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                    My Quote/Message
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-blue-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <FormTextArea
                        label="About"
                        submitMutation={updateAbout}
                        value={data.me.about}
                        enableEdit={true}
                        className="mb-4"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
