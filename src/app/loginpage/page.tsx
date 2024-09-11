"use client";
import { Link } from "@nextui-org/link";
import { Input, Spacer } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { QutanyaLogo } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import { EyeFilledIcon } from "@/components/icons";
import { EyeSlashFilledIcon } from "@/components/icons";
import axios from "axios";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [isVisible, setIsVisible] = React.useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const validateEmail = (value) =>
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


  const handleLogin = async (e) => {
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
        // Handle successful login
        alert("Login successful!");
        // router.push("/dashboard"); // Example redirect to dashboard
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
      <section className="flex flex-col items-center justify-center mt-32 gap-4 max-w-xs mx-auto">
        <QutanyaLogo size={200} />
        <div className="inline-block max-w-md text-center justify-center">
          <h1 className="text-3xl lg:text-4xl font-semibold">Qutanya.id</h1>
        </div>

        <form onSubmit={handleLogin}>
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
        className="max-w-xs"
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
        isClearable
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
        className="max-w-xs"
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
        isInvalid={errorMessage? true : false}
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
          "max-w-xs",
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
            Don't have an account?
          </span>{" "}
          {/* Add two spaces for spacing */}
          <Link href="/register" size="sm" className="text-secondary">
            Create an Account
          </Link>
        </div>
      </section>
    </DefaultLayout>
  );
}
