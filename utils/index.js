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

function hasDuplicates(list) {
  return list.length !== new Set(list).size;
}

export function addDuplicate(list) {
  if (!hasDuplicates(list)) {
    const duplicateValue = list[Math.floor(Math.random() * list.length)];
    const randomIndex = Math.floor(Math.random() * list.length);
    list.splice(randomIndex, 1, duplicateValue);
  }

  if (!hasDuplicates(list)) {
    const duplicateValue = list[Math.floor(Math.random() * list.length)];
    const randomIndex = Math.floor(Math.random() * list.length);
    list.splice(randomIndex, 1, duplicateValue);
  }

  if (!hasDuplicates(list)) {
    const duplicateValue = list[Math.floor(Math.random() * list.length)];
    const randomIndex = Math.floor(Math.random() * list.length);
    list.splice(randomIndex, 1, duplicateValue);
  }

  if (!hasDuplicates(list)) {
    const duplicateValue = list[Math.floor(Math.random() * list.length)];
    const randomIndex = Math.floor(Math.random() * list.length);
    list.splice(randomIndex, 1, duplicateValue);
  }
}

export function checkNumberRight(CurrentLevelType, data) {
  let { secretNumbers, NumberList } = data;

  // 初始化状态
  const numberListStatus = [];
  NumberList.forEach((item) => numberListStatus.push("~"));

  // 如果模式为“菜鸟集训”
  if (CurrentLevelType === "normal") {
    for (let i = 0; i < NumberList.length; i++) {
      // 数字和位置都正确
      if (NumberList[i] == secretNumbers[i]) numberListStatus[i] = "V";
      else if (secretNumbers.includes(NumberList[i])) numberListStatus[i] = "O"; // 数字正确但位置不正确
    }
  } else {
    // 如果模式为“华山论剑”
    for (let i = 0; i < NumberList.length; i++) {
      if (NumberList[i] == secretNumbers[i]) {
        numberListStatus[i] = "V";
        secretNumbers[i] = "";
        NumberList[i] = "";
      }
    }

    // console.log([...secretNumbers]);
    // console.log([...NumberList]);

    for (let i = 0; i < NumberList.length; i++) {
      const item = NumberList[i];
      if (item && secretNumbers.includes(item)) {
        numberListStatus[i] = "O";

        const index = secretNumbers.findIndex((number) => number === item);
        if (index >= 0) secretNumbers[index] = "";
      }
    }
    // console.log({ secretNumbers, NumberList });
  }

  const A = numberListStatus.filter((item) => item === "V").length;
  const B = numberListStatus.filter((item) => item === "O").length;
  return { A, B, numberListStatus };
}
