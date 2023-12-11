import { useEffect, useState } from "react";
import { Button, Table } from "antd";
import "./ScoreBoard.css";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../../firebaseConfig";
import { Users, Points } from "../../customTypes";
import React from "react";

type TableEntries = {
  key: string;
  name: string;
  score: number;
  view: JSX.Element;
}[];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: "34%",
    align: "center" as const,
  },
  {
    title: "Score",
    dataIndex: "score",
    key: "score",
    width: "34%",
    align: "center" as const,
  },
  {
    title: "",
    dataIndex: "view",
    key: "view",
    width: "32%",
  },
];

export default function ScoreBoard(props: {
  showUserEntries: (id: string) => void;
  boardID: string;
}) {
  const [users, setUsers] = useState<Users>([]);
  const [points, setPoints] = useState<Points>([]);

  function formatData(users: Users, points: Points) {
    let result: TableEntries = [];
    users.forEach(function (user) {
      let count = 0;
      points.forEach(function (point) {
        if (point.user_id === user.id) {
          count += point.score;
        }
      });
      result.push({
        key: user.id,
        name: user.name,
        score: count,
        view: (
          <Button
            onClick={() => {
              props.showUserEntries(user.id);
            }}
            style={{ width: "100%" }}
          >
            view
          </Button>
        ),
      });
    });
    return result.sort((a, b) => b.score - a.score); // b - a for reverse sort
  }

  useEffect(() => {
    const docRefUsers = collection(db, `boards/${props.boardID}/users`);
    const unsubscribe = onSnapshot(docRefUsers, (querySnapshot) => {
      const users = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          //return data compatible with data types specified in the user variable
          name: data.name,
          id: doc.id,
        };
      });
      setUsers(users);
    });
    return () => {
      unsubscribe();
    };
  }, [props.boardID]);

  useEffect(() => {
    const docRefPoints = collection(db, `boards/${props.boardID}/points`);
    const unsubscribe = onSnapshot(docRefPoints, (querySnapshot) => {
      const points = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          //return data compatible with data types specified in the points variable
          id: data.id,
          date: data.date,
          description: data.description,
          score: data.score,
          user_id: data.user_id,
        };
      });
      setPoints(points);
    });
    return () => {
      unsubscribe();
    };
  }, [props.boardID]);

  return (
    <Table
      className="LeaderBoard"
      dataSource={formatData(users, points)}
      rowClassName={(record, index) =>
        index === 0
          ? "gold"
          : "none" && index === 1
          ? "silver"
          : "none" && index === 2
          ? "bronze"
          : "none"
      }
      columns={columns}
      pagination={false}
    />
  );
}
