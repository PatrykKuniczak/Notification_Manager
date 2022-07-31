import {useContext, useEffect, useCallback} from 'react';
import {UNSAFE_NavigationContext as NavigationContext} from 'react-router-dom';


export function useBlocker(blocker: any, when = true) {
    const {navigator}: { navigator: any } = useContext(NavigationContext);

    useEffect(() => {
        if (!when) return;

        const unblock = navigator.block((tx: any) => {
            const autoUnblockingTx = {
                ...tx,
                retry() {
                    unblock();
                    tx.retry();
                },
            };

            blocker(autoUnblockingTx);
        });

        return unblock;
    }, [navigator, blocker, when]);
}

export function usePrompt(message: string, when = true) {
    const blocker = useCallback(
        (tx: any) => {
            if (window.confirm(message)) tx.retry();
        },
        [message]
    );

    useBlocker(blocker, when);
}