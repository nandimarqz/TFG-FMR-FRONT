import { createBrowserRouter } from 'react-router-dom';
import './App.css';
import ErrorPage from './components/ErrorPage';
import { RouterProvider } from 'react-router-dom';
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import TableView from './views/TableView';
import CreateIncidenceView from './views/CreateIncidenceView';
import ChangePasswordView from './views/ChangePasswordView';
import UserTableView from './views/UserTableView';
import EditUserView from './views/EditUsersView';
import IncidenceDetailView from './views/IncidenceDetailView';
import EditIncidenceView from './views/EditIncidenceView';
import CreateUserView from './views/CreateUserView';
import UploadUserView from './views/UploadUsersView';
import UploadStudentView from './views/UploadStudentView';
import UploadSubjectCourseView from './views/UploadSubjectCourseView';
import CreateReviewView from './views/CreateReviewView';
import TableReviewView from './views/TableReviewView';
import ReviewStudentView from './views/ReviewStudentsView';
import AllUserReviewView from './views/AllUserReviewView';
import CreateStudentView from './views/CreateStudentView';


const router = createBrowserRouter(
  [
    {
      path:"/",
      element:<HomeView/>,
      errorElement:<ErrorPage/>
    },
    {
      path:"log-in",
      element:<LoginView/>,
      errorElement:<ErrorPage/>
    },
    {
      path:"incidence",
      element:<TableView/>,
      errorElement:<ErrorPage/>
    },
    // {
    //   path:"incidence/create",
    //   element:<CreateIncidenceView/>,
    //   errorElement:<ErrorPage/>
    // },
    {
      path:"changePassword",
      element:<ChangePasswordView/>,
      errorElement:<ErrorPage/>
    },
    {
      path:"users",
      element:<UserTableView/>,
      errorElement:<ErrorPage/>
    },
    {
      path:"/edit/user/:idUsuario",
      element:<EditUserView/>,
      errorElement:<ErrorPage/>
    },
    {
      path:"/edit/user",
      element:<EditUserView/>,
      errorElement:<ErrorPage/>
    },
    {
      path:"incidence/view",
      element:<IncidenceDetailView/>,
      errorElement:<ErrorPage/>
    },
    {
      path:"incidence/view/:incidenceId",
      element:<IncidenceDetailView/>,
      errorElement:<ErrorPage/>
    },
    {
      path:"incidence/edit/view",
      element:<EditIncidenceView/>,
      errorElement:<ErrorPage/>
    },
    {
      path:"incidence/edit/view/:incidenceId",
      element:<EditIncidenceView/>,
      errorElement:<ErrorPage/>
    },
    {
      path:"user/create",
      element:<CreateUserView/>,
      errorElement:<ErrorPage/>
    },
    {
      path:"upload/users",
      element:<UploadUserView/>,
      errorElement:<ErrorPage/>
    },
    {
      path:"upload/student",
      element:<UploadStudentView/>,
      errorElement:<ErrorPage/>
    },
    {
      path:"upload/subjects-course",
      element:<UploadSubjectCourseView/>,
      errorElement:<ErrorPage/>
    },
    {
      path:"review",
      element:<CreateReviewView/>,
      errorElement:<ErrorPage/>
    },
    {
      path:"reviews/table",
      element:<TableReviewView/>,
      errorElement:<ErrorPage/>
    },
    {
      path:"reviews/users/table/:subject/:user/:stage/:unity",
      element:<ReviewStudentView/>,
      errorElement:<ErrorPage/>
    },
    {
      path:"review/student/table/",
      element:<AllUserReviewView/>,
      errorElement:<ErrorPage/>
    },
    {
      path:"create/student/",
      element:<CreateStudentView/>,
      errorElement:<ErrorPage/>
    },
  ]
)

function App() {
  return (
   
    <RouterProvider router={router}/>
    
  );
}

export default App;
