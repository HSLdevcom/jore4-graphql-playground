import "react-relay";

declare module "react-relay" {
  const useRelayEnvironment = () => IEnvironment;
  // FIXME: avoid any type
  const useSubscription = (subscription: any) => {};
  const RelayEnvironmentProvider = ({
    children: Element,
    environment: IEnvironment,
  }) => JSX.Element;
}
