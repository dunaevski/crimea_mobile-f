import { action, computed, observable } from 'mobx';

class UserStore {
    @observable _user = {
        defaultPhoto: 'https://cl.ly/55da82beb939/download/avatar-default.jpg',
        isSign: false,
    };

    @observable _weather = {};

    @computed get fullName() {
        return this._user.name && `${ this._user.name.first } ${ this._user.name.last }`;
    }

    @action setUser(user) {
        const defaultPhoto = 'https://cl.ly/55da82beb939/download/avatar-default.jpg';
        this._user = { defaultPhoto, ...user };
    }

    get user() {
        return this._user;
    }

    @action setWeather(weatherInfo) {
        this._weather = weatherInfo;
    }

    get weatherInfo() {
        return this._weather;
    }
}


export default new UserStore();
