export interface IBloodWorksEnvelope{
    bloodWorks: IBloodWork[];
    bloodWorkCount: number;
}

export interface IBloodWork{
    id: string;
    dateCreated: Date;
    examDate: Date;
    resultDate: Date;
    hemoglobin: number;
    hematocrit: number;
    wBCellsCount: number;
    rBCellsCount: number;
}