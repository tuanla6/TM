using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpenIddict.Validation;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using TaskManagement.Helpers;
using TaskManagement.ViewModels;
using TM.Data.Core.Interfaces;
using TM.Data.Models;

namespace TaskManagement.Controllers
{
    [Authorize(AuthenticationSchemes = OpenIddictValidationDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]    
    public class TaskController : Controller
    {
        private readonly ITaskManager _taskManager;
        private readonly IAccountManager _accountManager;
        public TaskController(ITaskManager taskManager, IAccountManager accountManager)
        {
            _taskManager = taskManager;
            _accountManager = accountManager;
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
        [HttpPost("tasks")]        
        [ProducesResponseType(201, Type = typeof(TaskViewModel))]
        [ProducesResponseType(400)]
        public async Task<IActionResult> CreateTask([FromBody] TaskViewModel task)
        {
            if (ModelState.IsValid)
            {
                if (task == null)
                    return BadRequest($"{nameof(task)} cannot be null");
                
                TaskInfo appTask = Mapper.Map<TaskInfo>(task);
                appTask.CreatedDate = appTask.UpdatedDate = System.DateTime.Now;                
                appTask.AssignUserId = Utilities.GetUserId(this.User);
                await _taskManager.CreateTaskAsync(appTask);
                //if (result.IsCompleted)
                //{
                //TaskViewModel roleVM = await GetRoleViewModelHelper(appRole.Name);
                //return CreatedAtAction(GetRoleByIdActionName, new { id = roleVM.Id }, roleVM);
                //}
                return NoContent();
                //AddErrors(result.Item2);
            }

            return BadRequest(ModelState);
        }
    }
}