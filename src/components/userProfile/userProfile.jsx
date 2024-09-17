import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

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
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50">
          <img
            className="inline-block w-10 h-10 rounded-full"
            src="https://cdn-icons-png.flaticon.com/256/3135/3135715.png"
            alt="Dan_Abromov"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          {menuOptions.map((item) => (
            <MenuItem>
              <a
                href={item.href}
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              >
                {item.label}
              </a>
            </MenuItem>
          ))}
          <form action="#" method="POST">
            <MenuItem>
              <button
                type="submit"
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
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
