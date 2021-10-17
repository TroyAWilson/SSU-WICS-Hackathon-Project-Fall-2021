const {newUser, getUsers, newShelter, getShelters, updateStatus} = require('./DB');

async function test()
{
    var shelters = await updateStatus(40, "Test Status");
}

test();