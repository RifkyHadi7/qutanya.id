import Image from "next/image";



export const HeaderAvatar = () => {
  return (
    <header className="relative bg-background shadow-lg rounded-b-extra p-4 pb-12 flex items-center justify-between w-full">
      <div className="flex items-center">
        <Image
          src="https://oadqfnknwbaahnminxvl.supabase.co/storage/v1/object/public/foto_profile/Azizi"
          width={40}
          height={50}
          alt="Profile"
          className="w-12 h-12 rounded-full"
        />
        <div className="ml-4">
          <span className="text-lg font-semibold text-secondary">Hi,</span>
          <span className="text-lg font-semibold text-secondary">
            {" "}
            Julie Marie
          </span>
        </div>
      </div>
    </header>
  );
};
