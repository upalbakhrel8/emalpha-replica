import { useState, useEffect } from 'react';
import DashboardFilter from './DashboardFilter';
import DashboardGrid from './DashboardGrid';

interface QuakeRecord { id: number; location: string; detail: string; severity: string; status: string; updated: string; }

function EarthquakeDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dangerFilter, setDangerFilter] = useState("All");
  const [quakeData, setQuakeData] = useState<QuakeRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // The 5 critical seismic zones we want visible by default
  const recentEpicenters = ["Jajarkot", "Western Rukum", "Kathmandu", "Gorkha", "Sindhupalchok"];

  useEffect(() => {
    const fetchFromMockApi = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=77");
        const apiPosts = await response.json();

        const nepalDistricts = [
          "Achham", "Arghakhanchi", "Baglung", "Baitadi", "Bajhang", "Bajura", "Banke", "Bara", "Bardiya", "Bhaktapur", "Bhojpur", "Chitwan", "Dadeldhura", "Dailekh", "Dang", "Darchula", "Dhading", "Dhankuta", "Dhanusa", "Dolakha", "Dolpa", "Doti", "Eastern Rukum", "Gorkha", "Gulmi", "Humla", "Ilam", "Jajarkot", "Jhapa", "Jumla", "Kailali", "Kalikot", "Kanchanpur", "Kapilvastu", "Kaski", "Kathmandu", "Kavrepalanchok", "Khotang", "Lalitpur", "Lamjung", "Mahottari", "Makwanpur", "Manang", "Morang", "Mugu", "Mustang", "Myagdi", "Nawalpur", "Nuwakot", "Okhaldhunga", "Palpa", "Panchthar", "Parasi", "Parbat", "Parsa", "Pyuthan", "Ramechhap", "Rasuwa", "Rautahat", "Rolpa", "Rupandehi", "Salyan", "Sankhuwasabha", "Saptari", "Sarlahi", "Sindhuli", "Sindhupalchok", "Siraha", "Solukhumbu", "Sunsari", "Surkhet", "Syangja", "Tanahun", "Taplejung", "Terhathum", "Udayapur", "Western Rukum"
        ];

        const dynamicRecords: QuakeRecord[] = apiPosts.map((post: any, index: number) => {
          const districtName = nepalDistricts[index];
          
          // Logic for earthquake severity
          const isCritical = districtName === "Jajarkot" || districtName === "Western Rukum";
          const isHigh = districtName === "Gorkha" || districtName === "Sindhupalchok" || districtName === "Kathmandu";
          
          return {
            id: post.id,
            location: districtName,
            detail: isCritical ? "6.4 Mag" : isHigh ? "5.2 Mag" : "No Seismic Activity",
            severity: isCritical ? "Critical" : isHigh ? "High" : "Low",
            status: isCritical ? "Active Rescue" : isHigh ? "Monitoring" : "Stable",
            updated: "Live Seismic Sync"
          };
        });

        setQuakeData(dynamicRecords);
      } catch (error) {
        console.error("Failed", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFromMockApi();
  }, []);

  let displayedData = [];
  if (searchTerm === "" && dangerFilter === "All") {
    displayedData = quakeData.filter((row) => recentEpicenters.includes(row.location));
  } else {
    displayedData = quakeData.filter((row) => {
      const matchesSearch = row.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDanger = dangerFilter === "All" || row.severity === dangerFilter;
      return matchesSearch && matchesDanger;
    });
  }

  return (
    <div className="container py-5 flex-grow-1">
      <h2 className="text-white mb-4 fw-bold">Seismic & Earthquake Dashboard</h2>
      
      <DashboardFilter 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        dangerFilter={dangerFilter} 
        setDangerFilter={setDangerFilter} 
        placeholderText="Search all 77 districts..." 
      />

      <DashboardGrid 
        data={displayedData} 
        isLoading={isLoading} 
        detailColumnName="Magnitude" 
      />
    </div>
  );
}

export default EarthquakeDashboard;