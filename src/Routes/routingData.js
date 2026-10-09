// all routing related data like rendering components and their paths sits here in this file
import {
  AddEditUsers,
  CreateEditRole,
  NotFound,
  UserReports,
} from "../Container";
import { 
  SecurityAdminLinks,
} from "./Links";
const SecurityAdminRouteData = [
  { component: AddEditUsers, path: "SecurityAdmin/AddEditUsers" },
  { component: CreateEditRole, path: "SecurityAdmin/CreateEditRoles" },
  { component: UserReports, path: "SecurityAdmin/UserReports" },
  // { component: NotFound, path: "*" },
]
const UserSelection = (token,role)=>{
  let Title = ''
  let UserRoleId = ''
  let SidebarData = ''
  let MainMenu = ''
  let Notification = ''
  if(token && role===1){
    Title ="Admin Dashboard"
    UserRoleId = role
    SidebarData = SecurityAdminLinks
    MainMenu = SecurityAdminRouteData
    Notification = null;
    Notification = true;
  }
  return{
    Title,
    UserRoleId,
    SidebarData,
    MainMenu,
    Notification
  }
}
export {
  UserSelection
}