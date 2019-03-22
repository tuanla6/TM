using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace TM.Data.Models
{
    public class Status: AuditableEntity
    {
        public int Id { get; set; }
        [StringLength(50)]
        public string StatusName { get; set; }
        public ICollection<TaskInfo> Tasks { get; set; }
    }
}
