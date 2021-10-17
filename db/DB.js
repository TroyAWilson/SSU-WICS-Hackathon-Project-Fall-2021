const dbLogin = require('./dbconfig.json').dbLogin;

const Supabase = require('@supabase/supabase-js');

const supabase_client = Supabase.createClient(
    supabaseUrl = dbLogin.url,
    supabaseKey = dbLogin.apiKey
)

async function newUser(first, last, user, status)
{
    var id;
    await supabase_client.from("User").insert(
        {
            firstName: first,
            lastName: last,
            username: user,
            status: status
        }
    ).then(
        (res, err) => {
            id = res['data'][0]['id']
        }
    )
    return id;
}

async function getUsers()
{
    var users;
    await supabase_client.from("User").select("*").then(
        (res, err) => {
            users = res['data'];
        }
    )
    return users;
}

async function newShelter(name, lat, lon, address, capacity, phone)
{
    var id;
    await supabase_client.from("Shelter").insert(
        {
            name: name,
            lat: lat,
            lon: lon,
            address: address,
            capacity: capacity,
            phonenumber: phone
        }
    ).then(
        (res, err) => {
            id = res['data'][0]['id'];
            return id;
        }
    )
    return id;
}

async function getShelters()
{
    var shelters;
    await supabase_client.from("Shelter").select("*").then(
        (res, err) => {
            shelters = res['data'];
        }
    );
    return shelters;
}

async function updateStatus(id, status)
{
    var user;
    await supabase_client.from("User").update({status: status}).match({id: id}).then(
        (res, err) => {
            user = res['data'];
        }
    )
    return user;
}

module.exports.newUser = newUser;
module.exports.getUsers = getUsers;
module.exports.updateStatus = updateStatus;

module.exports.newShelter = newShelter;
module.exports.getShelters = getShelters;