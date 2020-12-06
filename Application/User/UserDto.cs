using System.Collections.Generic;
using Application.BloodWorkProfile;
using Domain;

namespace Application.User
{
    public class UserDto
    {
        public string DisplayName { get; set; }
        public string Token { get; set; }
        public string UserName { get; set; }
        public ICollection<BloodWorkDto> BloodWorks { get; set; }
    }
}