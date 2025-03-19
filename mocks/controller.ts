export const getMetrics = async () => {
    return [
      { title: "Total Users", value: "10,200" },
      { title: "Active Sessions", value: "342" },
      { title: "Sales Revenue", value: "$25,560" },
    ];
  };
  
  export const getSalesData = async () => {
    return [
      { month: "Jan", sales: 4000 },
      { month: "Feb", sales: 3000 },
      { month: "Mar", sales: 5000 },
      { month: "Apr", sales: 7000 },
    ];
  };
  
  export const getUserGrowth = async () => {
    return [
      { year: "2020", users: 2000 },
      { year: "2021", users: 4000 },
      { year: "2022", users: 7000 },
      { year: "2023", users: 11000 },
    ];
  };
  
  export const getCategoryData = async () => {
    return [
      { name: "Electronics", value: 45 },
      { name: "Fashion", value: 30 },
      { name: "Groceries", value: 25 },
    ];
  };
  
  export const getUsers = async () => {
    return [
      { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
      { id: 3, name: "Alice Johnson", email: "alice@example.com", role: "Editor" },
    ];
  };
  