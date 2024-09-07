"use client";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import React, { useRef, useState, useEffect } from "react";
import DefaultLayout from "@/layouts/default";


export default function LupaPage() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef([]);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const handleResendCode = () => {
    setCountdown(60);
    // Logic to resend the code
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center mt-32 gap-2 max-w-xs mx-auto">
        <div className="inline-block max-w-md text-center justify-center">
          <h1 className="text-3xl lg:text-4xl font-bold">Check your email</h1>
        </div>

        <span className="text-secondary">We've sent the code to your email</span>

        <div className="flex gap-2 mt-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              maxLength={1}
              className="w-12 h-12 text-center text-lg font-bold"
              onChange={(e) => handleInputChange(e, index)}
            />
          ))}
        </div>

        <div className="mt-4 text-center">
          {countdown > 0 ? (
            <span className="text-secondary">Resend code in {countdown} seconds</span>
          ) : (
            <Button
              variant="link"
              className="text-primary"
              onClick={handleResendCode}
            >
              Resend Code
            </Button>
          )}
        </div>
      </section>
    </DefaultLayout>
  );
}