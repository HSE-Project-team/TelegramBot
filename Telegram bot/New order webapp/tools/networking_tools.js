export async function get_data_from_server(url) {
    try {
        console.log(1);
        const response = await fetch(url, {
            method: "GET"
        });
        if (response.ok) {
            console.log(3);
            return [response.status, await response.json()];
        } else {
            console.log(response.status);
            return [response.status, ""]
        }
    } catch (error) {
        console.log(2);
        console.log(error);
        return [error, ""];
    }
}

export async function send_data_to_server(url, data_for_send) {
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data_for_send),
    });

    return await response.json();
}