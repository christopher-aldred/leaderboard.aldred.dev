import React, { useState } from "react";
import "./App.css";
import "../LeaderBoard/LeaderBoard";
import LeaderBoard from "../LeaderBoard/LeaderBoard";
import db from "../firebaseConfig";
import {
  Timestamp,
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

import {
  Button,
  ConfigProvider,
  Input,
  InputNumber,
  Modal,
  Select,
  message,
  theme,
} from "antd";
import { FloatButton } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { DefaultOptionType } from "antd/es/select";

function App() {
  const { darkAlgorithm } = theme;
  const [modal1Open, setModal1Open] = useState(false);
  const [submitBtnLoading, setSubmitBtnLoading] = useState(false);
  const [users, setUsers] = useState<DefaultOptionType[]>([]);

  const [inputUserId, setUserId] = useState("");
  const [inputDesc, setDesc] = useState("");
  const [inputScore, setScore] = useState(3);

  const [messageApi, contextHolder] = message.useMessage();

  const errorMessage = (message: string) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };

  async function getUsers() {
    let result: DefaultOptionType[] = [];
    const q = query(collection(db, "users"), orderBy("name"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      result.push({ value: doc.id, label: doc.data().name });
    });
    setUsers(result);
  }

  const handleCancel = () => {
    setModal1Open(false);
  };

  const handleOk = async () => {
    setSubmitBtnLoading(true);
    let error: boolean = false;
    if (inputUserId !== "" && inputDesc !== "") {
      await addDoc(collection(db, "points"), {
        date: Timestamp.fromDate(new Date()),
        description: inputDesc,
        score: inputScore,
        user_id: inputUserId,
      });
    } else {
      error = true;
    }

    setTimeout(() => {
      setSubmitBtnLoading(false);
      setModal1Open(false);

      setUserId("");
      setDesc("");
      setScore(3);

      if (error === true) {
        errorMessage("Must enter user, description and score");
      }
    }, 1000);
  };

  return (
    <ConfigProvider theme={{ algorithm: darkAlgorithm }}>
      {contextHolder}
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
        onClick={() => {
          getUsers();
          setModal1Open(true);
        }}
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
          style={{ width: "100%" }}
          value={inputUserId}
          onChange={(value) => {
            setUserId(value);
          }}
          options={users}
        />
        <br />
        <br />

        <h4>Reason</h4>
        <Input
          style={{ width: "100%" }}
          placeholder="Enter description"
          value={inputDesc}
          onChange={(value) => {
            setDesc(value.target.value);
          }}
        />
        <br />
        <br />

        <h4>Points</h4>
        <InputNumber
          style={{ width: "100%" }}
          min={1}
          max={10}
          defaultValue={inputScore}
          value={inputScore}
          onChange={(value) => {
            setScore(value!);
          }}
        />
        <br />
        <br />
      </Modal>
    </ConfigProvider>
  );
}

export default App;
