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
  is '�û���';
-- Add comments to the columns 
comment on column SYS_USER.id
  is '���';
comment on column SYS_USER.company_id
  is '������˾';
comment on column SYS_USER.office_id
  is '��������';
comment on column SYS_USER.login_name
  is '��¼��';
comment on column SYS_USER.password
  is '����';
comment on column SYS_USER.no
  is '����';
comment on column SYS_USER.name
  is '����';
comment on column SYS_USER.email
  is '����';
comment on column SYS_USER.phone
  is '�绰';
comment on column SYS_USER.mobile
  is '�ֻ�';
comment on column SYS_USER.user_type
  is '�û�����';
comment on column SYS_USER.photo
  is '�û�ͷ��';
comment on column SYS_USER.login_ip
  is '����½IP';
comment on column SYS_USER.login_date
  is '����½ʱ��';
comment on column SYS_USER.login_flag
  is '�Ƿ�ɵ�¼';
comment on column SYS_USER.create_by
  is '������';
comment on column SYS_USER.create_date
  is '����ʱ��';
comment on column SYS_USER.update_by
  is '������';
comment on column SYS_USER.update_date
  is '����ʱ��';
comment on column SYS_USER.remarks
  is '��ע��Ϣ';
comment on column SYS_USER.del_flag
  is 'ɾ�����';
comment on column SYS_USER.login_count
  is '�ۼƵ�½����';
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
