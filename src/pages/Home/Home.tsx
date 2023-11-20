import "./Home.css";
import { Button, ConfigProvider, message, theme } from "antd";
import { useNavigate } from "react-router";
import createNewBoard from "../../utils/createNewBoard";
import OpenBoardModal from "../../components/openBoardModal/OpenBoardModal";
import { useState } from "react";

export default function Home() {
  const { defaultAlgorithm } = theme;
  let navigate = useNavigate();
  const [openBoardModal, setOpenBoardModal] = useState(false);
  const [messageApi, messageContextHolder] = message.useMessage();

  const displayError = (message: string) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };

  const newBoard = async () => {
    let path = `/view/` + (await createNewBoard());
    navigate(path);
  };

  const goToBoard = () => {
    setOpenBoardModal(true)
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
      <OpenBoardModal
        shouldShow={openBoardModal}
        closeModal={() => {
          setOpenBoardModal(false);
        }}
        displayError={displayError}
      />
    </ConfigProvider>
  );
}
