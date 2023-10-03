import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "全部" },
          { value: "no-discount", label: "无折扣" },
          { value: "with-discount", label: "有折扣" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-asc", label: "根据名称排序 (A-Z)" },
          { value: "name-desc", label: "根据名称排序 (Z-A)" },
          { value: "regularPrice-asc", label: "根据价格排序 (升序)" },
          { value: "regularPrice-desc", label: "根据价格排序 (降序)" },
          { value: "maxCapacity-asc", label: "根据容量排序 (low first)" },
          { value: "maxCapacity-desc", label: "根据容量排序 (high first)" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
