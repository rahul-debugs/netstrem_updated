// import { useEffect, useState } from "react";

// function Blog() {
//   const [updates, setUpdates] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:8000/api/updates/")
//       .then((res) => res.json())
//       .then((data) => setUpdates(data));
//   }, []);

//   return (
//     <>
//       <br /><br />
//       <div className="min-h-screen bg-white text-black flex flex-col items-center px-4 py-12">
//         <h1 className="text-4xl font-bold mb-6">Latest Updates</h1>

//         <p className="text-gray-700 max-w-3xl text-center mb-10">
//           Stay tuned for the latest announcements, improvements, feature rollouts,
//           and behind-the-scenes updates from our team. 🚀
//         </p>

//         <div className="space-y-10 w-full max-w-4xl">
//           {updates.map((item) => (
//             <div
//               key={item.id}
//               className="flex flex-col md:flex-row bg-gray-100 rounded-xl shadow-md overflow-hidden border border-gray-300"
//             >
//               <img
//                 src={item.image}
//                 alt={item.title}
//                 className="w-full md:w-1/3 h-48 object-cover"
//               />

//               <div className="p-6 flex flex-col justify-center md:w-2/3">
//                 <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
//                 <p className="text-gray-700 mb-3">{item.description}</p>
//                 <span className="text-sm text-blue-600">
//                   Updated: {item.updated_at}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Blog;

// import { useEffect, useState } from "react";

// function Blog() {
//   const [updates, setUpdates] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:8000/api/updates/")
//       .then((res) => res.json())
//       .then((data) => setUpdates(data));
//   }, []);

//   // Find the latest updated item (optional badge)
//   const latestId = updates.length > 0 ? updates[0].id : null;

//   return (
//     <>
//       <br /><br />
//       <div className="min-h-screen bg-white text-black flex flex-col items-center px-4 py-12">
//         <h1 className="text-4xl font-bold mb-6">Latest Updates</h1>

//         <p className="text-gray-700 max-w-3xl text-center mb-10">
//           Stay tuned for the latest announcements, improvements, feature rollouts,
//           and behind-the-scenes updates from our team. 🚀
//         </p>

//         <div className="space-y-10 w-full max-w-4xl">
//           {updates.map((item) => (
//             <div
//               key={item.id}
//               className="group relative flex flex-col md:flex-row bg-white rounded-xl shadow-md hover:shadow-2xl border border-gray-200 transition-all duration-300 overflow-hidden"
//             >
//               {/* New badge */}
//               {item.id === latestId && (
//                 <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-3 py-1 rounded-full shadow">
//                   NEW ✨
//                 </span>
//               )}

//               <div className="md:w-1/3 bg-white flex items-center justify-center p-3">
//                 <div className="w-48 h-48 md:w-56 md:h-56 bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden">
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     className="w-full h-full object-contain"
//                   />
//                 </div>
//               </div>

//               <div className="p-6 flex flex-col justify-center md:w-2/3">
//                 <h2 className="text-3xl font-semibold mb-2 group-hover:text-blue-700 transition-colors duration-300">
//                   {item.title}
//                 </h2>
//                 <p className="text-gray-700 leading-relaxed mb-3">
//                   {item.description}
//                 </p>
//                 <span className="text-sm font-medium text-blue-600">
//                   📅 Updated: {item.updated_at}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Footer note */}

//         <br /><br />
//       <p className="mt-12 text-md font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 animate-pulse">
//   🔔 More exciting updates are coming soon… stay tuned!
// </p>

//       </div>
//     </>
//   );
// }

// export default Blog;
import { useEffect, useState } from "react";

function Blog() {
  const API = import.meta.env.VITE_API_URL;

  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const res = await fetch(`${API}/api/blog/updates/`);

        if (!res.ok) {
          throw new Error("Failed to fetch updates");
        }

        const data = await res.json();
        setUpdates(data);
      } catch (err) {
        console.error("Error fetching updates:", err);
        setError("⚠️ Unable to load updates. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUpdates();
  }, [API]);

  const latestId = updates.length > 0 ? updates[0].id : null;

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center px-4 py-12">

      <h1 className="text-4xl font-bold mb-6">Latest Updates</h1>

      {/* ================= LOADER ================= */}
      {loading && (
        <div className="flex flex-col items-center mt-10">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-3 text-gray-600">Loading updates...</p>
        </div>
      )}

      {/* ================= ERROR ================= */}
      {error && (
        <div className="mt-10 text-red-600 font-semibold">
          {error}
        </div>
      )}

      {/* ================= CONTENT ================= */}
      {!loading && !error && (
        <div className="space-y-10 w-full max-w-4xl mt-10">
          {updates.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col md:flex-row bg-white rounded-xl shadow-md hover:shadow-2xl border border-gray-200 transition-all duration-300 overflow-hidden"
            >
              {item.id === latestId && (
                <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-3 py-1 rounded-full shadow">
                  NEW ✨
                </span>
              )}

              <div className="md:w-1/3 flex items-center justify-center p-3">
                <div className="w-48 h-48 md:w-56 md:h-56 bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div className="p-6 flex flex-col justify-center md:w-2/3">
                <h2 className="text-3xl font-semibold mb-2 group-hover:text-blue-700 transition-colors duration-300">
                  {item.title}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  {item.description}
                </p>
                <span className="text-sm font-medium text-blue-600">
                  📅 Updated: {item.updated_at}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && updates.length === 0 && !error && (
        <p className="mt-10 text-gray-500">No updates available.</p>
      )}

      <p className="mt-12 text-md font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 animate-pulse">
        🔔 More exciting updates are coming soon… stay tuned!
      </p>
    </div>
  );
}

export default Blog;