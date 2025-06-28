function validateRequired(data, fields) {
  if (!data || typeof data !== "object") {
    return "\u53C2\u6570\u9519\u8BEF\uFF1A\u6570\u636E\u4E0D\u662F\u6709\u6548\u7684\u5BF9\u8C61";
  }
  for (const [field, label] of Object.entries(fields)) {
    if (data[field] === void 0 || data[field] === null || data[field] === "") {
      return `${label}\u4E0D\u80FD\u4E3A\u7A7A`;
    }
  }
  return null;
}
function validateOptional(data, fields) {
  if (!data || typeof data !== "object") {
    return "\u53C2\u6570\u9519\u8BEF\uFF1A\u6570\u636E\u4E0D\u662F\u6709\u6548\u7684\u5BF9\u8C61";
  }
  for (const [field, type] of Object.entries(fields)) {
    if (data[field] !== void 0 && data[field] !== null && data[field] !== "") {
      if (type === "\u6570\u5B57") {
        const num = Number(data[field]);
        if (isNaN(num)) {
          return `${field}\u5FC5\u987B\u662F\u6709\u6548\u7684\u6570\u5B57`;
        }
      } else if (type === "\u5B57\u7B26\u4E32") {
        if (typeof data[field] !== "string") {
          return `${field}\u5FC5\u987B\u662F\u5B57\u7B26\u4E32\u7C7B\u578B`;
        }
      } else if (type === "\u5E03\u5C14\u503C") {
        if (typeof data[field] !== "boolean") {
          return `${field}\u5FC5\u987B\u662F\u5E03\u5C14\u7C7B\u578B`;
        }
      }
    }
  }
  return null;
}

export { validateOptional as a, validateRequired as v };
//# sourceMappingURL=validation.mjs.map
