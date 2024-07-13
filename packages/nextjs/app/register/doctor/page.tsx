import { NextPage } from "next";
import { Heading1 } from "~~/components/ui/Heading1";
import { Heading3 } from "~~/components/ui/Heading3";
import { WorldcoinIcon } from "~~/components/assets/WorldcoinIcon";

const DoctorSignin: NextPage = () => {
  return <div className="flex flex-col justify-center items-center gap-10 mt-24">
    <div className="flex flex-col gap-1">
      <Heading1>Create account</Heading1>
      <Heading3>Connect with World ID to create account</Heading3>
    </div>
    <button className="btn btn-outline rounded-full">
      <WorldcoinIcon/>
      <span>Connect with World ID</span>
    </button>
    <span className="text-xs">Don&apos;t have World ID? <u><b>Learn more</b></u></span>
  </div>
}

export default DoctorSignin;
