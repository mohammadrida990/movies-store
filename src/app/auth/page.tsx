"use client";
import Input from "@/components/Input";
import React, { ChangeEvent, useCallback, useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Auth = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/auth/signInUp", {
        email,
        name: username,
        password,
      });

      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, password, username, login]);

  return (
    <div className="relative h-screen w-screen bg-[url('/assets/hero.jpeg')] bg-no-repeat bg-current bg-fixed bg-cover">
      <div className="h-full w-full bg-black lg:bg-opacity-50">
        <nav className="">
          <h1 className="text-red-900 text-4xl font-bold px-12 py-5">MOVIES</h1>
        </nav>

        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 self-center py-16 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h1 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign in" : "Create an account"}
            </h1>

            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  id="username"
                  label="Username"
                  type="text"
                  value={username}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setUsername(e.target.value)
                  }
                />
              )}

              <Input
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />

              <Input
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
            </div>

            <button
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-500 duration-300 transition"
              onClick={variant === "login" ? login : register}
            >
              {variant === "Login" ? "Login in" : " Sign up"}
            </button>

            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="w-10 h-10 bg-white  rounded-full flex items-center justify-center
               cursor-pointer hover:opacity-80 transition"
              >
                <FcGoogle size={30} />
              </div>

              <div
                onClick={() => signIn("github", { callbackUrl: "/" })}
                className="w-10 h-10 bg-white  rounded-full flex items-center justify-center
               cursor-pointer hover:opacity-80 transition"
              >
                <FaGithub size={30} className="text-black" />
              </div>
            </div>

            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "First time use MOVIES?"
                : "Already have an account"}
              <span
                className="text-white ml-1 hover:underline cursor-pointer"
                onClick={toggleVariant}
              >
                {variant === "login" ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
