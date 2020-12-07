
import {
  observable,
  action,
  runInAction,
  makeObservable,
  computed,
  toJS,
} from "mobx";
import { toast } from "react-toastify";
import { history } from "../..";
import agent from "../api/agent";
import { IBloodWork, IBloodWorkFormValues } from "../models/bloodWork";
import { RootStore } from "./rootStore";



export default class BloodWorksStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    makeObservable(this);
    this.rootStore = rootStore;

  }

  @observable bloodWorksRegistry = new Map();
  @observable bloodWork: IBloodWork | null = null;
  @observable loadingInitial = false;
  @observable loading = false;
  @observable submitting = false;
  @observable target = "";
  @observable bloodWorkCount = 0;




  @computed get bloodWorks() {
    return Array.from(this.bloodWorksRegistry.values());

  }

  @action createBloodWork = async (bloodWork: IBloodWorkFormValues) => {
    this.submitting = true;
    let wbCellsCount = parseFloat(bloodWork.wbCellsCount as string);
    let rbCellsCount = parseFloat(bloodWork.rbCellsCount as string);
    let hematocrit = parseFloat(bloodWork.hematocrit as string);
    let hemoglobin = parseFloat(bloodWork.hemoglobin as string);

    let dbBloodWork : IBloodWork = {
      id: bloodWork.id as string,
      resultsDate : bloodWork.resultsDate as Date,
      examDate: bloodWork.examDate as Date,
      dateCreated: bloodWork.dateCreated as Date,
      hematocrit: hematocrit,
      hemoglobin: hemoglobin,
      wbCellsCount: wbCellsCount,
      rbCellsCount: rbCellsCount,
      description: bloodWork.description

    }
    try {

      await agent.BloodWorks.create(dbBloodWork);
      runInAction(() => {
        this.bloodWorksRegistry.set(bloodWork.id, bloodWork);
      });
      history.push("/dashboard");
    } catch (error) {
      console.log(error)
      toast.error("Problem submitting data");
      console.log(error.response);
    }
    runInAction(() => {
      this.submitting = false;
    });
  };



  @action editBloodWork = async (bloodWork: IBloodWorkFormValues) => {
    this.submitting = true;
    let wbCellsCount = parseFloat(bloodWork.wbCellsCount as string);
    let rbCellsCount = parseFloat(bloodWork.rbCellsCount as string);
    let hematocrit = parseFloat(bloodWork.hematocrit as string);
    let hemoglobin = parseFloat(bloodWork.hemoglobin as string);

    let dbBloodWork : IBloodWork = {
      id: bloodWork.id as string,
      resultsDate : bloodWork.resultsDate as Date,
      examDate: bloodWork.examDate as Date,
      dateCreated: bloodWork.dateCreated as Date,
      hematocrit: hematocrit,
      hemoglobin: hemoglobin,
      wbCellsCount: wbCellsCount,
      rbCellsCount: rbCellsCount,
      description: bloodWork.description
    };
    try {
      await agent.BloodWorks.update(dbBloodWork);
      runInAction(() => {
        this.bloodWorksRegistry.set(dbBloodWork.id, dbBloodWork);
        this.bloodWork = dbBloodWork;
      });
      history.push(`/bloodwork/${bloodWork.id}`);
    } catch (error) {
      toast.error("Problem submitting data");
      console.log(error.response);
    }
    runInAction(() => {
      this.submitting = false;
    });
  }


  @action loadBloodWorks = async () => {
    try {
      const bloodWorksEnvelope = await agent.BloodWorks.list();
      const { bloodWorks, bloodWorkCount} = bloodWorksEnvelope;
      runInAction(() => {
        bloodWorks.forEach((bloodWork) => {
          this.bloodWorksRegistry.set(bloodWork.id, bloodWork);
        });
        this.bloodWorkCount = bloodWorkCount;
      });
    } catch (error) {
      console.log(error);
    }
   
  };

  getBloodWork = (id: string) => {
    return this.bloodWorksRegistry.get(id);
  };

  @action loadBloodWork = async (id: string) => {
    let bloodWork = this.getBloodWork(id);
    if (bloodWork) {
      this.bloodWork = bloodWork; 
      /*this causes issue when reinitialzing manage form due to
      modifying observerable outside of run in action, taking a deep clone via toJS resolves the issue*/

      return toJS(bloodWork); 
    } else {
      this.loadingInitial = true;

      try {
        bloodWork = await agent.BloodWorks.details(id);
        runInAction(() => {
          this.bloodWork = bloodWork;
          this.bloodWorksRegistry.set(bloodWork.id, bloodWork);
          this.loadingInitial = false;
        });
        return bloodWork; 
      } catch (error) {
        runInAction(() => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
  };
  




}
 

  