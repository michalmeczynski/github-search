import { TextField, styled } from "@mui/material";
import MUICardContent from "@mui/material/CardContent";
import { FC } from "react";

import { Avatar } from "../../common/avatar/avatar.component";
import { Box } from "../../common/box/box.component";
import { Card } from "../../common/card/card.component";
import { Container as BaseContainer } from "../../common/container/container.component";
import { InfiniteList } from "../../common/list/infinite/infinite-list.component";
import { Typography } from "../../common/typography/typography.component";
import { UserSearchViewModel, useUserSearchComponent } from "./user-search-component.hook";

export const UserSearch: FC = () => {
  const { form, list } = useUserSearchComponent();

  return (
    <Container>
      <TextField
        {...form.query.register}
        fullWidth
        error={form.query.isError}
        helperText={form.query.errorMessage}
        placeholder={form.query.placeholder}
        variant="outlined"
      />
      <Box width={"100%"}>
        <InfiniteList<UserSearchViewModel.ListItem>
          renderItem={({ avatarUrl, login }) => (
            <Card key={login}>
              <CardContent>
                <Avatar alt={login} src={avatarUrl} />
                <Typography>{login}</Typography>
              </CardContent>
            </Card>
          )}
          canLoadMore={list.canLoadMore}
          items={list.items}
          loadingStatus={list.loadingStatus}
          onLoadMore={list.onLoadMore}
        />
      </Box>
    </Container>
  );
};

const Container = styled(BaseContainer)(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1)
  };
});

const CardContent = styled(MUICardContent)(({ theme }) => {
  return {
    ":last-child": {
      paddingBottom: theme.spacing(3)
    },
    alignItems: "center",
    display: "flex",
    gap: theme.spacing(3),
    padding: theme.spacing(3)
  };
});
