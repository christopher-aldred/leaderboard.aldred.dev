import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "@firebase/firestore";
import { Button, Select } from "antd";
import Modal from "antd/es/modal/Modal";
import { useEffect, useState } from "react";
import db from "../../firebaseConfig";
import { DefaultOptionType } from "antd/es/select";

export default function DeleteUserModal(props: {
  shouldShow: boolean;
  closeModal: () => void;
  displayError: (message: string) => void;
  displaySuccess: (message: string) => void;
  boardID: string;
}) {
  const [submitBtnLoading, setSubmitBtnLoading] = useState(false);
  const [inputUserId, setUserId] = useState("");
  const [users, setUsers] = useState<DefaultOptionType[]>([]);

  const handleCancel = async () => {
    props.closeModal();
    setUserId("");
  };

  const handleOk = async () => {
    setSubmitBtnLoading(true);
    let error: boolean = false;
    if (inputUserId !== "") {
      // Delete user
      await deleteDoc(doc(db, `boards/${props.boardID}/users/`, inputUserId));

      // Delete user points
      const userPointsQuery = query(
        collection(db, `boards/${props.boardID}/points/`),
        where("user_id", "==", inputUserId)
      );
      const docSnap = await getDocs(userPointsQuery);
      docSnap.forEach((doc) => {
        deleteDoc(doc.ref);
      });
    } else {
      error = true;
    }

    setTimeout(() => {
      setSubmitBtnLoading(false);
      props.closeModal();
      setUserId("");
      if (error === true) {
        props.displayError("Must select user to remove");
      } else {
        props.displaySuccess("User removed");
      }
    }, 1000);
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
      title="Remove player"
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
      <Select
        style={{ width: "100%" }}
        value={inputUserId}
        onChange={(value) => {
          setUserId(value);
        }}
        options={users}
      />
    </Modal>
  );
}
