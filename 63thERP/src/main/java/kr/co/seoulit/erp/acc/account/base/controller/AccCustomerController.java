package kr.co.seoulit.erp.acc.account.base.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.seoulit.erp.acc.account.base.serviceFacade.AccountServiceFacade; 
import kr.co.seoulit.erp.acc.account.base.to.CustomerBean; 

@CrossOrigin("*")
@RestController
@RequestMapping("/acc/*")
public class AccCustomerController {
	
	//====================================== 2020-08-31 조편백 거래처 관리  컨트롤러 생성 =====================================
	
	  @Autowired
		private AccountServiceFacade accountServiceFacade;
	  
	  //일반 거래처 조회 
	   @RequestMapping(value="/base/getCustomerList")
		public List<CustomerBean> getCustomerList() {
					
			return accountServiceFacade.getCustomerList();
		}
	   
	   
	//일반거래처 삭제 
    @RequestMapping(value="/base/deleteNormalCustormer")  
	public void deleteNormalCustormer(@RequestParam String deletCustomerCode,@RequestParam String deletCustomerName) {
    	
		   System.out.println("  ::::::: 일반거래처 삭제   :::::::  "+deletCustomerCode);
		   System.out.println("  ::::::: 일반거래처 삭제   :::::::  "+deletCustomerName);
		   
		   accountServiceFacade.deleteNormalCustormer(deletCustomerCode,deletCustomerName);
		}
}
