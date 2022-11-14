import filters from "@/filters/index";

// 表格头
export const column = [
  {
    label: "支付宝账号",
    prop: "alipayAccount",
  },
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
  },
];

// 支付宝账号详情 - 搜索选项
export const AlibabaPayFormData = [
  {
    label: "支付日期",
    prop: "payDate",
    type: "daterange",
    value: [`${filters.formatDate(new Date())} 00:00:00`, ""],
  },
];

// 支付宝账号详情 - 表格头
export const AlibabaPayColumn = [
  {
    label: "支付宝账号",
    prop: "alipayAccount",
  },
  {
    label: "支付金额",
    prop: "alipayAmount",
    type: "money",
  },
  {
    label: "支付宝订单号",
    prop: "alipayOrderNo",
  },
  {
    label: "商家订单号",
    prop: "merchantOrderNo",
  },
  {
    label: "订单号",
    prop: "partnerOrderId",
  },
  {
    label: "支付流水号",
    prop: "payTradeNumber",
  },
  {
    label: "更新时间",
    prop: "updateTime",
  },
  // {
  //   label: "操作",
  //   prop: "action",
  //   type: "custom",
  // },
];
