"use client";
import { Link } from "@nextui-org/link";
import { Input, Spacer } from "@nextui-org/react";
import { Button, Card } from "@nextui-org/react";
import React, { useState } from "react";
import { QutanyaLogo } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import { EyeFilledIcon } from "@/components/icons";
import { EyeSlashFilledIcon } from "@/components/icons";
import axios from "axios";
import { useRouter } from "next/navigation"; // Use next/navigation instead of next/router

export default function LoginPage() {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessCard, setShowSuccessCard] = useState(false); // State untuk mengontrol visibilitas kartu sukses
  const router = useRouter(); // Use useRouter from next/navigation

  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

  const isInvalidEmail = React.useMemo(() => {
    if (email === "") return false;
    return validateEmail(email) ? false : true;
  }, [email]);

  const validateInputs = () => {
    let isValid = true;
    if (!email) {
      setEmail("Email is required");
      isValid = false;
    } else if (isInvalidEmail) {
      setEmail("Please enter a valid email.");
      isValid = false;
    }
  
    if (!password) {
      setErrorMessage("Email Or Password is required");
      isValid = false;
    }
  
    return isValid;
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(""); // Reset error message
    
    if (!validateInputs()) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("https://qutanya-be.vercel.app/user/login", {
        email,
        password,
      });
  
      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        // Simpan data di sessionStorage
        sessionStorage.setItem("userData", JSON.stringify(data));
        // Set timeout untuk menghapus data setelah 3600 detik (1 jam)
        document.cookie = `session=${data.sessionToken}; path=/; max-age=3600`; // 1 jam
        // Handle successful login
        setTimeout(() => {
          sessionStorage.removeItem("userData");
        }, 3600000);
        // Handle successful login
        setShowSuccessCard(true); // Tampilkan kartu sukses
        setTimeout(() => {
          setShowSuccessCard(false); // Sembunyikan kartu sukses setelah 3 detik
          router.push("/beranda"); // Redirect to beranda
        }, 3000);
      }
    } catch (error) {
      // Type guard for Axios error or Error instance
      if (axios.isAxiosError(error)) {
        // Handle Axios error (from the server)
        setErrorMessage(error.response?.data?.message || "Login failed.");
      } else if (error instanceof Error) {
        // Handle generic errors
        setErrorMessage(error.message || "An unexpected error occurred.");
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center mt-32 gap-4 mx-auto">
        <QutanyaLogo size={200} />
        <div className="inline-block max-w-md text-center justify-center">
          <h1 className="text-3xl lg:text-4xl font-semibold">Qutanya.id</h1>
        </div>

        <form className="w-full mx-auto max-w-xs gap-4" onSubmit={handleLogin}>
          {/* Email Input */}
          {errorMessage && (
            <div className="text-red-500 text-center font-bold">{errorMessage}</div>
          )}
          <Input
            value={email}
            isRequired
            isClearable
            label="Email"
            type="email"
            variant="bordered"
            placeholder="Enter your email"
            className="w-full max-w-md mx-auto"
            classNames={{
              label: "text-black/50 dark:text-white/90",
              input: [
                "bg-white",
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],
              innerWrapper: "bg-white",
              inputWrapper: [
                "shadow-xl",
                "bg-white",
                "dark:bg-default/60",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "group-data-[focus=true]:bg-default-200/50",
                "dark:group-data-[focus=true]:bg-default/60",
                "!cursor-text",
                "!hover:bg-white", // Disable hover effect
                "!dark:hover:bg-default/60", // Disable dark mode hover effect
              ],
              clearButton: "text-black",
            }}
            color={isInvalidEmail ? "danger" : "success"}
            errorMessage={isInvalidEmail ? "Please enter a valid email" : errorMessage}
            isInvalid={isInvalidEmail}
            onValueChange={(e) => {
              setEmail(e); // Update email state
              setErrorMessage(""); // Reset error message when user starts typing again
            }}
          />
          <Spacer y={2}></Spacer>
          {/* Password Input */}
          <Input
            value={password}
            isRequired
            label="Password"
            variant="bordered"
            placeholder="Enter your password"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
                aria-label="toggle password visibility"
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            className="w-full max-w-md mx-auto"
            classNames={{
              label: "text-black/50 dark:text-white/90",
              input: [
                "bg-white",
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],
              innerWrapper: "bg-white",
              inputWrapper: [
                "shadow-xl",
                "bg-white",
                "dark:bg-default/60",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "group-data-[focus=true]:bg-default-200/50",
                "dark:group-data-[focus=true]:bg-default/60",
                "!cursor-text",
                "!hover:bg-white", // Disable hover effect
                "!dark:hover:bg-default/60", // Disable dark mode hover effect
              ],
            }}
            color="success"
            isInvalid={errorMessage ? true : false}
            onValueChange={(e) => setPassword(e)}
          />
          <Spacer y={2}></Spacer>
          {/* Login Button */}
          <Button
            variant="solid"
            size="md"
            type="submit"
            fullWidth
            className={[
              "w-full max-w-md mx-auto",
              "bg-default-200/50", // Background color
              "dark:bg-default/60", // Background color for dark mode
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              "shadow-xl",
              "bg-transparent",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
              "group-data-[focus=true]:bg-default-200/50",
              "dark:group-data-[focus=true]:bg-default/60",
              "!cursor-pointer",
            ].join(" ")}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <div className="flex flex-nowrap gap-4">
          <Link href="/lupapassword" size="sm" className="text-secondary">
            Forget password
          </Link>
        </div>

        <div className="flex flex-nowrap ">
          <span className="text-secondary" style={{ fontSize: "0.875rem" }}>
            Don`t have an account?
          </span>{" "}
          {/* Add two spaces for spacing */}
          <Link href="/register" size="sm" className="text-secondary">
            Create an Account
          </Link>
        </div>
        {showSuccessCard && (
          <Card className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4">
            <div className="text-center text-lg font-semibold text-green-600">
              Anda berhasil login!
            </div>
          </Card>
        )}
      </section>
    </DefaultLayout>
  );
}