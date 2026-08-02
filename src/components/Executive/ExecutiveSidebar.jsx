import { useState } from "react";
import "./ExecutiveCss/ExecutiveSidebar.css";

function ExecutiveSidebar({

    selectedMenu,

    setSelectedMenu

}) {

    const [collapsed, setCollapsed] = useState(false);

    return (

        <div className={`executive-sidebar ${collapsed ? "collapsed" : ""}`}>

            <div className="sidebar-header">

                <button
                    className="collapse-btn"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <i className="bi bi-list"></i>
                </button>

                {!collapsed &&

                    <h3>FastX</h3>

                }

            </div>

            <ul className="sidebar-menu">

                <li
                    onClick={() => setSelectedMenu("dashboard")}
                    className={selectedMenu === "dashboard" ? "active-menu" : ""}
                >

                    <i className="bi bi-grid-fill"></i>

                    {!collapsed && <span>Dashboard</span>}

                </li>

                <li
                    onClick={() => setSelectedMenu("applications")}
                    className={selectedMenu === "applications" ? "active-menu" : ""}
                >

                    <i className="bi bi-file-earmark-text-fill"></i>

                    {!collapsed && <span>Applications</span>}

                </li>

                <li
                    onClick={() => setSelectedMenu("operators")}
                    className={selectedMenu === "operators" ? "active-menu" : ""}
                >

                    <i className="bi bi-buildings-fill"></i>

                    {!collapsed && <span>Bus Operators</span>}

                </li>

                <li
                    onClick={() => setSelectedMenu("amenities")}
                    className={selectedMenu === "amenities" ? "active-menu" : ""}
                >

                    <i className="bi bi-stars"></i>

                    {!collapsed && <span>Amenities</span>}

                </li>

                <li
                    onClick={() => setSelectedMenu("routes")}
                    className={selectedMenu === "routes" ? "active-menu" : ""}
                >

                    <i className="bi bi-signpost-fill"></i>

                    {!collapsed && <span>Routes</span>}

                </li>
                <li
                    onClick={() => setSelectedMenu("passengers")}
                    className={selectedMenu === "passengers" ? "active-menu" : ""}
                >

                    <i className="bi bi-people-fill"></i>

                    {!collapsed && <span>Passengers</span>}

                </li>

                <li
                    onClick={() => setSelectedMenu("reports")}
                    className={selectedMenu === "reports" ? "active-menu" : ""}
                >

                    <i className="bi bi-bar-chart-fill"></i>

                    {!collapsed && <span>Reports</span>}

                </li>

            </ul>

        </div>

    );

}

export default ExecutiveSidebar;