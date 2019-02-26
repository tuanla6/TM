﻿
using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using TM.Data.Models.Interfaces;

namespace TM.Data.Models
{
    public class AuditableEntity : IAuditableEntity
    {
        [MaxLength(256)]
        public string CreatedBy { get; set; }
        [MaxLength(256)]
        public string UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
