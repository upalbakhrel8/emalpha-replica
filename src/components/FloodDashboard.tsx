import { useState, useEffect } from 'react';

interface FloodRecord {
  id: number;
  location: string;
  river: string;
  dangerLevel: string;
  status: string;
  updated: string;
}

function FloodDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dangerFilter, setDangerFilter] = useState("All");
  const [floodData, setFloodData] = useState<FloodRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // The 5 specific districts hit by the recent floods
  const recentCriticalAreas = ["Kathmandu", "Lalitpur", "Bhaktapur", "Nuwakot", "Rasuwa"];

  useEffect(() => {
    const fetchFromMockApi = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=77");
        const apiPosts = await response.json();

        const nepalDistricts = [
          "Achham", "Arghakhanchi", "Baglung", "Baitadi", "Bajhang", "Bajura", "Banke", "Bara", "Bardiya", "Bhaktapur", "Bhojpur", "Chitwan", "Dadeldhura", "Dailekh", "Dang", "Darchula", "Dhading", "Dhankuta", "Dhanusa", "Dolakha", "Dolpa", "Doti", "Eastern Rukum", "Gorkha", "Gulmi", "Humla", "Ilam", "Jajarkot", "Jhapa", "Jumla", "Kailali", "Kalikot", "Kanchanpur", "Kapilvastu", "Kaski", "Kathmandu", "Kavrepalanchok", "Khotang", "Lalitpur", "Lamjung", "Mahottari", "Makwanpur", "Manang", "Morang", "Mugu", "Mustang", "Myagdi", "Nawalpur", "Nuwakot", "Okhaldhunga", "Palpa", "Panchthar", "Parasi", "Parbat", "Parsa", "Pyuthan", "Ramechhap", "Rasuwa", "Rautahat", "Rolpa", "Rupandehi", "Salyan", "Sankhuwasabha", "Saptari", "Sarlahi", "Sindhuli", "Sindhupalchok", "Siraha", "Solukhumbu", "Sunsari", "Surkhet", "Syangja", "Tanahun", "Taplejung", "Terhathum", "Udayapur", "Western Rukum"
        ];

        const dynamicRecords: FloodRecord[] = apiPosts.map((post: { id: number }, index: number) => {
          const districtName = nepalDistricts[index];
          
          // Check if this district is in our top 5 critical list
          const isCritical = recentCriticalAreas.includes(districtName);

          return {
            id: post.id,
            location: districtName,
            river: isCritical ? "Major River" : "Regional River",
            dangerLevel: isCritical ? "Critical" : "Low",
            status: isCritical ? "Severe Flooding Alert" : "Normal",
            updated: "Live sync via Mock API"
          };
        });

        setFloodData(dynamicRecords);
      } catch (error) {
        console.error("Failed to load mock API flood data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFromMockApi();
  }, []);

  // The Dual-Rule Filter
  let displayedData = [];

  if (searchTerm === "" && dangerFilter === "All") {
    // RULE 1: If user hasn't searched anything, ONLY show the 5 critical areas
    displayedData = floodData.filter((row) => recentCriticalAreas.includes(row.location));
  } else {
    // RULE 2: If user types in the search bar, search ALL 77 districts
    displayedData = floodData.filter((row) => {
      const matchesSearch = row.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDanger = dangerFilter === "All" || row.dangerLevel === dangerFilter;
      return matchesSearch && matchesDanger;
    });
  }

  return (
    <div className="container py-5 flex-grow-1">
      <h2 className="text-white mb-4 fw-bold">National Flood Dashboard</h2>

      <div className="d-flex gap-3 mb-4">
        <input
          type="text"
          className="form-control bg-dark text-white border-secondary"
          placeholder="Search any of 77 districts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: "300px" }}
        />
        <select
          className="form-select bg-dark text-white border-secondary"
          value={dangerFilter}
          onChange={(e) => setDangerFilter(e.target.value)}
          style={{ maxWidth: "200px" }}
        >
          <option value="All">All Danger Levels</option>
          <option value="Critical">Critical</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div className="p-4 rounded-4" style={{ backgroundColor: "#0E1424", border: "1px solid #242d45" }}>
        {isLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-secondary mt-3">Syncing national data...</p>
          </div>
        ) : (
          <div style={{ maxHeight: "600px", overflowY: "auto" }}>
            <table className="table table-dark mb-0" style={{ backgroundColor: "transparent" }}>
              <thead style={{ position: "sticky", top: 0, backgroundColor: "#0E1424", zIndex: 1 }}>
                <tr>
                  <th className="text-secondary border-bottom border-secondary">Location</th>
                  <th className="text-secondary border-bottom border-secondary">River/Area</th>
                  <th className="text-secondary border-bottom border-secondary">Danger Level</th>
                  <th className="text-secondary border-bottom border-secondary">Status</th>
                  <th className="text-secondary border-bottom border-secondary">Sync Source</th>
                </tr>
              </thead>
              <tbody>
                {displayedData.map((row) => (
                  <tr key={row.id}>
                    <td className="text-white">{row.location}</td>
                    <td className="text-white">{row.river}</td>
                    <td>
                      <span className={`badge ${row.dangerLevel === 'Critical' ? 'bg-danger' : 'bg-success'}`}>
                        {row.dangerLevel}
                      </span>
                    </td>
                    <td className="text-white">{row.status}</td>
                    <td className="text-secondary">{row.updated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default FloodDashboard;