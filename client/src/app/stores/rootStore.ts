
import UserStore from "./userStore";
import { createContext } from "react";
import { configure } from "mobx";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import BloodWorksStore from "./bloodWorksStore";


configure({ enforceActions: "always" });

export class RootStore {
  bloodWorksStore: BloodWorksStore;
  userStore: UserStore;
  commonStore: CommonStore;
  modalStore: ModalStore;

  constructor() {
    this.bloodWorksStore = new BloodWorksStore(this);
    this.userStore = new UserStore(this);
    this.commonStore = new CommonStore(this);
    this.modalStore = new ModalStore(this);

  }
}

export const RootStoreContext = createContext(new RootStore());
