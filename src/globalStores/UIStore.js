import { action, observable } from 'mobx';


class UIStore {
  @observable _isNotificationOpen = false;
  @observable isModalLoginOpen = false;
  @observable isMenuOpen = false;
  @observable _name = "";

  @action toggleNotification() {
    this._isNotificationOpen = !this._isNotificationOpen;
  }

  get isNotificationOpen () {
    return this._isNotificationOpen;
  }

  @action toggleModalLogin() {
    this.isModalLoginOpen = !this.isModalLoginOpen;
  }

  @action toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @action setName(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }
}

export default new UIStore();
