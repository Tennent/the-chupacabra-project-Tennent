export default async function patchHero(propToUpdate, value) {
    try {
        const res = await fetch(`/api/v1/heroAction/${propToUpdate}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ value })
        })

        if (!res.ok) {
            console.log(`Ooops, something went wrong during ${propToUpdate} updating`)
            return
        }
        console.log(`${propToUpdate} update succesful!`);
        return await res.json()

    } catch (err) {
        console.error(`Error updating hero stats! ${err}`);
    }
}