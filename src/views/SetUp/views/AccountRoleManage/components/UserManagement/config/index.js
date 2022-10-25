// 搜索选项
export const formData = [
  {
    label: "用户名",
    prop: "userName",
    type: "text",
    value: "",
    placeholder: "请输入用户名",
  },
  {
    label: "登录账号",
    prop: "account",
    type: "text",
    value: "",
    placeholder: "请输入登录账号",
  },
  // {
  //   label: "联系电话",
  //   prop: "code",
  //   type: "text",
  //   value: "",
  //   placeholder: "请输入联系电话",
  // },
  {
    label: "所属角色",
    prop: "roleName",
    type: "select",
    value: "",
    options: [],
    placeholder: "请选择所属角色",
  },
];
// 表格头
export const column = [
  {
    label: "用户名",
    prop: "userName",
  },
  {
    label: "登录账号",
    prop: "account",
  },
  {
    label: "所属角色",
    prop: "roleName",
  },
  // {
  //   label: "联系电话",
  //   prop: "departure_time",
  // },
  {
    label: "创建时间",
    prop: "createTime",
  },
  {
    label: "更新时间",
    prop: "updateTime",
  },
  {
    label: "操作",
    prop: "action",
    type: "custom",
    fixed: "right",
    width: 250,
  },
];
