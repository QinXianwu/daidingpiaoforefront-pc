// 搜索选项
export const formData = [
  {
    label: "身份证",
    prop: "order_code",
    type: "text",
    value: "",
    placeholder: "请输入身份证",
  },
  {
    label: "车次",
    prop: "ticket_number",
    type: "text",
    value: "",
    placeholder: "请输入车次",
  },
  {
    label: "姓名",
    prop: "name",
    type: "text",
    value: "",
    placeholder: "请输入姓名",
  },
  {
    label: "出发站",
    prop: "start_site",
    type: "text",
    value: "",
    placeholder: "请输入出发站",
  },
  {
    label: "到达站",
    prop: "end_site",
    type: "text",
    value: "",
    placeholder: "请输入到达站",
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
    label: "发车时间",
    prop: "order_code",
  },
  {
    label: "车次",
    prop: "out_num",
  },
  {
    label: "出发/到达",
    prop: "invoice_amount",
  },
  {
    label: "取票号",
    prop: "certificate_type",
  },
  {
    label: "证件类型",
    prop: "license_number",
  },
  {
    label: "证件号",
    prop: "name",
  },
  {
    label: "出票下单姓名",
    prop: "ticket_type",
  },
  {
    label: "实际出票姓名",
    prop: "certificate_type",
  },
  {
    label: "坐席",
    prop: "license_number",
  },
  {
    label: "乘客类型",
    prop: "name",
  },
  {
    label: "申请时间",
    prop: "ticket_type",
  },

  {
    label: "证件照",
    prop: "certificate_type",
  },
  {
    label: "票价",
    prop: "",
  },
  {
    label: "操作",
    prop: "action",
    type: "custom",
    fixed: "right",
    width: 250,
  },
];
