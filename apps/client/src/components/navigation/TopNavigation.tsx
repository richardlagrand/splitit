"use client";

import * as React from "react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Main overview",
    href: "../Dashboard",
    description:
      "Keep a tab on all incoming and outgoing payments, expenses amd invoices of your different properties.",
  },
  {
    title: "Payments",
    href: "../Payments",
    description:
      "All of the tenant payments in one glance. A balance, all paid, and the ones that are due.",
  },
  {
    title: "Payouts",
    href: "../Payouts",
    description:
      "Check your balance in your account. Payouts are paid every rolling day after payment receipts.",
  },
];

export function TopNavigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <Icons.logo className="h-6 w-6" />
                    <div className="mb-2 mt-4 text-lg font-medium">Splitit</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Automated invoice splitting & handling for property
                      owners.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="../" title="Start here">
                Check out how you can benefit from Splitit as a property owner.
              </ListItem>
              <ListItem href="../Login" title="Login">
                Start splitting invoices and billing your tenants using one-off
                or automated periodic payments.
              </ListItem>
              <ListItem href="../Account" title="Account">
                Setup your rental rules upfront. Set and forget. We will handle
                all the hassle.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Dashboard</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="../login">
            {/* legacyBehavior passHref this was inhere before */}
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Login
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
export default TopNavigation;
