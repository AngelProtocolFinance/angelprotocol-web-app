import { useTheme } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { OverviewTab, CharityEndowmentInfo } from "./CharityInfoTab";
import { CharityInfoBalance } from "services/aws/endowments/types";
import { useState } from "react";

type Props = {
  endowmentBalanceData: CharityInfoBalance;
};

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function CharityInfoNav({ endowmentBalanceData }: Props) {
  const [value, setValue] = useState(1);
  const theme = useTheme();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const charityNav: CharityNavProps[] = [
    {
      title: "overview",
      disabled: false,
      component: <OverviewTab />,
    },
    {
      title: "endowment",
      disabled: false,
      component: <CharityEndowmentInfo data={endowmentBalanceData} />,
    },
    {
      title: "programs",
      disabled: true,
    },
    {
      title: "media",
      disabled: true,
    },
    {
      title: "governance",
      disabled: true,
    },
  ];
  return (
    <Box className="text-white overflow-y-hidden overflow-x-scroll scroll-hidden grid items-start justify-stretch lg:padded-container my-5 lg:mb-0 md:pl-0">
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        {charityNav.map((item, index) => (
          <Tab
            label={item.title}
            {...a11yProps(index)}
            key={index}
            disabled={item.disabled}
            sx={{ color: "white" }}
          />
        ))}
      </Tabs>
      {charityNav.map((navItem, index) => (
        <TabPanel value={value} index={index} dir={theme.direction} key={index}>
          {navItem.component}
        </TabPanel>
      ))}
    </Box>
  );
}

type CharityNavProps = {
  title: string;
  disabled: boolean;
  isDefault?: boolean;
  component?: any;
};
