package kr.co.seoulit.erp.acc.account.base.dao;
 
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
 
import kr.co.seoulit.erp.acc.account.base.to.CustomerBean;

//=====================================  2020-08-26 거래처관리 조편백  다오 생성 ====================================

	@Mapper
	public interface AccCustomerDAO {

	 List<CustomerBean> selectCustomerList(); //일반거래처 조회 

	void deleteNormalCustormer(String deletCustomerCode); //삭제 
	
}
