import { doc, getDoc } from "@firebase/firestore";
import { Button, Input } from "antd";
import Modal from "antd/es/modal/Modal";
import { useState } from "react";
import { useNavigate } from "react-router";
import db from "../../firebaseConfig";
import React from "react";

export default function OpenBoardModal(props: {
  shouldShow: boolean;
  closeModal: () => void;
  displayError: (message: string) => void;
}) {
  const [submitBtnLoading, setSubmitBtnLoading] = useState(false);
  const [inputID, setInputID] = useState("");
  let navigate = useNavigate();

  const handleCancel = async () => {
    props.closeModal();
    setInputID("");
  };

  const handleOk = async () => {
    setSubmitBtnLoading(true);
    let error: boolean = false;
    if (inputID !== "") {
      const docRef = doc(db, "boards", inputID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let path = `/view/` + inputID;
        navigate(path);
      } else {
        error = true;
      }
    } else {
      error = true;
    }

    setTimeout(() => {
      setSubmitBtnLoading(false);
      props.closeModal();
      setInputID("");
      if (error === true) {
        props.displayError("Must enter a valid board ID");
      }
    }, 1000);
  };

  return (
    <Modal
      centered
      title="Open Board"
      open={props.shouldShow}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          data-test-id="board-id-submit"
          key="submit"
          type="primary"
          loading={submitBtnLoading}
          onClick={handleOk}
        >
          Submit
        </Button>,
      ]}
    >
      <Input
        style={{ width: "100%" }}
        data-test-id="board-id-input"
        placeholder="Enter board ID"
        value={inputID}
        onChange={(value) => {
          setInputID(value.target.value);
        }}
      />
    </Modal>
  );
}
