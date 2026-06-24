import api from "./api";

const getHeaders = () => ({
    Authorization:
        `Bearer ${localStorage.getItem("token")}`
});

export const getProjects = async () => {

    const response = await api.get(
        "/projects",
        {
            headers: getHeaders(),
        }
    );

    return response.data;
};

export const updateProject = async (
    id: number,
    data: {
        name: string;
        description: string;
    }
) => {

    const response = await api.put(
        `/projects/${id}`,
        data,
        {
            headers: getHeaders(),
        }
    );

    return response.data;
};

export const deleteProject = async (
    id: number
) => {

    await api.delete(
        `/projects/${id}`,
        {
            headers: getHeaders(),
        }
    );
};

export const createProject = async (
    data: {
        name: string;
        description: string;
    }
) => {

    const token =
        localStorage.getItem("token");

    const response = await api.post(
        "/projects",
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