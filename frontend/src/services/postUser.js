export default async function postUser(messageBody) {
    try {
        const res = await fetch(`/api/v1/registerUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messageBody)
        })

        if (!res.ok) {
            console.log(`Can't register user`)
            return
        }

        console.log(`User created successfully`);
        return await res.json()

    } catch (err) {
        console.error(`Error creating user`);
    }
}

