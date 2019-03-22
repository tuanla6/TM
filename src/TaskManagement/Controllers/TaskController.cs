using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpenIddict.Validation;
using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManagement.ViewModels;
using TM.Data.Core.Interfaces;

namespace TaskManagement.Controllers
{
    [Authorize(AuthenticationSchemes = OpenIddictValidationDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]    
    public class TaskController : Controller
    {
        private readonly ITaskManager _taskManager;
        public TaskController(ITaskManager taskManager)
        {
            _taskManager = taskManager;            
        }

        [HttpGet("tasks")]        
        [ProducesResponseType(200, Type = typeof(List<TaskViewModel>))]
        public async Task<IActionResult> GetTasks()
        {
            return await GetTasks(-1, -1);
        }

        [HttpGet("tasks/{pageNumber:int}/{pageSize:int}")]        
        [ProducesResponseType(200, Type = typeof(List<TaskViewModel>))]
        public async Task<IActionResult> GetTasks(int pageNumber, int pageSize)
        {
            var tasks = await _taskManager.GetTasks(pageNumber, pageSize);

            List<TaskViewModel> tasksVM = new List<TaskViewModel>();

            foreach (var item in tasks)
            {
                var taskVM = Mapper.Map<TaskViewModel>(item);
                tasksVM.Add(taskVM);
            }
            return Ok(tasksVM);
        }
    }
}