"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Checkbox, FormControlLabel, Button } from "@mui/material";
import DarkModeToggle from "@/component/DarkModeToggle";
import { useTheme } from "next-themes";

export default function Login() {
  const { theme } = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        email: yup.string().email("Invalid email format").required("Email is required"),
        password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
        remember: yup.boolean(),
      })
    ),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log("User Data:", data);
  };

  return (
    <div className={`flex   justify-center items-center min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-96 ">
        <div className="flex justify-end">
          <DarkModeToggle />
        </div>

        <h2 className={`text-xl font-semibold text-center ${theme === "dark" ? " text-white" : " text-black"}`}>Login</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4 flex flex-col justify-between h-70">
          <TextField
            label="Email"
            type="email"
            fullWidth
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <FormControlLabel
            control={<Checkbox {...register("remember")} color="primary" />}
            label="Remember Me"
          />
          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
