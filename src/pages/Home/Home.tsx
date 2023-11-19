import { useState } from "react";
import "./Home.css";
import { Button, ConfigProvider, message, theme } from "antd";
import { useNavigate } from "react-router";

export default function Home() {
  const { defaultAlgorithm } = theme;
  const [messageApi, messageContextHolder] = message.useMessage();
  let navigate = useNavigate();

  const displayError = (message: string) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };

  const newBoard = () => {
    let path = `/view/1`;
    navigate(path);
  };

  const goToBoard = () => {
    let path = `/view/1`;
    navigate(path);
  };

  return (
    <ConfigProvider theme={{ algorithm: defaultAlgorithm }}>
      {messageContextHolder}

      <div className="App">
        <header className="App-header">
          <h1>Leader Board</h1>
          <p>
            A free web based application which allows users to log and store
            entries in an interactive scoreboard.
          </p>
          <br />
          <Button
            style={{ width: "50%" }}
            type="dashed"
            block
            onClick={newBoard}
          >
            Create new leader board
          </Button>
          <p>or</p>
          <Button
            style={{ width: "50%" }}
            type="dashed"
            block
            onClick={goToBoard}
          >
            Go to existing leader board
          </Button>
        </header>
      </div>
    </ConfigProvider>
  );
}
