import React, { useState } from "react";

export function SaveControls({ onExportSave, onImportSave, onClearSave }) {
  const [importMessage, setImportMessage] = useState("");

  const handleExport = () => {
    onExportSave();
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const result = onImportSave(e.target.result);
            if (result) {
              setImportMessage("Save imported! Please refresh the page to see changes.");
            } else {
              setImportMessage("Error: Failed to import save");
              setTimeout(() => setImportMessage(""), 3000);
            }
          } catch (error) {
            setImportMessage("Error: Invalid save file");
            setTimeout(() => setImportMessage(""), 3000);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleClearData = () => {
    if (window.confirm("Are you sure you want to clear all save data? This cannot be undone.")) {
      try {
        onClearSave();
        setImportMessage("Save data cleared!");
        setTimeout(() => {
          setImportMessage("");
          window.location.reload();
        }, 1000);
      } catch (error) {
        setImportMessage("Error: Failed to clear save data");
        setTimeout(() => setImportMessage(""), 3000);
      }
    }
  };

  return (
    <div className="saveControls">
      <div style={{fontSize: '12px', marginBottom: '5px', fontWeight: 'bold'}}>Save Options:</div>
      <button className="exportButton" onClick={handleExport} title="Export save data to file">
        Export
      </button>
      <button className="importButton" onClick={handleImport} title="Import save data from file">
        Import
      </button>
      <button className="clearButton" onClick={handleClearData} title="Clear all save data">
        Clear Data
      </button>
      {importMessage && <div className="importMessage">{importMessage}</div>}
    </div>
  );
}