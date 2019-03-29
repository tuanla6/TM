using AutoMapper;
using TaskManagement.ViewModels;
using TM.Data.Models;

namespace TaskManagement
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<TaskViewModel, TaskInfo>().ForMember(t=>t.CreatedBy,i=>i.Ignore())
                .ForMember(t=>t.CreatedDate,i=>i.Ignore())
                .ForMember(t=>t.UpdatedBy,i=>i.Ignore())
                .ForMember(t=>t.UpdatedDate, i=>i.Ignore())
                .ForMember(t=>t.Status, i=>i.Ignore());
        }
    }
}
