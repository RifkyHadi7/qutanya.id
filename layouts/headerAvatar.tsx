export const HeaderAvatar = () => {
  return (
    <header className="relative bg-[#25E5DA] shadow-lg rounded-b-extra p-4 pb-12 flex items-center justify-between w-full">
      <div className="flex items-center">
        <img
          src="/path/to/profile.jpg"
          alt="Profile"
          className="w-12 h-12 rounded-full"
        />
        <div className="ml-4">
          <span className="text-lg font-semibold text-secondary">Hi,</span>
          <span className="text-lg font-semibold text-secondary">
            {" "}
            John Doe
          </span>
        </div>
      </div>
    </header>
  );
};