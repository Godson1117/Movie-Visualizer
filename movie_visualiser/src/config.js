const options = {
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`
    }
};

export default options