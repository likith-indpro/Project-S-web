import React, { useEffect, useState } from "react";

// This is just a placeholder. In a real app, you might define interfaces
// in a separate types folder
interface Item {
  id: string;
  title: string;
  description: string;
}

const HomePage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate fetching data from your Directus backend
    // In a real application, you would use the directusService here
    setTimeout(() => {
      setItems([
        { id: "1", title: "Item 1", description: "This is the first item" },
        { id: "2", title: "Item 2", description: "This is the second item" },
        { id: "3", title: "Item 3", description: "This is the third item" },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to Project S</h1>
      <p className="text-lg mb-8">
        This is a demonstration of a React application with Vite, Tailwind CSS,
        and Directus integration.
      </p>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Featured Items</h2>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
                <button className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
