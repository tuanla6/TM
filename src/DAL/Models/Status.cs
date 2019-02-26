using System;
using System.Collections.Generic;
using System.Text;

namespace TM.Data.Models
{
    public class Status: AuditableEntity
    {
        public int Id { get; set; }
        public int StatusName { get; set; }
        public ICollection<Task> Tasks { get; set; }
    }
}
