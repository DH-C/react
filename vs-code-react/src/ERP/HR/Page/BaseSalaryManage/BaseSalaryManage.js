//****************************************************2020-08-28 63기 손유찬 ********************************* **********************

import React, { useState, useEffect, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import Button from "@material-ui/core/Button";
import { FormControl,AppBar,Toolbar,Typography,} from "@material-ui/core";
import InputIcon from "@material-ui/icons/Input";

const BaseDeductionManage = () => {

    const [dataList, setDataList] = useState([]);
    const [data, setData] = useState("");
    const [gridEvent, setGridEvent] = useState();

    useEffect(() => {
        axios
            .get("http://localhost:8282/hr/salary/baseSalaryManage.do",)
            .then(response => {
                console.log("리스펀스 ", response);
                setDataList(response.data.baseSalaryList);
                console.log(dataList);
            })
            .catch(e => {
                console.log(e);
            });
    }, []);

//수정된 값을 담을 배열
let list = [];
let count = 0; 
//콘솔에 찍어보려고 선언한 count 
//그리드 수정이 끝난후 발생하는 이벤트의 콜백메서드
function CellEditingStopped(row) {
    row.data.status = "update"
    list.push(row.data);
    console.log("이건 로우 데이타");
  console.log(row.data);
  console.log("count = "+count);
  console.log(list[count].positionCode);
  console.log(list[count].positionName);
  console.log(list[count].hobongRatio);
  console.log(list[count].status); 
    count++;
};

//수정 버튼 이벤트
const updateOnClick = event => {

    if (list) {
        console.log("온셀로우 이벤트 " + list);
        axios.post(
            "http://localhost:8282/hr/salary/baseSalaryManage.do",
            {
              sendData : list
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            },

        );
        alert("성공적으로 수정 되었습니다.");

    } else 
        alert("수정 된 내역이 없습니다.");
    }
;


  //AG 그리드의 헤드
  const state = {
    columnDefs: [
      { headerName: "부서명", field: "deptName" },
      { headerName: "직급코드", field: "positionCode" },
      { headerName: "직급명", field: "positionName" },
      { headerName: "기본급", field: "baseSalary",editable:true},
      { headerName: "호봉인상율", field: "hobongRatio", editable:true},

    ],
    rowData: dataList,
  };
  

  return (
    console.log("콘솔임", dataList),
    (<div>
          <div>
          <AppBar position="relative">
            <Toolbar>
              <Typography variant="h5">급여기준관리</Typography>
            </Toolbar>
          </AppBar>
        </div>
        <div>
        <FormControl style={{ minWidth: "410px" }}></FormControl>
        <FormControl style={{ minWidth: "200px" }}></FormControl>
        </div>

        <br />
        
        <div
          className="ag-theme-balham"
          style={{
            height: "600px",
            width: "600px",
            textAlign:"center"
          }}
        >
         <AgGridReact
            columnDefs={state.columnDefs}
            rowData={state.rowData}
            onCellEditingStopped={CellEditingStopped}
            onGridReady={event => {
              event.api.sizeColumnsToFit();
              setGridEvent(event);
            }}
          ></AgGridReact>
          <br/>
        </div>
        <FormControl style={{ minWidth: "200px" }}/>
        <FormControl style={{ minWidth: "200px" }}>
           <Button
            variant="contained"  color="primary"  size="large" onClick={updateOnClick}  startIcon={<InputIcon />} >  수정
           </Button>
      </FormControl>
      </div>
      
    )
  );
};
export default BaseDeductionManage;

//**************************2020-08-28 63기 손유찬 ********************************* 