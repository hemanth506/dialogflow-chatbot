import { useEffect, useState } from "react";
import "./App.css";

const initalEnvUserIps = () => {
  const ips = import.meta.env.VITE_USER_IPS || "";
  return ips.split(",");
};

function App() {
  const [userIps] = useState(initalEnvUserIps);
  const [isLoading, setIsLoading] = useState(true);
  const [isIpFound, setIsIpFound] = useState(false);

  useEffect(() => {
    async function getIpAddress() {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        const ipAddress = data.ip;
        if (userIps.includes(ipAddress)) {
          console.log("🚀 ~ getIpAddress ~ isFound:", ipAddress);
          setIsIpFound(true);
        }
      } catch (error) {
        console.error("Error fetching IP address:", error);
      } finally {
        setIsLoading(false);
      }
    }
    getIpAddress();
  }, []);

  const handleClearSession = () => {
    sessionStorage.removeItem("df-messenger-messages");
    sessionStorage.removeItem("df-messenger-lastResponseInstant");
    sessionStorage.removeItem("df-messenger-sessionID");
    sessionStorage.removeItem("df-messenger-chatScrollDistance");
    window.location.reload();
  };

  return (
    <>
      {!isLoading ? (
        isIpFound ? (
          <>
            <button id="clear-session" onClick={handleClearSession}>
              Clear session
            </button>
            <df-messenger
              location="us-central1"
              project-id="cx-transformation"
              agent-id="d5726e24-b978-4e86-965c-72ba4b5297d5"
              language-code="en"
              max-query-length="-1"
              allow-feedback="all"
            >
              <df-messenger-chat-bubble chat-title="Compound Entity V2 - Dev"></df-messenger-chat-bubble>
            </df-messenger>
          </>
        ) : (
          <>
            <h1>Oops...</h1>
            <h1>401 - IP is Unauthorized</h1>
          </>
        )
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
}

export default App;
