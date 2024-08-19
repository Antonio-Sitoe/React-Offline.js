import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "offline-js";
import "offline-js/themes/offline-theme-chrome.css";
import "offline-js/themes/offline-language-portuguese-brazil.css";

function App() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Configuração do Offline.js
    Offline.options = {
      checkOnLoad: true,
      interceptRequests: true,
      reconnect: {
        initialDelay: 3,
        delay: 10,

      },
    };

    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    // Eventos para monitorar o estado da conexão
    Offline.on("up", handleOnline);
    Offline.on("down", handleOffline);

    // Limpeza ao desmontar o componente
    return () => {
      Offline.off("up", handleOnline);
      Offline.off("down", handleOffline);
    };
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {isOnline ? (
          <div
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "10px",
            }}
          >
            Conexão Restabelecida!
          </div>
        ) : (
          <div
            style={{ backgroundColor: "red", color: "white", padding: "10px" }}
          >
            Conexão Perdida! Verifique sua internet.
          </div>
        )}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
