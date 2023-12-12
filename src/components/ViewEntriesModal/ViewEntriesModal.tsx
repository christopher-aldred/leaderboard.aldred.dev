import { Button, Modal, Table } from "antd";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import db from "../../firebaseConfig";
import { useEffect, useState } from "react";
import { Points } from "../../customTypes";
import React from "react";

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    width: "30%",
    align: "center" as const,
  },
  {
    title: "Description",
    dataIndex: "desc",
    key: "desc",
    width: "50%",
    align: "center" as const,
  },
  {
    title: "Score",
    dataIndex: "score",
    key: "score",
    width: "10%",
    align: "center" as const,
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    width: "10%",
  },
];

type TableEntries = {
  key: string;
  date: string;
  desc: string;
  score: number;
  view: JSX.Element;
}[];

export default function ViewEntriesModal(props: {
  shouldShow: boolean;
  closeModal: () => void;
  userId: string;
  boardID: string;
}) {
  const [userName, setUserName] = useState<string>("");
  const [points, setPoints] = useState<Points>([]);

  function formatData(points: Points) {
    let result: TableEntries = [];
    points.forEach(function (point) {
      result.push({
        key: point.id,
        date: point.date.toDate().toISOString().slice(0, 10),
        desc: point.description,
        score: point.score,
        view: (
          <Button onClick={() => {}} style={{ width: "100%" }}>
            view
          </Button>
        ),
      });
    });
    return result;
  }

  // Populate username
  useEffect(() => {
    if (props.userId !== "") {
      const populateLocalVars = async () => {
        const queryUserName = query(
          collection(db, `boards/${props.boardID}/users`),
          where("__name__", "==", props.userId)
        );
        const userNameSnapshot = await getDocs(queryUserName);
        setUserName(userNameSnapshot.docs[0].get("name"));
      };
      populateLocalVars();
    }
  }, [props.userId, props.boardID]);

  // Populate points by for userId
  useEffect(() => {
    setPoints([]);
    const queryUserPoints = query(
      collection(db, `boards/${props.boardID}/points`),
      where("user_id", "==", props.userId)
    );
    const unsubscribe = onSnapshot(queryUserPoints, (querySnapshot) => {
      const points = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          //return data compatible with data types specified in the points variable
          id: doc.id,
          date: data.date,
          description: data.description,
          score: data.score,
          user_id: data.user_id,
        };
      });
      setPoints(points.sort((a, b) => b.date - a.date));
    });

    return () => {
      unsubscribe();
    };
  }, [props.userId, props.boardID]);

  return (
    <Modal
      centered
      title={"View entries for " + userName}
      open={props.shouldShow}
      onCancel={props.closeModal}
      footer={[]}
    >
      <Table
        className="ViewEntries"
        dataSource={formatData(points)}
        columns={columns}
      />
    </Modal>
  );
}
