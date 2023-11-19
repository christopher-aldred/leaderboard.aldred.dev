import { useState } from "react";
import "./LeaderBoard.css";
import "../../components/leaderBoard/ScoreBoard";
import ScoreBoard from "../../components/leaderBoard/ScoreBoard";
import ViewEntriesModal from "../../components/viewEntriesModal/ViewEntriesModal";
import AddEntriesModal from "../../components/addEntryModal/AddEntriesModal";

import { ConfigProvider, theme } from "antd";
import { FloatButton, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function LeaderBoard() {
  const { defaultAlgorithm } = theme;
  const [entriesModalOpen, setEntriesModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [messageApi, messageContextHolder] = message.useMessage();
  const [visibleUserId, setvisibleUserId] = useState("");

  const displayError = (message: string) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };

  const showUserEntries = (id: string) => {
    setvisibleUserId(id);
    setEntriesModalOpen(true);
  };

  return (
    <ConfigProvider theme={{ algorithm: defaultAlgorithm }}>
      {messageContextHolder}

      <div className="App">
        <header className="App-header">
          <img src="trophy.png" className="App-logo" alt="logo" />
          <ScoreBoard showUserEntries={showUserEntries} />
        </header>
      </div>

      <FloatButton
        icon={<PlusOutlined />}
        type="primary"
        style={{ right: 50 }}
        onClick={() => {
          setAddModalOpen(true);
        }}
      />

      <ViewEntriesModal
        shouldShow={entriesModalOpen}
        closeModal={() => {
          setEntriesModalOpen(false);
        }}
        userId={visibleUserId}
      />

      <AddEntriesModal
        shouldShow={addModalOpen}
        closeModal={() => {
          setAddModalOpen(false);
        }}
        displayError={displayError}
      />
    </ConfigProvider>
  );
}

export default LeaderBoard;
