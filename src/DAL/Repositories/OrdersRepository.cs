// ====================================================
// More Templates: https://taskmanagementsystem.net/templates
// Email: support@ebenmonney.com
// ====================================================

using TM.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TM.Data.Repositories.Interfaces;

namespace TM.Data.Repositories
{
    public class OrdersRepository : Repository<Order>, IOrdersRepository
    {
        public OrdersRepository(DbContext context) : base(context)
        { }




        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
