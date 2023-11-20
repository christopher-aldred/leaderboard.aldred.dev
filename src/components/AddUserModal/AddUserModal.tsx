import { addDoc, collection } from "@firebase/firestore";
import { Button, Input } from "antd";
import Modal from "antd/es/modal/Modal";
import { useState } from "react";
import db from "../../firebaseConfig";

export default function AddUserModal(props: {
  shouldShow: boolean;
  closeModal: () => void;
  displayError: (message: string) => void;
  displaySuccess: (message: string) => void;
  boardID: string;
}) {
  const [submitBtnLoading, setSubmitBtnLoading] = useState(false);
  const [inputName, setInputName] = useState("");

  const handleCancel = async () => {
    props.closeModal();
    setInputName("");
  };

  const handleOk = async () => {
    setSubmitBtnLoading(true);
    let error: boolean = false;
    if (inputName !== "") {
      await addDoc(collection(db, `boards/${props.boardID}/users`), {
        name: inputName,
      });
    } else {
      error = true;
    }

    setTimeout(() => {
      setSubmitBtnLoading(false);
      props.closeModal();
      setInputName("");
      if (error === true) {
        props.displayError("Must enter a user name");
      } else {
        props.displaySuccess("User added");
      }
    }, 1000);
  };

  return (
    <Modal
      centered
      title="Add player"
      open={props.shouldShow}
      onCancel={handleCancel}
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
      <Input
        style={{ width: "100%" }}
        placeholder="Enter name"
        value={inputName}
        onChange={(value) => {
          setInputName(value.target.value);
        }}
      />
    </Modal>
  );
}
