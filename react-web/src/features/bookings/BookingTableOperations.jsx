import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "全部" },
          { value: "checked-out", label: "搬出" },
          { value: "checked-in", label: "入住" },
          { value: "unconfirmed", label: "未缴费" },
        ]}
      />

      <SortBy
        options={[
          { value: "startDate-desc", label: "更新日期排序(升序)" },
          { value: "startDate-asc", label: "更新日期排序(降序)" },
          {
            value: "totalPrice-desc",
            label: "根据数量排名(升序)",
          },
          { value: "totalPrice-asc", label: "根据数量排名(降序)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
