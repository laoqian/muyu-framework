-- Create table
create table SYS_ROLE
(
  id          NUMBER(20) not null,
  name        VARCHAR2(60),
  ename       VARCHAR2(60),
  type        VARCHAR2(1),
  office_id   NUMBER(20),
  company_id  NUMBER(20),
  create_by   VARCHAR2(64) not null,
  create_date TIMESTAMP(6) not null,
  update_by   VARCHAR2(64) not null,
  update_date TIMESTAMP(6) not null,
  remarks     NVARCHAR2(255),
  del_flag    CHAR(1) default '0' not null
)
tablespace DATA
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
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
