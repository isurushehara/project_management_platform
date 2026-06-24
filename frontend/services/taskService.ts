import api from "./api";

export const getTasksByProject =
async (projectId: number) => {

    const token =
        localStorage.getItem("token");

    const response = await api.get(
        `/tasks/project/${projectId}`,
        {
            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        }
    );

    return response.data;
};