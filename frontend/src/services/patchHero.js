export default async function patchHero(_id, propertyToUpdate, value) {
    try {
        const res = await fetch(`/api/v1/heroAction`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ _id, propertyToUpdate, value })
        })

        if (!res.ok) {
            console.log(`Ooops, something went wrong during ${propertyToUpdate} updating`)
            return
        }
        console.log(`${propertyToUpdate} update succesful!`);
        return await res.json()

    } catch (err) {
        console.error(`Error updating hero stats! ${err}`);
    }
}