"use client"
import NotificationCard from "@/components/NotificationCard";
import toastService from "@/services/ToastService";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

const ToastContext = createContext();
export const useNotification = () => useContext(ToastContext);
function ToastProvider({ children }) {

    const [toasts, setToasts] = useState([]);
    // console.log("Toasts is:", toasts);
    const addNotification = useCallback(({
        title,
        description,
        type,
        cta,

    }) => {
        const obj = {
            title,
            description,
            type,
            cta,
        }
        const id = new Date().getTime();

        setToasts((prev) => {
            return [{
                ...obj,
                id,
                duration: 5000, // 5s to be in the toast and then remove automatically
                progress: 100
            }, ...prev]
        })
    }, []);

    function onRemove(id) {
        setToasts((prev) => {
            return prev.filter((tst) => tst.id != id);
        })
    }

    function handlePauseNotification(id) {
        setToasts((prev) => {
            return prev.map((tst) => {
                if (tst.id == id) {
                    tst.preventProgress = true;
                }
                return tst;
            });
        })
    }

    function handleResumeProgressNotification(id) {
        setToasts((prev) => {
            return prev.map((tst) => {
                if (tst.id == id) {
                    tst.preventProgress = false;
                }
                return tst;
            });
        })
    }

    //logic for progress moving and hover pause
    useEffect(() => {
        const interval = setInterval(() => {
            setToasts(prev =>
                prev
                    .map(item => {
                        if (item.isPaused) return item;

                        const decrease = 10000 / item.duration;
                        const newProgress = item.progress - decrease;

                        if (item.preventProgress) {
                            return item;
                        }
                        if (newProgress <= 0) return null;

                        return {
                            ...item,
                            progress: newProgress,
                        };
                    })
                    .filter(Boolean)
            );
        }, 100);

        return () => clearInterval(interval);
    }, []);


    function updateToasts(id) {
        setToasts((prev) => {
            return prev.map((tst) => {
                if (tst.id == id) {
                    tst.exiting = true;
                }
                else {
                    tst.exiting = false;
                }
                return tst;
            });
        })
    }

    useEffect(() => {
        toastService.registerNotification(addNotification);
    }, []);
    return (
        <ToastContext.Provider value={addNotification}>
            {children}
            <div className="flex overflow-hidden flex-col gap-4 fixed top-4 right-4 overflow-y-auto">
                {
                    toasts && toasts.map((item) => {
                        return <NotificationCard handleResumeProgressNotification={handleResumeProgressNotification} handlePauseNotification={handlePauseNotification} updateToasts={updateToasts} onRemove={() => onRemove(item.id)} key={item.id} {...item} />
                    })
                }
            </div>
        </ToastContext.Provider>
    )
}

export default ToastProvider;