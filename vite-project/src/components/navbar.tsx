import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const Mname = localStorage.getItem("name");
  const navigate = useNavigate();

  const handlelogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("phone");
    navigate("/");
  };

  if (!Mname) {
    return (
      <div className="h-20 bg-black text-blue-400">
        <div className="text-xl px-10 py-4">Login to View page</div>
      </div>
    );
  }

  return (
    <div className="h-20 bg-black text-blue-400 flex justify-between items-center px-10">
      <div className="text-xl">Welcome {Mname}</div>
      <div className="flex gap-4">
        <Button variant="outlined" onClick={handlelogout}>
          Logout
        </Button>
        <Button variant="outlined" onClick={() => navigate("/about")}>
          About Us
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
