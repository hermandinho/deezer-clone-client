import {BackgroundImage, Box, Center, createStyles, Grid, List, Loader, Stack, Text, Title, Image} from '@mantine/core';
import React, {useEffect, useMemo, useState} from 'react';
import {useFetchArtist, useFetchArtistAlbums, useFetchArtistTopTracks} from "../api/query/queries";
import {useParams} from "react-router-dom";
import { Carousel } from '@mantine/carousel'
import {convertToKFormat, formatTime} from "../utils/functions";

const useStyles = createStyles((theme) => ({
  container: {
    // height: '100vh',
    padding: 0,
  },
  preview: {
    height: '50vh',
  },
  cover: {
    height: '100%',

    '.mantine-Grid-root': {
      height: '100%',

      '.mantine-Grid-col': {
        height: 'inherit',

        '.mantine-BackgroundImage-root': {
          height: 'inherit',
        }
      },
    },
  },
  descriptionContainer: {
    padding: '64px',
    '*': {
      color: 'white !important',
    }
  },

  list: {
    '.mantine-List-item': {
      padding: '8px 0',
      borderBottom: '1px solid',

      '.mantine-List-itemWrapper': {
        width: '90%',
        '&>span': {
          display: 'flex',
          justifyContent: 'space-between',
        }
      }
    },
  },
}));

export function ArtistDetails() {
  const { classes } = useStyles();
  const params = useParams();
  // const navigate = useNavigate();
  const [artistId, setArtistId] = useState<number>();
  const { refetch: refetchArtist, data: artist, isFetching: isFetchingArtist } = useFetchArtist(+params.id!);
  const { refetch: refetchTopTracks, data: topTracks, isFetching: isFetchingTopTracks } = useFetchArtistTopTracks(+params.id!);
  const { refetch: refetchAlbums, data: albums, isFetching: isFetchingAlbum } = useFetchArtistAlbums(+params.id!);

  const isBusy = useMemo(() => {
    return isFetchingArtist || isFetchingTopTracks || isFetchingAlbum;
  }, [isFetchingArtist, isFetchingTopTracks, isFetchingAlbum]);

  useEffect(() => {
    console.log(params);
   setArtistId(+params.id!);
  }, []);
  //
  useEffect(() => {
    Promise.all([refetchArtist(), refetchTopTracks(), refetchAlbums()])
  }, [artistId]);

  return (
    <Box className={classes.container}>
      <Stack p={16}>
        { isBusy && <Center><Loader /></Center> }
        { !isBusy && artist?.data && (
          <>
            <Box className={classes.preview}>
            <Box className={classes.cover}>
              <Grid>
                <Grid.Col span='auto'>
                  <BackgroundImage
                    src={artist?.data?.picture}
                    radius={0}
                  >
                    <Box className={classes.descriptionContainer}>
                      <Title order={2}>{artist.data.name}</Title>

                      <Text>{convertToKFormat(artist.data.nb_fan)} Fans</Text>
                    </Box>
                  </BackgroundImage>
                </Grid.Col>

                <Grid.Col span={4}>
                  <Title order={3} mb={5}>Top Tracks</Title>
                  <List type="ordered" className={classes.list}>
                    { (topTracks?.data || []).map((track) => (
                      <List.Item key={track.id}>
                        <span>{track.title}</span>
                        <span>{formatTime(track.duration)}</span>
                      </List.Item>
                    )) }
                  </List>
                </Grid.Col>
              </Grid>
            </Box>
          </Box>
            <Title order={3} mt={25}>Albums</Title>
            <Carousel
              slideSize="25%"
              slideGap="md"
              loop
              align="start"
              slidesToScroll={4}
            >
              { (albums?.data || []).map((album) => (
                <Carousel.Slide key={album.id}>
                  <Stack>
                    <Image src={album.cover} />
                    {album.title}
                    <small>{album.release_date?.split('-')[0]}</small>
                  </Stack>
                </Carousel.Slide>
              )) }
            </Carousel>
          </>
        )}
      </Stack>
    </Box>
  );
}
