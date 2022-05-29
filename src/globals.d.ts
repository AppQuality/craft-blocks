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
interface ContextState {
  profile?:{
    shape: GenericApiResponse;
    resolver: GenericResolver;
  };
}
interface EditorProps extends BasicElementProps {
  context?: ContextState;
}

type GenericResolver = () => Promise<GenericApiResponse>;