using System;

namespace Domain
{
    public class BloodWork
    {
        public Guid Id { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime ExamDate { get; set; }
        public DateTime ResultsDate { get; set; }
        public string Description { get; set; }
        public double Hemoglobin { get; set; }
        public double Hematocrit { get; set; }
        public double WBCellsCount { get; set; }
        public double RBCellsCount { get; set; }
        public AppUser AppUser { get; set; }
        public string AppUserId { get; set; }

    }
}
