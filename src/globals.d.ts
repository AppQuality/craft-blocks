interface MarginProps {
  allSides?: boolean;
  allSidesMargin?: number;
  topMargin?: number;
  bottomMargin?: number;
  leftMargin?: number;
  rightMargin?: number;
}
interface BasicElementProps {
  className?: string;
  key?: string;
  children?: React.ReactNode;
}
interface GenericApiResponse {
  [key: string]: string | {
    [key: string]: string | GenericApiResponse;
  };
}
interface ProfileApiResponse extends GenericApiResponse{
  Profile: {
    name: string;
    surname: string;
  }
}
type GenericResolver = () => Promise<GenericApiResponse>;
interface ContextState {
  resolveDynamicContent?: boolean;
  resolver?: GenericResolver;
}
interface EditorProps extends BasicElementProps {
  context?: ContextState;
}
