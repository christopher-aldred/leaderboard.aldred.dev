import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import "./LeaderBoard.css";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../../firebaseConfig";
import { Users, Points } from "../../customTypes";

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

const docRefUsers = collection(db, `users`);
const docRefPoints = collection(db, `points`);

export default function LeaderBoard(props: {
  showUserEntries: (id: string) => void;
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
    const unsubscribe = onSnapshot(docRefUsers, (querySnapshot) => {
      const users = querySnapshot.docs.map((doc) => {
        console.log("User store called");
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
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(docRefPoints, (querySnapshot) => {
      const points = querySnapshot.docs.map((doc) => {
        console.log("Point store called");
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
  }, []);

  return (
    <Table
      className="LeaderBoard"
      dataSource={formatData(users, points)}
      columns={columns}
    />
  );
}
