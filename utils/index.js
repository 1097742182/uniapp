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

// 给list增加重复数字
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

// 格式化日期
export function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// 判断时间大小
function compareTime(time1, time2) {
  const [hour1, minute1] = time1.split(":");
  const [hour2, minute2] = time2.split(":");
  const date1 = new Date(0, 0, 0, hour1, minute1);
  const date2 = new Date(0, 0, 0, hour2, minute2);

  // 比较时间差
  if (date1.getTime() <= date2.getTime()) {
    return true;
  } else if (date1.getTime() > date2.getTime()) {
    return false;
  }
}

// 判断时间是否超过当前时间
function isFutureTime(dateTime, timeToAdd) {
  var currentDateTime = new Date(); // 获取当前时间
  var futureDateTime = new Date(dateTime); // 将传入的日期时间字符串转换为日期对象

  // 将时间字符串转换为分钟和秒数
  var timeParts = timeToAdd.split(":");
  var minutesToAdd = parseInt(timeParts[0]);
  var secondsToAdd = parseInt(timeParts[1]);

  // 在传入的日期时间上添加分钟和秒数
  futureDateTime.setMinutes(futureDateTime.getMinutes() + minutesToAdd);
  futureDateTime.setSeconds(futureDateTime.getSeconds() + secondsToAdd);

  // 比较现在时间和追加时间后的日期时间
  if (futureDateTime > currentDateTime) {
    return true;
  } else {
    return false;
  }
}

// 查看时间是否valid
function checkTimeValid(roomDetail) {
  const firstUseTime = roomDetail.firstUseTime;
  const secondUseTime = roomDetail.secondUseTime;
  const beginTime = roomDetail.beginTime;

  // 判断第二个用户的时间是否为未来时间
  const secondStatus = isFutureTime(beginTime, secondUseTime);
  if (secondStatus) return false; // 如果是未来时间，则返回false
  return true;
}

// 判断游戏是否胜利
export function checkPkGameStatus(roomDetail) {
  // 先检查时间是否符合，如果不符合，则直接返回loading
  const valid = checkTimeValid(roomDetail);
  if (!valid) return "loading";

  let gameStatus = "success";
  const firstStep = roomDetail.firstStep;
  const secondStep = roomDetail.secondStep;

  if (firstStep != 0 && secondStep == 0) gameStatus = "success"; // 如果用户成功了，但是对方没有成功
  else if (firstStep < secondStep) gameStatus = "success"; // 如果该用户步数比对方少，则成功
  else if (firstStep > secondStep) gameStatus = "failed"; // 如果步数比对面多，则失败

  if (firstStep == secondStep) {
    const firstUseTime = roomDetail.firstUseTime;
    const secondUseTime = roomDetail.secondUseTime;

    const timeStatus = compareTime(firstUseTime, secondUseTime);
    if (timeStatus) gameStatus = "success";
    else gameStatus = "failed";
  }

  return gameStatus;
}

// 计算百分比
export function calculatePercentage(num1, num2) {
  return ((num1 / num2) * 100).toFixed(2) + "%";
}

// 生成随机时间
export function generateRandomTime() {
  var hours = Math.floor(Math.random() * 5) + 1; // 生成1到5之间的随机数作为小时数
  var minutes = Math.floor(Math.random() * 60); // 生成0到59之间的随机数作为分钟数

  // 格式化时间，保证小时和分钟都是两位数
  var formattedHours = hours < 10 ? "0" + hours : hours;
  var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  return formattedHours + ":" + formattedMinutes; // 返回生成的时间
}

// 生成随机数字
export function generateRandomNumber() {
  var randomNumber = Math.random();
  if (randomNumber < 0.1) {
    // 10 的概率生成数字5
    return 5;
  } else if (randomNumber < 0.3) {
    // 20 的概率生成数字6
    return 6;
  } else if (randomNumber < 0.5) {
    // 20 的概率生成数字7
    return 7;
  } else if (randomNumber < 0.8) {
    // 30 的概率生成数字8,9或10
    return Math.floor(Math.random() * 3) + 8;
  } else {
    // 20 的概率生成数字11
    return 0;
  }
}

// 查看历史记录为loading状态的historyItem
export function checkHistoryItemGameStatus(historyItem) {
  if (historyItem.gameStatus !== "loading") return;
  const firstUseTime = historyItem.firstUseTime;
  const secondUseTime = historyItem.secondUseTime;
  const beginTime = historyItem.beginTime;

  // 判断第二个用户的时间是否为未来时间
  const secondStatus = isFutureTime(beginTime, secondUseTime);
  if (!secondStatus) {
    historyItem.gameStatus = checkPkGameStatus(historyItem);
  }
}

// 防抖函数
export function debounce(func, delay) {
  var timer;
  return function () {
    var context = this;
    var args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      func.apply(context, args);
    }, delay);
  };
}

// 节流函数
export function throttle(func, delay = 10 * 1000) {
  var timer;
  return function () {
    var context = this;
    var args = arguments;
    if (!timer) {
      timer = setTimeout(function () {
        func.apply(context, args);
        timer = null;
      }, delay);
    }
  };
}
