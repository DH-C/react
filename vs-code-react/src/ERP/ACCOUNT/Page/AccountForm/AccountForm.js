//********************************** 2020-08-26 정대현 추가 **********************************
import React, { useState } from 'react';
import AccountTreeView from './AccountTreeView';
import AccountGrid from './AccountGrid';
import { AppBar, Typography, Toolbar, Tab } from "@material-ui/core";
import useStyles from "ERP/ACCOUNT/Page/AccountForm/Theme";


const AccountForm = () => {
  const classes = useStyles();

  const [accountInfo, setAccountInfo] = useState('');
  return (
 <div className="ui primary segment">
      <AppBar position="sticky">
        <Toolbar>
          <Typography component="h1" variant="h3">
            계정과목
          </Typography>
        </Toolbar>
      </AppBar>
      <br />
      <div>
        <div className="tab1">
          <AppBar className={classes.root}>
            <Tab className={classes.tab} label=" 계정과목 " />
            <br />
            <br />
            <AccountTreeView setAccountInfo={setAccountInfo} />
            <br />
          </AppBar>
        </div>
        <div className="tab2">
          <AppBar className={classes.root1}>
            <Tab className={classes.tab1} label=" 세부 계정과목 "></Tab>
            <AccountGrid accountInfo={accountInfo} />
          </AppBar>
        </div>
      </div>
    </div>
  );
}

export default AccountForm; 
