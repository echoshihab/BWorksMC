using System;

namespace Application.BloodWorkProfile
{
    public class BloodWorkDto
    {

        public Guid Id { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime ExamDate { get; set; }
        public DateTime ResultsDate { get; set; }
        public string Description { get; set; }
        public decimal Hemoglobin { get; set; }
        public decimal Hematocrit { get; set; }
        public decimal WBCellsCount { get; set; }
        public decimal RBCellsCount { get; set; }
    }
}