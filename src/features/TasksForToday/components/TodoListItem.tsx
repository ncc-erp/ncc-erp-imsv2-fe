import * as React from 'react';
import { styled } from '@mui/system';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

export interface ITodoListItemProps {
  fieldNames?: {
    title: string,
    value: string
  },
  showListTitle?: boolean,
  listTitle?: string, 
  items: {[key: string]: string | number}[]
}

const CustomListSubheader = styled(ListSubheader)({
  padding: 0
});

const CustomLisItem = styled(ListItem)(({
  padding: 0
}));

const CustomListItemIcon = styled(ListItemIcon)(({theme}) => ({
  marginRight: theme.spacing(1)
}));

export const TodoListItem = ({showListTitle = false, listTitle, fieldNames, items}: ITodoListItemProps) => {
  return (
    <List
      sx={{ width: '100%' }}
      subheader={showListTitle ? <CustomListSubheader>{ listTitle }</CustomListSubheader> : null}
    >
      {items.map(item => <CustomLisItem key={item.id}>
        <CustomListItemIcon>
          {item[fieldNames?.value || 'state' as keyof typeof item] ? <CheckBoxIcon sx={{color: 'green'}} /> : <CheckBoxOutlineBlankIcon /> }
        </CustomListItemIcon>
        <ListItemText primary={item[fieldNames?.title || 'title' as keyof typeof item]} />
      </CustomLisItem>) 
      }
    </List>
  );
}