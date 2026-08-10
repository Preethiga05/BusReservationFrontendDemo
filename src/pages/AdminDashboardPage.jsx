import AdminDashboard from "../components/Admin/AdminDashboard";
import Navbar from "../components/Navbar";


function AdminDashboardPage() {

    return (

        <>

            <Navbar dashboard={true} />

            <AdminDashboard />

        </>

    );

}


export default AdminDashboardPage;