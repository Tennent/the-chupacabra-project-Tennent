export default async function getUser(messageBody) {
    try {
        const res = await fetch('/api/v1/loginUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messageBody)
        })
        if (!res.ok) {
            alert('Invalid login info!')
        } else {
            alert('User logged in successfully!')
        }
        return res.json();
    } catch (error) {
        console.error(`Error durring login ${error}`);
    }
};