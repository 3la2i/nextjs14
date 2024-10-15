"use client";
import React, { useState } from "react";
import { Home, Settings, User, Mail, ChevronRight } from "lucide-react";
import { UserDashboard } from "../admincomponents/users";
import { ProductsPage } from "../admincomponents/addproduct";
import { ContactUsDashboard } from "../admincomponents/contactus";
import { Transaction } from "../admincomponents/transaction";

const Layout = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isExpanded, setIsExpanded] = useState(true);

  const tabs = [
    { id: "home", name: "Users", icon: User, component: UserDashboard },
    { id: "profile", name: "Products", icon: Settings, component: ProductsPage },
    { id: "requests", name: "Contacts", icon: Mail, component: ContactUsDashboard },
    { id: "transaction", name: "Transaction", icon: Home, component: Transaction },
  ];

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component || UserDashboard;

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div
        className={`bg-green-600 text-white transition-all duration-300 ease-in-out ${
          isExpanded ? "w-64" : "w-20"
        }`}
      >
        <div className="p-5 flex items-center justify-between">
          <h1 className={`text-2xl font-bold ${!isExpanded && "hidden"}`}>My App</h1>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-full hover:bg-green-700 transition-colors duration-200"
          >
            <ChevronRight
              className={`transform transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
        <nav>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center w-full p-4 transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-green-700 border-l-4 border-white"
                  : "hover:bg-green-500"
              }`}
            >
              <tab.icon className={`w-6 h-6 ${isExpanded ? "mr-4" : "mx-auto"}`} />
              <span className={`${!isExpanded && "hidden"}`}>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-auto p-8">
        <ActiveComponent />
      </div>
    </div>
  );
};

export default Layout;