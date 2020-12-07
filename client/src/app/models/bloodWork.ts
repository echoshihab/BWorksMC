export interface IBloodWorksEnvelope{
    bloodWorks: IBloodWork[];
    bloodWorkCount: number;
}

export interface IBloodWork{
    id: string;
    dateCreated: Date;
    description: string;
    examDate: Date;
    resultsDate: Date;
    hemoglobin: number ;
    hematocrit: number;
    wbCellsCount: number;
    rbCellsCount: number;
}

export interface IBloodWorkFormValues  {
    id?: string;
    dateCreated?: Date;
    description: string;
    examDate?: Date;
    resultsDate?: Date;
    hemoglobin: number|String ;
    hematocrit: number|string;
    wbCellsCount: number|string;
    rbCellsCount: number|string;
  }
  
export class BloodWorkFormValues implements IBloodWorkFormValues{
  id?: string = undefined;
  dateCreated?:Date = undefined;
  description: string = "";
  examDate?: Date = undefined;
  resultsDate?: Date = undefined;
  hemoglobin: number|string = "";
  hematocrit: number|string = "";
  wbCellsCount: number|string = "";
  rbCellsCount: number|string = "";

  constructor(init?: IBloodWorkFormValues) {
    if (init && init.dateCreated, init?.resultsDate, init?.examDate) {
        init.dateCreated = init.dateCreated as Date;
        init.resultsDate = init.resultsDate as Date;
        init.examDate = init.examDate as Date;
      }
    Object.assign(this, init);
  }
  
}