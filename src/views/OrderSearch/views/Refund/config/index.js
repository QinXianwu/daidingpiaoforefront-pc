import CONST from "@/constants/index";
// 搜索选项
export const formData = [
  {
    label: "乘客姓名",
    prop: "name",
    type: "text",
    value: "",
    placeholder: "请输入乘客姓名",
  },
  {
    label: "代售点",
    prop: "ticket_number",
    type: "select",
    value: CONST.SITE_ID.ALL,
    options: CONST.SITE_OPTIONS(),
    placeholder: "请选择代售点",
  },
  {
    label: "车票状态",
    prop: "ticket_number",
    type: "select",
    value: CONST.TICKETS_STATE.SUCCESS,
    options: CONST.TICKETS_STATE_OPTIONS(),
    placeholder: "请选择车票状态",
  },
  {
    label: "取票号",
    prop: "ticket_number",
    type: "text",
    value: "",
    placeholder: "请输入取票号",
  },
  {
    label: "退票类型",
    prop: "ticket_number",
    type: "select",
    value: CONST.REFUND_TYPE.READY_MONEY,
    options: CONST.REFUND_TYPE_OPTIONS(),
    placeholder: "请选择退票类型",
  },
  {
    label: "退票日期",
    prop: "create_time",
    type: "datetimerange",
    value: [],
  },
];
// 表格头
export const column = [
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
    label: "取票号",
    prop: "license_number",
  },
  {
    label: "出发/到达",
    prop: "start_end_station",
  },
  {
    label: "姓名",
    prop: "name",
  },
  {
    label: "票类型",
    prop: "ticket_type",
  },
  {
    label: "退票时间",
    prop: "certificate_type",
  },
  {
    label: "退款金额",
    prop: "license_number",
  },
  {
    label: "优先级",
    prop: "license_number",
  },
];
