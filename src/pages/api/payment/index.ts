// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getStripePayment, setStripePayment } from "../../../services/firestore";
import { sendLineNotify, sendSlackWebhook } from "../../../services/notification";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { uid } = JSON.parse(req.body);
  if (req.method !== "POST") {
    await sendSlackWebhook("/api/paymentにPOST以外のメソッドが使用された。");
    return res.status(200).json({ success: false });
  }
  if (!uid) {
    await sendSlackWebhook(`UIDが不明です。
uid : ${uid}`);
    return res.status(200).json({ success: false });
  }

  const {docId, data} = await getStripePayment(uid);
  if (!docId || !data) {
    await sendSlackWebhook(`購入コレクションが見つかりません
docId : ${docId}
uid : ${uid}`);
    return res.status(200).json({ success: false });
  }

  data.paid = true;
  data.updatedDate = new Date();

  try {
    await setStripePayment(docId, data)
    await sendLineNotify(data)
  } catch (e) {
    console.error(e);
    await sendSlackWebhook(JSON.stringify(e))
    return res.status(200).json({ success: false });
  }

  res.status(200).json({success: true});
}
