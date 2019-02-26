// ====================================================
// More Templates: https://taskmanagementsystem.net/templates
// Email: support@ebenmonney.com
// ====================================================

using System;
using System.Linq;

namespace TM.Data.Models
{
    public class OrderDetail : AuditableEntity
    {
        public int Id { get; set; }
        public decimal UnitPrice { get; set; }
        public int Quantity { get; set; }
        public decimal Discount { get; set; }


        public int ProductId { get; set; }
        public Product Product { get; set; }

        public int OrderId { get; set; }
        public Order Order { get; set; }
    }
}
