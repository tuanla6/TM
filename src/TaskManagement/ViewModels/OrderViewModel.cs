// ====================================================
// More Templates: https://taskmanagementsystem.net/templates
// Email: support@ebenmonney.com
// ====================================================

using System;
using System.Linq;


namespace TaskManagement.ViewModels
{
    public class OrderViewModel
    {
        public int Id { get; set; }
        public decimal Discount { get; set; }
        public string Comments { get; set; }
    }
}
