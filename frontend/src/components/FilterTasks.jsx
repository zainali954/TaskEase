import React from "react";
import NestedFilterDropdown from "./NestedFilterDropdown";

const App = () => {
  const handleFilterSelect = (category, option) => {
    console.log(`Filter Selected: ${category} - ${option}`);
    // Add logic to apply the selected filter
  };

  return (
    <div >
      <NestedFilterDropdown onFilterSelect={handleFilterSelect} />
    </div>
  );
};

export default App;
