// 站点
export const SITE_ID = {
  ALL: 0, // 全部
  GUANG_ZHOU_NAN_ZHAN: "00321", // 广州南站
  GUANG_ZHOU_NAN_ZHAN_2: "00322", // 广州南站2
  GUANG_ZHOU_NAN_ZHAN_3: "00323", // 广州南站3
};

export const SITE_TEXT = {
  [SITE_ID.ALL]: "全部",
  [SITE_ID.GUANG_ZHOU_NAN_ZHAN]: "广州南站",
  [SITE_ID.GUANG_ZHOU_NAN_ZHAN_2]: "广州南站2",
  [SITE_ID.GUANG_ZHOU_NAN_ZHAN_3]: "广州南站3",
};

// 站点 options
export const SITE_OPTIONS = () => [
  {
    label: SITE_TEXT[SITE_ID.ALL],
    value: SITE_ID.ALL,
  },
  {
    label: SITE_TEXT[SITE_ID.GUANG_ZHOU_NAN_ZHAN],
    value: SITE_ID.GUANG_ZHOU_NAN_ZHAN,
  },
  {
    label: SITE_TEXT[SITE_ID.GUANG_ZHOU_NAN_ZHAN_2],
    value: SITE_ID.GUANG_ZHOU_NAN_ZHAN_2,
  },
  {
    label: SITE_TEXT[SITE_ID.GUANG_ZHOU_NAN_ZHAN_3],
    value: SITE_ID.GUANG_ZHOU_NAN_ZHAN_3,
  },
];

// 订单出票类型
export const TICKETS_TYPE = {
  ALL: 0, // 全部
  THERE_TICKETS: 1, // 有票
  NO_TICKET: 2, // 无票
  TIME_OUT: 3, // 超时
};

export const TICKETS_TYPE_TEXT = {
  [TICKETS_TYPE.ALL]: "全部",
  [TICKETS_TYPE.THERE_TICKETS]: "有票",
  [TICKETS_TYPE.NO_TICKET]: "无票",
  [TICKETS_TYPE.TIME_OUT]: "超时",
};

// 订单出票类型 options
export const TICKETS_TYPE_OPTIONS = () => [
  {
    label: TICKETS_TYPE_TEXT[TICKETS_TYPE.ALL],
    value: TICKETS_TYPE.ALL,
  },
  {
    label: TICKETS_TYPE_TEXT[TICKETS_TYPE.THERE_TICKETS],
    value: TICKETS_TYPE.THERE_TICKETS,
  },
  {
    label: TICKETS_TYPE_TEXT[TICKETS_TYPE.NO_TICKET],
    value: TICKETS_TYPE.NO_TICKET,
  },
  {
    label: TICKETS_TYPE_TEXT[TICKETS_TYPE.TIME_OUT],
    value: TICKETS_TYPE.TIME_OUT,
  },
];

// 车票状态
export const TICKETS_STATE = {
  SUCCESS: 1, // 成功
  FAIL: 2, // 失败
};

export const TICKETS_STATE_TEXT = {
  [TICKETS_STATE.SUCCESS]: "成功",
  [TICKETS_STATE.FAIL]: "失败",
};

export const TICKETS_STATE_OPTIONS = () => [
  {
    label: TICKETS_STATE_TEXT[TICKETS_STATE.SUCCESS],
    value: TICKETS_STATE.SUCCESS,
  },
  {
    label: TICKETS_STATE_TEXT[TICKETS_STATE.FAIL],
    value: TICKETS_STATE.FAIL,
  },
];

// 退票类型
export const REFUND_TYPE = {
  READY_MONEY: 1, // 现金
  READY_MONEY_SPECIAL: 2, // 现金特殊
  NON_READY_MONEY: 3, // 非现金
  NON_READY_MONEY_SPECIAL: 4, // 非现金特殊
};

export const REFUND_TYPE_TEXT = {
  [REFUND_TYPE.READY_MONEY]: "现金",
  [REFUND_TYPE.READY_MONEY_SPECIAL]: "现金特殊",
  [REFUND_TYPE.NON_READY_MONEY]: "非现金",
  [REFUND_TYPE.NON_READY_MONEY_SPECIAL]: "非现金特殊",
};

export const REFUND_TYPE_OPTIONS = () => [
  {
    label: REFUND_TYPE_TEXT[REFUND_TYPE.READY_MONEY],
    value: REFUND_TYPE.READY_MONEY,
  },
  {
    label: REFUND_TYPE_TEXT[REFUND_TYPE.READY_MONEY_SPECIAL],
    value: REFUND_TYPE.READY_MONEY_SPECIAL,
  },
  {
    label: REFUND_TYPE_TEXT[REFUND_TYPE.NON_READY_MONEY],
    value: REFUND_TYPE.NON_READY_MONEY,
  },
  {
    label: REFUND_TYPE_TEXT[REFUND_TYPE.NON_READY_MONEY_SPECIAL],
    value: REFUND_TYPE.NON_READY_MONEY_SPECIAL,
  },
];

// 退票费类型
export const REFUND_FEE_TYPE = {
  ALL: 0, // 全部
  SUCCESS: 1, // 出票
  REBOOK: 2, // 改签
};

export const REFUND_FEE_TYPE_TYPE = {
  [REFUND_FEE_TYPE.ALL]: "全部",
  [REFUND_FEE_TYPE.SUCCESS]: "出票",
  [REFUND_FEE_TYPE.REBOOK]: "改签",
};

export const REFUND_FEE_TYPE_OPTIONS = () => [
  {
    label: REFUND_FEE_TYPE_TYPE[REFUND_FEE_TYPE.ALL],
    value: REFUND_FEE_TYPE.ALL,
  },
  {
    label: REFUND_FEE_TYPE_TYPE[REFUND_FEE_TYPE.SUCCESS],
    value: REFUND_FEE_TYPE.SUCCESS,
  },
  {
    label: REFUND_FEE_TYPE_TYPE[REFUND_FEE_TYPE.REBOOK],
    value: REFUND_FEE_TYPE.REBOOK,
  },
];

// 会话状态
export const SESSION_STATE = {
  ALL: 0, // 全部
  WAIT_HANDLE: 1, //待处理
  HAS_SENT: 2, // 已处理
  HANDLE_SUCCESS: 3, // 处理成功
};

export const SESSION_STATE_TEXT = {
  [SESSION_STATE.ALL]: "全部",
  [SESSION_STATE.WAIT_HANDLE]: "待处理",
  [SESSION_STATE.HAS_SENT]: "已处理",
  [SESSION_STATE.HANDLE_SUCCESS]: "处理成功",
};

export const SESSION_STATE_OPTIONS = () => [
  {
    label: SESSION_STATE_TEXT[SESSION_STATE.ALL],
    value: SESSION_STATE.ALL,
  },
  {
    label: SESSION_STATE_TEXT[SESSION_STATE.WAIT_HANDLE],
    value: SESSION_STATE.WAIT_HANDLE,
  },
  {
    label: SESSION_STATE_TEXT[SESSION_STATE.HAS_SENT],
    value: SESSION_STATE.HAS_SENT,
  },
  {
    label: SESSION_STATE_TEXT[SESSION_STATE.HANDLE_SUCCESS],
    value: SESSION_STATE.HANDLE_SUCCESS,
  },
];

// 订单标记
export const ORDER_FLAG = {
  GENERAL_ORDER: 0, // 一般订单
  BUCKLE_ORDER: 2, // 扣位订单
};

export const ORDER_FLAG_TEXT = {
  [ORDER_FLAG.GENERAL_ORDER]: "一般订单",
  [ORDER_FLAG.BUCKLE_ORDER]: "扣位订单",
};

// 订单出票类型
export const ORDER_TICKET_TYPE = {
  ONE_WAY_TICKETS: 0, // 单程票
  CONNECTING_TICKET: 1, // 联程票
};

// 行程类型
export const TICKET_TYPE = {
  FIRST_RIDE: 1, // 第一程
  SECOND_TRIP: 2, // 第二程
};

export const TICKET_TYPE_TEXT = {
  [TICKET_TYPE.FIRST_RIDE]: "单程",
  [TICKET_TYPE.SECOND_TRIP]: "联程",
};

// 证件类型
export const PASSPORT_TYPE = {
  IDENTITY_CARD: 1, // 身份证
  PASSPORT: 2, // 护照
  HONG_KONG_AND_MACAO_MAINLAND_PASS: 7, // 回乡证(港澳居民来往内地通行证)
  TAIWAN_COMPATRIOT_CERTIFICATE: 8, // 台胞证
  HONG_KONG_AND_MACAU_PASS: 10, // 港澳通行证
  TAIWAN_PASS: 22, // 台湾通行证
};

export const PASSPORT_TYPE_TEXT = {
  [PASSPORT_TYPE.IDENTITY_CARD]: "身份证",
  [PASSPORT_TYPE.PASSPORT]: "护照",
  [PASSPORT_TYPE.HONG_KONG_AND_MACAO_MAINLAND_PASS]: "回乡证",
  [PASSPORT_TYPE.TAIWAN_COMPATRIOT_CERTIFICATE]: "台胞证",
  [PASSPORT_TYPE.HONG_KONG_AND_MACAU_PASS]: "港澳通行证",
  [PASSPORT_TYPE.TAIWAN_PASS]: "台湾通行证",
};

// 乘客类型
export const PASSENGER_TYPE = {
  ADULT_TICKET: 1, // 成人票
  CHILD_TICKET: 2, // 儿童票
};

export const PASSENGER_TYPE_TEXT = {
  [PASSENGER_TYPE.ADULT_TICKET]: "成人票",
  [PASSENGER_TYPE.CHILD_TICKET]: "儿童票",
};
