import { useEffect, useState } from "react";
import "./LeaderBoard.css";
import "../../components/ScoreBoard/ScoreBoard";
import ScoreBoard from "../../components/ScoreBoard/ScoreBoard";
import ViewEntriesModal from "../../components/ViewEntriesModal/ViewEntriesModal";
import AddEntriesModal from "../../components/AddEntryModal/AddEntriesModal";
import AddUserModal from "../../components/AddUserModal/AddUserModal";
import DeleteUserModal from "../../components/DeleteUserModal/DeleteUserModal";

import { ConfigProvider, theme } from "antd";
import { FloatButton, message } from "antd";
import {
  BarsOutlined,
  PlusOutlined,
  ShareAltOutlined,
  UsergroupAddOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";
import { useFetcher, useParams } from "react-router-dom";

export default function LeaderBoard() {
  const { defaultAlgorithm } = theme;
  const [entriesModalOpen, setEntriesModalOpen] = useState(false);
  const [addPointsModalOpen, setAddPointsModalOpen] = useState(false);
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [deleteUserModalOpen, setDeleteUserModalOpen] = useState(false);
  const [messageApi, messageContextHolder] = message.useMessage();
  const [visibleUserId, setvisibleUserId] = useState("");

  let { id } = useParams();

  console.log("ID: ", id);

  const displayError = (message: string) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };

  const displaySuccess = (message: string) => {
    messageApi.open({
      type: "success",
      content: message,
    });
  };

  const showUserEntries = (id: string) => {
    setvisibleUserId(id);
    setEntriesModalOpen(true);
  };

  useEffect(() => {
    messageApi.info("Bookmark this page to return to this board");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <ConfigProvider theme={{ algorithm: defaultAlgorithm }}>
      {messageContextHolder}

      <div className="App">
        <header className="App-header">
          <ScoreBoard showUserEntries={showUserEntries} boardID={id!} />
        </header>
      </div>

      <FloatButton
        icon={<PlusOutlined />}
        type="primary"
        style={{ right: 50 }}
        onClick={() => {
          setAddPointsModalOpen(true);
        }}
      />

      <FloatButton.Group
        trigger="hover"
        type="primary"
        style={{ left: 50 }}
        icon={<BarsOutlined />}
      >
        <FloatButton
          icon={<ShareAltOutlined />}
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            displaySuccess("Link copied to clipboard");
          }}
        />
        <FloatButton
          icon={<UsergroupAddOutlined />}
          onClick={() => setAddUserModalOpen(true)}
        />
        <FloatButton
          icon={<UsergroupDeleteOutlined />}
          onClick={() => setDeleteUserModalOpen(true)}
        />
      </FloatButton.Group>

      <ViewEntriesModal
        shouldShow={entriesModalOpen}
        closeModal={() => {
          setEntriesModalOpen(false);
        }}
        userId={visibleUserId}
        boardID={id!}
      />

      <AddEntriesModal
        shouldShow={addPointsModalOpen}
        closeModal={() => {
          setAddPointsModalOpen(false);
        }}
        displayError={displayError}
        boardID={id!}
      />

      <AddUserModal
        shouldShow={addUserModalOpen}
        closeModal={() => {
          setAddUserModalOpen(false);
        }}
        displayError={displayError}
        displaySuccess={displaySuccess}
        boardID={id!}
      />

      <DeleteUserModal
        shouldShow={deleteUserModalOpen}
        closeModal={() => {
          setDeleteUserModalOpen(false);
        }}
        displayError={displayError}
        displaySuccess={displaySuccess}
        boardID={id!}
      />
    </ConfigProvider>
  );
}
