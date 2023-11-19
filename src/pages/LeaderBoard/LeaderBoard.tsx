import { useState } from "react";
import "./LeaderBoard.css";
import "../../components/ScoreBoard/ScoreBoard";
import ScoreBoard from "../../components/ScoreBoard/ScoreBoard";
import ViewEntriesModal from "../../components/ViewEntriesModal/ViewEntriesModal";
import AddEntriesModal from "../../components/AddEntryModal/AddEntriesModal";

import { ConfigProvider, theme } from "antd";
import { FloatButton, message } from "antd";
import {
  BarsOutlined,
  PlusOutlined,
  ShareAltOutlined,
  TeamOutlined,
} from "@ant-design/icons";

export default function LeaderBoard() {
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

      <FloatButton.Group
        trigger="hover"
        type="primary"
        style={{ left: 50 }}
        icon={<BarsOutlined />}
      >
        <FloatButton icon={<ShareAltOutlined />} />
        <FloatButton icon={<TeamOutlined />} />
      </FloatButton.Group>

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
