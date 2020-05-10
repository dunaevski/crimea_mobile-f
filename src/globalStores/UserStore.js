import { action, computed, observable } from 'mobx';


class UserStore {
    @observable _user = {
        name: {
            first: 'Неизвестный',
            last: 'Пользователь',
        },
        isSign: false,

    };

    @computed get fullName() {
        return `${ this._user.name.first } ${ this._user.name.last }`;
    }

    @action setUser(user) {
        const defaultPhoto = 'https://cl.ly/55da82beb939/download/avatar-default.jpg';
        this._user = { defaultPhoto, ...user };
    }

    getUser() {
        return this._user;
    }
}


export default new UserStore();
