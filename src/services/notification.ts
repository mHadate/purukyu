import { StripePayments } from "../types/stripe-payments";

export const sendSlackWebhook = async (message: string) => {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) return;
  await fetch(url, {
    method: "POST",
    body: JSON.stringify({ text: message })
  });
}

export const sendLineNotify = async (data: StripePayments<Date>) => {
  const message = `
配信注文がありました。

■商品名：${data.productName}
■キャスト：${data.staff}`;
  const body = new URLSearchParams({
    message
  });
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${process.env.LINE_NOTIFY_TOKEN}`
    },
    body: body.toString()
  }
  const result = await fetch("https://notify-api.line.me/api/notify", option)
  const json = await result.json()
}