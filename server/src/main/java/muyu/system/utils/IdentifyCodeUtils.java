package muyu.system.utils;

import sun.misc.BASE64Encoder;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/11/13
 * @version: 1.0.0
 */
public class IdentifyCodeUtils {

    /**定义图片的WIDTH*/
    private final static int WIDTH = 90;

    /**定义图片的HEIGHT*/
    private final static int HEIGHT = 28;

    /**定义图片上显示验证码的个数*/
    private final static int CODE_COUNT = 4;
    private final static int XX = 15;
    private final static int FONT_HEIGHT = 24;
    private final static int CODE_Y = 24;

    /**干扰线数量*/
    private final static int LINE_NUM = 40;

    /**验证码字典*/
    private final static char[] CODE_SEQUENCE = { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
            'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W',
            'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' };

    public static Map<String, String> getCode(boolean onlyNumber) throws IOException {
        BufferedImage buffImg = new BufferedImage(WIDTH, HEIGHT,BufferedImage.TYPE_INT_RGB);
        Graphics gd = buffImg.getGraphics();
        // 创建一个随机数生成器类
        Random random = new Random();
        // 将图像填充为白色
        gd.setColor(Color.WHITE);
        gd.fillRect(0, 0, WIDTH, HEIGHT);

        // 创建字体，字体的大小应该根据图片的高度来定。
        Font font = new Font("Consolas", Font.BOLD, FONT_HEIGHT);
        // 设置字体。
        gd.setFont(font);

        // 画边框。
        gd.setColor(Color.BLACK);
        gd.drawRect(0, 0, WIDTH - 1, HEIGHT - 1);

        // 随机产生40条干扰线，使图象中的认证码不易被其它程序探测到。
        gd.setColor(Color.BLACK);
        for (int i = 0; i < LINE_NUM; i++) {
            int x = random.nextInt(WIDTH);
            int y = random.nextInt(HEIGHT);
            int xl = random.nextInt(12);
            int yl = random.nextInt(12);
            gd.drawLine(x, y, x + xl, y + yl);
        }

        // randomCode用于保存随机产生的验证码，以便用户登录后进行验证。
        StringBuilder randomCode = new StringBuilder();
        int red , green, blue;

        // 随机产生CODE_COUNT数字的验证码。
        for (int i = 0; i < CODE_COUNT; i++) {
            // 得到随机产生的验证码数字。
            int rand ;
            if(onlyNumber){
                rand =  random.nextInt(10)+26;
            }else{
                rand =  random.nextInt(36);
            }
            String code = String.valueOf(CODE_SEQUENCE[rand]);
            // 产生随机的颜色分量来构造颜色值，这样输出的每位数字的颜色值都将不同。
            red = random.nextInt(255);
            green = random.nextInt(255);
            blue = random.nextInt(255);

            // 用随机产生的颜色将验证码绘制到图像中。
            gd.setColor(new Color(red, green, blue));
            gd.drawString(code, (i + 1) * XX, CODE_Y);

            //将产生的四个随机数组合在一起。
            randomCode.append(code);
        }

        // 将四位数字的验证码保存到Session中。
        // 禁止图像缓存。

        // 将图像转为base64字符串
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        String imageString ;
        Map<String, String> imageMap = new HashMap<>(1);

        ImageIO.write(buffImg, "jpeg", bos);
        byte[] imageBytes = bos.toByteArray();
        BASE64Encoder encoder = new BASE64Encoder();
        imageString = encoder.encode(imageBytes);
        bos.close();

        imageMap.put("code",randomCode.toString());
        imageMap.put("image",imageString);

        return imageMap;
    }
}
