import CONST from "@/constants/index";
// 搜索选项
export const formData = [
  {
    label: "代售点",
    prop: "ticket_number",
    type: "select",
    value: CONST.SITE_ID.ALL,
    options: CONST.SITE_OPTIONS(),
    placeholder: "请选择代售点",
  },
  {
    label: "结算日期",
    prop: "create_time",
    type: "datetimerange",
    value: [],
  },
];
// 表格头
export const column = [
  {
    label: "供应商组",
    prop: "departure_time",
  },
  {
    label: "代售点",
    prop: "departure_time",
    width: 120,
  },
  {
    label: "结算开始时间",
    prop: "trips_number",
  },
  {
    label: "结算结算时间",
    prop: "trips_number",
  },
  {
    label: "出票订单数",
    prop: "license_number",
  },
  {
    label: "出票张数",
    prop: "start_end_station",
  },
  {
    label: "出票款",
    prop: "name",
  },
  {
    label: "代购费",
    prop: "ticket_type",
  },
  {
    label: "退票费",
    prop: "certificate_type",
  },
  {
    label: "改签张数",
    prop: "license_number",
  },
  {
    label: "改签款",
    prop: "license_number",
  },
  {
    label: "订单总金额",
    prop: "license_number",
  },
  {
    label: "异常订单总金额",
    prop: "license_number",
  },
  {
    label: "结算总金额",
    prop: "license_number",
  },
];
