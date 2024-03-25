export async function get_data_from_server(url) {
    const response = await fetch(url, {
        method: "GET",
    });
    return await response.json();
}

export async function send_data_to_server(url, data_for_send) {
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data_for_send),
    });

    return await response.json();
}