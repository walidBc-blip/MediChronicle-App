import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useUserContext } from "../contexts/UserContext";
import axios from "axios";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const { user } = useUserContext();
  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:3001/api/users/${user.userName}`
        );
        console.log(res.data);
        if (res.data.error) {
          throw new Error(res.data.error);
        }
        setConversations(res.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
