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
  [key: string]: {
    [key: string]: string;
  };
}
interface ContextState {
  profileResolver?: GenericResolver;
}
interface EditorProps extends BasicElementProps {
  context?: ContextState;
}

type GenericResolver = () => Promise<GenericApiResponse>;