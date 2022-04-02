import {CirclesWithBar} from "react-loader-spinner";
import React from "react";


type TErrorLoadingProvider = { children: any, loading: boolean, errorOccur: boolean, errorMessage?: string };

const ErrorLoadingProvider: React.FC<TErrorLoadingProvider> = ({
                                                                   children,
                                                                   loading,
                                                                   errorOccur,
                                                                   errorMessage
                                                               }) => {
    if (errorOccur) {
        return <h3
            className={"d-flex justify-content-center mt-4"}>{errorMessage ? errorMessage : "Wystąpił problem, podczas łączenia z serwerem."}</h3>
    } else if (loading) {
        return <div className={"d-flex justify-content-center"}>
            <CirclesWithBar
                color="#2d74e0"
                outerCircleColor="#2678e1"
                innerCircleColor="#4987f3"
                barColor="#75716c"
            />
        </div>
    } else if (!loading) {
        return children
    }
}

export default ErrorLoadingProvider;