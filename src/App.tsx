import {Navigate, Route, Routes} from "react-router-dom";
import { ThemeProvider } from "./ThemeProvider";
import {AppLayout} from "./layout/app.layout";
import {Home} from "./pages/home";
import React from "react";
import {ArtistDetails} from "./pages/artist-details";

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route
            index
            element={<Home />}
          />
          <Route
            path='/artist/:id'
            element={<ArtistDetails />}
          />
        </Route>

        {/*<Route path="*" element={<Navigate to={`/`} replace />} />*/}
      </Routes>
    </ThemeProvider>
  );
}
