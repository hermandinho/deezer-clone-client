/* eslint-disable @typescript-eslint/naming-convention */
import {
  AppShell,
} from '@mantine/core';
import { Outlet } from 'react-router-dom';
import {useAppLayoutStyles} from "./app.layout.styles";

export const AppLayout = () => {
  const { classes } = useAppLayoutStyles();

  return (
    <AppShell
      className={classes.container}
    >
      <Outlet />
    </AppShell>
  );
};
