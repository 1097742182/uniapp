import { city } from "./city.js";
import { formatDate } from "@/utils/index.js";

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

// 根据wx.login的code获取用户信息
export function getUserInfo(code) {
  return http.post("/number/get_user_info", { code });
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

function _searchUser() {
  const random = Math.random();
  console.log(random);
  if (random > 0.5) return true;
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
      firstUserStatus: false,
      secondUser: "yanyan",
      secondOpenId: "qweqweqwe",
      secondStep: 8,
      secondUseTime: "03:00",
      secondUserStatus: false,
      gameStatus: "myLoading",
      beginTime: formatDate(new Date()),
      roomId,
    };

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
