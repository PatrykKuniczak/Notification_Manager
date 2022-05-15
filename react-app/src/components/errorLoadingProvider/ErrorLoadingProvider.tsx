import {CirclesWithBar} from "react-loader-spinner";
import React from "react";
import {ErrorMessage, LoadingContainer} from "./ErrorLoadingContainer";


type TErrorLoadingProvider = { children: any, loading: boolean, errorOccur: boolean, errorMessage?: string };

const ErrorLoadingProvider: React.FC<TErrorLoadingProvider> = ({
                                                                   children,
                                                                   loading,
                                                                   errorOccur,
                                                                   errorMessage
                                                               }) => {
    if (errorOccur) {
        return <ErrorMessage>
            {errorMessage !== "Network Error" ? errorMessage : "Wystąpił problem, podczas łączenia z serwerem."}
        </ErrorMessage>
    } else if (loading) {
        return <LoadingContainer>
            <CirclesWithBar
                color="#DABBF1"
                outerCircleColor="#BE70FF"
                innerCircleColor="#E65DFF"/>
        </LoadingContainer>
    } else if (!loading) {
        return children
    }
}

export default ErrorLoadingProvider;