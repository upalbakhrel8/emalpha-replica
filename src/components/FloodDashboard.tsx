import { useState } from 'react';

function FloodDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dangerFilter, setDangerFilter] = useState("All");
  
  const floodData = [
    { id: 1, location: "Kathmandu", river: "Bagmati", dangerLevel: "High", status: "Evacuation Warning", updated: "2 mins ago" },
    { id: 2, location: "Lalitpur", river: "Nakhu", dangerLevel: "Critical", status: "Flooded", updated: "1 min ago" },
    { id: 3, location: "Bhaktapur", river: "Hanumante", dangerLevel: "Moderate", status: "Monitoring", updated: "5 mins ago" },
    { id: 4, location: "Sindhupalchok", river: "Melamchi", dangerLevel: "Critical", status: "Evacuated", updated: "10 mins ago" },
    { id: 5, location: "Chitwan", river: "Narayani", dangerLevel: "Low", status: "Normal", updated: "1 hour ago" }
  ];

  // The Bouncer: This creates a new, temporary list of only the rows that match your search and dropdown.
  const filteredData = floodData.filter((row) => {
    const matchesSearch = row.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDanger = dangerFilter === "All" || row.dangerLevel === dangerFilter;
    return matchesSearch && matchesDanger;
  });

  return (
    <div className="container py-5 flex-grow-1">
      <h2 className="text-white mb-4 fw-bold">Nepal Flood Monitoring Dashboard</h2>

      <div className="d-flex gap-3 mb-4">
        <input
          type="text"
          className="form-control bg-dark text-white border-secondary"
          placeholder="Search location..."
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
          <option value="High">High</option>
          <option value="Moderate">Moderate</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div className="p-4 rounded-4" style={{ backgroundColor: "#0E1424", border: "1px solid #242d45" }}>
        <table className="table table-dark mb-0" style={{ backgroundColor: "transparent" }}>
          <thead>
            <tr>
              <th className="text-secondary border-bottom border-secondary">Location</th>
              <th className="text-secondary border-bottom border-secondary">River/Area</th>
              <th className="text-secondary border-bottom border-secondary">Danger Level</th>
              <th className="text-secondary border-bottom border-secondary">Status</th>
              <th className="text-secondary border-bottom border-secondary">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {/* Notice we are looping over filteredData now, not floodData */}
            {filteredData.map((row) => (
              <tr key={row.id}>
                <td className="text-white">{row.location}</td>
                <td className="text-white">{row.river}</td>
                <td>
                  <span className={`badge ${row.dangerLevel === 'Critical' ? 'bg-danger' : row.dangerLevel === 'High' ? 'bg-warning text-dark' : row.dangerLevel === 'Moderate' ? 'bg-secondary' : 'bg-success'}`}>
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
    </div>
  );
}

export default FloodDashboard;