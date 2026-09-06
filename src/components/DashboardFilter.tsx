

// The Blueprint (Props): Tells the child exactly what data the parent will pass down to it
interface FilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  dangerFilter: string;
  setDangerFilter: (value: string) => void;
  placeholderText: string;
}

function DashboardFilter({ searchTerm, setSearchTerm, dangerFilter, setDangerFilter, placeholderText }: FilterProps) {
  return (
    <div className="d-flex gap-3 mb-4">
      <input
        type="text"
        className="form-control bg-dark text-white border-secondary"
        placeholder={placeholderText}
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
        <option value="All">All Levels</option>
        <option value="Critical">Critical</option>
        <option value="High">High</option>
        <option value="Low">Low</option>
      </select>
    </div>
  );
}

export default DashboardFilter;