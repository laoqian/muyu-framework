package muyu.system.common.tree;


import lombok.Data;
import muyu.system.common.persistence.TreeEntity;
import sun.reflect.generics.tree.Tree;

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
public class TreeNode {
    private String id;
    private TreeEntity node = null;
    private TreeNode parentNode  = null;
    private List<TreeNode> childList = new LinkedList<>();

    private TreeNode(String id){
        this.id = id;
    }
    private TreeNode(TreeEntity n,TreeNode p){
        this.id           = n.getId();
        this.node         = n;
        this.parentNode   = p;
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
                p.getChildList().add(new TreeNode(t,p));
                list.remove(i--);
            }
        }

        if(!list.isEmpty() && !p.childList.isEmpty()){
            p.getChildList().forEach(c->addChild(c,list));
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

        root.getChildList().forEach(TreeNode::print);
    }

    public void upgrade(Set ids){
        for(int i=0;i<this.childList.size();i++){
            TreeNode c = this.childList.get(i);
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
        for(int i=0;i<this.childList.size();i++){
            TreeNode c = this.childList.get(i);
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
        for(int i=0;i<this.childList.size();i++){
            TreeNode c = this.childList.get(i);
            if(ids.contains(c.getId())){
                c.move(false);
                ids.remove(c.getId());
                i--;
            }

            if(!ids.isEmpty()){
                c.up(ids);
            }
        }
    }

    public void down(Set ids){
        for(int i=0;i<this.childList.size();i++){
            TreeNode c = this.childList.get(i);
            if(ids.contains(c.getId())){
                c.move(true);
                ids.remove(c.getId());
                i--;
            }

            if(!ids.isEmpty()){
                c.down(ids);
            }
        }
    }

    public List getUpdateList(){
        List list = new LinkedList();
        this.childList.forEach(c->{
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
        List<TreeNode> childList = this.getParentNode().getChildList();
        int i,k;
        for(i=0;i<childList.size();i++){
            if(childList.get(i).getId().equals(this.getId())){
                break;
            }
        }

        k = down?i+1:i-1;

        return k>=0 && k<childList.size()? childList.get(k):null;
    }

    private void remove(){
        List<TreeNode> childList = this.getParentNode().getChildList();
        TreeNode n;
        int k = Integer.MAX_VALUE;
        for(int i=0;i<childList.size();i++){
            n = childList.get(i);
            if(childList.get(i).getId().equals(this.getId())){
                childList.remove(i--);
                k = i;
            }else if(i>=k){
                n.setSort(i);
            }
        }
    }

    private void addChild(TreeNode c,int pos){
        pos = pos==-1?this.childList.size():pos;
        this.childList.add(pos,c);

        c.setParentNode(this);
        c.getNode().setParentId(this.getId());
        c.setSort(pos);

        for(int i =pos;i<this.childList.size();i++){
            this.childList.get(i).setSort(i);
        }
    }

    private void setSort(int pos){
        pos = pos ==-1?this.index()+1:pos;
        TreeEntity  e = this.getNode();

        e.setSort((pos+1)*10);
        e.update();
    }

    private int index(){
        List<TreeNode> childList = this.getParentNode().getChildList();
        int k = -1;
        for(int i=0;i<childList.size();i++){
            if(childList.get(i).getId().equals(this.getId())){
                k =i;
                break;
            }
        }
        return k;
    }

    private void swapChild(int a,int b){
        if(a >=0 && a<this.childList.size() && b >=0 && b<this.childList.size() ){
            TreeNode aNode  = this.childList.get(a);
            TreeNode bNode  = this.childList.get(b);

            aNode.setSort(b);
            bNode.setSort(a);

            this.childList.set(a,bNode);
            this.childList.set(b,aNode);
        }
    }
}
