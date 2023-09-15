import React from "react";
import { Table } from "antd";
import "./LeaderBoard.css";

const dataSource = [
  {
    key: "1",
    name: "Chris",
    age: 26,
    address: "Manchester",
  },
  {
    key: "2",
    name: "Matt",
    age: 30,
    address: "Sheffield",
  },
  {
    key: "3",
    name: "Daz",
    age: 42,
    address: "Sheffield",
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

function LeaderBoard() {
  return (
    <Table className="LeaderBoard" dataSource={dataSource} columns={columns} />
  );
}

export default LeaderBoard;
