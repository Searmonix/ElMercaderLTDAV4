import axios from 'axios';

const baseUrl = `api/user`;

const logUser = (user) => {
    const userEmailPassword = `${user.email}/${user.password}`
    const res =
        axios
            .get(`${baseUrl}/${userEmailPassword}`)
            .then(res => res.data)
    ;

    return res;
}

const createUser = (user) => {
    const newUserUrl = `${baseUrl}/new`
    const res =
        axios
            .post(newUserUrl, user)
            .then(res => res.data)
            .then(d =>  {
                delete d['birthtDay'];
                delete d['monthBirthtDay'];

                return d;
            })
    ;

    return res;

}

const getUsers = () => {
    const allUserUrl = `${baseUrl}/all`;
    const res =
        axios
            .get(allUserUrl)
            .then(res => res.data)
            .then(res => res.map(d => {
                delete d['birthtDay'];
                delete d['monthBirthtDay'];

                return d;
            }))
    ;

    return res;
}

export default {
    logUser, createUser, getUsers
}