import { Button, Input, InputNumber, Modal, Select } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { useEffect, useState } from "react";
import {
  Timestamp,
  addDoc,
  collection,
  onSnapshot,
  query,
} from "firebase/firestore";
import db from "../../firebaseConfig";

export default function AddEntriesModal(props: {
  shouldShow: boolean;
  closeModal: () => void;
  displayError: (message: string) => void;
  boardID: string;
}) {
  const [submitBtnLoading, setSubmitBtnLoading] = useState(false);
  const [users, setUsers] = useState<DefaultOptionType[]>([]);
  const [inputUserId, setUserId] = useState("");
  const [inputDesc, setDesc] = useState("");
  const [inputScore, setScore] = useState(3);

  const handleOk = async () => {
    setSubmitBtnLoading(true);
    let error: boolean = false;
    if (inputUserId !== "" && inputDesc !== "") {
      await addDoc(collection(db, `boards/${props.boardID}/points`), {
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
      props.closeModal();

      setUserId("");
      setDesc("");
      setScore(3);

      if (error === true) {
        props.displayError("Must enter user, description and score");
      }
    }, 1000);
  };

  const handleCancel = async () => {
    props.closeModal();
    setUserId("");
    setDesc("");
    setScore(3);
  };

  // Populate users
  useEffect(() => {
    setUsers([]);
    const queryUserPoints = query(
      collection(db, `boards/${props.boardID}/users`)
    );
    const unsubscribe = onSnapshot(queryUserPoints, (querySnapshot) => {
      let result: DefaultOptionType[] = [];
      querySnapshot.forEach((doc) => {
        result.push({ value: doc.id, label: doc.data().name });
      });
      setUsers(
        result.sort(function (a, b) {
          return a.label!.toString().localeCompare(b.label!.toString());
        })
      );
    });

    return () => {
      unsubscribe();
    };
  }, [props.boardID]);

  return (
    <Modal
      centered
      title="Input score"
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
        min={-10}
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
  );
}
