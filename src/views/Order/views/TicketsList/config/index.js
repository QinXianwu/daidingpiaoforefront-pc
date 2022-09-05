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
    label: "经销商信息",
    prop: "client",
    width: 200,
  },
  {
    label: "手机号",
    prop: "mobile",
    width: 120,
  },
  {
    label: "渠道",
    prop: "channel",
  },
  {
    label: "资产",
    prop: "account",
    type: "custom",
    width: 150,
  },
  {
    label: "授权区域",
    prop: "region_award",
    type: "custom",
    width: 160,
  },
  {
    label: "编辑",
    prop: "action",
    type: "custom",
    fixed: "right",
    width: 250,
  },
];
