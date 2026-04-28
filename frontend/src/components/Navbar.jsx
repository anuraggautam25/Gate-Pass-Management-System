// function Navbar() {
//   return (
//     <div className="navbar">
//       <h2>Gate Pass System</h2>
//     </div>
//   );
// }

// export default Navbar;
import gailLogo from "../assets/gail.png";

function Navbar() {
  return (
    <div className="navbar">
      <div className="nav-left">
        <img src={gailLogo} alt="GAIL" className="nav-logo" />
        <div className="nav-title">GAIL Gate Pass System</div>
      </div>

      <div>
        {/* optional right side */}
      </div>
    </div>
  );
}

export default Navbar;
