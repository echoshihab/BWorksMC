using System;

namespace Domain
{
    public class BloodWork
    {
        public DateTime DateCreated { get; set; }
        public DateTime ExamDate { get; set; }
        public DateTime ResultsDate { get; set; }
        public decimal Hemoglobin { get; set; }
        public decimal Hematocrit { get; set; }
        public decimal WBCellsCount { get; set; }
        public decimal RBCellsCount { get; set; }

    }
}
