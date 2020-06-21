import { action, observable } from 'mobx';

class UIStore {
  @observable _isNotificationOpen = false;
  @observable isModalLoginOpen = false;
  @observable isMenuOpen = false;
  @observable _isUserLogin = false;

  @action toggleNotification() {
    this._isNotificationOpen = !this._isNotificationOpen;
  }

  get isNotificationOpen () {
    return this._isNotificationOpen;
  }

  @action toggleModalLogin() {
    this.isModalLoginOpen = !this.isModalLoginOpen;
  }

  @action toggleIsLoginForm() {
    this._isLoginForm = !this._isLoginForm;
  }

  @action toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  get isUserLogin() {
    return this._isUserLogin;
  }

  set isUserLogin(isLogin) {
    return this._isUserLogin = isLogin;
  }
}

export default new UIStore();
