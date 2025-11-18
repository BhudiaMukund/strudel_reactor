import styled from "styled-components";

const Navbar = () => {
  return (
    <NavbarContainer>
      <h2>Strudel Reactor</h2>
      <div className="settings-container">
        <button className="btn btn-secondary">
          <span className="material-symbols-outlined">settings</span>
        </button>
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
  }
`;
