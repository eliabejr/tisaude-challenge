export { };

declare global {
  interface RoutesType {
    name: string;
    group: string;
    roles: string[];
    icon: JSX.Element | string;
    path: string;
    secondary?: boolean;
  }
}