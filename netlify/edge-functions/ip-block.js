const ALLOWED_IPS = ["98.38.232.100"];

export default async (request) => {
  const clientIp = request.headers.get("x-nf-client-connection-ip");
  if (!ALLOWED_IPS.includes(clientIp)) {
    return new Response(
      `We're sorry, your IP, ${clientIp}, is not part of the allow list for this page`,
      {
        headers: { "content-type": "text/html" },
        status: 451,
      }
    );
  }

  return new Response(
    `Hello there! You can freely access our content since your IP, ${clientIp}, is in the allow list!`,
    {
      headers: { "content-type": "text/html" },
    }
  );
};
