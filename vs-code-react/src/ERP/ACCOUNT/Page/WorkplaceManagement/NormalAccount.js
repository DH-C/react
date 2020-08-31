import React, { useEffect, useState } from 'react';
import { AgGridReact } from "ag-grid-react";

import useStyles from "ERP/ACCOUNT/Page/AccountLedger/Theme"; //계정별원장에서 css 땡겨씀

import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import * as types from 'ERP/ACCOUNT/ActionType/ActionType';

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import ThreeSixtyIcon from '@material-ui/icons/ThreeSixty';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import Icon from '@material-ui/core/Icon';
import { Button } from "@material-ui/core";

//=============================== 2020-08-31 거래처관리 조편백 ======================================
const NormalAccount = () => {

    const classes = useStyles(); //스타일적용    
    const [data, setData] = useState(null); //useEffect 로 조회한 결과값 받는 상태 값 
    const [positionGridApi, setPositionGridApi] = useState(null); // 바뀌는 상태 값을 관리함
    const dispatch = useDispatch(); //Redux 저장소에서 있는 함수를 데리고옴 
    //const date = useSelector(({AccReducer})=>AccReducer.deleteNormalAccountList,[]); //store 에 저장된 state 를 가져옴 


    //===================== useEffect로 비동기적으로 동작  ====================

    //컴포넌트가 마운트 됐을 때 호출됨 
    useEffect(() => {
        NormalAccountList() // 함수호출 
    }, []);

    function NormalAccountList() {
        axios.get("http://localhost:8282/acc/base/getCustomerList")
            .then(response => {
                console.log("리스펀스 : ", response);
                setData(response.data); // 받아온 데이터 set  
            }).catch(e => { console.log(e); });
    }

    //=============================== ag_grid 시작 ======================================

    const NormalAccountGrid = [
        // 칼럼정의
        { checkboxSelection: true, width: "100", rowSelection: 'multiple' },
        { headerName: "거래처 코드", field: "customerCode", sortable: true, editable: true, width: "240", }, // sortable 컬럼눌러서 오름차순내림차순 가능 
        { headerName: "거래처명", field: "customerName", editable: true, width: "240", },
        { headerName: "거래처 전화번호", field: "customerTelNumber", editable: true, width: "240", },
        { headerName: "사업자번호 ", field: "businessLicenseNumber", editable: true, width: "240", },
        { headerName: "종목", field: "customerBusinessConditions", editable: true, width: "240", },
        { headerName: "유형", field: "customerBusinessItems", editable: true, width: "240", },
        { headerName: "상태", field: "status",/* hide: true,*/ width: "240", value: "update" },
    ];
    /* 
     customerCode; 거래처코드 /  workplaceCode; 사업장코드 /  customerName; 거래처명 /  customerType; 거래처유형 /  customerCeo; 대표자 /  businessLicenseNumber; 사업자등록번호
     / socialSecurityNumber; 주민등록번호 / customerBusinessConditions; 업태 / customerBusinessItems; 종목 / customerZipCode; 거래처우편번호 / customerBasicAddress; 거래처기본주소
     customerDetailAddress; 거래처세부주소 / customerTelNumber; 거래처전화번호 / customerFaxNumber; 거래처팩스번호 / customerNote; 비고 / accountNumber; 계좌번호 /  cardNumber; 카드번호
     cardType; 카드구분 / cardMemberName; 카드회원명 / cardOpenPlace; 카드가맹점번호 / financialInstituteCode; 금융기관코드 / financialInstituteName; 금융기관명
     */


    //=================================================== ag Grid 초기화 시 실행 =========================================
    const onGridReady = params => {
        setPositionGridApi(params.api); //추가 수정 삭제 버튼누를때 그리드 값 사용하려고 할당함


        params.api.sizeColumnsToFit();   // 칼럼 사이즈 자동조절

    };

    //=================================================== 추가 ========================================================

    const addBtn = () => {
        const newItem = NewRowData(); //새로운 row를 변수에담음 
        positionGridApi.updateRowData({ add: [newItem], addIndex: "" });// ag그리드 api로 그리드에 add 함 
    }

    //추가할 컬럼 선언
    const NewRowData = () => {
        let newData = {
            customerCode: `PTN-`,
            customerName: '',
            customerTelNumber: '',
            businessLicenseNumber: '',
            customerBusinessConditions: '',
            customerBusinessItems: '',
            status: 'insert'
        };
        return newData;
    };

    //=============================================== 수정 ============================================================

    ////편집 허용인 칼럼을 더블 클릭할 때 발생하는 이벤트. 
    const rowCellChanged = e => {
        if (e.data.status === "insert") {
            return;
        } else {
            e.data.status = 'update';
        }
    }

    //=============================================== 삭제 ============================================================

    //체크박스에 체크된 row만 삭제 
    const deleteBtn = () => {
        const selectedData = positionGridApi.getSelectedRows(); //선택한 row 



        if (selectedData.length === 0) {   // 선택된게 없으면.
            alert('삭제할 Row를 선택해주세요.');
            return;
        } //if (!window.confirm(selectedData[0].customerName + " 거래처 정보를 삭제 하시겠습니까 ? ")) {alert(" 취소되었습니다. ");return;} 
        else {

            delete selectedData[0].errorCode
            delete selectedData[0].errorMsg
            delete selectedData[0].chk
            selectedData[0].status = 'delete';

            dispatch({ type: types.DELETE_NORMAL_ACCOUNT_REQUEST, params: { deletCustomerCode: selectedData[0].customerCode, deletCustomerName: selectedData[0].customerName } });

        }
        //positionGridApi.updateRowData({ remove: selectedData });   // 선택된 row 삭제    
        //alert("삭제완료");
    };

    //=============================================== 저장 ============================================================
    const saveBtn = () => {

        positionGridApi.selectAll(); // 그리드 전체 값  
        const rows = positionGridApi.getSelectedRows(); // 그리드의 모든 값을 반환
        const rowsCount = positionGridApi.getDisplayedRowCount(); // 표시된 총 행 수를 반환

        for (var i = 0; i < rowsCount; i++) {
            delete rows[i].errorCode
            delete rows[i].errorMsg
            delete rows[i].chk
        } if (!window.confirm(" 저장하시겠습니까 ? ")) {
            alert("💙 취소되었습니다 💙");
            return;
        } else {


            /* 저장 간다  */
            alert("💚 저장완료 💚");
            console.log(rows);
        }
    };

    return <>
        <br />
        <div align="center" className={classes.root3}>
            <Button variant="contained" color="primary" onClick={addBtn} startIcon={<Icon className="fa fa-plus-circle" />}>추가</Button>
            <Button variant="contained" color="primary" onClick={deleteBtn} startIcon={<DeleteOutlinedIcon />}>삭제</Button>
            <Button variant="contained" color="primary" onClick={saveBtn} startIcon={<ThreeSixtyIcon />}>저장</Button>
        </div>
        <br />
        <br />
        <div
            className={"ag-theme-material"}
            enableSorting="true"
            enableFilter="true"
            enableRangeSelection="true"
            suppressHorizontalScroll="false"
            style={{
                height: "550px",
                width: "100%",
                paddingTop: "20px",
                float: "center",
            }}
        ><AgGridReact
                columnDefs={NormalAccountGrid} //정의된 컬럼 
                rowData={data} //Reduce에서 받아온 데이터 
                rowSelection="multiple"
                onGridReady={onGridReady}
                getRowStyle={function (param) { return { "text-align": "center" }; }} //body 가운데 정렬
                onCellEditingStarted={rowCellChanged} //편집 허용인 칼럼을 더블 클릭할 때 발생하는 이벤트. 
            />
        </div>
    </>
}

export default NormalAccount;








