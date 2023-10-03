import Filter from "../../ui/Filter";

function DashboardFilter() {
  return (
    <Filter
      filterField="last"
      options={[
        { value: "7", label: "最近7天" },
        { value: "30", label: "最近30天" },
        { value: "90", label: "最近90天" },
      ]}
    />
  );
}

export default DashboardFilter;
