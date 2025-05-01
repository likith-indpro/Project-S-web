import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

// Mock data for lawyer dashboard
const mockData = {
  upcomingAppointments: [
    {
      id: 101,
      clientName: "John Doe",
      date: "2025-05-03T09:00:00",
      type: "Initial Consultation",
      status: "confirmed",
    },
    {
      id: 102,
      clientName: "Sarah Williams",
      date: "2025-05-05T14:30:00",
      type: "Case Discussion",
      status: "confirmed",
    },
    {
      id: 103,
      clientName: "Michael Brown",
      date: "2025-05-08T11:00:00",
      type: "Document Review",
      status: "pending",
    },
  ],
  activeCases: [
    {
      id: 201,
      title: "Doe vs. Smith - Property Dispute",
      clientName: "John Doe",
      status: "In Progress",
      lastUpdate: "2025-04-29",
      nextHearing: "2025-06-15",
    },
    {
      id: 202,
      title: "Williams Estate Planning",
      clientName: "Sarah Williams",
      status: "Review",
      lastUpdate: "2025-04-27",
      nextHearing: "N/A",
    },
    {
      id: 203,
      title: "Brown vs. City - Personal Injury",
      clientName: "Michael Brown",
      status: "Court Filing",
      lastUpdate: "2025-04-25",
      nextHearing: "2025-05-20",
    },
  ],
  recentMessages: [
    {
      id: 301,
      from: "John Doe",
      subject: "Question about property documents",
      time: "2025-04-30T15:23:00",
      isRead: false,
    },
    {
      id: 302,
      from: "Sarah Williams",
      subject: "Updated information for estate plan",
      time: "2025-04-29T09:45:00",
      isRead: true,
    },
    {
      id: 303,
      from: "Michael Brown",
      subject: "Medical records for the case",
      time: "2025-04-28T14:10:00",
      isRead: true,
    },
  ],
};

const LawyerDashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, verify the user is authenticated and has the correct role
    const userJson = localStorage.getItem("user_info");
    if (userJson) {
      setUser(JSON.parse(userJson));
    }
    setLoading(false);
  }, []);

  // Redirect if not authenticated or not a lawyer
  if (!loading && (!user || user.role !== "lawyer")) {
    return <Navigate to="/login" replace />;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Lawyer Dashboard</h1>

      {/* Dashboard overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-blue-600 text-lg font-medium mb-2">
            Active Cases
          </div>
          <div className="text-3xl font-bold">3</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-green-600 text-lg font-medium mb-2">
            Upcoming Appointments
          </div>
          <div className="text-3xl font-bold">3</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-yellow-600 text-lg font-medium mb-2">
            Unread Messages
          </div>
          <div className="text-3xl font-bold">1</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-purple-600 text-lg font-medium mb-2">
            Monthly Revenue
          </div>
          <div className="text-3xl font-bold">$12,500</div>
        </div>
      </div>

      {/* Today's Schedule */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Today's Schedule</h2>
          <button className="text-blue-600 hover:text-blue-800">
            View Full Calendar
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="relative">
              {/* Timeline */}
              <div className="hidden sm:block absolute top-0 bottom-0 left-8 w-0.5 bg-gray-200"></div>

              {mockData.upcomingAppointments.length > 0 ? (
                <div className="space-y-6">
                  {mockData.upcomingAppointments.map((appointment, index) => (
                    <div key={appointment.id} className="relative pl-12">
                      <div className="absolute left-4 top-1 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">
                          {new Date(appointment.date).getHours()}
                        </span>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                        <div className="flex justify-between mb-1">
                          <h4 className="font-medium">
                            {appointment.type} with {appointment.clientName}
                          </h4>
                          <span
                            className={`text-sm px-2 py-1 rounded-full ${appointment.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                          >
                            {appointment.status}
                          </span>
                        </div>
                        <p className="text-gray-500 text-sm">
                          {formatDate(appointment.date)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-gray-500">
                  No appointments scheduled for today
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Active Cases section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Active Cases</h2>
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Case
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Update
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Hearing
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockData.activeCases.map((caseItem) => (
                <tr key={caseItem.id}>
                  <td className="px-6 py-4">{caseItem.title}</td>
                  <td className="px-6 py-4">{caseItem.clientName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {caseItem.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {caseItem.lastUpdate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {caseItem.nextHearing}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      View
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Recent Messages */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Recent Messages</h2>
        <div className="bg-white rounded-lg shadow-md">
          <ul className="divide-y divide-gray-200">
            {mockData.recentMessages.map((message) => (
              <li
                key={message.id}
                className={`p-5 hover:bg-gray-50 cursor-pointer ${!message.isRead ? "bg-blue-50" : ""}`}
              >
                <div className="flex justify-between">
                  <div className="font-semibold">{message.from}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(message.time).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-gray-800">{message.subject}</div>
                <div className="flex justify-between mt-2">
                  <div className="text-sm text-gray-500">
                    {!message.isRead && (
                      <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full mr-2">
                        New
                      </span>
                    )}
                    {message.isRead ? "Read" : "Unread"}
                  </div>
                  <div>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      Reply
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="p-4 border-t">
            <button className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md">
              View All Messages
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LawyerDashboard;
