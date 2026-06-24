import api from "./api";

const getHeaders = () => ({
    Authorization:
        `Bearer ${localStorage.getItem("token")}`
});

export const getTasksByProject =
    async (projectId: number) => {

        const response = await api.get(
            `/tasks/project/${projectId}`,
            {
                headers: getHeaders()
            }
        );

        return response.data;
    };

export const createTask = async (
    data: {
        title: string;
        description: string;
        dueDate?: string;
        projectId: number;
    }
) => {

    const token =
        localStorage.getItem("token");

    const response = await api.post(
        "/tasks",
        data,
        {
            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        }
    );

    return response.data;
};