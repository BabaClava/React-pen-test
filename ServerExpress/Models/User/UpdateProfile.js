'use strict'

const updateMock = {
    fullName: null,
    aboutMe: null,
    contacts: {
        facebook: null,
        website:null,
        vk: null,
        twitter: null,
        instagram: null,
        youtube: null,
        github: null,
        mainLink: null
    },
    lookingForAJob: false,
    lookingForAJobDescription: null,
}

module.exports = ({dbClient, body: fieldsValue, user}) => {
    let updateValues = {
        ...updateMock,
        ...fieldsValue,
            contacts: {
                ...updateMock.contacts,
                ...fieldsValue.contacts
            }
    }

    const {
        fullName,
        aboutMe,
        lookingForAJob,
        lookingForAJobDescription,
        contacts
    } = updateValues;

    return dbClient.db('usersdb').collection('users')
        .updateOne({userId: user.userId}, {
            $set: {
                fullName: fullName,
                aboutMe: aboutMe,
                lookingForAJob: lookingForAJob,
                lookingForAJobDescription: lookingForAJobDescription,
                contacts: contacts
            }
        })
}