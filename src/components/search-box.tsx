import {Box, Button, createStyles, Input, Stack, Title} from "@mantine/core";
import React, {useState} from "react";

interface ISearchBoxProps {
  handleSearchAction: (q: string) => void,
  initialValue: string,
}


const useStyles = createStyles((theme) => ({
  container: {
    width: '100%'
  },
  form: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gap: '16px',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

export function SearchBox({handleSearchAction, initialValue}: ISearchBoxProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { classes } = useStyles();

    return (
      <Stack className={classes.container}>
        <Title order={1}>Search for any track here...</Title>

        <form onSubmit={() => handleSearchAction(searchQuery)} className={classes.form}>
          <Box>
            <Input
              size='xl'
              placeholder="Type your query ..."
              defaultValue={initialValue}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Box>

          <Button size='xl' type='submit' disabled={!searchQuery} onClick={() => handleSearchAction(searchQuery)}>
            Search
          </Button>
        </form>
      </Stack>
  );
}
