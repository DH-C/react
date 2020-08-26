import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import {useDispatch, useSelector} from "react-redux";

import * as types from 'ERP/ACCOUNT/ActionType/ActionType';
import SearchButton from './SearchButton';

const useStyles = makeStyles({
  root: {
    height: 240,
    flexGrow: 2,
    maxWidth: 210,
  },
});

let treeData = {
  accountLevel : '',
  accountName : '',
  accountCode : '',
  accountCharacter : '',
  accountInnerCode : '',
  parentAccountInnerCode : '',
  leaf : '',
};

const AccountTreeview = () => {

  const dispatch = useDispatch();

  const getData = async e => {
    dispatch( { type : types.SEARCH_ACCOUNT_REQUEST, 
    });
  };

  const data = useSelector(({AccReducer}) => AccReducer.accountList , []);
  const classes = useStyles();
  

  const betaData = {
    accountLevel : '',
    accountName : '',
    accountCode : '',
    accountCharacter : '',
    accountInnerCode : '',
    parentAccountInnerCode : '',
    leaf : '',
  };

  data.filter((element,index) => {
    let innerData = {
      accountLevel : '',
      accountName : '',
      accountCode : '',
      accountCharacter : '',
      accountInnerCode : '',
      parentAccountInnerCode : '',
      leaf : '',};
    if(element.accountName=="특수계정과목"){
      return false;
    }
    if(element.accountLevel==="0"){
      treeData.accountLevel = element.accountLevel;
      treeData.accountName = element.accountName;
      treeData.accountCode = element.accountCode;
      treeData.accountCharacter = element.accountCharacter;
      treeData.accountInnerCode = element.accountInnerCode;
      treeData.parentAccountInnerCode = element.parentAccountInnerCode;
      treeData.leaf = element.leaf;
      treeData.children = [];
    }else{
      innerData.accountLevel = element.accountLevel;
      innerData.accountName = element.accountName;
      innerData.accountCode = element.accountCode;
      innerData.accountCharacter = element.accountCharacter;
      innerData.accountInnerCode = element.accountInnerCode;
      innerData.parentAccountInnerCode = element.parentAccountInnerCode;
      innerData.leaf = element.leaf;
    }
    
    if(element.leaf!=="1"){
      innerData.children = [];
    }

    if(element.accountLevel==="1"){
      treeData.children.push(innerData);
    }
    if(element.accountLevel==="2"){
      treeData.children.map((e) => {
        if(e.accountInnerCode===element.parentAccountInnerCode){
          e.children.push(innerData);
        }
      })
    }
  });

  console.log(treeData);

  const renderTree = (node) => (
    <TreeItem key={node.accountInnerCode} nodeId={node.accountInnerCode} label={node.accountName}>
      {Array.isArray(node.children) ? node.children.map((node) => renderTree(node)) : null}
    </TreeItem>
  );


  return (
    <>
      <SearchButton getData={getData} />
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
      {renderTree(treeData)}
      </TreeView>
    </>
  );
}

export default AccountTreeview; 
