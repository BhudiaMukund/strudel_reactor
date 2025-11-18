import { useRef } from "react";
import styled from "styled-components";

const Navbar = ({ onExport }) => {
  const downloadRef = useRef(null);
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
        <ul class="dropdown-menu">
          <li>
            <button
              className="dropdown-item"
              onClick={() => onExport(downloadRef)}
            >
              Export Preset JSON
            </button>
          </li>
        </ul>
      </div>
      {/* Hidden link for exporting */}
      <a ref={downloadRef} style={{ display: "none" }}>download</a>
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
  }
`;
