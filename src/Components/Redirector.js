import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Redirector = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/notfound");
  });
  return;
};

export default Redirector;
