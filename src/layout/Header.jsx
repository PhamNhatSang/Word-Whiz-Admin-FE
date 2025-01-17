import React, { useRef } from "react";
import image from "../assets/Web capture_2-5-2024_91421_www.logoai.com.jpeg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import { Dialog } from "primereact/dialog";
import { TextField, Button } from "@mui/material";
import CreateDialog from "../components/CreateDialog.component";
import { Toast } from "primereact/toast";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axios";
export default function Header() {
  const [activeLink, setActiveLink] = useState("");
  const settings = [ "Logout"];
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [visible, setVisible] = useState(false);
  const [groupAddVisile, setGroupAddVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const { logout,user } = useAuth();
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const toast = useRef(null);

  const showSuccess = (Message) => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: Message,
      life: 3000,
    });
  };

  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Message Content",
      life: 3000,
    });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleOpenAddCourseDalog = () => {
    setVisible(true);
  };
  const handleOpenAddGroupDalog = () => {
    setGroupAddVisible(true);
  };

  const handleClose = () => {
    setAnchorEl(null);

  };

  const handleCloseCourse = () => {
    setVisible(false);
  }
  const handleCloseGroup = () => {
    setGroupAddVisible(false);
  }

  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);

  };

  const handleLogout = () => {
    setAnchorElUser(null);

    logout();
  };
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const handleAddCourse = async () => {
    setVisible(false);

    const data = {
      title,
      description,
    };
    try {
      await axiosInstance.post("/api/library/course", data);
      navigate("/library");
      window.location.reload();
      showSuccess("Add course success")

    } catch (error) {
      if (error.response.status === 401) logout();
      showError("Some thing went wrong");
    }
  };



  const handleAddGroup = async () => {
    setGroupAddVisible(false);

    const data = {
      groupName,
      groupDescription,
    };
    try {
      await axiosInstance.post("/api/group", data);
      navigate("/group");
      window.location.reload();
      showSuccess("Add Group success")

    } catch (error) {
      if (error.response.status === 401) logout();
      showError("Some thing went wrong");
    }
  };

  return (
    <header className="fixed top-0 w-full z-10">
                  <Toast ref={toast} />

      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800   shadow-bottom ">
        <div class="flex flex-wrap justify-between items-center  ">
          <div
            class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <a href="https://flowbite.com" class="flex items-center">
              <img src={image} class="mr-2 h-4 sm:h-8" alt="Flowbite Logo" />
            </a>

            <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <Link
                  to="/home"
                  onClick={() => handleLinkClick("home")}
                  className={`block py-2 pr-4 pl-3 ${
                    activeLink === "home" ? "text-blue-700" : "text-dark-700"
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/library"
                  onClick={() => handleLinkClick("libary")}
                  className={`block py-2 pr-4 pl-3 ${
                    activeLink === "libary" ? "text-blue-700" : "text-dark-700"
                  }`}
                >
                  Library
                </Link>
                {""}
              </li>
              <li>
                <Link
                  to="/group"
                  onClick={() => handleLinkClick("group")}
                  className={`block py-2 pr-4 pl-3 ${
                    activeLink === "group" ? "text-blue-700" : "text-dark-700"
                  }`}
                >
                  Group
                </Link>{" "}
              </li>
              <li>
                <Link
                  to="/ranking"
                  onClick={() => handleLinkClick("ranking")}
                  className={`block py-2 pr-4 pl-3 ${
                    activeLink === "ranking" ? "text-blue-700" : "text-dark-700"
                  }`}
                >
                  Ranking
                </Link>{" "}
              </li>
              <li>
                <Link
                  to="/community"
                  onClick={() => handleLinkClick("community")}
                  className={`block py-2 pr-4 pl-3 ${
                    activeLink === "community"
                      ? "text-blue-700"
                      : "text-dark-700"
                  }`}
                >
                  Community
                </Link>{" "}
              </li>
            </ul>
          </div>
          <div class="flex items-center lg:order-2">
            <div>
              <IconButton
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                color="primary"
                sx={{ width: 50, height: 50 }}
              >
                <AddCircleOutlinedIcon sx={{ width: 35, height: 35 }} />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>
                  <span onClick={handleOpenAddCourseDalog}>
                    {" "}
                    <PaymentsOutlinedIcon color="disabled"></PaymentsOutlinedIcon>{" "}
                    <span className="text-gray-500">Create course</span>
                  </span>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <span onClick={handleOpenAddGroupDalog}>
                    {" "}
                    <GroupOutlinedIcon color="disabled"></GroupOutlinedIcon>{" "}
                    <span className="text-gray-500">Create group</span>
                  </span>
                </MenuItem>
              </Menu>

              <CreateDialog
                visible={visible}
                setVisible={setVisible}
                header={"Create Course"}
                handleClose={handleCloseCourse}
              >
                <div className="py-3">
                  <TextField
                    id="title"
                    label="Title"
                    variant="standard"
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{ width: "70%" }}
                  />

                  <TextField
                    id="description"
                    label="Description"
                    variant="standard"
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{ width: "70%" }}
                  />
                  <div className="py-7">
                    <Button
                      variant="contained"
                      size="small"
                      onClick={async () =>{ await handleAddCourse()}}
                    >
                      Add Course
                    </Button>
                  </div>
                </div>
              </CreateDialog>
              <CreateDialog
                visible={groupAddVisile}
                setVisible={setGroupAddVisible}
                header={"Create Group"}
                handleClose={handleCloseGroup}
              >
                <div className="py-3">
                  <TextField
                    id="groupName"
                    label="Group Name"
                    variant="standard"
                    sx={{ width: "70%" }}
                    onChange={(e) => setGroupName(e.target.value)}
                  />

                  <TextField
                    id="description"
                    label="Description"
                    variant="standard"
                    sx={{ width: "70%" }}
                    onChange={(e) => setGroupDescription(e.target.value)}
                  />
                  <div className="py-7" onClick={async ()=>{await handleAddGroup()}}>
                    <Button variant="contained" size="small">
                      Add Group
                    </Button>
                  </div>
                </div>
              </CreateDialog>
            </div>
            <Box
              sx={{
                display: "flex",
                flexGrow: 0,
                flexDirection: "row",
                justifyContent: "space-between",
                width: 650,
              }}
            >
              <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 600,
                  borderRadius: 20,
                  backgroundColor: "#f6f7fb",
                }}
              >
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search Course"
                  inputProps={{ "aria-label": "search google maps" }}
                />
              </Paper>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={user?.avatar} />
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleLogout}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </div>
        </div>
      </nav>
    </header>
  );
}
