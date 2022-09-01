import CONST from "@/constants";
// async 方法的处理
export const createCatchAsyncFun = (errorHandle) => {
  return async (fn) => {
    try {
      return [null, await fn];
    } catch (error) {
      typeof errorHandle === "function" && errorHandle(error);
      return [error, null];
    }
  };
};

function checkType(type) {
  return (a) => {
    return Object.prototype.toString.call(a) === `[object ${type}]`;
  };
}

export const isObject = checkType("Object");

// 深拷贝
export function deepCopy(objA, objB) {
  var result = {};
  var map = new Map();
  for (let key in objA) {
    if (isObject(objA[key]) && isObject(objB[key])) {
      map.set(key, true);
      result[key] = deepCopy(objA[key], objB[key]);
    } else {
      result[key] = objA[key];
    }
  }
  for (let key in objB) {
    if (!map.has(key)) {
      result[key] = objB[key];
    }
  }
  return result;
}

// 简单的深拷贝，只针对简单对象和Array，且不存在循环引用
export function simpleCloneDeep(value) {
  if (Object.prototype.toString.call(value) === "[object Object]") {
    const obj = {};
    for (let key in value) {
      obj[key] = simpleCloneDeep(value[key]);
    }
    return obj;
  } else if (Array.isArray(value)) {
    const arr = [];
    value.forEach((item, i) => {
      arr[i] = simpleCloneDeep(item);
    });
    return arr;
  } else {
    return value;
  }
}

// 分转元
export function cent2yuan(price) {
  return Number(price || 0) / 100;
}
// 元转分
export function yuan2cent(price) {
  return Math.round(Number(price || 0) * 100);
}
// 获取对象值
export function getObjectValue(obj, data) {
  if (data instanceof Array) {
    return data.map((val) => {
      return obj[val] || undefined;
    });
  } else if (typeof data === "string" || typeof data === "number") {
    return obj[data] || undefined;
  } else {
    // 需要再拓展
    return undefined;
  }
}
// 校验保留两位小数数值
export function isNumber(value) {
  const reg = /^(-?\d+)(\.\d{1,2})?$/;
  return reg.test(Number(value));
}

// 是否在对象中存在当前字段
export function isField(data, key) {
  if (typeof data !== "object") return;
  return Object.prototype.hasOwnProperty.call(data, key);
}

// 获取连接全部参数对象
export function getQueryObj(url) {
  let targetStr = url.split("?")[1];
  let query = {};
  if (targetStr) {
    let arr = targetStr.split("&");
    arr.forEach((q) => {
      const strArr = q.split("=");
      query[strArr[0]] = strArr[1];
    });
  }
  return query;
}

// 等级显示判断
export function showLevelName(data, client = [], channel = []) {
  let name = "";
  if (data.type === CONST.GRADE_KEY.CLIENT) {
    let Index = client.findIndex((item) => item.level_id === data.level);
    name = `会员/${client[Index]?.name || "-"}`;
  } else if (data.type === CONST.GRADE_KEY.CHANNEL) {
    let Index = channel.findIndex(
      (item) => item.channel_level_id === data.level
    );
    name = `经销商/${channel[Index]?.name || "-"}`;
  }
  return name || "-";
}

// options的生成方法
export const getOptionsByText = (textHash) => {
  return Object.keys(textHash).map((key) => ({
    label: textHash[key],
    value: /^\d+$/.test(key) ? Number(key) : key, // 如果是全数字字符串转为数字类型
  }));
};
