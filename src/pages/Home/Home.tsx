import "./Home.css";
import { Button, ConfigProvider, Spin, message, theme } from "antd";
import { useNavigate } from "react-router";
import createNewBoard from "../../utils/createNewBoard";
import OpenBoardModal from "../../components/OpenBoardModal/OpenBoardModal";
import AddBoardModal from "../../components/AddBoardModal/AddBoardModal";
import { useState } from "react";

export default function Home() {
  const { defaultAlgorithm } = theme;
  let navigate = useNavigate();
  const [openBoardModal, setOpenBoardModal] = useState(false);
  const [addBoardModal, setAddBoardModal] = useState(false);
  const [messageApi, messageContextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  function timeout(delay: number) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const displayError = (message: string) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };

  const newBoard = async (title: string) => {
    setLoading(true);
    const newBoardID = await createNewBoard(title);
    await timeout(1000);
    let path = `/view/` + newBoardID;
    navigate(path);
  };

  const goToBoard = () => {
    setOpenBoardModal(true);
  };

  return (
    <ConfigProvider theme={{ algorithm: defaultAlgorithm }}>
      {messageContextHolder}
      <Spin spinning={loading} fullscreen size="large" />
      <div className="App">
        <header className="App-header">
          <h1>Leader Board</h1>
          <p>
            A free web based application which allows users to log and store
            entries in an interactive scoreboard.
          </p>
          {/* <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY!} /> */}
          <br />
          <Button
            style={{ width: "50%" }}
            type="dashed"
            block
            onClick={() => setAddBoardModal(true)}
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
            Go to leader board
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
      <AddBoardModal
        shouldShow={addBoardModal}
        closeModal={() => {
          setAddBoardModal(false);
        }}
        displayError={displayError}
        addBoard={newBoard}
      />
    </ConfigProvider>
  );
}
