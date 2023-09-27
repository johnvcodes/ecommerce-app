import { ShoppingBag } from "lucide-react";
import IconButton from "./IconButton";
import { Link } from "react-router-dom";

function ActionBag() {
  return (
    <>
      <div className="md:hidden">
        <IconButton component={Link} to="/">
          <ShoppingBag size={24} strokeWidth={1.5} />
        </IconButton>
      </div>
      <div className="hidden md:block">
        <IconButton type="button">
          <ShoppingBag size={24} strokeWidth={1.5} />
        </IconButton>
      </div>
    </>
  );
}

export default ActionBag;
