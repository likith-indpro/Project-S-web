import React, { useState } from "react";

// Mock data for dashboard
const mockData = {
  stats: [
    {
      label: "Total Users",
      value: "1,284",
      icon: "👥",
      color: "bg-blue-100 text-blue-800",
    },
    {
      label: "Active Projects",
      value: "42",
      icon: "📊",
      color: "bg-green-100 text-green-800",
    },
    {
      label: "Completed Tasks",
      value: "368",
      icon: "✓",
      color: "bg-purple-100 text-purple-800",
    },
    {
      label: "Open Issues",
      value: "12",
      icon: "⚠️",
      color: "bg-yellow-100 text-yellow-800",
    },
  ],
  recentActivity: [
    {
      id: 1,
      user: "John Doe",
      action: "created a new project",
      time: "2 hours ago",
    },
    {
      id: 2,
      user: "Jane Smith",
      action: "completed Task #123",
      time: "4 hours ago",
    },
    {
      id: 3,
      user: "Robert Johnson",
      action: "updated Project X documentation",
      time: "6 hours ago",
    },
    {
      id: 4,
      user: "Emily Davis",
      action: "assigned 3 new tasks",
      time: "1 day ago",
    },
    {
      id: 5,
      user: "Michael Brown",
      action: "commented on Issue #456",
      time: "2 days ago",
    },
  ],
};

const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
          + New Project
        </button>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {mockData.stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className={`inline-block p-3 rounded-full ${stat.color} mb-4`}>
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <h3 className="text-3xl font-bold">{stat.value}</h3>
            <p className="text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Dashboard Tabs */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <div className="flex border-b">
          <button
            className={`px-6 py-3 font-medium ${activeTab === "overview" ? "text-blue-600 border-b-2 border-blue-500" : "text-gray-600"}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`px-6 py-3 font-medium ${activeTab === "projects" ? "text-blue-600 border-b-2 border-blue-500" : "text-gray-600"}`}
            onClick={() => setActiveTab("projects")}
          >
            Projects
          </button>
          <button
            className={`px-6 py-3 font-medium ${activeTab === "tasks" ? "text-blue-600 border-b-2 border-blue-500" : "text-gray-600"}`}
            onClick={() => setActiveTab("tasks")}
          >
            Tasks
          </button>
          <button
            className={`px-6 py-3 font-medium ${activeTab === "settings" ? "text-blue-600 border-b-2 border-blue-500" : "text-gray-600"}`}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </button>
        </div>

        <div className="p-6">
          {activeTab === "overview" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {mockData.recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start border-b border-gray-100 pb-4"
                  >
                    <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                      {activity.user.charAt(0)}
                    </div>
                    <div>
                      <p>
                        <span className="font-medium">{activity.user}</span>{" "}
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "projects" && (
            <div className="text-center py-8 text-gray-500">
              Projects tab content will appear here
            </div>
          )}

          {activeTab === "tasks" && (
            <div className="text-center py-8 text-gray-500">
              Tasks tab content will appear here
            </div>
          )}

          {activeTab === "settings" && (
            <div className="text-center py-8 text-gray-500">
              Settings tab content will appear here
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
