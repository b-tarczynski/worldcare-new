"use client";

import { NextPage } from "next";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <div className="flex flex-col justify-center items-center gap-4">
        <span className="text-5xl">Hello!</span>
        <span className="text-xl">Welcome to Worldcare platform</span>
      </div>
      <div className="card card-bordered border-black min-w-[900px]">
        <Link href="/login">
          <div className="card-body px-20 py-5">
            <div className="flex flex-row items-center gap-4 min-h-44">
              <span className="text-3xl">I already have an account</span>
              <ArrowRightIcon className="w-5 h-5" />
            </div>
          </div>
          <img className="absolute right-5 bottom-0" alt="home login" src="/home-login.svg" />
        </Link>
      </div>
      <div className="card card-bordered border-black min-w-[900px]">
        <Link href="/register">
          <div className="card-body px-20 py-5">
            <div className="flex flex-row items-center gap-4 min-h-44">
              <span className="text-3xl">I don&apos;t have an account</span>
              <ArrowRightIcon className="w-5 h-5" />
            </div>
          </div>
          <img className="absolute right-5 bottom-0" alt="home login" src="/home-register.svg" />
        </Link>
      </div>
    </div>
  );
};

export default Home;
