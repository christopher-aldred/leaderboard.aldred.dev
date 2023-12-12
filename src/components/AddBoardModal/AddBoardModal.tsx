import { Button, Input } from "antd";
import Modal from "antd/es/modal/Modal";
import { useState } from "react";
import React from "react";

export default function AddBoardModal(props: {
  shouldShow: boolean;
  closeModal: () => void;
  displayError: (message: string) => void;
  addBoard: (boardTitle: string) => void;
}) {
  const [inputTitle, setInputTitle] = useState("");

  const handleCancel = async () => {
    props.closeModal();
    setInputTitle("");
  };

  const handleOk = async () => {
    props.addBoard(inputTitle);
    props.closeModal();
    setInputTitle("");
  };

  return (
    <Modal
      centered
      title="Add Board"
      open={props.shouldShow}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Submit
        </Button>,
      ]}
    >
      <Input
        style={{ width: "100%" }}
        placeholder="Enter a board title (optional)"
        value={inputTitle}
        onChange={(value) => {
          setInputTitle(value.target.value);
        }}
      />
    </Modal>
  );
}
