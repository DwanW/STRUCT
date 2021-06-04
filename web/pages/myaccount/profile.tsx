import { NextPage } from "next";
import React, { useState } from "react";
import {
  useMeQuery,
  useUpdateUserAboutMutation,
} from "../../generated/graphql";
import { useRouter } from "next/router";
import SideNav from "../../components/Navbars/SideNav";
import Image from "next/image";
import FormTextArea from "../../components/Forms/FormTextArea";

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
      <main className="profile-page min-h-screen bg-blue-100 flex-1">
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
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
            style={{ transform: "translateZ(0)" }}
          >
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
                className="text-blue-100 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-blue-100">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative w-full flex flex-row justify-center items-start -mt-20">
                      <Image
                        alt="..."
                        src={
                          data.me.avatar_url
                            ? data.me.avatar_url
                            : "/img/user-default.svg"
                        }
                        height={144}
                        width={144}
                        className="shadow-xl rounded-full align-middle border-none bg-white"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 text-center lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-0">
                      <button
                        className="bg-blue-700 active:bg-blue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        endorse
                      </button>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center lg:pt-4">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blue-600">
                          22
                        </span>
                        <span className="text-sm text-blue-400">Stories</span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blue-600">
                          10
                        </span>
                        <span className="text-sm text-blue-400">
                          Endorsement
                        </span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blue-600">
                          89
                        </span>
                        <span className="text-sm text-blue-400">Award</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blue-700">
                    {data.me.username}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blue-400 font-bold uppercase">
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
                          className="mb-4"
                        />
                      <a
                        href="#pablo"
                        className="font-normal text-blue-500"
                        onClick={(e) => e.preventDefault()}
                      >
                        View All Stories By {data.me.username}
                      </a>
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
