-- Create table
create table SYS_ROLE
(
  id    NUMBER(20),
  name  VARCHAR2(60),
  ename VARCHAR2(60),
  type  VARCHAR2(1)
)
tablespace DATA
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );
-- Add comments to the columns 
comment on column SYS_ROLE.id
  is 'Id';
comment on column SYS_ROLE.name
  is '名称';
comment on column SYS_ROLE.ename
  is '英文名称';
comment on column SYS_ROLE.type
  is '权限类型';
