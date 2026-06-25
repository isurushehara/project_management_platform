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

export const updateTask = async (
    id: number,
    data: {
        title: string;
        description: string;
        status: string;
        dueDate?: string;
    }
) => {

    const token = localStorage.getItem("token");

    const response = await api.put(
        `/tasks/${id}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const deleteTask = async (
    id: number
) => {

    const token = localStorage.getItem("token");

    await api.delete(
        `/tasks/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};