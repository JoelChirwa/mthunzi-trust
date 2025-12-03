import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const AdminDashboard = () => {
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    partners: 0,
    blogs: 0,
    team: 0,
    vacancies: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for the chart - in a real app this would come from an analytics API
  const analyticsData = [
    { name: "Mon", visits: 4000, views: 2400 },
    { name: "Tue", visits: 3000, views: 1398 },
    { name: "Wed", visits: 2000, views: 9800 },
    { name: "Thu", visits: 2780, views: 3908 },
    { name: "Fri", visits: 1890, views: 4800 },
    { name: "Sat", visits: 2390, views: 3800 },
    { name: "Sun", visits: 3490, views: 4300 },
  ];

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setStats(data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const statCards = [
    {
      title: "Partners",
      value: stats.partners,
      icon: "🤝",
      change: "+2",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Blog Posts",
      value: stats.blogs,
      icon: "📝",
      change: "+5%",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Team Members",
      value: stats.team,
      icon: "👥",
      change: "+1",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Vacancies",
      value: stats.vacancies,
      icon: "💼",
      change: "Active",
      color: "from-orange-500 to-red-500",
    },
  ];

  const quickActions = [
    {
      title: "Manage Blogs",
      icon: "📝",
      path: "/admin/blogs",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Manage Team",
      icon: "👥",
      path: "/admin/team",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Manage Partners",
      icon: "🤝",
      path: "/admin/partners",
      color: "from-teal-500 to-teal-600",
    },
    {
      title: "Manage Vacancies",
      icon: "💼",
      path: "/admin/vacancies",
      color: "from-orange-500 to-red-600",
    },
    {
      title: "Manage Programs",
      icon: "🎯",
      path: "/admin/programs",
      color: "from-pink-500 to-rose-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200/50 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo/Brand Area */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                  Admin Dashboard
                </h1>
                <p className="text-xs text-gray-500 font-medium">
                  Overview & Statistics
                </p>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-6">
              {/* User Profile */}
              <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-gray-900">
                    {user?.name || "Admin User"}
                  </p>
                  <p className="text-xs text-teal-600 font-medium uppercase tracking-wider">
                    {user?.role || "Administrator"}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-white shadow-md flex items-center justify-center overflow-hidden">
                  <span className="text-lg">👤</span>
                </div>
              </div>

              {/* Logout Button */}
              <motion.button
                onClick={handleLogout}
                className="group flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 border border-red-100 hover:border-red-500 hover:shadow-lg hover:shadow-red-500/20"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-sm font-semibold">Logout</span>
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div
                className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-10 rounded-bl-full`}
              ></div>
              <div className="relative">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-3xl">{stat.icon}</span>
                  {/* <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    {stat.change}
                  </span> */}
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">
                  {stat.title}
                </h3>
                <p className="text-2xl font-bold text-gray-900">
                  {isLoading ? "..." : stat.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.title}
                onClick={() => navigate(action.path)}
                className={`flex flex-col items-center justify-center p-6 bg-gradient-to-br ${action.color} rounded-xl text-white transition-all group hover:shadow-lg`}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-4xl mb-2">{action.icon}</span>
                <span className="text-sm font-medium">{action.title}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Page Visit Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Page Visit Analytics
            </h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={analyticsData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <defs>
                    <linearGradient
                      id="colorVisits"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="visits"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#colorVisits)"
                  />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="#82ca9d"
                    fillOpacity={1}
                    fill="url(#colorViews)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Visitors by Country
            </h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Malawi", value: 45 },
                      { name: "USA", value: 25 },
                      { name: "UK", value: 15 },
                      { name: "South Africa", value: 10 },
                      { name: "Other", value: 5 },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {[
                      "#0088FE",
                      "#00C49F",
                      "#FFBB28",
                      "#FF8042",
                      "#8884d8",
                    ].map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          [
                            "#0088FE",
                            "#00C49F",
                            "#FFBB28",
                            "#FF8042",
                            "#8884d8",
                          ][index % 5]
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
