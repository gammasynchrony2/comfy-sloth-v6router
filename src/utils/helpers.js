export const formatPrice = (value) => {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value / 100);
};

// export const formatPrice = (value) => {
//   return Intl.NumberFormat("ja-JP", {
//     style: "currency",
//     currency: "JPY",
//   }).format(value / 100);
// };

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]);
  if (type === "colors") {
    unique = unique.flat();
  }
  return ["all", ...new Set(unique)];
};
