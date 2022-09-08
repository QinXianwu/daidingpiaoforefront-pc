import CONST from "@/constants/index";
// 搜索选项
export const formData = [
  {
    label: "姓名",
    prop: "name",
    type: "text",
    value: "",
    placeholder: "请输入姓名",
  },
  {
    label: "手机号",
    prop: "order_code",
    type: "text",
    value: "",
    placeholder: "请输入手机号",
  },
  {
    label: "车次",
    prop: "ticket_number",
    type: "text",
    value: "",
    placeholder: "请输入车次",
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
    label: "订单号",
    prop: "ticket_number",
    type: "text",
    value: "",
    placeholder: "请输入订单号",
  },
  {
    label: "流水号",
    prop: "ticket_number",
    type: "text",
    value: "",
    placeholder: "请输入流水号",
  },
  {
    label: "出票类型",
    prop: "ticket_number",
    type: "select",
    value: CONST.TICKETS_TYPE.THERE_TICKETS,
    options: CONST.TICKETS_TYPE_OPTIONS(),
    placeholder: "请选择出票类型",
  },
  {
    label: "出发城市",
    prop: "start_city",
    type: "text",
    value: "",
    placeholder: "请输入出发城市",
  },
  {
    label: "到达城市",
    prop: "end_city",
    type: "text",
    value: "",
    placeholder: "请输入到达城市",
  },
  {
    label: "车票日期",
    prop: "create_time",
    type: "datetimerange",
    value: [],
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
    label: "出票数量",
    prop: "license_number",
  },
  {
    label: "总价",
    prop: "name",
  },
  {
    label: "订单时间",
    prop: "ticket_type",
  },
  {
    label: "处理账号名",
    prop: "certificate_type",
  },
  {
    label: "是否有票",
    prop: "license_number",
  },
  {
    label: "操作",
    prop: "action",
    type: "custom",
    fixed: "right",
    width: 250,
  },
];
