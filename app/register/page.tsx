"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import DarkModeToggle from "@/component/DarkModeToggle";
import { useTheme } from "next-themes";

const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  rememberMe: yup.boolean(),
});

export default function SignUp() {
  const { theme } = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log("User Data:", data);
  };

  return (
    <div className={`flex justify-center items-center min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <div className="bg-white dark:bg-gray-800 p-6 shadow-md rounded-md w-96">
        <div className="flex justify-end">
          <DarkModeToggle />
        </div>

        <h2 className={`text-2xl font-bold mb-4 text-center  ${theme === "dark" ? " text-white" : " text-black"}`}>Sign Up</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col justify-between h-100">
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            {...register("fullName")}
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
          />

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <FormControlLabel
            control={<Checkbox {...register("rememberMe")} />}
            label="Remember Me"
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
}
