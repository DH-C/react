package kr.co.seoulit.erp.hr.basicInfo.controller;

import java.util.ArrayList;
import java.util.HashMap;

import kr.co.seoulit.erp.hr.basicInfo.serviceFacade.CooperatorServiceFacade;

import kr.co.seoulit.erp.hr.basicInfo.to.FinancialAccountAssociatesTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/hr/basicInfo/*")
public class FinancialAccountAssociatesController  {

	@Autowired
	private CooperatorServiceFacade cooperatorSF;

	private ModelMap modelMap = new ModelMap();

	@RequestMapping(value="/searchFinancialAccountAssociatesList.do",method=RequestMethod.GET)
	public ModelMap searchFinancialAccountAssociatesList(@RequestParam String searchCondition, @RequestParam String workplaceCode) {

		ArrayList<FinancialAccountAssociatesTO> financialAccountAssociatesList = null;

		try {

			financialAccountAssociatesList = cooperatorSF.getFinancialAccountAssociatesList(searchCondition,
					workplaceCode);

			modelMap.put("gridRowJson", financialAccountAssociatesList);
			modelMap.put("errorCode", 1);
			modelMap.put("errorMsg", "성공");

		} catch (DataAccessException e2) {
			e2.printStackTrace();
			modelMap.put("errorCode", -2);
			modelMap.put("errorMsg", e2.getMessage());

		}
		return modelMap;
	}

	@RequestMapping(value="/batchCustomerListProcess.do",method=RequestMethod.POST)
	public ModelMap batchListProcess(@RequestBody ArrayList<FinancialAccountAssociatesTO> batchList) {


		try {

			HashMap<String, Object> resultMap = cooperatorSF
					.batchFinancialAccountAssociatesListProcess(batchList);

			modelMap.put("result", resultMap);
			modelMap.put("errorCode", 1);
			modelMap.put("errorMsg", "성공");

		} catch (DataAccessException e2) {
			e2.printStackTrace();
			modelMap.put("errorCode", -2);
			modelMap.put("errorMsg", e2.getMessage());

		}
		return modelMap;
	}

}
