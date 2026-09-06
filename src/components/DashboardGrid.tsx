

// The data shape for a single row
interface Record {
  id: number;
  location: string;
  detail: string; 
  severity: string;
  status: string;
  updated: string;
}

// The Props this Grid needs from the Parent
interface GridProps {
  data: Record[];
  isLoading: boolean;
  detailColumnName: string;
}

function DashboardGrid({ data, isLoading, detailColumnName }: GridProps) {
  return (
    <div className="p-4 rounded-4" style={{ backgroundColor: "#0E1424", border: "1px solid #242d45" }}>
      {isLoading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="text-secondary mt-3">Loading live data...</p>
        </div>
      ) : (
        <div style={{ maxHeight: "600px", overflowY: "auto" }}>
          <table className="table table-dark mb-0" style={{ backgroundColor: "transparent" }}>
            <thead style={{ position: "sticky", top: 0, backgroundColor: "#0E1424", zIndex: 1 }}>
              <tr>
                <th className="text-secondary border-bottom border-secondary">Location</th>
                <th className="text-secondary border-bottom border-secondary">{detailColumnName}</th>
                <th className="text-secondary border-bottom border-secondary">Severity</th>
                <th className="text-secondary border-bottom border-secondary">Status</th>
                <th className="text-secondary border-bottom border-secondary">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id}>
                  <td className="text-white">{row.location}</td>
                  <td className="text-white">{row.detail}</td>
                  <td>
                    <span className={`badge ${row.severity === 'Critical' ? 'bg-danger' : row.severity === 'High' ? 'bg-warning text-dark' : 'bg-success'}`}>
                      {row.severity}
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
  );
}

export default DashboardGrid;