import axiosInstance from "./Interceptor";

export const getWorkspaces = () => {
    return axiosInstance.get("/api/workspace");
}

export const createWorkspace = (workspace) => {
    return axiosInstance.post("/api/workspace", workspace);
}

export const getWorkspaceUsers = (workspaceId) => {
    return axiosInstance.get("/api/workspace/users?workspace=" + workspaceId);
}

export const addUser = (workspaceId, email, role) => {
    return axiosInstance.post(`/api/workspace/adduser?workspaceId=${workspaceId}&email=${email}&role=${role}`);
}
