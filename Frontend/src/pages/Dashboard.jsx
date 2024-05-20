import { useState, useEffect } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';

export const Dashboard = () => {
    const [searchParams] = useSearchParams();
    const name = searchParams.get("name");
  const [balance, setBalance] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBalance = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        navigate("/signin"); // Redirect to signin if no token is found
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
        if (error.response && error.response.status === 403) {
          navigate("/signin"); // Redirect to signin if the request is forbidden
        }
      }
    };

    fetchBalance();
  }, [navigate]);

  return (
    <div>
      <Appbar value={name} />
      <div className="m-8">
        {balance !== null ? <Balance value={balance} /> : <p>Loading...</p>}
        <Users />
      </div>
    </div>
  );
};
