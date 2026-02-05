import { useEffect } from "react";
import { useCont } from "../context/Context";
import { useNavigate } from "react-router-dom";

export default function ProtectRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const { isLogin } = useCont();
  useEffect(() => {
    if (isLogin === false) {
      navigate("/login");
    }
  }, []);

  return children;
}
