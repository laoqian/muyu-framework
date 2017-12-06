package muyu.system.service;

import muyu.system.common.beans.ResultBean;
import muyu.system.common.service.CrudService;
import muyu.system.dao.AttachDao;
import muyu.system.entity.Attach;
import muyu.system.utils.ExtendUtils;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Date;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017-12-06 09:08:40
 * @version: 1.0.0
 */

@Service
@Transactional
public class AttachService extends CrudService<AttachDao,Attach>{
    @Value("${filePath}")
    String filePath;

    public ResultBean<Attach> upload(MultipartFile file){
        String fileName,extendName,name=file.getOriginalFilename();
        String now = DateFormatUtils.format(new Date(),"yyyyMMddHHmmss");
        extendName = ExtendUtils.getFileExtension(name);
        if(extendName!=null){
            fileName = name.substring(0,name.lastIndexOf("."));
            fileName = fileName+"_"+now+"."+extendName;
        }else{
            fileName = name+"_"+now;
        }

        File attachFile = new File(this.filePath+fileName);
        try {
            file.transferTo(attachFile);
        } catch (IOException e) {
            return new ResultBean("附件保存失败,路径不正确！",false);
        }

        Attach attach = new Attach(fileName,file.getSize(),fileName);
        attach.setOriginName(name);
        attach.setExtendName(extendName==null?"none":extendName);
        super.save(attach);

        return new ResultBean(attach);
    }
}
