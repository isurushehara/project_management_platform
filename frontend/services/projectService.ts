import api from "./api";

export const getProjects = async () => {

    const token =
        localStorage.getItem("token");

    const response = await api.get(
        "/projects",
        {
            headers: {
                Authorization:
                    `Bearer ${token}`,
            },
        }
    );

    return response.data;
};