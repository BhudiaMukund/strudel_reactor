import { useRef } from "react";
import styled from "styled-components";

const Navbar = ({ onExport, handleImportPreset }) => {
  const downloadRef = useRef(null);
  const fileInputRef = useRef(null);

  return (
    <NavbarContainer>
      <h2>Strudel Reactor</h2>

      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          data-bs-toggle="dropdown"
        >
          <span className="material-symbols-outlined">settings</span>
        </button>
        <ul className="dropdown-menu">
          <li>
            <button
              className="dropdown-item"
              onClick={() => onExport(downloadRef)}
            >
              <span className="material-symbols-outlined">file_export</span>
              Export Preset JSON
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => fileInputRef.current.click()}
            >
              <span className="material-symbols-outlined">
                move_to_inbox 
              </span>
              Import Preset JSON
            </button>
          </li>
        </ul>
      </div>
      <div className="hidden-buttons" style={{ display: "none" }}>
        {/* Hidden link for exporting */}
        <a ref={downloadRef} style={{ display: "none" }}>
          download
        </a>

        {/* Hidden file input triggered by nav button */}
        <input
          type="file"
          ref={fileInputRef}
          accept="application/json"
          style={{ display: "none" }}
          onChange={handleImportPreset}
        />
      </div>
    </NavbarContainer>
  );
};

export default Navbar;

const NavbarContainer = styled.nav`
  background: rgba(97, 97, 97, 0.192);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
  }
`;
