"use client";
import { fetchUser, updateUserProfile } from "@/actions/useractions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Alert from "./Alert";

type FormValues = {
  username: string;
  email: string;
  image: string;
  coverImg: string;
  rasorPayId: string;
  rasorPaySecret: string;
};

const Dashboard = () => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
  const [user, setUser] = useState<FormValues>({
    username: "",
    email: "",
    image: "",
    coverImg: "",
    rasorPayId: "",
    rasorPaySecret: "",
  });

  const { register, handleSubmit } = useForm<FormValues>();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    } else {
      loadUserDetails();
    }
  }, [session, router]);

  const loadUserDetails = async () => {
    if (session?.user?.name) {
      const userDetails = await fetchUser(session?.user?.name);
      setUser(userDetails);
      setLoading(false); // Set loading to false after fetching data
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await updateUserProfile(data, session?.user?.name || "");
    setAlert("Profile Updated Successfully!");
    update();
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or message while fetching user data
  }

  return (
    <div>
      {alert && <Alert alertMsg={alert} time={2500} />}
      <h1 className="font-bold font-inter text-center text-3xl my-5">
        Welcome to Dashboard
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-center items-center gap-5"
      >
        <div className="flex flex-col gap-4 w-1/2">
          <label htmlFor="username">Username</label>
          <input
            className="bg-slate-800 px-5 py-3 rounded-md"
            {...register("username")}
            onChange={handleChange}
            placeholder="Username"
            value={user.username}
          />
          <label htmlFor="email">Email</label>
          <input
            className="bg-slate-800 px-5 py-3 rounded-md"
            {...register("email")}
            onChange={handleChange}
            placeholder="Email"
            value={user.email}
          />
          <label htmlFor="image">Profile Img URL</label>
          <input
            className="bg-slate-800 px-5 py-3 rounded-md"
            {...register("image")}
            onChange={handleChange}
            placeholder="Profile Img URL"
            value={user.image}
          />
          <label htmlFor="coverImg">Cover Img URL</label>
          <input
            className="bg-slate-800 px-5 py-3 rounded-md"
            {...register("coverImg")}
            onChange={handleChange}
            placeholder="Cover Img URL"
            value={user.coverImg}
          />
          <label htmlFor="rasorPayId">Razor Pay ID</label>
          <input
            className="bg-slate-800 px-5 py-3 rounded-md"
            {...register("rasorPayId")}
            onChange={handleChange}
            placeholder="Razor Pay ID"
            value={user.rasorPayId}
          />
          <label htmlFor="rasorPaySecret">Razor Pay Secret</label>
          <input
            className="bg-slate-800 px-5 py-3 rounded-md"
            {...register("rasorPaySecret")}
            onChange={handleChange}
            placeholder="Razor Pay Secret"
            value={user.rasorPaySecret}
          />
          <button type="submit" disabled={user.username.includes(" ")} className="btn-blue my-5">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
export default Dashboard;
