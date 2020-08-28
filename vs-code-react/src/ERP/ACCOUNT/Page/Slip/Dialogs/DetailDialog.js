import React, { useState, useEffect } from 'react';

import {useDispatch, useSelector} from "react-redux";
import * as types from 'ERP/ACCOUNT/ActionType/ActionType';

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const DetailDialog = ({ onClose, open }) => {

    const data = useSelector(({AccReducer}) => AccReducer.journalDetailList.journalDetailList , []);
    
    const dispatch = useDispatch();

    //========================== 그리드 객체 준비 ==========================
    const [gridApi, setGridApi] = useState();

    const classes = useStyles();

    //========================== 그리드내용 ==========================
    const accountColumnDefs = [
        { headerName: "계정 설정 속성", field: "accountControlType",width:150,sortable: true},
        { headerName: "분개상세번호", field: "journalDetailNo", width: 230 },
        { headerName: "코드", field: "accountControlCode", width: 100 },
        { headerName: "분개상세항목", field: "accountControlName", width: 130 },
        { headerName: "분개상세내용", field: "journalDescription", width: 100 },
    ];


    return (
        <>
            <AppBar position="relative" className={classes.subCategory}>
                <Toolbar>
                    <Typography variant="h5">분개상세</Typography>
                </Toolbar>
            </AppBar>
            <div
                className={"ag-theme-balham"}
                style={{
                    height: "200px",
                    width: "100%",
                    paddingTop: "20px"
                    }}>
                <AgGridReact
                    columnDefs={accountColumnDefs}
                    rowData={data}   // 그리드에 data 뿌림.
                />
            </div>
        </>
    );
};
const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(1),
        height: 330,
        width: 1190
    },
    subCategory: {
        background: "#232f3e",
        color: "white"
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));
export default DetailDialog;