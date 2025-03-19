"use client";

import {useState} from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import DarkModeToggle from "@/component/DarkModeToggle";
import { useTheme } from "next-themes";
import Link from "next/link";


const schema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().required("Password is required"),
  rememberMe: yup.boolean(),
});

export default function Login() {
  const { theme } = useTheme();
  const { login } = useAuth();
  const [processing, setProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });



  const onSubmit: SubmitHandler<{ email: string; password: string; rememberMe?: boolean }> =  (data) => {
    setProcessing(true);
    const { email, password, rememberMe = false } = data;
    login(email, password, rememberMe);
    setProcessing(false);
  };

  return (
    <div className={`flex justify-center items-center min-h-screen ${theme === "dark" ? "bg-gray-900 text-blue" : "bg-gray-100 text-black"}`}>
      <div className="bg-white  p-6 shadow-md rounded-md w-96">
        <div className="flex justify-end">
          <DarkModeToggle />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4 flex flex-col justify-between h-70">
          <TextField label="Email" fullWidth {...register("email")} error={!!errors.email} helperText={errors.email?.message} />
          <TextField label="Password" type="password" fullWidth {...register("password")} error={!!errors.password} helperText={errors.password?.message} />
          <FormControlLabel control={<Checkbox {...register("rememberMe")} />} label="Remember Me" />
          <Button type="submit" variant="contained" fullWidth disabled={processing}>Login</Button>
          <div className="text-center">
            No account? <Link href="/register" className="text-blue-500 hover:underline">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
