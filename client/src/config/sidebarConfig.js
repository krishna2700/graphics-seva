const sidebarConfig = {
  Owner: [
    { name: "Dashboard", path: "/owner/home" },
    { name: "Create Albums", path: "/common/create-albums" },
    { name: "Create Projects", path: "/common/create-projects" },
    { name: "Admins Details", path: "/owner/admins-details" },
    { name: "Users Details", path: "/owner/users-details" },
    { name: "Download Requests", path: "/owner/download-requests" },
    { name: "Common Page", path: "/common" },
  ],
  Admin: [
    { name: "Dashboard", path: "/admin/home" },
    { name: "Common Page", path: "/common" },
  ],
  User: [
    { name: "Dashboard", path: "/user/home" },
    { name: "Common Page", path: "/common" },
  ],
};

export default sidebarConfig;
