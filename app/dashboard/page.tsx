"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import DataTable from "react-table-ui";
import DarkModeToggle from "@/component/DarkModeToggle";
import { useAuth } from "@/context/AuthContext";
import { getMetrics, getSalesData, getUserGrowth, getCategoryData, getUsers } from "@/mocks/controller";



const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

interface Metrics {
  title: string;
  value: string;
}

interface Sales {
  month: string;
  sales: number;
}

interface UserGrowth {
  year: string;
  users: number;
}

interface CategoryData {
  name: string;
  value: number;
}

interface Users {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [metrics, setMetrics] = useState<Metrics[]>([]);
  const [salesData, setSalesData] = useState<Sales[]>([]);
  const [userGrowth, setUserGrowth] = useState<UserGrowth[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [users, setUsers] = useState<Users[]>([]);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }else{
      fetchData();
    }
  }, [user, router]);

  const fetchData = async () => {
    setMetrics(await getMetrics());
    setSalesData(await getSalesData());
    setUserGrowth(await getUserGrowth());
    setCategoryData(await getCategoryData());
    setUsers(await getUsers());
  };

  if (!user) return null;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between">
        <DarkModeToggle />
        <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer">Logout</button>
      </div>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Welcome, {user.fullName}!</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card className="shadow-md">
              <CardContent>
                <Typography variant="h6">{metric.title}</Typography>
                <Typography variant="h4" className="font-semibold">
                  {metric.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card className="shadow-md">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sales Trend
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className="shadow-md">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                User Growth
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={userGrowth}>
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="users" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className="shadow-md">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Category Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card className="shadow-md">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            User List
          </Typography>
          <DataTable
            columns={[{ Header: "Name", accessor: "name" }, { Header: "Email", accessor: "email" }, { Header: "Role", accessor: "role" }]}
            data={users}
          />
        </CardContent>
      </Card>
    </div>
  );
}
