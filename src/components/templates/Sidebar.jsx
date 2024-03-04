import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import PropTypes from "prop-types";

function Sidebar({ categories }) {
  return (
    <Box>
      <List
        className="text-gray-500"
        subheader={
          <ListSubheader className="mr-4 text-[16px] font-bold">
            دسته بندی ها
          </ListSubheader>
        }
      >
        {categories.map((category) => (
          <SidebarItem key={category._id} {...category} />
        ))}
      </List>
    </Box>
  );
}

function SidebarItem({ name, icon }) {
  return (
    <ListItem className="cursor-pointer">
      <ListItemIcon className="-ml-3 text-gray-500">
        <img src={`${icon || "vite"}.svg`} alt="category_icon" />
      </ListItemIcon>
      <ListItemText primary={name} />
    </ListItem>
  );
}
Sidebar.propTypes = {
  categories: PropTypes.arrayOf(SidebarItem),
};
SidebarItem.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export { Sidebar };
