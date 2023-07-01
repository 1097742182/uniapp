// 判断两个list是否相等
export function equals(list1, list2) {
  if (list1.length !== list2.length) {
    return false;
  }
  for (let i = 0; i < list1.length; i++) {
    if (list1[i] !== list2[i]) return false;
  }
  return true;
}

function hasDuplicates(lst) {
  return lst.length !== new Set(lst).size;
}

export function addDuplicate(lst) {
  if (!hasDuplicates(lst)) {
    const duplicateValue = lst[Math.floor(Math.random() * lst.length)];
    const randomIndex = Math.floor(Math.random() * lst.length);
    lst.splice(randomIndex, 1, duplicateValue);
  }
}
