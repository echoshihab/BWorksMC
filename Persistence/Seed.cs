using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,
            UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        Id = "a",
                        DisplayName = "PatientZero",
                        UserName = "patientZero",
                        Email = "patientZero@email.com"
                    },
                    new AppUser
                    {
                        Id = "b",
                        DisplayName = "PatientOne",
                        UserName = "patientOne",
                        Email = "patientOne@email.com"
                    },
                    new AppUser
                    {
                        Id = "c",
                        DisplayName = "PatientTwo",
                        UserName = "patientTwo",
                        Email = "patientTwo@email.com"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Password1!");
                }
            }

            if (!context.BloodWorks.Any())
            {
                var bloodWorks = new List<BloodWork>
                {
                    new BloodWork
                    {
                        DateCreated = DateTime.Today,
                        ExamDate = DateTime.Today,
                        ResultsDate = DateTime.Today,
                        Description = "Description One",
                        Hemoglobin = 10.8,
                        Hematocrit = 31.1,
                        WBCellsCount = 1.5,
                        RBCellsCount = 3.5,
                        AppUserId = "a"

                    },
                    new BloodWork
                    {
                        DateCreated = DateTime.Today,
                        ExamDate = DateTime.Today.AddDays(-3),
                        ResultsDate = DateTime.Today.AddDays(-1),
                        Description = "Description Two",
                        Hemoglobin = 10.4,
                        Hematocrit = 30.1,
                        WBCellsCount = 1.2,
                        RBCellsCount = 3.1,
                        AppUserId = "a"
                    },

                    new BloodWork
                    {
                        DateCreated = DateTime.Today,
                        ExamDate = DateTime.Today.AddDays(-10),
                        ResultsDate = DateTime.Today.AddDays(-9),
                        Description = "Description Three",
                        Hemoglobin = 10.5,
                        Hematocrit = 30.5,
                        WBCellsCount = 1.5,
                        RBCellsCount = 3.5,
                        AppUserId = "a"
                    },

                    new BloodWork
                    {
                        DateCreated = DateTime.Today,
                        ExamDate = DateTime.Today,
                        ResultsDate = DateTime.Today,
                        Description = "Description Four",
                        Hemoglobin = 12.8,
                        Hematocrit = 45.1,
                        WBCellsCount = 3.5,
                        RBCellsCount = 2.5,
                        AppUserId = "b"

                    },
                    new BloodWork
                    {
                        DateCreated = DateTime.Today,
                        ExamDate = DateTime.Today.AddDays(-9),
                        ResultsDate = DateTime.Today.AddDays(-7),
                        Description = "Description Five",
                        Hemoglobin = 11.9,
                        Hematocrit = 45.5,
                        WBCellsCount = 2.4,
                        RBCellsCount = 1.9,
                        AppUserId = "b"

                    },

                    new BloodWork
                    {
                        DateCreated = DateTime.Today,
                        ExamDate = DateTime.Today.AddDays(-8),
                        ResultsDate = DateTime.Today.AddDays(-6),
                        Description = "Description Six",
                        Hemoglobin = 12.9,
                        Hematocrit = 44.5,
                        WBCellsCount = 2.3,
                        RBCellsCount = 2.1,
                        AppUserId = "b"

                    },


                };

                await context.BloodWorks.AddRangeAsync(bloodWorks);
                await context.SaveChangesAsync();
            }
        }
    }
}