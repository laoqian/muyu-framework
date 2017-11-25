package muyu.system.common.tree;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import muyu.system.common.persistence.DataEntity;
import muyu.system.common.persistence.TreeEntity;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/11/1
 * @version: 1.0.0
 */
@Data
public class TreeNode{

    @JsonIgnore
    private String id;

    private String name;

    private TreeEntity node = null;

    @JsonIgnore
    private TreeNode parentNode  = null;
    private List<TreeNode> children = new LinkedList<>();

    private TreeNode(String id){
        this.id = id;
    }
    private TreeNode(TreeEntity n,TreeNode p){
        this.id           = n.getId();
        this.name         = n.getName();
        this.node         = n;
        this.parentNode   = p;
    }

    @Override
    public String toString() {
        return this.node !=null?this.node.toString():"";
    }

    public static TreeNode createTree(String rootId,List<?> list){
        TreeNode root = new TreeNode(rootId);
        addChild(root,list);
        return root;
    }

    private static void addChild(TreeNode p,List<?> list){
        TreeEntity t;
        for(int i=0;i<list.size();i++){
            t = (TreeEntity)list.get(i);

            if(t.getParentId().equals(p.getId())){
                p.getChildren().add(new TreeNode(t,p));
                list.remove(i--);
            }
        }

        if(!list.isEmpty() && !p.children.isEmpty()){
            p.getChildren().forEach(c->addChild(c,list));
        }
    }

    public static void print(TreeNode root){
        TreeEntity e = root.getNode();
        if(e!=null){
            StringBuilder stringBuilder = new StringBuilder();
            for(int i=0;i<e.getLevel();i++){
                stringBuilder.append("  ");
            }

            stringBuilder.append("|").append(e.getName());

            System.out.println(stringBuilder.toString());
        }

        root.getChildren().forEach(TreeNode::print);
    }

    public void upgrade(Set ids){
        for(int i=0;i<this.children.size();i++){
            TreeNode c = this.children.get(i);
            if(ids.contains(c.getId())){
                c.upgrade();
                ids.remove(c.getId());
                i--;
            }

            if(!ids.isEmpty()){
                c.upgrade(ids);
            }
        }
    }

    public void degrade(Set ids){
        for(int i=0;i<this.children.size();i++){
            TreeNode c = this.children.get(i);
            if(ids.contains(c.getId())){
                c.degrade();
                ids.remove(c.getId());
                i--;
            }

            if(!ids.isEmpty()){
              c.degrade(ids);
            }
        }
    }

    public void up(Set ids){
        for(int i=0;i<this.children.size();i++){
            TreeNode c = this.children.get(i);
            if(ids.contains(c.getId())){
                c.move(false);
                ids.remove(c.getId());
            }

            if(!ids.isEmpty()){
                c.up(ids);
            }
        }
    }

    public void down(Set ids){

        for(int i=this.children.size()-1;i>=0;i--){
            TreeNode c = this.children.get(i);
            if(ids.contains(c.getId())){
                c.move(true);
                ids.remove(c.getId());
            }

            if(!ids.isEmpty()){
                c.down(ids);
            }
        }
    }

    public List getUpdateList(){
        List list = new LinkedList();
        this.children.forEach(c->{
            if(c.getNode().isUpdated()){
                list.add(c.getNode());
            }

            list.addAll(c.getUpdateList());
        });

        return list;
    }

    private void upgrade(){
        TreeNode p  = this.getParentNode();
        if(p != null){
            TreeNode pp = p.getParentNode();
            if(pp!=null){
                this.remove();
                pp.addChild(this,p.index()+1);
            }
        }
    }

    private void degrade(){
        TreeNode b  = this.brother(false);
        if(b != null){
            this.remove();
            b.addChild(this,-1);
        }
    }

    private void move(boolean down){
        TreeNode b  = this.brother(down);
        if(b != null){
            this.getParentNode().swapChild(b.index(),this.index());
        }
    }


    /**
     * 获取兄弟节点 type=true 获取下一个 tyep=false 获取上一个
     * @param down
     * @return
     */
    private TreeNode brother(boolean down){

        if(this.getParentNode()==null){
            return null;
        }
        List<TreeNode> children = this.getParentNode().getChildren();
        int i,k;
        for(i=0;i<children.size();i++){
            if(children.get(i).getId().equals(this.getId())){
                break;
            }
        }

        k = down?i+1:i-1;

        return k>=0 && k<children.size()? children.get(k):null;
    }

    private void remove(){
        List<TreeNode> children = this.getParentNode().getChildren();
        TreeNode n;
        int k = Integer.MAX_VALUE;
        for(int i=0;i<children.size();i++){
            n = children.get(i);
            if(children.get(i).getId().equals(this.getId())){
                children.remove(i--);
                k = i;
            }else if(i>=k){
                n.setSort(i);
            }
        }
    }

    private void addChild(TreeNode c,int pos){
        pos = pos==-1?this.children.size():pos;
        this.children.add(pos,c);

        c.setParentNode(this);
        c.getNode().setParentId(this.getId());
        c.setSort(pos);

        for(int i =pos;i<this.children.size();i++){
            this.children.get(i).setSort(i);
        }
    }

    private void setSort(int pos){
        pos = pos ==-1?this.index()+1:pos;
        TreeEntity  e = this.getNode();

        e.setSort((pos+1)*10);
        e.update();
    }

    private int index(){
        List<TreeNode> children = this.getParentNode().getChildren();
        int k = -1;
        for(int i=0;i<children.size();i++){
            if(children.get(i).getId().equals(this.getId())){
                k =i;
                break;
            }
        }
        return k;
    }

    private void swapChild(int a,int b){
        if(a >=0 && a<this.children.size() && b >=0 && b<this.children.size() ){
            TreeNode aNode  = this.children.get(a);
            TreeNode bNode  = this.children.get(b);

            aNode.setSort(b);
            bNode.setSort(a);

            this.children.set(a,bNode);
            this.children.set(b,aNode);
        }
    }
}
