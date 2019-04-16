using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TM.Data.Models;

namespace TM.Data.Core.Interfaces
{
    public interface ITaskManager
    {
        Task<List<TaskInfo>> GetTasks(int page, int pageSize);
        Task CreateTaskAsync(TaskInfo task);
        Task<List<Status>> GetStatuses();
    }
}
