import MessageContainer from "../components/messages/MessageContainer";
import Chatsidebar from "../components/chatsidebar/chatsidebar";

const Chat = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Chatsidebar />
      <MessageContainer />
    </div>
  );
};
export default Chat;
