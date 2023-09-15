import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import "./LeaderBoard.css";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../../components/firebaseConfig";

type Users = {
  name: string;
  id: string;
}[];

type Points = {
  date: Date;
  description: string;
  score: number;
  user_id: string;
}[];

type TableEntries = {
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

const docRefUsers = collection(db, `users`);
const docRefPoints = collection(db, `points`);

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
      name: user.name,
      score: count,
      view: <Button style={{ width: "100%" }}>view</Button>,
    });
  });
  return result;
}

export default function LeaderBoard() {
  const [users, setUsers] = useState<Users>([]);
  const [points, setPoints] = useState<Points>([]);

  useEffect(() => {
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
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(docRefPoints, (querySnapshot) => {
      const points = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          //return data compatible with data types specified in the points variable
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
  });

  return (
    <Table
      className="LeaderBoard"
      dataSource={formatData(users, points)}
      columns={columns}
    />
  );
}
