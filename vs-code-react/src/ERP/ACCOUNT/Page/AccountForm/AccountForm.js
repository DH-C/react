//********************************** 2020-08-26 정대현 추가 **********************************
import React, { useState } from 'react';
import { Paper } from '@material-ui/core';
import AccountTreeView from './AccountTreeView';
import AccountGrid from './AccountGrid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(30),
      height: theme.spacing(100),
    },
  },
}));

const AccountForm = () => {
  const classes = useStyles();

  const [accountInfo, setAccountInfo] = useState('');
  return (
    <>
    <h1>계정과목</h1>
    <AccountGrid accountInfo={accountInfo} />
    <span className={classes.root}>
      <Paper elevation={3}>
        <AccountTreeView setAccountInfo={setAccountInfo} />
      </Paper>
    </span>
    </>
  );
}

export default AccountForm; 
