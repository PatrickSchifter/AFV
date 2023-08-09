const tokenJWT = localStorage.getItem('token');

export async function fetchItems(url, method, body, setAuthenticated) {
    try {
        if(method === 'GET'){
                const response = await fetch(url, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${tokenJWT}`
                    }
                }).then((response)=>{
                    if(!response.ok){
                        if(response.status === 404){
                            return {status: response.status}
                        }
                        if(response.status === 403){
                            setAuthenticated(false)
                        }
                    }
                    return response.json();
                }).then(data => {
                    return data;
                })

                return response
        }
        if(method === 'POST'){
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${tokenJWT}`
                },
                body: JSON.stringify(body)
                })
                .then(response => response.json())
                .then((data) => {
                    return data;
                })
                .catch(error => console.error(error));
            return response;

        }
        if(method === 'DELETE'){
            await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${tokenJWT}`
                },
                body: JSON.stringify(body)
                })
                .then(response => response.json())
                .then((data) => {})
                .catch(error => console.error(error));

        }
        if(method === 'PATCH'){
            await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${tokenJWT}`
                },
                body: JSON.stringify(body)
                })
                .then(response => response.json())
                .then((data) => {})
                .catch(error => console.error(error));

        }
    } catch (error) {
        console.error(error);
        throw error;
        }
}