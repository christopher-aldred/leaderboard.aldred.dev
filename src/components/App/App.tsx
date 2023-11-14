import { useState } from "react";
import "./App.css";
import "../leaderBoard/LeaderBoard";
import LeaderBoard from "../leaderBoard/LeaderBoard";
import ViewEntriesModal from "../viewEntriesModal/ViewEntriesModal";
import AddEntriesModal from "../addEntryModal/AddEntriesModal";

import { ConfigProvider, theme } from "antd";
import { FloatButton, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function App() {
  const { defaultAlgorithm } = theme;
  const [entriesModalOpen, setEntriesModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [messageApi, messageContextHolder] = message.useMessage();

  const displayError = (message: string) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };

  return (
    <ConfigProvider theme={{ algorithm: defaultAlgorithm }}>
      {messageContextHolder}

      <div className="App">
        <header className="App-header">
          <img src="trophy.png" className="App-logo" alt="logo" />
          <LeaderBoard />
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
        userId={"SY9fJr4ona8LfjoEJCJI"}
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

export default App;
