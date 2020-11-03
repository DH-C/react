package kr.co.seoulit.erp.logi.logistics.purchase.applicationService;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import kr.co.seoulit.erp.logi.logistics.purchase.dao.StockDAO;
import kr.co.seoulit.erp.logi.logistics.purchase.to.StockLogTO;
import kr.co.seoulit.erp.logi.logistics.purchase.to.StockTO;

@Component
public class StockApplicationServiceImpl implements StockApplicationService{

		@Autowired
		private StockDAO stockDAO;


		@Override
		public ArrayList<StockTO> getStockList() {

			return stockDAO.selectStockList();
		}
	
		@Override
		public ArrayList<StockLogTO> getStockLogList(String startDate,String endDate) {

			HashMap<String,String> param = new HashMap<>(); 
			param.put("startDate",startDate);
			param.put("endDate",endDate);

			return stockDAO.selectStockLogList(param);
		}

		@Override
		public HashMap<String,Object> warehousing(ArrayList<String> orderNoArr) {
			
            HashMap<String,Object> resultMap = new HashMap<>();
				
				String orderNoList = orderNoArr.toString().replace("[", "").replace("]", "");			
				resultMap.put("orderNoList",orderNoList);
				stockDAO.warehousing(resultMap);

        	return resultMap;
			
		}
		
}
