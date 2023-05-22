import {Card, createStyles, Image, Text} from "@mantine/core";
import {TrackModel} from "../models";
import {formatTime} from "../utils/functions";

interface ITrackItemProps {
  track: TrackModel;
}

const useStyles = createStyles((theme) => ({
  // xs: 539,
  // sm: 834,
  // md: 1194,
  // lg: 1366,
  // xl: 1440,

  album: {
    display: 'block',

    [`@media (max-width: 833px)`]: {
      display: 'none',
    },
  },
}));

export function TrackItem({track}: ITrackItemProps) {
  const { classes } = useStyles();
  return (
    <Card
      shadow="sm"
      padding="xl"
      component="a"
      href={`/artist/${track.artist.id}`}
    >
      <Card.Section>
        <Image
          src={track.album.cover}
          height={160}
          alt="Cover"
        />
      </Card.Section>

      <Text weight={500} size="lg" mt={0} lineClamp={1}>
        {track.title}
      </Text>

      <Text color='dimmed' size="sm" mt={0}>
        {formatTime(track.duration)}
      </Text>

      <Text color='dimmed' size="sm" mt={0} className={classes.album}>
        {track.album.title}
      </Text>

      {/*<Text mt="xs" color="dimmed" size="sm">
        Please click anywhere on this card to claim your reward, this is not a fraud, trust us
      </Text>*/}
    </Card>
  );
}
