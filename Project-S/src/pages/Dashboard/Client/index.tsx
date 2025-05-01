import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

// Mock data for dashboard
const mockData = {
  lawyerSuggestions: [
    {
      id: 1,
      name: "Jane Smith",
      specialization: "Family Law",
      rating: 4.8,
      imageUrl: "https://randomuser.me/api/portraits/women/23.jpg",
    },
    {
      id: 2,
      name: "Robert Johnson",
      specialization: "Criminal Defense",
      rating: 4.9,
      imageUrl: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      id: 3,
      name: "Emily Davis",
      specialization: "Corporate Law",
      rating: 4.7,
      imageUrl: "https://randomuser.me/api/portraits/women/65.jpg",
    },
  ],
  upcomingConsultations: [
    {
      id: 101,
      lawyerName: "Jane Smith",
      date: "2025-05-10T14:00:00",
      topic: "Divorce Consultation",
      status: "confirmed",
    },
    {
      id: 102,
      lawyerName: "Robert Johnson",
      date: "2025-05-15T10:30:00",
      topic: "Contract Review",
      status: "pending",
    },
  ],
  recentCases: [
    {
      id: 201,
      title: "Property Dispute",
      status: "active",
      lastUpdate: "2025-04-28",
      lawyer: "Jane Smith",
    },
    {
      id: 202,
      title: "Contract Negotiation",
      status: "completed",
      lastUpdate: "2025-04-15",
      lawyer: "Emily Davis",
    },
  ],
};

const ClientDashboard: React.FC = () => {
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

  // Redirect if not authenticated or not a client
  if (
    !loading &&
    (!user || (user.role !== "client" && user.role !== "default"))
  ) {
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
      <h1 className="text-3xl font-bold mb-8">Client Dashboard</h1>

      {/* Dashboard overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-blue-600 text-lg font-medium mb-2">
            Ongoing Cases
          </div>
          <div className="text-3xl font-bold">2</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-green-600 text-lg font-medium mb-2">
            Upcoming Consultations
          </div>
          <div className="text-3xl font-bold">2</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-purple-600 text-lg font-medium mb-2">
            Completed Cases
          </div>
          <div className="text-3xl font-bold">1</div>
        </div>
      </div>

      {/* Find a Lawyer section */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Find a Lawyer</h2>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockData.lawyerSuggestions.map((lawyer) => (
            <div
              key={lawyer.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="flex items-center p-4 border-b">
                <img
                  src={lawyer.imageUrl}
                  alt={lawyer.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                  onError={(e) => {
                    // Fallback if image doesn't load
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/150";
                  }}
                />
                <div>
                  <h3 className="font-semibold text-lg">{lawyer.name}</h3>
                  <p className="text-blue-600">{lawyer.specialization}</p>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span>{lawyer.rating}</span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded">
                  Book Consultation
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Consultations section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Upcoming Consultations</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lawyer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Topic
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockData.upcomingConsultations.map((consultation) => (
                <tr key={consultation.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {consultation.lawyerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatDate(consultation.date)}
                  </td>
                  <td className="px-6 py-4">{consultation.topic}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${consultation.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                    >
                      {consultation.status === "confirmed"
                        ? "Confirmed"
                        : "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      View
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Active Cases section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">My Cases</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Case
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lawyer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Update
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockData.recentCases.map((caseItem) => (
                <tr key={caseItem.id}>
                  <td className="px-6 py-4">{caseItem.title}</td>
                  <td className="px-6 py-4">{caseItem.lawyer}</td>
                  <td className="px-6 py-4">{caseItem.lastUpdate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${caseItem.status === "active" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}
                    >
                      {caseItem.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-900">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ClientDashboard;
