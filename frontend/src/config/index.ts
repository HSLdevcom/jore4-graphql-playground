export const getWsUri = () => {
  const { location } = window;
  const host = process.env.REACT_APP_BACKEND_HOST || location.host;
  const wsUriProtocol = location.protocol === "https:" ? "wss:" : "ws:";
  return `${wsUriProtocol}//${host}`;
};
