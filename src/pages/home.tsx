import {Box, createStyles, Grid, Loader, Stack, Title} from '@mantine/core';
import React, {useCallback, useEffect, useState} from 'react';
import {useFetchTracks} from "../api/query/queries";
import {useLocation} from "react-router-dom";
import {TrackItem} from "../components/track-item";
import {SearchBox} from "../components/search-box";

const useTracksListStyles = createStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '&>.mantine-Stack-root': {
      width: '100%',
    }
    // height: '100vh',
  },

  searchZone: {
    backgroundColor: '#000',
    minHeight: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 1,
    padding: '16px',
    width: '100%',
  },

  grid: {
    // width: '100%',
  },

  summary: {
    marginTop: '3.35rem',
    display: 'flex',
    paddingLeft: '0.5rem',
  },
}));

export function Home() {
  const { classes } = useTracksListStyles();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { refetch, data, isFetching } = useFetchTracks(searchQuery);

  useEffect(() => {
    refetch();
  }, [searchQuery]);

  const handleSearchAction = useCallback((q: string) => {
    setSearchQuery(q);
  }, [setSearchQuery]);

  return (
    <Box className={classes.container}>
      <Stack p={24}>
        <Box>
          { isFetching && <Loader /> }
          { !isFetching &&
              <Stack>
                  <Box className={classes.searchZone}>
                      <SearchBox initialValue={searchQuery} handleSearchAction={handleSearchAction} />
                  </Box>
                  <Grid>
                    {(data?.data || [])?.map((track) => (
                      <Grid.Col span={2} key={track.id}>
                        <TrackItem key={track.id} track={track} />
                      </Grid.Col>
                    ))}
                  </Grid>
              </Stack>
          }
        </Box>
      </Stack>
    </Box>
  );
}
