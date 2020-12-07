import {
  observable,
  action,

} from "mobx";
import { IBloodWork } from "../models/bloodWork";

import { RootStore } from "./rootStore";



export default class BloodWorksStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

  }

  @observable bloodWorksRegistry = new Map();
  @observable bloodWork: IBloodWork | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = "";
  @observable loading = false;

  @observable activityCount = 0;
  @observable page = 0;
  @observable predicate = new Map();

  @action setPredicate = (predicate: string, value: string | Date) => {
    this.predicate.clear(); //first clear any previous settings
    if (predicate !== "all") {
      this.predicate.set(predicate, value);
    }
  };

}
 

  