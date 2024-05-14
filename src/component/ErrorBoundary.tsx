// import ErrorPage from "./ErrorPage";
import { ReactElement, ReactNode, ReactPortal, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function ReactErrorBoundary(props: {
  children:
    | string
    | number
    | boolean
    | ReactElement
    | Iterable<ReactNode>
    | ReactPortal
    | null
    | undefined;
}) {
    const [errorInfo, setErrorInfo] = useState("");

    const erroCompoent = () => {
        return (
            <div>
                <h1>Error</h1>
                <h4>Something went wrong</h4>
                {errorInfo}
            </div>
        );
    };

    return (
        <ErrorBoundary
            FallbackComponent={erroCompoent}
            onError={(error, errorInfo) => {
                setErrorInfo(JSON.stringify(errorInfo));
            }}
        >
            {props.children}
        </ErrorBoundary>
    );
}
