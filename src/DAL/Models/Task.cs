using System;
using System.Collections.Generic;
using System.Text;

namespace TM.Data.Models
{
    public class TaskInfo : AuditableEntity
    {
        public int Id { get; set; }
        public string TaskName { get; set; }
        public string Description { get; set; }
        public string AssignUserId { get; set; }
        public DateTime? AssignedDate { get; set; }
        public DateTime? DueDate { get; set; }
        public int? StatusId { get; set; }
        public Status Status { get; set; }
        public ApplicationUser AssignUser { get; set; }
    }
}
