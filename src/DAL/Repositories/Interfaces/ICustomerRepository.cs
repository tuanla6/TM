// ====================================================
// More Templates: https://taskmanagementsystem.net/templates
// Email: support@ebenmonney.com
// ====================================================

using TM.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace TM.Data.Repositories.Interfaces
{
    public interface ICustomerRepository : IRepository<Customer>
    {
        IEnumerable<Customer> GetTopActiveCustomers(int count);
        IEnumerable<Customer> GetAllCustomersData();
    }
}
