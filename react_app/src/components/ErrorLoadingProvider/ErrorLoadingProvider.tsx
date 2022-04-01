import styles from "../ErrorLoadingProvider/ErrorLoadingProvider.module.scss";
import {CirclesWithBar} from "react-loader-spinner";
import React, {ReactNode} from "react";


type TErrorLoadingProvider = { children: ReactNode, loading: boolean, errorOccur: boolean };

const ErrorLoadingProvider: React.FC<TErrorLoadingProvider> = ({
                                                                  children,
                                                                  loading,
                                                                  errorOccur
                                                              }): any => {
    if (errorOccur) {
        return <h3 className={styles["error-message"]}>Wystąpił problem, podczas łączenia z serwerem.</h3>
    } else if (loading) {
        return <div className={styles["loading-spinner"]}>
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