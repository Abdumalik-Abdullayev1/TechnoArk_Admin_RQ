import { Table } from "antd";

const Index = ({ data, pagination, onChange, columns }: any) => {
   return (
      <Table
         columns={columns}
         dataSource={data}
         pagination={pagination}
         onChange={(pagination) => onChange(pagination)}
         bordered
      />
   );
};

export default Index;