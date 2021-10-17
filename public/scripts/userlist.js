const list = $("#userStatusRows");

async function getUsers()
{
    await $.get("/api/user", (data, status) => {
        console.log(data);
    })
}

getUsers();

