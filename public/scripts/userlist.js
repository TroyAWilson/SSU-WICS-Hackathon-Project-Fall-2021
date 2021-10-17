const list = $("#userStatusRows");

async function getUsers()
{
    var users;
    await $.get("/api/user", (data, status) => {
        users = data;
    })
    return users;
}

async function getID()
{
    await $.get("/api/session_id", (data, status) => {
        return(data);
    })
}

async function updateStatus(id, status)
{
    var id = await getID();
    if(id && id.length > 0)
    {
        console.log("Error: No ID found, try signing in");
    }
    else
    {
        await $.ajax({
            type: "PUT",
            url: '/api/user',
            data: JSON.stringify({'status': status}),
            contentType: "application/json; charset=utf-8",
            success : function(data) {              
                console.log(data);
            },
            error : function(request,error)
            {
                console.error(error);
            }
         });
    }
}

$(".safe").on("click", async (e) => {
    await updateStatus(await getID(), "Safe")
})

$(".warning").on("click", async(e) => {
    await updateStatus(await getID(), "Warning")
})

$(".evacuating").on("click", async (e) => {
    await updateStatus(await getID(), "Evacuating")
})

$(".danger").on("click", async(e) => {
    await updateStatus(await getID(), "Danger")
})


//generates the list of people

const search_field = $("#site-search");
const users_list_field = $("#userStatusRows");
const searchButton = $(".search-users-button");

async function getListOfPeople()
{
    var users = await getUsers();
    console.log(users);
    var phrase = search_field.val();
    console.log("phrase is ", phrase);
    users_list_field.empty();

    users.forEach((user) => {
        try {
            if(phrase=="" || user.firstName.includes(phrase) || user.lastName.includes(phrase) || `${user.firstName} ${user.lastName}`.includes(phrase))
            {
                var row = `<li class="userStatusRow"><img src="/static/images/avatar.png">${user.firstName} ${user.lastName} is ${user.status}</li>`
                users_list_field.append(row);
            }
        } catch (error) {
        }
    })

}

getListOfPeople();

console.log(searchButton);
searchButton.on('click', async () => {
    console.log("button clicked");
    await getListOfPeople();
})