import { city } from "./city.js";
import { nameList } from "./name.js";
import { formatDate, generateRandomTime, generateRandomNumber } from "@/utils/index.js";
import store from "@/store";

// test user request api
const http = uni.$u.http;

// // test get api
// export function getUserInfo(params) {
//     return http.get('/http/getUserInfo', params)
// }

// test post api
export function postGoodsInfo(params) {
  return http.post("/http/goodInfos", params);
}

export function getRandomUser() {
  const randomNameNumber = Math.floor(Math.random() * nameList.length);
  const user = nameList[randomNameNumber];

  return user;
}

// 根据wx.login的code获取用户信息
export function getUserInfo(code) {
  return http.post("/number/get_user_info", { code });
}

// 获取用户排名
export function getRank(open_id) {
  return http.post("/number/get_rank", { open_id });
}

// 获取top20排名
export function getTop20Rank() {
  return http.post("/number/get_top20_rank");
}

export function addUserInfo(data) {
  return http.post("/number/add_data", data);
}

export function updateUserInfo(data) {
  return http.post("/number/update_data", data);
}

// 将用户积分更新到数据库
export function setUserCount(data) {
  return http.post("/number/update_UserCount", data);
}

export function getRoomId(data) {
  return new Promise((resolve, reject) => {
    resolve("roomId");
  });
}

export function updateUserPkHistory(data) {
  return http.post("/number/update_user_pk_history", data);
}

export function createRoom(data) {
  return http.post("/number/createRoom", data);
}

export function searchRoom(data) {
  return http.post("/number/searchRoom", data);
}

export function getRoomDetail(data) {
  return http.post("/number/getRoomDetail", data);
}

export function updateRoomDetail(data) {
  return http.post("/number/updateRoomDetail", data);
}

// 好友PK，创建PK房间
export function getWaitingRoomDetail(data) {
  return http.post("/number/getWaitingRoom", data);
}

// 好友PK，创建PK房间
export function checkWaitingRoom(data) {
  return http.post("/number/checkWaitingRoom", data);
}

// 好友PK，更新PK房间的内容，主要是status
export function updateWaitingRoom(data) {
  return http.post("/number/updateWaitingRoom", data);
}

// 好友PK，根据waitingRoomId获取PK详情
export function getPkRoomFromWaitingRoom(data) {
  return http.post("/number/getPkRoomFromWaitingRoom", data);
}

function _searchUser() {
  const random = Math.random();
  console.log(random);
  if (random > 0.6) return random.toString().split(".")[1][0];
  else return false;
}

export function searchUser(data) {
  return new Promise((resolve, reject) => {
    const roomId = Math.random().toString().split(".")[1];
    const resData = {
      firstUser: "zhonglin",
      firstOpenId: "123123123",
      firstStep: 0,
      firstUseTime: "00:00",
      secondUser: "yanyan",
      secondOpenId: "qweqweqwe",
      secondStep: 8,
      secondUseTime: "03:00",
      gameStatus: "loading",
      beginTime: formatDate(new Date()),
      roomId,
    };

    if (store.state.OpenId) resData.firstOpenId = store.state.OpenId;

    const randomNameNumber = Math.floor(Math.random() * nameList.length);
    resData.secondUser = nameList[randomNameNumber];
    resData.secondUseTime = generateRandomTime();
    resData.secondStep = generateRandomNumber();

    const timeInterval = setInterval(() => {
      const status = _searchUser();
      if (status) {
        clearInterval(timeInterval);
        resolve(resData);
      }
    }, 1000);
  });
}

export function getCity() {
  return city;
}
