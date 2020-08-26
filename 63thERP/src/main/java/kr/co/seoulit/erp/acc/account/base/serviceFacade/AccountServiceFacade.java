package kr.co.seoulit.erp.acc.account.base.serviceFacade;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import kr.co.seoulit.erp.acc.account.base.to.AccountBean;
import kr.co.seoulit.erp.acc.account.base.to.AccountCodeBean;
import kr.co.seoulit.erp.acc.account.base.to.AccountControlBean;

public interface AccountServiceFacade {

    public AccountBean getAccount(String code);

    public ArrayList<AccountBean> findParentAccountList();

    public ArrayList<AccountBean> findDetailAccountList(String code);

    public void updateAccount(AccountBean accountBean);

    ArrayList<AccountBean> getAccountListByName(String accountName);

    ArrayList<AccountControlBean> getAccountControlList(String accountCode);
    
    public String findPeriodNo(String toDay);

	public List<AccountCodeBean> getAccountList();

    //=====================================  2020-08-25 계정별 원장 조편백   시작 ====================================
    public HashMap<String,Object> getLedgerbyAccountInfo(String accountCode, String startDate, String endDate);
    //=====================================  2020-08-25 계정별 원장 조편백   끝 ====================================
}

