// 搜索选项
export const formData = [
  {
    label: "手机号",
    prop: "mobile",
    type: "text",
    value: "",
    placeholder: "手机号",
  },
  {
    label: "授权姓名",
    prop: "agent.real_name",
    type: "text",
    value: "",
    placeholder: "姓名",
  },
];
// 表格头
export const column = [
  {
    label: "订单号",
    prop: "order_code",
    width: 200,
  },
  {
    label: "发车时间",
    prop: "departure_time",
    width: 120,
  },
  {
    label: "车次",
    prop: "trips_number",
  },
  {
    label: "发/到站",
    prop: "start_end_station",
  },
  {
    label: "订单标记",
    prop: "order_mark",
  },
  {
    label: "处理倒计时",
    prop: "process_countdown",
    type: "custom",
    width: 100,
  },
  {
    label: "订单时间",
    prop: "order_time",
  },
  {
    label: "操作",
    prop: "action",
    type: "custom",
    fixed: "right",
    width: 250,
  },
];
