export const sendSlackWebhook = async (message: string) => {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) return;
  await fetch(url, {
    method: "POST",
    body: JSON.stringify({text: message})
  });
}