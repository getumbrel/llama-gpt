import { toast, Toast } from "react-hot-toast";
import { useMutation } from "react-query";

const MODEL_MANAGER_ENDPOINT = process.env.MODEL_MANAGER_ENDPOINT || "http://localhost:3002";

const startModelCall = async (codeName: string) => {
    if (!MODEL_MANAGER_ENDPOINT) {
        throw new Error("MODEL_MANAGER_ENDPOINT is not defined!");
    }
    const response = await fetch(`${MODEL_MANAGER_ENDPOINT}/start-model`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: codeName,
        }),
    });
    return response.json();
}

export const stopModelCall = async () => {
    if (!MODEL_MANAGER_ENDPOINT) {
        throw new Error("MODEL_MANAGER_ENDPOINT is not defined!");
    }
    const response = await fetch(`${MODEL_MANAGER_ENDPOINT}/stop-model`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
}

let toastId: string;

const useStartModel = () => {
    const { mutate: runModel, error: runModelError, isLoading: runModelLoading, isSuccess: runModelSuccess } = useMutation(startModelCall, {
        onMutate: () => {
            console.log("starting model...");
            toast.dismiss(toastId);
            toastId = toast.loading("Starting model...");
        },
        onSuccess: (data) => {
            if (data.status == 200) {
                toast.dismiss(toastId);
                toast.success("Model started!");
            } else {
                toast.dismiss(toastId);
                toast.error("Error starting model!");
            }
        },
        onError: () => {
            toast.dismiss(toastId);
            toast.error("Error starting model!");
        }
    });

    return {
        runModel,
        runModelError,
        runModelLoading,
        runModelSuccess,
    };
}

// const useStopModel = (customCallback?: () => void) => {
//     const { mutate } = useMutation(stopModelCall, {
//         onMutate: () => {
//             console.log("stopping model...");
//             toast.dismiss(toastId);
//             toastId = toast.loading("Stopping model...");
//         },
//         onSuccess: (data) => {
//             if (data.status == 200) {
//                 toast.success("Model stopped!");
//             } else {
//                 toast.error("Error stopping model!");
//             }
//             if (customCallback) customCallback();
//         },
//         onError: () => {
//             toast.dismiss(toastId);
//             toastId = toast.error("Error stopping model!");
//         }
//     });

//     return {
//         stopModel: mutate,
//     };
// }

export {
    useStartModel,
    // useStopModel,
};