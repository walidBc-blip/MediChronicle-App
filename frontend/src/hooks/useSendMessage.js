import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import axios from "axios";
import { useUserContext } from "../contexts/UserContext";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const { user } = useUserContext();
  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `http://localhost:3001/api/messages/send/${selectedConversation._id}`,
        { message: message, senderId: user.id }
      );
      const { data } = res;
      if (data.error) throw new Error(data.error);

      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};
export default useSendMessage;
