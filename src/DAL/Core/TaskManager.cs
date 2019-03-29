using AspNet.Security.OpenIdConnect.Primitives;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TM.Data.Core.Interfaces;
using TM.Data.Models;

namespace TM.Data.Core
{
    public class TaskManager : ITaskManager
    {
        private readonly ApplicationDbContext _context;
        public TaskManager(ApplicationDbContext context, IHttpContextAccessor httpAccessor)
        {
            _context = context;
            _context.CurrentUserId = httpAccessor.HttpContext?.User.FindFirst(OpenIdConnectConstants.Claims.Subject)?.Value?.Trim();
        }
        public async Task<List<TaskInfo>> GetTasks(int page, int pageSize)
        {
            IQueryable<TaskInfo> taskQuery = _context.Tasks                
                .OrderBy(t => t.CreatedDate);

            if (page != -1)
                taskQuery = taskQuery.Skip((page - 1) * pageSize);

            if (pageSize != -1)
                taskQuery = taskQuery.Take(pageSize);

            return await taskQuery.ToListAsync();
                        
        }

        public async Task CreateTaskAsync(TaskInfo task)
        {                      

            try
            {
                _context.Tasks.Add(task);
                await _context.SaveChangesAsync();
            }
            catch
            {                
                throw;
            }            
            
        }
    }
}
