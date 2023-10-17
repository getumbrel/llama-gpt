import { toast, Toast } from "react-hot-toast";
import { useMutation } from "react-query";

const startModel = async (codeName: string) => {
    const response = await fetch('http://localhost:3002/start-model', {
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
        onSuccess: () => {
            toast.dismiss(toastId);
            toast.success("Model started!");
        }, 
        onError: () => {
            toast.dismiss(toastId);
            toast.error("Error starting model!");
        }
    });

    return { runModel: mutate, modelError: error, isModelLoading: isLoading, isModelSuccess: isSuccess };
}

export default useModel;