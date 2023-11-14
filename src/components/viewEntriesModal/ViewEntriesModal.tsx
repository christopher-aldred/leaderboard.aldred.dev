import { Modal, Table } from "antd";
import "./ViewEntriesModal.css";
// import { collection, onSnapshot } from "firebase/firestore";
// import db from "../../firebaseConfig";

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    width: "34%",

    align: "center" as const,
  },
  {
    title: "Description",
    dataIndex: "desc",
    key: "desc",
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
    dataIndex: "action",
    key: "action",
    width: "32%",
  },
];

export default function ViewEntriesModal(props: {
  shouldShow: boolean;
  closeEntriesModal: () => void;
  userId: String;
}) {
  return (
    <Modal
      centered
      title="View entries"
      open={props.shouldShow}
      onCancel={props.closeEntriesModal}
      footer={[]}
    >
      <Table className="ViewEntries" dataSource={[]} columns={columns} />
    </Modal>
  );
}
