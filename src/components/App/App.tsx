import React, { useState } from "react";
import "./App.css";
import "../leaderBoard/LeaderBoard";
import LeaderBoard from "../leaderBoard/LeaderBoard";
import {
  Button,
  ConfigProvider,
  Input,
  InputNumber,
  Modal,
  Select,
  theme,
} from "antd";
import { FloatButton } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function App() {
  const { darkAlgorithm } = theme;
  const [modal1Open, setModal1Open] = useState(false);
  const [submitBtnLoading, setSubmitBtnLoading] = useState(false);

  const handleCancel = () => {
    setModal1Open(false);
  };

  const handleOk = () => {
    setSubmitBtnLoading(true);
    setTimeout(() => {
      setSubmitBtnLoading(false);
      setModal1Open(false);
    }, 2000);
  };

  const handleUserChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <ConfigProvider theme={{ algorithm: darkAlgorithm }}>
      <div className="App">
        <header className="App-header">
          <img src="derek.png" className="App-logo" alt="logo" />
          <LeaderBoard />
        </header>
      </div>
      <FloatButton
        icon={<PlusOutlined />}
        type="primary"
        style={{ right: 50 }}
        onClick={() => setModal1Open(true)}
      />
      <Modal
        title="Input score"
        centered
        open={modal1Open}
        onOk={() => setModal1Open(false)}
        onCancel={() => setModal1Open(false)}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={submitBtnLoading}
            onClick={handleOk}
          >
            Submit
          </Button>,
        ]}
      >
        <h4>User</h4>
        <Select
          defaultValue="chris"
          style={{ width: "100%" }}
          onChange={handleUserChange}
          options={[
            { value: "chris", label: "Chris" },
            { value: "matt", label: "Matt" },
            { value: "daz", label: "Daz" },
          ]}
        />
        <br />
        <br />

        <h4>Reason</h4>
        <Input style={{ width: "100%" }} placeholder="Enter description" />
        <br />
        <br />

        <h4>Points</h4>
        <InputNumber
          style={{ width: "100%" }}
          min={1}
          max={10}
          defaultValue={3}
        />
        <br />
        <br />
      </Modal>
    </ConfigProvider>
  );
}

export default App;
