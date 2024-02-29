import Box from "@mui/material/Box";
import type { ReactElement } from "react";
import ButtonBase from "@mui/material/ButtonBase";

interface ITab {
  label: string;
  content: ReactElement;
}

interface TabsPreOrderFoodProps {
  curentStepIndex: number;
  tabs: ITab[];
}

const TabsPreOrderFood = (props: TabsPreOrderFoodProps) => {
  const { curentStepIndex, tabs } = props;

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {tabs.map((tab, i) => (
          <ButtonBase
            key={i}
            disabled
            sx={(theme) => ({
              height: 50,
              width: 1,
              color: theme.palette.text.secondary,
              fontWeight: 600,
              transition: "font-size 0.2s,opacity 0.2s",
              transitionDelay: "0.1s",
              ...(curentStepIndex === i && {
                color: theme.palette.common.white,
                backgroundColor: theme.palette.primary.main,
                fontSize: 15,
              }),
            })}
          >
            {tab.label}
          </ButtonBase>
        ))}
      </Box>
    </>
  );
};

export default TabsPreOrderFood;
