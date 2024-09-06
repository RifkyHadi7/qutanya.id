"use client";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import {Input} from "@nextui-org/react";
import React from "react";
import { siteConfig } from "@/config/site";
import { title } from "@/components/primitives";
import { QutanyaLogo } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import { EyeFilledIcon } from "@/components/icons";
import { EyeSlashFilledIcon } from "@/components/icons";

export default function IndexPage() {

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 mt-32 ">
          <QutanyaLogo size={200} />
        <div className="inline-block max-w-md text-center justify-center">
        <h1 className="text-3xl lg:text-4xl">Qutanya.id</h1>
          
        </div>

<Input
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
      "bg-transparent",
      "text-black/90 dark:text-white/90",
      "placeholder:text-default-700/50 dark:placeholder:text-white/60",
    ],
    innerWrapper: "bg-transparent",
    inputWrapper: [
      "shadow-xl",
      "bg-default-200/50",
      "dark:bg-default/60",
      "backdrop-blur-xl",
      "backdrop-saturate-200",
      "hover:bg-default-200/70",
      "dark:hover:bg-default/70",
      "group-data-[focus=true]:bg-default-200/50",
      "dark:group-data-[focus=true]:bg-default/60",
      "!cursor-text",
    ],
  }}
/>
        
<Input
  isRequired
  label="Password"
  variant="bordered"
  placeholder="Enter your password"
  endContent={
    <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
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
      "bg-transparent",
      "text-black/90 dark:text-white/90",
      "placeholder:text-default-700/50 dark:placeholder:text-white/60",
    ],
    innerWrapper: "bg-transparent",
    inputWrapper: [
      "shadow-xl",
      "bg-default-200/50",
      "dark:bg-default/60",
      "backdrop-blur-xl",
      "backdrop-saturate-200",
      "hover:bg-default-200/70",
      "dark:hover:bg-default/70",
      "group-data-[focus=true]:bg-default-200/50",
      "dark:group-data-[focus=true]:bg-default/60",
      "!cursor-text",
    ],
  }}
/>
      

          
        <div className="gap-6 ">
        <Link href="#" size="sm" className="text-secondary">Lupa Password</Link>
        
        </div>

      </section>
    </DefaultLayout>
  );
}
