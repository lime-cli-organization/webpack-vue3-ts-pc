let a = [
  { name: "a1", value: 1 },
  { name: "b1", value: 2 },
  { name: "c1", value: 2 },
];
let b = [
  { name: "a1", value: 2 },
  { name: "b1", value: 4 },
];

let name1 = new Set(...[a.map((item) => item.name)]);
let name2 = new Set(...[b.map((item) => item.name)]);
let name = [...name1].filter((item) => !name2.has(item));
a.forEach((item) => {
  name.forEach((value) => {
    item.name === value ? b.push(item) : "";
  });
});
console.log(b);

let ret = [];
a.forEach((item) => {
  let flag = true;
  b.forEach((value) => {
    if (item.name === value.name) {
      flag = false;
      ret.push(value);
    }
  });
  if (flag) {
    ret.push(item);
  }
});
console.log(ret);
