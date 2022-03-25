import * as functions from "firebase-functions";

process.env.TZ = "Asia/Tokyo"; // タイムゾーンを日本時間に設定

export default functions.region("asia-northeast1");
