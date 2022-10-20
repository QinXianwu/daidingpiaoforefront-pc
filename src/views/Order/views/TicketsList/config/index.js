// 搜索选项
export const formData = [];
// 表格头
export const column = [
  {
    label: "订单号",
    prop: "partnerOrderId",
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
