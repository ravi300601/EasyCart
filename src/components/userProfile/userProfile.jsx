import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useContext } from "react";
import myContext from "../../context/data/myContext";

const menuOptions = [
  {
    label: "Profile",
    href: "#",
  },
  {
    label: "Orders",
    href: "/order",
  },
  {
    label: "Wishlist",
    href: "/wishlist",
  },
  {
    label: "Settings",
    href: "#",
  },
  {
    label: "Help",
    href: "#",
  },
];
export default function Dropdown() {
  const context = useContext(myContext);
  const { setLoading, mode } = context;

  const handleSignout = () => {
    localStorage.clear("user");
    setLoading(false);
    window.location.href = "/login";
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm">
          <img
            className="inline-block w-10 h-10 rounded-full"
            src="https://cdn-icons-png.flaticon.com/256/3135/3135715.png"
            alt="Dan_Abromov"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        style={{ backgroundColor: mode === "dark" ? "black" : "white", color: mode === "light" ? "white" : "black"}}
      >
        <div className="py-1">
          {menuOptions.map((item) => (
            <MenuItem
              key={item.id}
            >
              <a
                href={item.href}
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100/10 data-[focus]:text-gray-900"
                style={{ color: mode === "dark" ? "white" : ""}}
              >
                {item.label}
              </a>
            </MenuItem>
          ))}
          <form action={handleSignout}>
            <MenuItem>
              <button
                type="submit"
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100/10 data-[focus]:text-gray-900"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Sign out
              </button>
            </MenuItem>
          </form>
        </div>
      </MenuItems>
    </Menu>
  );
}
