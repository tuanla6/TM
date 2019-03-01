using TM.Data.Models;
using TM.Data.Repositories.Interfaces;

namespace TM.Data.Repositories
{
    public class TaskRepository : Repository<TaskInfo>, ITaskRepository
    {
        public TaskRepository(ApplicationDbContext context) : base(context)
        {

        }
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
