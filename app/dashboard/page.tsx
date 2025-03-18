"use client";

import { useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import DataTable from "react-table-ui";
import DarkModeToggle from "@/component/DarkModeToggle";

const metrics = [
  { title: "Total Users", value: "10,200" },
  { title: "Active Sessions", value: "342" },
  { title: "Sales Revenue", value: "$25,560" },
];

const salesData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 7000 },
];

const userGrowth = [
  { year: "2020", users: 2000 },
  { year: "2021", users: 4000 },
  { year: "2022", users: 7000 },
  { year: "2023", users: 11000 },
];

const categoryData = [
  { name: "Electronics", value: 45 },
  { name: "Fashion", value: 30 },
  { name: "Groceries", value: 25 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: 3, name: "Alice Johnson", email: "alice@example.com", role: "Editor" },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-end">
        <DarkModeToggle />
      </div>

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
