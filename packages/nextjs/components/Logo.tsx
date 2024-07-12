import Image from "next/image";

export const Logo = () => {
  return (
    <div className="flex flex-row items-center justify-center gap-[12px]">
      <Image alt="Logo" src="/worldcare.svg" width={40} height={40} />
      <span className="text-2xl">WORLDCARE</span>
    </div>
  );
};
