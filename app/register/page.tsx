"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import DarkModeToggle from "@/component/DarkModeToggle";
import { useTheme } from "next-themes";
import Link from "next/link";


const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  rememberMe: yup.boolean(),
});

export default function SignUp() {
  const { theme } = useTheme();
  const { signup } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<{ fullName: string; email: string; password: string; rememberMe?: boolean }> = (data) => {
    const { fullName, email, password, rememberMe = false } = data;
    signup(fullName, email, password, rememberMe);
  };

  return (
    <div className={`flex justify-center items-center min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <div className="bg-white dark:bg-gray-800 p-6 shadow-md rounded-md w-96">
        <div className="flex justify-end">
          <DarkModeToggle />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4 flex flex-col justify-between h-70">
          <TextField label="Full Name" fullWidth {...register("fullName")} error={!!errors.fullName} helperText={errors.fullName?.message} />
          <TextField label="Email" fullWidth {...register("email")} error={!!errors.email} helperText={errors.email?.message} />
          <TextField label="Password" type="password" fullWidth {...register("password")} error={!!errors.password} helperText={errors.password?.message} />
          <FormControlLabel control={<Checkbox {...register("rememberMe")} />} label="Remember Me" />
          <Button type="submit" variant="contained" fullWidth>Sign Up</Button>
          <div className="text-center">
            No account? <Link href="/" className="text-blue-500 hover:underline">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
