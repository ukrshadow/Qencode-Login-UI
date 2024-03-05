const request = async (url, options) => {
    try {
        const response = await fetch(url, options);
        const res = await response.json();
        return res;
    } catch {
        console.error("error");
    }
}

export default request;