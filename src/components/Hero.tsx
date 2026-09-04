import { useState } from 'react';

function Hero() {
  // This creates a "memory" variable called activeTab. It starts as "01".
  const [activeTab, setActiveTab] = useState("01");

  return (
    <div className="container-fluid py-5" style={{ backgroundColor: "#060A14", minHeight: "100vh" }}>
      {/* The main inner dark box with rounded corners */}
      <div className="container border rounded-5 p-5" style={{ backgroundColor: "#0E1424", borderColor: "#242d45" }}>
        
        {/* The Clickable Tabs Row */}
        <div className="d-flex gap-4 mb-5 text-secondary fw-bold" style={{ fontSize: "11px", letterSpacing: "2px", cursor: "pointer" }}>
          {/* If activeTab is "01", make the text white. When clicked, change memory to "01". */}
          <span onClick={() => setActiveTab("01")} className={activeTab === "01" ? "text-white" : ""}>01 PLATFORM</span>
          <span onClick={() => setActiveTab("02")} className={activeTab === "02" ? "text-white" : ""}>02 RESEARCH</span>
          <span onClick={() => setActiveTab("03")} className={activeTab === "03" ? "text-white" : ""}>03 TRADING</span>
          <span onClick={() => setActiveTab("04")} className={activeTab === "04" ? "text-white" : ""}>04 DATA</span>
        </div>

        <div className="row text-white">
          {/* Left Column: Changes dynamically based on the tab clicked */}
          <div className="col-md-7 pe-5">
            {activeTab === "01" && (
              <div>
                <p className="text-secondary fw-bold mb-3" style={{ fontSize: "11px", letterSpacing: "2px" }}>01 / EMALPHA PLATFORM</p>
                <h1 className="fw-bold mb-4" style={{ fontSize: "3.5rem", lineHeight: "1.2" }}>AI Agents That Transform Global Information into Actionable Intelligence</h1>
                <p className="text-secondary mb-5" style={{ fontSize: "18px", maxWidth: "80%" }}>AI agents that interpret global information flow and deliver actionable intelligence for research, trading, and risk workflows.</p>
              </div>
            )}

            {activeTab === "02" && (
              <div>
                <p className="text-secondary fw-bold mb-3" style={{ fontSize: "11px", letterSpacing: "2px" }}>02 / RESEARCH</p>
                <h1 className="fw-bold mb-4" style={{ fontSize: "3.5rem", lineHeight: "1.2" }}>Generate Research with Multilingual AI</h1>
                <p className="text-secondary mb-5" style={{ fontSize: "18px", maxWidth: "80%" }}>Analyze global trends across multiple languages in real-time to find hidden alpha.</p>
              </div>
            )}
            
            {/* Same logic applies for 03 and 04... */}

            {/* The Two Action Buttons (Always stay at the bottom of the left column) */}
            <div className="d-flex flex-column gap-3" style={{ width: "fit-content" }}>
              <button className="btn btn-primary rounded-pill py-3 px-4 fw-bold border-0" style={{ backgroundColor: "#4a6cf7" }}>Explore AI agents</button>
              <button className="btn rounded-pill py-3 px-4 fw-bold border-0" style={{ backgroundColor: "#ffaa00" }}>What is EMAlpha's Multilingual AI?</button>
            </div>
          </div>

          {/* Right Column: Static large text matching the screenshot */}
          <div className="col-md-5 d-flex flex-column justify-content-center border-start ps-5" style={{ borderColor: "#242d45" }}>
            <h2 className="mb-4" style={{ fontSize: "3rem", fontFamily: "serif" }}>EMAlpha - The AI Intelligence Layer for Global Markets</h2>
            <p className="text-secondary" style={{ fontSize: "14px" }}>Monitor risk • Generate research • Optimize execution across 50+ markets</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;