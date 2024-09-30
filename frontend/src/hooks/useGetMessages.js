import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import axios from "axios";
import { useUserContext } from "../contexts/UserContext";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const { user } = useUserContext();
  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:3001/api/messages/${selectedConversation._id}`,
          {
            params: { senderId: user.id },
          }
        );

        // const res = await fetch(`/api/messages/${selectedConversation._id}`);
        // const data = await res.json();
        if (res.data.error) throw new Error(res.data.error);
        setMessages(res.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};
export default useGetMessages;
