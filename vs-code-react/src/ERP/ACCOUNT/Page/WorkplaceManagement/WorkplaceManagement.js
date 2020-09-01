import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tab, Toolbar, Typography, Box } from '@material-ui/core';
import TabContext from '@material-ui/lab/TabContext';
import { TabList, TabPanel } from '@material-ui/lab';
import NormalAccount from "ERP/ACCOUNT/Page/WorkplaceManagement/NormalAccount";
import FinanceAccount from "ERP/ACCOUNT/Page/WorkplaceManagement/FinanceAccount";
import CreditCard from "ERP/ACCOUNT/Page/WorkplaceManagement/CreditCard";

//=============================== 2020-09-01 거래처관리 조편백 ======================================
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        //backgroundColor: theme.palette.background.paper,
        backgroundColor: "#EBF7FF",
        width: '100%',
        height: '830px'
    },
}));

export default function WorkplaceManagement() {
    const classes = useStyles();
    const [value, setValue] = React.useState('2');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <div className={classes.root}>
                <Box className={classes.root}>
                    <div><AppBar position="sticky">
                        <Toolbar>
                            <Typography component="h1" variant="h3">
                                거래처 관리
          </Typography>
                        </Toolbar>
                    </AppBar ></div>
                    <TabContext value={value}>
                        <AppBar position="static">
                            <TabList onChange={handleChange} aria-label="simple tabs example" centered  >
                                <Tab label=" 일반 거래처 " value="1" />
                                <Tab label=" 금융 거래처 " value="2" />
                                <Tab label=" 신용카드 " value="3" />
                            </TabList>
                        </AppBar>
                        <TabPanel value="1"><NormalAccount /></TabPanel>
                        <TabPanel value="2"><FinanceAccount /></TabPanel>
                        <TabPanel value="3"><CreditCard /></TabPanel>
                    </TabContext>
                </Box>
            </div>
        </>
    );
}