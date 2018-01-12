-- Create table
create table SYS_USER
(
  id          NVARCHAR2(64) not null,
  company_id  NVARCHAR2(64) not null,
  office_id   NVARCHAR2(64) not null,
  login_name  NVARCHAR2(100) not null,
  password    NVARCHAR2(100) not null,
  no          NVARCHAR2(100),
  name        NVARCHAR2(100) not null,
  email       NVARCHAR2(200),
  phone       NVARCHAR2(20),
  mobile      NVARCHAR2(20),
  user_type   CHAR(1),
  photo       NVARCHAR2(1000),
  login_ip    NVARCHAR2(100),
  login_date  TIMESTAMP(6),
  login_flag  CHAR(1),
  create_by   NVARCHAR2(64) not null,
  create_date TIMESTAMP(6) not null,
  update_by   NVARCHAR2(64) not null,
  update_date TIMESTAMP(6) not null,
  remarks     NVARCHAR2(255),
  del_flag    CHAR(1) default 0 not null,
  login_count NUMBER(10) default 0
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
-- Add comments to the table 
comment on table SYS_USER
  is '用户表';
-- Add comments to the columns 
comment on column SYS_USER.id
  is '编号';
comment on column SYS_USER.company_id
  is '归属公司';
comment on column SYS_USER.office_id
  is '归属部门';
comment on column SYS_USER.login_name
  is '登录名';
comment on column SYS_USER.password
  is '密码';
comment on column SYS_USER.no
  is '工号';
comment on column SYS_USER.name
  is '姓名';
comment on column SYS_USER.email
  is '邮箱';
comment on column SYS_USER.phone
  is '电话';
comment on column SYS_USER.mobile
  is '手机';
comment on column SYS_USER.user_type
  is '用户类型';
comment on column SYS_USER.photo
  is '用户头像';
comment on column SYS_USER.login_ip
  is '最后登陆IP';
comment on column SYS_USER.login_date
  is '最后登陆时间';
comment on column SYS_USER.login_flag
  is '是否可登录';
comment on column SYS_USER.create_by
  is '创建者';
comment on column SYS_USER.create_date
  is '创建时间';
comment on column SYS_USER.update_by
  is '更新者';
comment on column SYS_USER.update_date
  is '更新时间';
comment on column SYS_USER.remarks
  is '备注信息';
comment on column SYS_USER.del_flag
  is '删除标记';
comment on column SYS_USER.login_count
  is '累计登陆次数';
-- Create/Recreate indexes 
create index IND_SYS_USER_COMPANY_ID on SYS_USER (COMPANY_ID)
  tablespace DATA
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
create index IND_SYS_USER_OFFICE_ID on SYS_USER (OFFICE_ID)
  tablespace DATA
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
-- Create/Recreate primary, unique and foreign key constraints 
alter table SYS_USER
  add constraint PK_SYS_USER primary key (ID)
  using index 
  tablespace DATA
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
