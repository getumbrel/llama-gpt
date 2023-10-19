import { toast, Toast } from "react-hot-toast";
import { useMutation } from "react-query";

const MODEL_MANAGER_ENDPOINT = process.env.MODEL_MANAGER_ENDPOINT || "http://localhost:3002";

const startModel = async (codeName: string) => {
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

const useModel = () => {
    let toastId: string;
    const { mutate, error, isLoading, isSuccess } = useMutation(startModel, {
        onMutate: () => {
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

    return { runModel: mutate, modelError: error, isModelLoading: isLoading, isModelSuccess: isSuccess };
}

export default useModel;