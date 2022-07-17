import { useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";

function Tabs({ links, components }) {
  const [activeTab, setActiveTab] = useState("0");

  return (
    <div>
      <Nav tabs>
        {links.length > 0 &&
          links.map((link, i) => (
            <NavItem
              key={i.toString()}
              style={{
                cursor: "pointer",
                background: "red !important",
                backgroundColor: "red !important",
              }}
            >
              <NavLink
                className={classnames({ active: activeTab === i.toString() })}
                onClick={() => setActiveTab(i.toString())}
              >
                {link.label}
              </NavLink>
            </NavItem>
          ))}
      </Nav>
      <TabContent activeTab={activeTab}>
        {components.length > 0 &&
          components.map((c, i) => (
            <TabPane key={i.toString()} tabId={i.toString()}>
              {c}
            </TabPane>
          ))}
      </TabContent>
    </div>
  );
}

export default Tabs;
