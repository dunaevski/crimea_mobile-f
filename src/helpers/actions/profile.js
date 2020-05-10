export const fetchUserInfo = async () => {
    const response = await fetch("https://randomuser.me/api/");
    return await response.json();
};

export default {
    fetchUserInfo
};
