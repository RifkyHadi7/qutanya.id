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
  
  const colors = [
    "primary",
  ];
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 mt-32 ">
          <QutanyaLogo size={200} />
        <div className="inline-block max-w-md text-center justify-center">
        <h1 className="text-3xl lg:text-4xl">Qutanya.id</h1>
          
        </div>

        {colors.map((color) => (
        <Input
          
          isRequired
          isClearable
          type="email"
          label="Email"
          variant="bordered"
          placeholder="Enter your email"
          onClear={() => console.log("input cleared")}
          className="max-w-xs"
        />
      ))}
        
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
        />
      

          
        <div className="gap-6 ">
        <Link href="#" size="sm" className="text-secondary">Lupa Password</Link>
        
        </div>

      </section>
    </DefaultLayout>
  );
}
